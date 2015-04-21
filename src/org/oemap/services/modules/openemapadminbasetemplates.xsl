<?xml version="1.0" encoding="ISO-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	
	<xsl:template match="Document">
	
	<xsl:variable name="scripts">
	/OpenEMap-Admin/OpenEMapAdmin.js
	</xsl:variable>	

	<script type="text/javascript">
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
    
    waitUntilOpenEMapIsDefined(run);
    
    </script>
		<div id="content">
			<div id="contentitem"
				style="position: absolute; left: 0; right: 0;">
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>