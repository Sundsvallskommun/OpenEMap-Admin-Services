alert('Test');
/*
Copyright Härnösands kommun(C) 2014 

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
    All rights reserved. This program and the accompanying materials
    are made available under the terms of the GNU Affero General Public License
    which accompanies this distribution, and is available at
    http://www.gnu.org/licenses/agpl-3.0.html
 */

/**
 * ###Factory for creating a Open eMap Admin application
 *  
 * Call the method initOpenEMapAdmin(configPath, options)
 * ###[Integration example](https://github.com/Sundsvallskommun/OpenEMap-WebUserInterface/blob/master/README.md)
 */
var version = "-1.6";
var openEMapScriptLocation;
var appPath = '/openemapadmin'; 
var defaultWMSServer = 'https://extmaptest.sundsvall.se/geoserver/wms?request=GetCapabilities&version=1.1.0';
var wfsServer = 'https://extmaptest.sundsvall.se/geoserver/wfs';

var loadCssFiles = function(files, callback) {
	var fileCounter = 0;
	var cssFilesIndex = document.styleSheets.length - 1;

	for (var index in files) {
		fileCounter++;
		if(checkFileType(files[index])) {
			var link = document.createElement("link");
			link.href = files[index];
			link.rel = "stylesheet";
			link.type = "text/css";
			link.onload = checkFinishedState;
			if (this.readyState === 'loaded' || this.readyState === 'complete') {
				link.onreadystatechange = checkFinishedState();
			}
			document.getElementsByTagName("head")[0].appendChild(link);
			cssFilesIndex++;
			if (!window.opera && navigator.userAgent.indexOf("MSIE") == -1) {
				checkCSSLoadingState(cssFilesIndex);
			}
		}
	}

	function checkFileType(f) {
		f = f.toLowerCase();
	    var cssIndex = f.indexOf("css");
	    if(cssIndex == -1) {
	    	return false;
	    }
	    return true;
	}
	
	function checkCSSLoadingState(index) {
		try {
			if (document.styleSheets[index].cssRules) {
				checkFinishedState();
			} else {
				if (document.styleSheets[index].rules && document.styleSheets[index].rules.length) {
					checkFinishedState();
				} else {
					setTimeout(function() { checkCSSLoadingState(index); }, 250);
				}
			}
		} catch (e) {
			setTimeout(function() { checkCSSLoadingState(index); }, 250);
		}
	}

	function checkFinishedState() {
		fileCounter--;
		if (fileCounter === 0) {
			callback();
			fileCounter = -1;
		}
	}
};

var loadJsScripts = function(files) {
	var head = document.getElementsByTagName("head")[0];
	var waitUntilDependenciesIsLoaded = function(dependencies, script) {
		if (dependencies()) {
			head.appendChild(script);
		} else {
			setTimeout(function() { waitUntilDependenciesIsLoaded(dependencies, script); }, 5);
		}
	};
	
    for (var i = 0; i < files.length; i++) {
		var script = {};
		script = document.createElement('script');
		script.type = 'text/javascript';
	 	script.src = files[i].src;

    	waitUntilDependenciesIsLoaded(files[i].dependencies, script);
    }
};

(function () {

	var scriptNameRaw = "OpenEMapAdmin.js";
	var openEMapScriptName = new RegExp("(^|(.*?\\/))(" + scriptNameRaw + ")(\\?|$)");
	var scripts = document.getElementsByTagName("script");
	for (var i = 0; i < scripts.length; i++) {
		var src = scripts[i].getAttribute('src');
		if (src) {
			var match = src.match(openEMapScriptName);
	        if (match) {
	        	openEMapScriptLocation = match[1];
	        	break;
	        }
	    }
	}
	var cssFiles = [
		openEMapScriptLocation + "lib/ext/resources/ext-theme-neptune/ext-theme-neptune-all.css",
		openEMapScriptLocation + "oeadmin.css"
	];

	scripts = [
		{src: openEMapScriptLocation + "lib/ext/ext-all.js", dependencies: function() {return true;}},
		{src: openEMapScriptLocation + "lib/ext/ext-theme-neptune.js", dependencies: function() {return (typeof Ext !== "undefined" && Ext.isReady);}},
		{src: openEMapScriptLocation + "lib/ext/locale/ext-lang-sv_SE.js", dependencies:  function() {return (typeof Ext !== "undefined" && Ext.isReady);}},
		{src: openEMapScriptLocation + "lib/OpenLayers/OpenLayers.js", dependencies: function() {return true;}},
		{src: openEMapScriptLocation + "lib/geoext/geoext-all.js", dependencies: function() {return ((typeof Ext !== "undefined") && Ext.isReady &&  (typeof OpenLayers !== "undefined"));}},
		{src: openEMapScriptLocation + "lib/OpenEMap/OpenEMap-min.js", dependencies: function() {return ((typeof Ext !== "undefined") && Ext.isReady &&  (typeof GeoExt !== "undefined") &&  (typeof OpenLayers !== "undefined"));}},
		{src: openEMapScriptLocation + "OpenEMap-Admin-min.js", dependencies: function() {return ((typeof Ext !== "undefined") && Ext.isReady &&  (typeof GeoExt !== "undefined") &&  (typeof OpenLayers !== "undefined") && (typeof OpenEMap !== "undefined") && (typeof OpenEMap.Client !== "undefined") );}}
    ];
	
	// Ensure css files are loaded before js files
	loadCssFiles(cssFiles, function() {
		loadJsScripts(scripts);
	});
}) ();

var waitUntilOpenEMapIsLoaded = function(callback) {
	if (typeof AdmClient === "undefined")  {
		setTimeout(function() {waitUntilOpenEMapIsLoaded(callback);}, 5);
	} else {
		callback();
	}
};

