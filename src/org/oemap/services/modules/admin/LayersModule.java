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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.Layer;
import org.oemap.services.bl.OpenEmapBeanFactory;
import org.oemap.services.modules.responsehandler.StringResponseHandler;
import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleDescriptor;
import se.unlogic.hierarchy.core.interfaces.SectionInterface;
import se.unlogic.hierarchy.foregroundmodules.rest.AnnotatedRESTModule;
import se.unlogic.hierarchy.foregroundmodules.rest.RESTMethod;
import se.unlogic.hierarchy.foregroundmodules.rest.URIParam;
import se.unlogic.standardutils.dao.AnnotatedDAO;
import se.unlogic.standardutils.dao.AnnotatedDAOWrapper;
import se.unlogic.standardutils.dao.SimpleAnnotatedDAOFactory;
import se.unlogic.webutils.http.URIParser;

/**
 * 
 * A module to handle layers
 *
 */
public class LayersModule extends AnnotatedRESTModule {

	private AnnotatedDAOWrapper<Layer, Integer> layersDAO;

	@Override
	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {
		addResponseHandler(new StringResponseHandler());
		super.init(moduleDescriptor, sectionInterface, dataSource);
	}

	@Override
	protected void createDAOs(DataSource dataSource) throws Exception {
		super.createDAOs(dataSource);
		SimpleAnnotatedDAOFactory daoFactory = new SimpleAnnotatedDAOFactory(
				dataSource);
		AnnotatedDAO<Layer> dao = daoFactory.getDAO(Layer.class);
		layersDAO = new AnnotatedDAOWrapper<Layer, Integer>(dao, "layerId",
				Integer.class);
	}

	/**
	 * A method to create a layer using POST verb
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @return
	 * @throws Exception
	 * @throws Throwable
	 */
	@RESTMethod(alias = "layers", method = "post")
	public String createLayers(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Exception, Throwable {

		OpenEmapBeanFactory<Layer> layerFactory = new OpenEmapBeanFactory<Layer>();
		Layer layer = layerFactory.createBean(Layer.class, req);

		try {
			if (layer.getLayerId() != null)
				layer.setLayerId(null);
			layersDAO.add(layer);
		} catch (Exception x) {
			res.setStatus(500);
			layerFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		res.setStatus(201);
		return layerFactory.getRestResponseObject();
	}

	/**
	 * A method to update layer using PUT verb
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @return
	 * @throws Exception
	 * @throws Throwable
	 */
	@RESTMethod(alias = "layers", method = "put")
	public String updateLayers(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Exception, Throwable {
		OpenEmapBeanFactory<Layer> layerFactory = new OpenEmapBeanFactory<Layer>();
		Layer layer = layerFactory.createBean(Layer.class, req);
		try {
			if (hasEnoughData(layerFactory, layer, res)) {
				layersDAO.update(layer);
			} else {
				res.setStatus(500);
				layerFactory.setRestResponseObject(false, 0,
						"No layerId provided in request");
				return layerFactory.getRestResponseObject();
			}
		} catch (SQLException x) {
			res.setStatus(400);
			layerFactory.setRestResponseObject(false, layer.getLayerId(),
					x.getMessage());
		}
		res.setStatus(201);
		return layerFactory.getRestResponseObject();
	}
	
	/**
	 * A method to delete a method using DELETE verb
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return
	 * @throws Exception
	 * @throws Throwable
	 */
	@RESTMethod(alias = "layers/{id}", method = "delete")
	public String deleteLayers(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser, @URIParam(name = "id") Integer id)
			throws Exception, Throwable {

		OpenEmapBeanFactory<Layer> layerFactory = new OpenEmapBeanFactory<Layer>();
		Layer layer = null;
		try {
			layer = layersDAO.get(id);
			layersDAO.delete(layer);
		} catch (SQLException x) {
			res.setStatus(400);
			layerFactory.setRestResponseObject(false,
					layer.getLayerId() == null ? 0 : layer.getLayerId(),
					x.getMessage());
		}
		res.setStatus(204);
		layerFactory.setRestResponseObject(true, 0, "");

		return layerFactory.getRestResponseObject();
	}

	public boolean hasEnoughData(OpenEmapBeanFactory<Layer> factory,
			Layer bean, HttpServletResponse res) throws Exception, Throwable {
		if (bean.getLayerId() == 0)
			return false;
		return true;
	}

}
