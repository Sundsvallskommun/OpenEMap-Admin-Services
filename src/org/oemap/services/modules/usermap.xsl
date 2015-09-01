<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	<xsl:variable name="scripts">
	/OpenEMap/OpenEMap.js
	</xsl:variable>	

	<xsl:template match="Document">
	    <style>
		     input[type="button"], button {
		     	padding: 0px !important;
		     }
	    </style>
		<script type="text/javascript">
		
			var disableStyle = function(styleName, disabled) {
			    var styles = document.styleSheets;
			    var href = '';
			    for (var i = 0; i !== styles.length; i++) {
			    	if (typeof styles[i].href === 'string') {
				        href = styles[i].href.split("/");
				        href = href[href.length - 1];
				
				        if (href === styleName) {
				            styles[i].disabled = disabled;
				            break;
				        }
				    }
			    }
			};

			// Hide OH-menus, to show map in fullscreen
			var hideOH = function(){
				$('header').css('display', 'none');
				$('#mapContent').height(window.innerHeight);
				$('#mapContent').width(window.innerWidth);
				$('body').css('overflow', 'hidden');
				//$('#mapContent').css('position', 'absolute');
				//$('#mapContent').css('left', 0);
				//$('#mapContent').css('top', 0);
				
				disableStyle('global.css', true);
				disableStyle('header.css', true);
				disableStyle('layout.css', true);
				disableStyle('modules.css', true);
				disableStyle('interface.css', true);
				disableStyle('footer.css', true);
				disableStyle('openhierarchy.css', true);
				
			};
			
			var options = {
				gui : {
					map : {
						renderTo: 'mapContent'
					},
					toolbar : {},
					zoomTools : {},
					layers : {
						type: 'advanced'
					},
					baseLayers : {},
					searchFastighet : {},
					showCoordinate: {renderTo: 'showcoordinate'},
	    			searchCoordinate: {renderTo: 'searchcoordinate'},
					scalebar: {}
				},
				OpenEMap: {
					// Base path to be used for mapfish print servlet requests
				    basePathMapFish: '/mapfishprint-2.1.1/pdf', 
				    // Base path to be used for all AJAX requests against search-lm REST API
				    basePathLM: '/search/lm/', 
				    // name of user to be used when calling search-lm REST API
				    lmUser: 'sundsvall', 
				    // Base path to be used for all AJAX requests against Elasticsearch REST API
				    basePathES: '/search/es/',
				    // Base path to images  
					basePathImages: '<xsl:value-of select="/Document/requestinfo/contextpath" />/static/f/<xsl:value-of select="/Document/module/sectionID" />/<xsl:value-of select="/Document/module/moduleID" />/OpenEMap/resources/images/',
				    // URL/paths related to WMS usage / advanced layer list
				    wmsURLs: { 
				    	// URL to be used to fetch WMS capabilities etc. for add layer
				        basePath: '<xsl:value-of select="wmsServer" />', 
				        // URL to be used when WMS layer has been added to config
				        url: '<xsl:value-of select="gisServer" /><xsl:value-of select="wmsServer" />', 
				        // URL to getcapabilities document. Must include request parameter (eg. https://extmap.sundsvall.se/geoserver/wms?request=GetCapabilities)
				        getCapabilities: '<xsl:value-of select="gisServer" /><xsl:value-of select="wmsGetCapabilities" />' 
				    },
				    //Base path to proxy to be used for WFS-post
				    basePathProxy: '<xsl:value-of select="adminproxy" />?url=', 
				    // WS paths to be used for AJAX requests
				    wsUrls: { 
				    	//basepath to Open eMap Admin
						basePath: '<xsl:value-of select="/Document/requestinfo/contextpath" />',
						// relative path to configs, set in admin of modules in OpenHierarchy
				        configs:    	'/configs',  
				        // relative path to adminconfigs, set in admin of modules in OpenHierarchy
				        adminconfigs: 	'/adminconfigs',  
				        // path to permalinks
				        permalinks:     '<xsl:value-of select="permalinkService" />',
				        // path to metadata services
				        metadata:   	'<xsl:value-of select="metadata" />', 
				        metadata_abstract: '<xsl:value-of select="metadataAbstract" />'
				    },
					username: '<xsl:value-of select="usr" />'
				}
			};
			
			var waitUntilOpenEMapIsDefined = function() {
			   	if (typeof initOpenEMap !== "undefined") {
					try {
						initOpenEMap(null, options, hideOH);
					} catch(msg) {
						alert(msg);
					}
			    } else {
			    	setTimeout(function() {waitUntilOpenEMapIsDefined();}, 5);
			    }
		    };
		    
		    waitUntilOpenEMapIsDefined();
    
		</script>
		<div id="mapContent" style="position: absolute; left: 0; right: 0; width: 100%; height: 100%;"></div>
		<div id="showcoordinate" style="position: absolute; bottom: 0px; left: 10px;" ></div>
		<div id="searchcoordinate" style="position: absolute; left: 150px; bottom: 0px;" ></div>
	</xsl:template>
</xsl:stylesheet>