<?xml version="1.0" encoding="ISO-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	
	<xsl:template match="Document">
	
	<script type="text/javascript">
		var appPath = '<xsl:value-of select="/Document/requestinfo/contextpath" />';
		var gisServer = '<xsl:value-of select="gisServer" />';
		var wmsServer = gisServer + '<xsl:value-of select="wmsServer" />';
		var wmsGetCapabilities = gisServer + '<xsl:value-of select="wmsGetCapabilities" />';
		var wfsServer = gisServer + '<xsl:value-of select="wfsServer" />';
		var wmtsServer = gisServer + '<xsl:value-of select="wmtsServer" />';
		var proxyUrl = window.location.protocol + '//' + window.location.host + '<xsl:value-of select="/Document/requestinfo/contextpath" />/<xsl:value-of select="adminproxy" />';
		if (proxyUrl !== ''){
			proxyUrl += '?url=';
			wmsGetCapabilities = proxyUrl + wmsGetCapabilities;
		}
		var imageBasePath = '<xsl:value-of select="/Document/requestinfo/contextpath" />/static/f/<xsl:value-of select="/Document/module/sectionID" />/<xsl:value-of select="/Document/module/moduleID" />/OpenEMap-Admin/';
	</script>

   	<script type="text/javascript">
	var run = function() {
	   	initOpenEMapAdmin();
	};

	var waitUntilOpenEMapIsDefined = function(callback) {
	   	if (typeof initOpenEMapAdmin !== "undefined") {
	   		callback();
	    } else {
	    	setTimeout(function() {waitUntilOpenEMapIsDefined(callback);}, 5);
	    }
    };
    
//    waitUntilOpenEMapIsDefined(run);
    
    </script>
		<div id="content">
			<div id="contentitem"
				style="position: absolute; left: 0; right: 0;">
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>