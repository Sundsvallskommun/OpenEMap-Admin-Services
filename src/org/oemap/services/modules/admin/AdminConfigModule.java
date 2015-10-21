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
import org.oemap.services.exceptions.InvalidConfigIdException;
import org.oemap.services.exceptions.InvalidUserException;
import org.oemap.services.exceptions.WriteprotectedException;
import org.oemap.services.exceptions.ConsistencyException;
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
	 * Returns a complete list of configs that are either created by specified user or is public. 
	 * Includes all configdata 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @return
	 * @throws Throwable
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
		String json = configFactory.createJSON(filteredConfigs);
		HTTPUtils.sendReponse(json, res);
		return null;
	};

	/**
	 * Returns a short list of all public configs
	 * Includes only id, name, username and isPublic
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @return
	 * @throws Throwable
	 */
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
		HTTPUtils.sendReponse(json, res);
		return null;
	};

	/**
	 * Returns a short list of all configs, both public and non-public
	 * Includes only id, name, username and isPublic
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @return
	 * @throws Throwable
	 */
	@WebPublic(alias = "listall")
	public se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse getConfigListAll(HttpServletRequest req, HttpServletResponse res, User user, URIParser uriParser) throws Throwable {
		List<Config> configs = configDAO.getAll();
		
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createConfigListJSON(configs);
		HTTPUtils.sendReponse(json, res);
		return null;
	};

	/**
	 * Returns a specific configuration 
	 * Includes all configdata 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return a complete configuration
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config/{id}", method = "get")
	public String retriveConfig(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser,
			@URIParam(name = "id") Integer id) throws Throwable {
		Config config = configDAO.get(id);
		if (config == null) {
			throw new InvalidConfigIdException("Invalid config id: " + id);
		}

		Boolean isPublic = config.getIsPublic();
		if (isPublic == null){
			config.setIsPublic(false);
			isPublic = false;
		}
		if (!isPublic){
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
			if (config == null) {
				throw new InvalidConfigIdException("Invalid config id: " + id);
			}
			// Checks the consistency between config, logged in user and config id in module call
			checkConsistency(config, user, id);
			
			config.setUsername(user.getUsername());
			// Checks whether the config is write protected
			checkWriteProtection(config, user, id);
			
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

		// Checks the consistency between config and logged in user 
		checkConsistency(config, user);
		
		try {
			if (config.getConfigId() != null)
				config.setConfigId(null);

			config.setUsername(user.getUsername());

			// Checks whether the config is write protected
			checkWriteProtection(config, user);

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
			if (config == null) {
				throw new InvalidConfigIdException("Invalid config id: " + id);
			}
			
			// Checks the consistency between config, logged in user and config id in module call
			checkConsistency(config, user, id);
			
			// Checks whether the config is write protected
			checkWriteProtection(config, user, id);

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
	 * Throws an exception if configuration is write protected. The "default" configuration is per default write protected.
	 * Use this method if the call does not contain a id (like POST)
	 * 
	 * @param config configuration object 
	 * @param user user logged in
	 * @throws WriteprotectedException
	 */
	public void checkWriteProtection(Config config, User user) throws WriteprotectedException {
		// lock default config
		if (config.getName().toLowerCase().equals("default")){
			throw new WriteprotectedException("Config named 'default' is write protected.");
		}

		// If the user is not admin and the config is public. Dont allow to write.
		if (!user.isAdmin() && config.getIsPublic()) {
			throw new WriteprotectedException("Specified config (id=" + config.getConfigId() + ") is public, but logged in user (" + user.getUsername() + ") is not admin.");
		}
	}
	
	/**
	 * 
	 * Throws an exception if configuration is write protected. The "default" configuration is per default write protected.
	 * Use this method if the call contains a id (like PUT and DELETE)
	 * 
	 * @param config configuration object 
	 * @param user user logged in
	 * @param id configid specified  
	 * @throws InvalidConfigIdException, WriteprotectedException, SQLException
	 */
	public void checkWriteProtection(Config config, User user, Integer id) throws InvalidConfigIdException, WriteprotectedException, SQLException {
		// Checks if the user in stored config is the same as the one logged in 
		Config configInDatabase = configDAO.get(id);
		if (configInDatabase == null) {
			throw new InvalidConfigIdException("Invalid config id: " + id);
		}
		String configUserName = configInDatabase.getUsername();
		String userName = user.getUsername();
		if (!configUserName.equalsIgnoreCase(userName)) {
			throw new WriteprotectedException("Logged in user (" + user.getUsername() + ") not owner of specified config: " + id);
		}
		
		checkWriteProtection(config, user);
	}
	/**
	 * 
	 * Throws exception if username and the values for this in configuration is not consistent
	 * Use this method if the call does not contain an id (like POST)
	 * 
	 * @param config configuration object 
	 * @param user user logged in
	 * @throws ConsistencyException
	 */
	public void checkConsistency(Config config, User user) throws ConsistencyException {
		if (!config.getUsername().equalsIgnoreCase(user.getUsername())) {
			throw new ConsistencyException("Username (" + config.getUsername() + ") in config not the same as logged in user (" + user.getUsername() + ").");
		}
	}
	/**
	 * 
	 * Throws exception if id, username and the values for this in configuration is not consistent
	 * Use this method if the call contains an id (like PUT and DELETE)
	 * 
	 * @param config configuration object 
	 * @param user user logged in
	 * @param id configid specified  
	 * @throws ConsistencyException
	 */
	public void checkConsistency(Config config, User user, Integer id) throws ConsistencyException {
		if (!config.getConfigId().equals(id)) {
			throw new ConsistencyException("Id in config (" + config.getConfigId() + ") not the same as in module call (" + id + ").");
		}
		checkConsistency(config, user);
	}
}
