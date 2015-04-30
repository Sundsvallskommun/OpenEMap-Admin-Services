<?xml version="1.0" encoding="ISO-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	
	<xsl:template match="Document">
			<link rel="stylesheet" type="text/css" href="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/lib/ext/resources/css/ext-all-neptune.css" />
			<link rel="stylesheet" type="text/css" href="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/oeadmin.css" />
			<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/lib/ext/ext-debug.js"></script>
			<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/lib/ext/ext-theme-neptune.js"></script>
    		<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/lib/ext/locale/ext-lang-sv_SE.js"></script>
    		<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/lib/OpenLayers/OpenLayers.debug.js"></script>
    		<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/lib/geoext/geoext-debug.js"></script>
    		<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap/OpenEMap-debug.js"></script>
    		<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin/OpenEMap-Admin-debug.js"></script>
    		
		<script type="text/javascript">
		setTimeout(2000, function(){
			$(document).ready(function(){
						AdmClient.app.admClient.setHeight(window.innerHeight - 70);
						AdmClient.app.admClient.setWidth(window.innerWidth);
			});
					
			$(window).resize(function() {
  						AdmClient.app.admClient.setHeight(window.innerHeight - 70);
  						AdmClient.app.admClient.setWidth(window.innerWidth);
					});
			});
				
		</script>
		<div id="content">
			<div id="contentitem"
				style="position: absolute; left: 0; right: 0;">
			</div>
		</div>
<!-- 		<script type="text/javascript">
					var gisServer = '<xsl:value-of select="gisServer" />';
					var wmsServer = gisServer + '<xsl:value-of select="wmsServer" />';
					var wmsGetCapabilities = gisServer + '<xsl:value-of select="wmsGetCapabilities" />';
					var wfsServer = gisServer + '<xsl:value-of select="wfsServer" />';
					var wmtsServer = gisServer + '<xsl:value-of select="wmtsServer" />';
					var adminproxy = window.location.protocol + '//' + window.location.host + '<xsl:value-of select="/Document/requestinfo/contextpath" />/<xsl:value-of select="adminproxy" />';
					if (adminproxy !== ''){
						adminproxy += '?url=';
						wmsGetCapabilities = adminproxy + wmsGetCapabilities;
					}
		</script>
			
		<script type="text/javascript">
		var adm = initOpenEMapAdmin();
		</script>
		<div id="content">
			<div id="contentitem"
				style="position: absolute; left: 0; right: 0;">
			</div>
		</div>
-->
	</xsl:template>
</xsl:stylesheet>