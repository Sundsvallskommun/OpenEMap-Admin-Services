/******************************************************************************
Copyright Härnösands kommun(C) 2014  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/


package org.oemap.services.modules.admin;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.Config;
import org.oemap.services.bl.OpenEmapBeanFactory;
import org.oemap.services.exceptions.InvalidUserException;
import org.oemap.services.exceptions.WriteprotectedException;
import org.oemap.services.modules.responsehandler.StringResponseHandler;

import se.unlogic.hierarchy.core.annotations.WebPublic;
import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleDescriptor;
import se.unlogic.hierarchy.core.interfaces.SectionInterface;
import se.unlogic.hierarchy.foregroundmodules.rest.AnnotatedRESTModule;
import se.unlogic.hierarchy.foregroundmodules.rest.RESTMethod;
import se.unlogic.hierarchy.foregroundmodules.rest.URIParam;
import se.unlogic.standardutils.dao.AnnotatedDAO;
import se.unlogic.standardutils.dao.AnnotatedDAOWrapper;
import se.unlogic.standardutils.dao.SimpleAnnotatedDAOFactory;
import se.unlogic.webutils.http.HTTPUtils;
import se.unlogic.webutils.http.URIParser;


/**
 * 
 * Admin configuration module to handle configurations
 *
 */
public class AdminConfigModule extends AnnotatedRESTModule {
	private AnnotatedDAOWrapper<Config, Integer> configDAO;

	@Override
	protected void createDAOs(DataSource dataSource) throws Exception {
		super.createDAOs(dataSource);
		SimpleAnnotatedDAOFactory daoFactory = new SimpleAnnotatedDAOFactory(
				dataSource);
		AnnotatedDAO<Config> dao = daoFactory.getDAO(Config.class);
		configDAO = new AnnotatedDAOWrapper<Config, Integer>(dao, "configId",
				Integer.class);
	}

	/**
	 * Init method
	 */
	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {
		addResponseHandler(new StringResponseHandler());
		super.init(moduleDescriptor, sectionInterface, dataSource);
	}
	
	
	/**
	 * Default method for all http requests
	 */
	@Override
	public se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse defaultMethod(HttpServletRequest req, HttpServletResponse res, User user, URIParser uriParser) throws Throwable {
		List<Config> configs = configDAO.getAll();
		List<Config> filteredConfigs = new ArrayList<Config>();
		
		for (Config config : configs){
			String configName = config.getName();
			if (configName.equalsIgnoreCase("default")) 
				continue;
			
			if (config.getUsername().equalsIgnoreCase(user.getUsername())){
				filteredConfigs.add(config);
			}
			else if (config.getIsPublic()){
				filteredConfigs.add(config);
			}
		}
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
//		String json = configFactory.createConfigListJSON(filteredConfigs);
		String json = configFactory.createJSON(filteredConfigs);
		HTTPUtils.sendReponse(json, res);
		return null;
	};

	@WebPublic(alias = "configlist")
	public se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse getConfigList(HttpServletRequest req, HttpServletResponse res, User user, URIParser uriParser) throws Throwable {
		List<Config> configs = configDAO.getAll();
		List<Config> filteredConfigs = new ArrayList<Config>();
		
		for (Config config : configs){
			String configName = config.getName();
			if (configName.equalsIgnoreCase("default")) 
				continue;
			
			if (config.getUsername().equalsIgnoreCase(user.getUsername())){
				filteredConfigs.add(config);
			}
			else if (config.getIsPublic()){
				filteredConfigs.add(config);
			}
		}
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createConfigListJSON(filteredConfigs);
//		String json = configFactory.createJSON(filteredConfigs);
		HTTPUtils.sendReponse(json, res);
		return null;
	};

	/**
	 *Returns a specific configuration 
	 *
	 * 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return a configuration
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config/{id}", method = "get")
	public String retriveConfig(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser,
			@URIParam(name = "id") Integer id) throws Throwable {
		Config config = configDAO.get(id);
		Boolean isPublic = config.getIsPublic();
		
		if (isPublic == null){
			return "";
		}
		else if (!isPublic){
			String currentUser = user.getUsername();
			String configUser = config.getUsername();
			if (!currentUser.equalsIgnoreCase(configUser)){
				throw new InvalidUserException();
			}
		}
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createJSON(config);
		return json;
	}

	/**
	 * Updates a specific configuration by using PUT verb in the request and provide configuration ID is ID param
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config/{id}", method = "put")
	public String updateConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser, @URIParam(name = "id") Integer id)
			throws Throwable {
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		try {
			Config config = configFactory.createBean(Config.class, req);
			config.setUsername(user.getUsername());
			if (isWriteProtected(config, user)) {
				throw new WriteprotectedException();
			}
			configDAO.update(config);
			String json = configFactory.createJSON(config);
			configFactory.setRestResponseObject(true, config.getConfigId(), "", json);
		} catch (SQLException x) {
			configFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return configFactory.getRestResponseObject();
	}

	/**
	 * Create a new configuration by using the POST verb. The configuration is expected to be in the req object.
	 * The configuration is expected to be in JSON format
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @return
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config", method = "post")
	public String createConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser)
			throws Throwable {
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		Config config = configFactory.createBean(Config.class, req);
		try {
			if (config.getConfigId() != null)
				config.setConfigId(null);

			config.setUsername(user.getUsername());

			if (isWriteProtected(config, user)) {
				throw new WriteprotectedException();
			}
			configDAO.add(config);
			String json = configFactory.createJSON(config);
			configFactory.setRestResponseObject(true, config.getConfigId(), "", json);
		} catch (SQLException x) {
			configFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return configFactory.getRestResponseObject();
	}

	/**
	 * Deletes a configuration by using the DELETE verb. Provide id as parameter representing the configuration to delete. 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config/{id}", method = "delete")
	public String deleteConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser, @URIParam(name = "id") Integer id)
			throws Throwable {
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		try {
			// get config
			// see if user owns config
			// only administrators can delete public configs
			Config config = configDAO.get(id);
			if (isWriteProtected(config, user)) {
				throw new WriteprotectedException();
			}
			configDAO.delete(config);
			String json = configFactory.createJSON(config);
			configFactory.setRestResponseObject(true, config.getConfigId(), "", json);
		} catch (Exception x) {
			configFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return configFactory.getRestResponseObject();
	}

	/**
	 * 
	 * Returns if configuration is write protected. The "default" configuration is per default write protected.
	 * 
	 * @param config
	 * @return
	 */
	public boolean isWriteProtected(Config config, User user) {
		// lock default config
		if (config.getName().toLowerCase().equals("default")){
			return true;
		}
		
		if (config.getIsPublic()){
			if (user.isAdmin()){
				return false;
			}
			return true;
		}
		String configUserName = config.getUsername();
		String userName = user.getUsername();
		if (configUserName.equalsIgnoreCase(userName) || configUserName.equalsIgnoreCase(null)){
			return false;
		}
		return true;
	}
}