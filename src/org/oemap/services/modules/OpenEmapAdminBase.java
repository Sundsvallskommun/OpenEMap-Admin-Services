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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import se.unlogic.hierarchy.core.annotations.CheckboxSettingDescriptor;
import se.unlogic.hierarchy.core.annotations.ModuleSetting;
import se.unlogic.hierarchy.core.annotations.TextFieldSettingDescriptor;
import se.unlogic.hierarchy.core.beans.SimpleForegroundModuleResponse;
import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse;
import se.unlogic.hierarchy.foregroundmodules.AnnotatedForegroundModule;
import se.unlogic.standardutils.xml.XMLUtils;
import se.unlogic.webutils.http.RequestUtils;
import se.unlogic.webutils.http.URIParser;

/**
 * 
 * A base module for the admin interface
 *
 */
public class OpenEmapAdminBase extends AnnotatedForegroundModule {
	
	@ModuleSetting
    @CheckboxSettingDescriptor(name = "Debug mode?", description = "This assumes Admin javascript sources at /OpenEMap-Admin-WebUserInterface.")
    protected boolean debug = false;
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "GIS Server", description = "Base URL to GIS Server. (eg. https://extmap.sundsvall.se")
    protected String gisServer = "https://extmaptest.sundsvall.se";
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "WMS Server", description = "Context path to WMS endpoint on GIS server (eg. /geoserver/wms")
    protected String wmsServer = "/geoserver/wms";
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "WMS Server Getcapabilities URL", description = "Context path to Getcapabilities used when listing layers in advanced layer control and admin. (eg /geoserver/wms?request=GetCapabilities&version=1.1.1")
    protected String wmsGetCapabilities = "/capababilities/wms.xml";
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "WFS Server", description = "Context path to WFS endpoint on GIS server (eg. /geoserver/wfs")
    protected String wfsServer = "/geoserver/wfs";
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "WMTS Server", description = "Context path to WMTS endpoint on GIS server (eg. /geoserver/gwc/service/wms")
    protected String wmtsServer = "/geoserver/gwc/service/wms";
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "Alias for proxy", description = "Alias set in admin proxy.")
    protected String adminproxy = "adminproxy";
	

	@Override
	public ForegroundModuleResponse defaultMethod(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser)
			throws Exception, Throwable {
		System.out.println("Test " + this.scripts);
		Document doc = createDocument(req, uriParser);
		return new SimpleForegroundModuleResponse(doc,
				this.getDefaultBreadcrumb());
	}

	protected Document createDocument(HttpServletRequest req,
			URIParser uriParser) {

		Document doc = XMLUtils.createDomDocument();
		Element document = doc.createElement("Document");
		doc.appendChild(document);

		document.appendChild(RequestUtils.getRequestInfoAsXML(doc, req,
				uriParser));
		document.appendChild(moduleDescriptor.toXML(doc));

		XMLUtils.appendNewElement(doc, document, "debugAdmin", debug);
		XMLUtils.appendNewElement(doc, document, "gisServer", gisServer);
		XMLUtils.appendNewElement(doc, document, "wmsServer", wmsServer);
		XMLUtils.appendNewElement(doc, document, "wmsGetCapabilities", wmsGetCapabilities);
		XMLUtils.appendNewElement(doc, document, "wfsServer", wfsServer);
		XMLUtils.appendNewElement(doc, document, "wmtsServer", wmtsServer);
		XMLUtils.appendNewElement(doc, document, "adminproxy", adminproxy);
		
		return doc;
	}
	

}