/**
* @function initOpenEmapAdmin Initialize the Admin client
*/
var initOpenEMapAdmin = function() {
	// Make sure OpenEMap is loaded
	var configOpenEMapAdminApp = {
		requires: ['Ext.container.Container',
		           'AdmClient.controller.Main',
		           'AdmClient.controller.MainToolbar',
		           'AdmClient.controller.MapConfiguration',
		           'AdmClient.controller.Servers',
		           'AdmClient.controller.ToolsGrid',
		           'AdmClient.controller.Layers',
		           'AdmClient.controller.Search',
		           'AdmClient.controller.PreviewMap',
		           'AdmClient.controller.ConfigLayers',
		           'AdmClient.controller.toolDetails.DrawPoint',
		           'AdmClient.controller.toolDetails.DrawPath',
		           'AdmClient.controller.toolDetails.DrawPolygon',
		           'AdmClient.controller.toolDetails.FullExtent',
		           'AdmClient.controller.toolDetails.Print',
		           'AdmClient.controller.toolDetails.Identify',
		           'AdmClient.controller.toolDetails.DetailReport',
		           'AdmClient.controller.toolDetails.MeasureLine',
		           'AdmClient.controller.toolDetails.MeasureArea',
		           'AdmClient.controller.toolDetails.DeleteGeometry',
		           'AdmClient.controller.toolDetails.DeleteAllFeatures',
		           'AdmClient.controller.toolDetails.ModifyGeometry',
		           'AdmClient.controller.toolDetails.SelectGeometry',
		           'AdmClient.controller.toolDetails.DeleteMeasure',
		           'AdmClient.controller.LayerDetails',
		           
		           'AdmClient.store.Servers',
		           'AdmClient.store.ToolStore',
		           'AdmClient.store.Layers',
		           'AdmClient.store.SearchServer',
		           'AdmClient.store.Municipalities',
		           'AdmClient.store.WmsCapabilitiesLayerTree',
		           
		           'AdmClient.view.main.MainToolbar',
		           'AdmClient.view.Main',
		           'AdmClient.view.mapconfiguration.tools.ToolsGrid',
		           'AdmClient.view.mapconfiguration.tools.details.General',
		           'AdmClient.view.mapconfiguration.tools.details.DrawGeometry',
	             'AdmClient.view.mapconfiguration.tools.details.DeleteGeometry',
	             'AdmClient.view.mapconfiguration.tools.details.DrawObject',
	             'AdmClient.view.mapconfiguration.tools.details.FullExtent',
	             'AdmClient.view.mapconfiguration.tools.details.Identify',
	             'AdmClient.view.mapconfiguration.tools.details.MeasureArea',
	             'AdmClient.view.mapconfiguration.tools.details.MeasureLine',
	             'AdmClient.view.mapconfiguration.tools.details.Print',
	             'AdmClient.view.mapconfiguration.tools.details.ModifyGeometry',
	             'AdmClient.view.mapconfiguration.map.PreviewMap',
	             'AdmClient.view.mapconfiguration.layer.LayerDetails',
	               
	             'AdmClient.view.mapconfiguration.search.SearchPanel',
	               
	               'AdmClient.view.MapConfiguration',
	               'AdmClient.view.Settings',
	               'AdmClient.view.settings.SettingsGridBase',
	               'AdmClient.view.settings.GisServersGrid',
	               'AdmClient.view.settings.SearchServersGrid',
	               'AdmClient.view.settings.Layers',
	               'AdmClient.view.about.About',
	
	               'AdmClient.model.Server',
	               'AdmClient.model.SettingBase',
	               'AdmClient.model.SearchServer',
	               'AdmClient.model.Layer',
	               'AdmClient.model.Config',
	               
	               'OpenEMap.Client'
	               ],
	    name: 'AdmClient',
	    appFolder: '',
	    controllers: ['Main', 
	                  'Layers', 
	                  'MainToolbar', 
	                  'Servers', 
	                  'MapConfiguration', 
	                  'ToolsGrid', 
	                  'Layers', 
	                  'Search', 
	                  'PreviewMap', 
	                  'ConfigLayers',
	                  'LayerDetails',
	                  'toolDetails.DrawPoint', 
	                  'toolDetails.DrawPath',
	                  'toolDetails.DrawPolygon',
	                  'toolDetails.FullExtent',
	                  'toolDetails.Print',
	                  'toolDetails.Identify',
	                  'toolDetails.MeasureLine',
	                  'toolDetails.MeasureArea',
	                  'toolDetails.DeleteGeometry',
	                  'toolDetails.ModifyGeometry',
	                  'toolDetails.SelectGeometry',
	                  'toolDetails.DetailReport',
	                  'toolDetails.DeleteAllFeatures',
	                  'toolDetails.DeleteMeasure'
	                ],
	    models : ['SettingBase','Server', 'SearchServer', 'Layer', 'Config'],
	    launch: function() {
	    	this.config = Ext.create('AdmClient.model.Config');
	      	this.admClient =  Ext.create('Ext.container.Container', {
	        	layout: 'border',
	          	renderTo: 'contentitem',
	        	height : (window.innerHeight - 70),
	        	items : [{xtype: 'main'}]
	        });
	    }
	};
	waitUntilOpenEMapIsLoaded(run);
	function run() {
		AdmClient.app.admClient.setHeight(window.innerHeight - 70);
		AdmClient.app.admClient.setWidth(window.innerWidth);
		window.addEventListener("resize", function() {
				AdmClient.app.admClient.setHeight(window.innerHeight - 70);
				AdmClient.app.admClient.setWidth(window.innerWidth);
		});
	}
};