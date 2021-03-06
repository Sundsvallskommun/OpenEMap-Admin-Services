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

package org.oemap.services.modules;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.Config;
import org.oemap.services.bl.OpenEmapBeanFactory;
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
 * A module for distributing configuration public
 *
 */
public class PublicConfigModule extends AnnotatedRESTModule {

	private AnnotatedDAOWrapper<Config, Integer> configDAO;

	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {

		addResponseHandler(new StringResponseHandler());
		super.init(moduleDescriptor, sectionInterface, dataSource);
	}
	
	/**
	 * Default method for all http requests
	 * Returns a complete list of public configs, including all configdata 
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
			
			if (config.getIsPublic()){
				filteredConfigs.add(config);
			}
		}

		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createJSON(filteredConfigs);
		HTTPUtils.sendReponse(json, res);
		return null;
	};

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
			
			if (config.getIsPublic()){
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
	 * Returns a specific config
	 * Includes all configdata 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config/{id}", method = "get")
	public String getConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser, @URIParam(name = "id") Integer id)
			throws Throwable {
		Config config = configDAO.get(id);
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createJSON(config);
		return json;
	}
}
