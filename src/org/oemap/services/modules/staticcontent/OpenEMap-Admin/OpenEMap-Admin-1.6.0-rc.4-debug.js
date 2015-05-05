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
* The mapconfiguration view.
*/

Ext.define('AdmClient.view.MapConfiguration', {
	extend :  Ext.panel.Panel ,
	                                  
	alias : 'widget.mapConfiguration',
	layout : 'border',
	border : false,

	initComponent : function() {
		this.items = [ {
			border : false,
			bodyPadding : 10,
			region : 'north',
			tbar : [ {
				xtype : 'combo',
				itemId : 'configurations',
				displayField: 'name',
				enableKeyEvents : true
			}, {
				text : 'Spara',
				itemId : 'saveConfiguration'
			} ]
		}, {
			xtype : 'tabpanel',
			region : 'center',
			items : [ {
				title : 'Map extent',
				layout : 'fit',
				border : false,
				itemId : 'mapPanel',
				disabled : true,
				tbar : [ {
					xtype : 'button',
					text : 'Pan',
					itemId : 'pan',
					icon : 'resources/images/arrow-move.png',
					enableToggle : true,
					pressed : true

				}, {
					xtype : 'button',
					itemId : 'markExtent',
					text : 'Mark extent',
					icon : 'resources/images/figur-R.png',
					iconCls : 'extent',
					enableToggle : true
				},('->'),{
					xtype : 'textfield',
					disabled : true,
					itemId : 'configId'
				},{
					xtype: 'checkbox',
					fieldLabel : 'Autoclear draw layer',
					itemId : 'autoClearDrawLayer'
						},{
					xtype : 'textfield',
					itemId : 'attribution',
					enableKeyEvents : true,
					fieldLabel : 'Attribution'
				} ],
				margin : 12
			}, {
				title : 'Tools',
				layout : 'border',
				border : false,
				itemId : 'tools',
				disabled : true,
				margin : 12,
				items : [ {
					xtype : 'toolsGrid',
					itemId : 'toolsGrid',
					region : 'north'
				}, {
					xtype : 'panel',
					region : 'center',
					itemId : 'toolGeneral'
				} ]
			}, {
				title : 'Search',
				xtype : 'searchPanel',
				itemId : 'searchGridConfig',
				layout : 'fit',
				disabled : true
			}, {
				title : 'Layers',
				xtype : 'layerPanel',
				itemId: 'layerTab',
				disabled : true
			}, {
				title: 'Preview',
				itemId: 'previewMap',
				layout: 'fit',
				disabled : true,
				hidden: true
			}]
		}, {
			title : 'Config',
			itemId : 'configurationPreviewPanel',
			layout : 'fit',
			disabled : true,
			collapsible : true,
			collapsed : true,
			height : 600,
			region : 'south',
			items : [{xtype : 'textarea', itemId : 'configurationTextfield'}],
			bbar : ['->', {
				xtype : 'button',
				text : 'Export'
			}]
		} ];

		this.callParent(arguments);

	}
});

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
* The main page that sets up the UI.
*/

Ext.define('AdmClient.view.Main', {
	extend :  Ext.panel.Panel ,
	                                              
	alias : 'widget.main',

	title : 'RIGES Administration',
	layout : 'border',
	border : false,
	header : false,
	bodyPadding : 3,
	renderTo: 'contentitem',
	region : 'center',

	initComponent : function() {
		this.items = [ {
			xtype : 'tabpanel',
			tabPosition : 'left',
//			height : 800,
			region : 'center',
			items : [{
				layout : 'border',
				margin : 8,
				title : 'Map configuration',
				items : [ {
					xtype : 'mapConfiguration',
					region : 'center'
				} ]
			}]
		}, 
		{
			xtype : 'mainToolbar',
			region : 'north',
			style : {
				marginBottom : '20px'
			}
		} 
		],
		this.callParent(arguments);
	}
});

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
* A controller to handle main view.
*/

Ext.define('AdmClient.controller.Main', {
    extend:  Ext.app.Controller ,
                                      
    views: ['Main', 'MapConfiguration'],
    
    refs: [{
      ref: 'form',
        selector: 'form'
    },{
        ref: 'currentZoom',
        selector: '#currentZoom'
    },{
    	ref : 'center',
    	selector : '#center'
    }
    ],
    
    init: function() {
        this.control({
            '#mapPanel' : {
            	aftermapmove : this.onMapMove
            },
            
            '#currentZoom' : {
            	keyup : this.onZoomKeyUp
            }
        });
    },
    
    onZoomKeyUp : function(evt, e){
    	var self = this;
    	var zoom = parseInt(evt.value, 10);
    	if ( (zoom > 0)  && (zoom < 20) && (e.keyCode === e.ENTER)){
    		self.map.setCenter(self.map.center, zoom);
    	}
    },
    
    setZoom : function(zoom){
    	
    }
});

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
* A controller to handle main toolbar.
*/


Ext.define('AdmClient.controller.MainToolbar', {
	extend :  Ext.app.Controller ,
	init : function() {
		this.control({
			'#about' : {
				click : this.aboutButtonClick
			}
		});
	},
	
	aboutButtonClick : function(btn, evt) {
		new AdmClient.view.about.About().show();
	}
});

Ext.define('AdmClient.view.mapconfiguration.layer.LayerDetails', {
	extend :  Ext.window.Window ,
	alias : 'widget.layerDetails',

	           
		                    
		                    
		                                        
		                                        
		                            
	  
	layout: {
		type : 'border',
		margin : 8
	},
	title : 'Lager inst&auml;llningar',
	width : 600,
	height : 400,
	defaultAlign: 'c',

	constructor : function(){
		this.layer = arguments[0].selectedLayer;
		this.panelGrid = arguments[0].grid;

		if (this.layer === null){
			Ext.Msg.show({
				title: 'Inget lagernamn.',
				msg: 'Kan ej editera grupplager.',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.WARNING
			});
			this.close();
			return;
		}

		this.title +=  ' - ' + this.layer.name;

		this.callParent(arguments);
	},

	getAttributeCollection: function(attributes){
		var items = [];
		for (var key in attributes){
				var item = [key, '', false];
				items.push(item);
		}
		return items;
	},

	getItem: function(item){
		item.forEach(function(row){
			console.log(row);
		});
	},

	initComponent : function() {

		var self = this;
		this.modal = true;
		
		if (this.layer.wfs){
			var getTypeName = function(layer) {
				if (layer.wfs.featurePrefix && layer.wfs.featureType) {
					return layer.wfs.featurePrefix + ':' + layer.wfs.featureType;
				} else if (layer.name) {
					return layer.name;
				} else {
					Ext.Error.raise({
		                msg: 'No valid layer name for WFS-layer',
		                option: this
		            });
				}
					
			};
			
			var wfsUrl = proxyUrl + wfsServer + '?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=' + getTypeName(this.layer);
			this.store = Ext.create('GeoExt.data.AttributeStore');
			var proxy = this.store.getProxy();
//			Ext.apply(proxy.proxyConfig, {headers: {"Content-Type": "application/xml; charset=UTF-8"}});
			this.store.setUrl(wfsUrl);
			this.store.load();
		}
		else if (this.layer.wms){
			var pathArray = this.layer.wms.url.split('/');

			this.store = Ext.create('Ext.data.ArrayStore', {fields: [
				{name: 'name'},
                {name: 'alias'},
                {name: 'visible', type: 'boolean', defaultValue: true}
                ]
            });

			this.wmsStore = Ext.create('GeoExt.data.WmsCapabilitiesLayerStore',{
				url: wmsGetCapabilities
			});

			
			
			this.wmsStore.load({
                scope: this,
                callback: function(records, operation, success) {
        			var getLayerName = function(layer) {
        				if (layer.wms.params && layer.wms.params.LAYERS) {
        					return layer.wms.params.LAYERS;
        				} else if (layer.name) {
        					return layer.name;
        				} else {
        					Ext.Error.raise({
        		                msg: 'No valid layer name for WMS-layer',
        		                option: this
        		            });
        					return undefined;
        				}
        			};
                	var layerName = getLayerName(this.layer);
                    if(layerName && records && records.length > 0) {
                    	records = records.filter(function(record){
                    		return record.get('name') === layerName;
                    	});
                        
                        if (records.length > 0) {
	                        records.forEach(function(record) {
                            	var boundaryBox = record.get('bbox');
								var success = function(){
									if (arguments[0].responseXML) {
										var format = new OpenLayers.Format.GML();
										var feature = format.read(arguments[0].responseXML);
										var fields = this.getAttributeCollection(feature[0].attributes);
										
	
										if (this.layer.metadata && this.layer.metadata.attributes && this.layer.metadata.attributes instanceof Object) {
											var attributesInLayer = this.layer.metadata.attributes;
											var fieldsFilter = function(f){
												return f[0] === attribute;
											};
											for (var attribute in attributesInLayer){
												var item = fields.filter(fieldsFilter, f);
												if (item.length > 0) {
													item[0][1] = item[0][1] === '' ? attributesInLayer[attribute].alias : item[0][1];
													item[0][2] = true;
												}
											}
										}
										this.store.loadData(fields);
									} else {
										this.close();
										Ext.Error.raise({
											title: 'Kommunikationsproblem',
											msg: 'Kan inte hämta information om lagret'
										});
									}
								};

                            	for (var srsName in boundaryBox){
                            		var boundary = boundaryBox[srsName].bbox;
                            		var extent = new OpenLayers.Bounds.fromArray(boundary);

                            		var requestUrl = proxyUrl + wmsServer + '?' + 'request=GetFeatureInfo&service=WMS&version=1.1.1&layers=' + layerName + '&styles=&srs=' + srsName + '&bbox=' + extent.toString() + 
                            		 	'&width=1&height=1&query_layers=' + layerName + '&info_format=application/vnd.ogc.gml&feature_count=1&x=0&y=0';
                            		Ext.Ajax.request({
                            		 	scope: this,
                            		 	url: requestUrl,
                            		 	success: success
                            		});
                            	}
	                        }, this);
	                    } else {
	                    	Ext.Error.raise({
	                            msg: 'Cant get metadata for layer' + layerName,
	                            option: this
	                        });	            
	                    }
                    } else {
                    	Ext.Error.raise({
                            msg: 'Cant get metadata for layer' + layerName,
                            option: this
                        });	            
                    }
                }
            });
		}
		if (this.store){
			this.store.addListener('load', function(store, records, successful, eOpts){
				if (successful) {
					records.forEach(function(l){
						if (self.layer.metadata && self.layer.metadata.attributes && self.layer.metadata.attributes[l.data.name] instanceof Object){
							l.data.alias = self.layer.metadata.attributes[l.data.name].alias;
							l.data.visible = true;
						}
					});
					store.update();
				} else {
                	Ext.Error.raise({
                        msg: 'Cant get metadata for layer',
                        option: this
                    });	            
				}
			});
		}

		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 1
		});

		this.items = [{
			region: 'center',
			xtype: 'grid',
			itemId: 'layerDetailsGrid',
			store: this.store || undefined,

			plugins : [ this.cellEditing ],
			columns: [{
				header: 'Kolumn',
				dataIndex : 'name'
			},{
				header: 'Alias',
				dataIndex: 'alias',
				editor : {
					allowBlank : false
				}
			},{
				header: 'Synlig',
				xtype: 'checkcolumn',
				dataIndex: 'visible',
				listeners :{
					'checkchange': function(chkBox, rowIdx, checked, eOpts){
						if (checked){
							self.store.data.items[rowIdx].data.alias = self.store.data.items[rowIdx].data.alias || self.store.data.items[rowIdx].data.name;
						}else{
							self.store.data.items[rowIdx].data.alias = '';
						}
						self.store.update();
					}
				}
			}]
		},{
			region: 'south',
			xtype : 'toolbar',
			items : [
			'->',{
				xtype: 'button',
				text: 'Spara',
				itemId: 'saveLayerDetail'
			},{
				xtype : 'button',
				text : 'Avbryt',
				itemId: 'cancelLayerDetail',
				handler: function(){
					self.close();
				}
			}
			]
		}],
		this.callParent(arguments);
	}
});
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
* A model that represents a layer.
*/

Ext.define('AdmClient.model.Layer', {
    extend :  Ext.data.Model ,
    fields : [ 
    	'layerId', 
    	{name: 'name', defaultValue: ''}, 
    	{name: 'wms', defaultValue: null}, 
    	'group', 
    	'metadata',
    	'isSearchable',
    	'urlToMetadata',
    	'serverId',
        {name: 'queryable', type: 'boolean', defaultValue: false},
    	{name: 'clickable', type: 'boolean', defaultValue: false},
    	{name: 'isGroupLayer', type: 'boolean', defaultValue: false},
    	{name: 'isBaseLayer', mapping: 'wms.options.isBaseLayer',  type : 'boolean'},
        {name: 'visibility', mapping: 'wms.options.visibility', type: 'boolean'},
        {name: 'wfs', mapping: 'wfs', type: 'object', defaultValue: null},
    	{name: 'layer', type: 'object'}, // OpenLayers reference
        {name: 'layers', type: 'array', defaultValue: null}
    ],
    proxy: {
        type: 'rest',
        url: '/openemapadmin/layers'
    }
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Layer panel
 *
 * In this view an administrator can organaize the layers by dragging and dropping layers
 * from a WMS server to a configuration. The administrator can create group layers and populating
 * the groups either from the configuration or from the remote WMS server.
 *
 *{@img layers.png}
 */
Ext.define('AdmClient.view.mapconfiguration.layer.LayerPanel', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.layerPanel',

	           
		                  
		                 
		                                        
		                     
		                                   
		                                                    
	  

	layout : {
        type : 'hbox',
        align : 'stretch'
    },

	initComponent : function() {

		this.items = [
			{
				xtype: 'panel',
				flex: 1,
				padding: 5,
				autoScroll: true,
				items: [
					{
						xtype : 'textfield',
						itemId: 'layerServiceSelector',
						fieldLabel : 'WMS server',
						height : 30,
		            	width: 500,
						enableKeyEvents : true,
						value: typeof wmsGetCapabilities !== 'undefined' ? wmsGetCapabilities : ''
					},
					{
			            xtype : 'treepanel',
			            itemId: 'mapConfigWMSLayerTree',
			            minHeight : 300,
			            hideHeaders : true,
			            viewConfig: {
					         plugins: {
					            ptype: 'treeviewdragdrop',
					            enableDrop: false
					        },
					        copy: true
					    },
			            store : Ext.create('AdmClient.store.WmsCapabilitiesLayerTree'),
			            displayField: 'name'
			        }
				]
			},
			{			
				xtype: 'treepanel',
				id: 'mapConfigLayerTree',
				padding: '33 5 5 5',
				flex: 1,
				viewConfig: {
			        plugins: {
		                ptype: 'treeviewdragdrop'
		            }
			    },
			    store: Ext.create('AdmClient.store.GroupedLayerTree', {
		            root: {
		                name: 'Lager',
		                expanded: true
		            }
		        }),
		        displayField: 'name',
		        hideHeaders: false,
		        tbar : [{
		        	text : 'Nytt grupplager',
		        	itemId : 'newGroupLayer',
		        	icon : imageBasePath + 'resources/font-awesome/black/png/16/plus.png'
		    	}],
		        columns: [
		            {
		                xtype: 'treecolumn',
		                flex: 1,
		                dataIndex: 'name',
		                text : 'Lagernamn'
		            },
		            {
		                xtype: 'actioncolumn',
		                width: 70,
		                text: '&Auml;ndra <br /> lagernamn',
		                align: 'center',
		                icon: imageBasePath + 'resources/font-awesome/black/png/16/pencil.png',
		                tooltip: '&Auml;ndra namn',
		                handler: function(grid, rowIndex, colIndex) {
		                	var node = grid.getStore().getAt(rowIndex);
		                	Ext.Msg.prompt('Name', 'Nytt lagernamn:', function(btn, text){
    							if (btn == 'ok'){
        							node.set('name', text.trim());
        							node.store.save();
    							}
							});
						}
		            },
		            {
		                xtype: 'checkcolumn',
		                tooltip: 'Baslager',
		                text: 'Baslager',
		                width: 70,
		               	dataIndex: 'isBaseLayer',
		               	renderer: function(value, meta){
		                	if ((meta.record.get('isGroupLayer')) || (meta.record.get('id') === 'root')){
		                		return '<span></span>';
		                	}
		                	return Ext.grid.column.CheckColumn.prototype.renderer.apply(this, arguments);
		                }
		            },
		            {
		                xtype: 'checkcolumn',
		                width: 70,
		                tooltip: 'Synlig',
		                text: 'Synlig',
		                dataIndex: 'visibility',
		                renderer: function(value, meta){
		                	if ((meta.record.get('isGroupLayer')) || (meta.record.get('id') === 'root')){
		                		return '<span></span>';
		                	}
		                	return Ext.grid.column.CheckColumn.prototype.renderer.apply(this, arguments);
		                }
		            },
		            {
		                xtype: 'checkcolumn',
		                width: 70,
		                tooltip: 'Klickbart lager',
		                text: 'Klickbar',
		                dataIndex: 'clickable',
		                renderer: function(value, meta){
		                	if ((meta.record.get('isGroupLayer')) || (meta.record.get('id') === 'root')){
		                		return '<span></span>';
		                	}

		                	if (!meta.record.get('queryable')){
		                		return '<span></span>';
		                	}

		                	if (meta.record.get('clickable')){
		                		return Ext.grid.column.CheckColumn.prototype.renderer.apply(this, arguments);
		                	}
		                	return Ext.grid.column.CheckColumn.prototype.renderer.apply(this, arguments);
		                }
		            },
		            {
		                xtype: 'actioncolumn',
		                width: 70,
		                text: 'Ta bort',
		                align: 'center',
		                icon: imageBasePath + 'resources/font-awesome/black/png/16/times.png',
		                tooltip: 'Ta bort',
		                handler: function(grid, rowIndex, colIndex) {
		                	var node = grid.getStore().getAt(rowIndex);
		                	// Remove childs
		                	for (var i = 0; i < node.childNodes.length; i++) {
		                		node.removeChild(node.childNodes[i]);
		                	}
						    node.remove();
						}
		            },{
		            	xtype: 'actioncolumn',
		            	width: 70,
		            	tooltip: 'Alias kolumner, s&ouml;kbart etc',
		            	align: 'center',
		            	text: 'Inst&auml;llningar',
		            	isDisabled: function(view, ri, ci, item, record){
		            		return record.data.isGroupLayer;
		            	},
		            	//icon: imageBasePath + 'resources/font-awesome/black/png/16/table.png',
		            	renderer:function(value, meta){
		            		if (!meta.record.get('queryable')){
		            			return '<span></span>';
		            		}
		            		return '<img role="button" class="x-action-col-icon x-action-col-0" src="' + imageBasePath + 'resources/font-awesome/black/png/16/table.png" />';
		            	},
		            	handler : function(grid, rowIdex, colIndex){
		            		var selectedLayer = null;
		            		if (grid.getStore().data.items[rowIdex].childNodes.length === 0){
		            				selectedLayer = grid.getStore().data.items[rowIdex].data;
		            		}
		            		Ext.Error.handle = function(error) {
								Ext.Msg.show({
									title: error.title || 'Fel',
									msg: error.msg || 'Odefinierat fel',
									buttons: Ext.Msg.OK,
									icon: Ext.Msg.WARNING
								});
								// TODO - close window
		            		};
		            		Ext.create('AdmClient.view.mapconfiguration.layer.LayerDetails',{
		            			selectedLayer : selectedLayer, grid: grid
		            		}).show();
		            	}
		            }
	        	]
			}
		];
		this.callParent(arguments);
	}
});

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
* A controller to handle main MapConfiguration view.
*/

Ext.define('AdmClient.controller.MapConfiguration', {
	extend :  Ext.app.Controller ,
	                             
	                                             
	                                                               
	refs : [{
		ref	: 'configurations',
		selector : '#configurations'
	},{
		ref : 'attribution',
		selector : '#attribution'
	},{
		ref : 'configurationTextfield',
		selector : '#configurationTextfield'
	},{
		ref : 'toolsTab',
		selector : '#tools'
	},{
		ref : 'mapPanel',
		selector : '#mapPanel'
	},{
		ref : 'searchGrid',
		selector : '#searchGridConfig'
	},{
		ref : 'layerTab',
		selector : '#layerTab'
	},{
		ref : 'previewMap',
		selector : '#previewMap'
	},{
		ref : 'configurationPreview',
		selector: '#configurationPreviewPanel'
	}, {
		ref : 'autoClearDrawLayer',
		selector : '#autoClearDrawLayer'
	},{
		ref : 'configurationPreviewPanel',
		selector : '#configurationPreviewPanel'
	}
	],
	
	init : function() {
		this.control({
			'#pan' : {
				click : this.panMap
			},
			'#markExtent' : {
				click : this.markExtent
			},
			'#mapPanel' : {
				render : this.mapPanelRender
			},
			'#saveConfiguration' : {
				click : this.saveConfiguration
			},
			'#configurations' : {
				keyup : this.setConfigurationName,
				render : this.renderConfiguration,
				select : this.selectConfiguration
			},
			'#configurationPreviewPanel' : {
				hide : this.configurationPreviewPanelHide,
				expand : this.configurationPreviewPanelShow,
				beforeshow : this.configurationPreviewPanelBeforeShow
			},
			'#attribution' : {
				keyup : this.setAttribution
			},
			'#autoClearDrawLayer' : {
				change : this.autoClearDrawLayerChanged
			}
		});

		this.application.on({
			configuration_change: this.changeConfiguration,
			scope: this
		});
	},

	panMap : function(btn) {
		var markExtentButton = Ext.ComponentQuery.query('#markExtent')[0];
		markExtentButton.toggle();

		var drawRectangleTool = this.mapClient.map.controls.filter(function(t) {
			return t instanceof OpenLayers.Control.DrawFeature;
		})[0];
		
		if (drawRectangleTool && drawRectangleTool.active) {
			drawRectangleTool.deactivate();
		}
	},

	markExtent : function(btn) {
		var panButton = Ext.ComponentQuery.query('#pan')[0];
		panButton.toggle();

		var drawRectangleTool = this.mapClient.map.controls.filter(function(t) {
			return t instanceof OpenLayers.Control.DrawFeature;
		})[0];
		
		if (drawRectangleTool) {
			drawRectangleTool.activate();
		}
	},
	
	mapClient : null,
	mapPanelRender : function(panel) {
		this.mapClient = Ext.create('OpenEMap.Client');
		
		Ext.Ajax.request({
			scope : this,
			url : 'admin.json',
			success : function(response) {
				var config = Ext.decode(response.responseText);
				
				AdmClient.app.config = Ext.applyIf(AdmClient.app.config, config);
				var gui = {
					map : {},
					zoomTools : {}
				};
				if (this.mapClient){
					this.mapClient.destroy();
				}
				this.mapClient.configure(Ext.clone(config), {
					gui : gui
				});

				panel.add(this.mapClient.gui.container);
				panel.doLayout();

				var drawRectangelTool = new OpenLayers.Control.DrawFeature(
						this.mapClient.mapPanel.drawLayer,
						OpenLayers.Handler.RegularPolygon, {
							handlerOptions : {
								sides : 4,
								irregular : true
							}
						});
				this.mapClient.map.addControl(drawRectangelTool);
				
				this.mapClient.drawLayer.events.register('featureadded', null, function(){
					AdmClient.app.config.extent = arguments[0].feature.geometry.getBounds().toArray();
				});
			}
		});
	},
	
	saveConfiguration : function(){
		var self = this;
		if (AdmClient.app.config.name === 'Default'){
			Ext.MessageBox.alert('"Default" is an invalid configuration name.', 'You are trying to write to a write protected template. Choose another template name');
			return;
		}
		// Update config.layers
        var s = Ext.getStore('configurationTreeStore');
        AdmClient.app.config.layers = s.getLayerConfiguration();
		
		AdmClient.app.config.isPublic = true;
		var url = appPath + '/adminconfigs/config';
		url += AdmClient.app.config.configId === undefined ? '' : ('/' + AdmClient.app.config.configId);
		var method = AdmClient.app.config.configId === undefined ? 'POST' : 'PUT';
		Ext.Ajax.request({
			url : url,
			method : method,
			jsonData : AdmClient.app.config,
			success : function(evt){
				Ext.MessageBox.alert('Save', 'Configuration saved');
				self.renderConfiguration();
			},
			failure : function(evt){
				Ext.MessageBox.alert('Error', 'Error saving: ' + evt.message);
			}
			
		});
	},
	
	setConfigurationName : function(combo, e, eOpts){
		AdmClient.app.config.name = combo.getValue();
		AdmClient.app.config.configId = undefined;
		this.getConfigId().setValue(AdmClient.app.config.configId || '');
		this.setConfigText();
	},
	
	
	renderConfiguration : function(){
		var self = this;
		Ext.Ajax.request({
			url : appPath + '/configs',
			method : 'GET',
			success : function(evt){
				var configs = JSON.parse(evt.responseText);
				var configurations = Ext.create('Ext.data.Store',{
					fields : ['name', 'configId'],
					data :  configs
				});
				var combo = self.getConfigurations();
				combo.store = configurations;
				combo.queryMode = 'local';
				combo.displayField = 'name';
				combo.valueField = 'configId';
			},
			error : function(evt){
				Ext.MessageBox.alert('Erro', 'Error getting configurations: ' + evt.message);
			}
		});
	},

	selectConfiguration : function(combo, records){
		if(records.length > 0) {
			this.loadConfiguration(	records[0].get('configId'));
		}
	},

	changeConfiguration: function(config) {
		AdmClient.app.config = Ext.apply(AdmClient.app.config,config);
		this.getAttribution().setValue(AdmClient.app.config.attribution);
		this.getToolsTab().setDisabled(false);
		this.getMapPanel().setDisabled(false);
		this.getSearchGrid().setDisabled(false);
		this.getPreviewMap().setDisabled(false);
		if (this.getPreviewMap().isVisible()) {
    		AdmClient.app.getPreviewMapController().previewRender(this.getPreviewMap());
		}
		this.getLayerTab().setDisabled(false);
		this.getConfigurationPreview().setDisabled(false);
		this.getAutoClearDrawLayer().setValue(AdmClient.app.config.autoClearDrawLayer || false); 
		
		if (AdmClient.app.config.extent){
			var bounds = OpenLayers.Bounds.fromArray(AdmClient.app.config.extent);
			this.mapClient.map.zoomToExtent(bounds);
		}
		var configTitle = 'Config - ' + AdmClient.app.config.name + ' (' + AdmClient.app.config.configId.toString() + ')';
		//this.getConfigurationPreviewPanel().setTitle(configTitle);
	},

	loadConfiguration: function(id) {
		Ext.Ajax.request({
			url : appPath + '/configs/config/' + id,
			method : 'GET',
			success : function(evt){
				var config = JSON.parse(evt.responseText);
				this.application.fireEvent('configuration_change', config);
			},
			error : function(evt){
				Ext.MessageBox.alert('Erro', 'Error getting configuration: ' + id + ', ' + evt.message);
			},
			scope: this
		});
	},
	

	
	configurationPreviewPanelShow : function(panel, eOpts){
		 this.setConfigText();
	},
	
	setConfigText : function(){
		var conf = JSON.stringify(AdmClient.app.config, null, ' ');
		var configTextArea = this.getConfigurationTextfield();
		configTextArea.setValue(conf);
	},
	
	setAttribution : function(){
		AdmClient.app.config.attribution = this.getAttribution().getValue();
		this.setConfigText();
	},
	
	autoClearDrawLayerChanged : function(box, newValue, oldValue, eOpts){
		AdmClient.app.config.autoClearDrawLayer = newValue;
	}
});

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
* A controller to handle servers view.
*/

Ext.define('AdmClient.controller.Servers', {
	extend :  Ext.app.Controller ,
	init : function() {
		this.control({

			'#addSettingsRow' : {
				click : this.settingsGridAdd
			},
			'#saveSettings' : {
				click : this.save
			}
		});
	},

	serversGridEdit : function(editor, e) {
	},

	searchGridEdit : function(editor, e) {
	},

	settingsGridAdd : function(btn, e) {
		var query = 'button[id=' + btn.id + '] ^ grid'; // something like ('button[id=button-1049] ^ grid')
		var grids = Ext.ComponentQuery.query(query);
		if (grids && grids instanceof Array) {
			var grid = grids[0];
			grid.getStore().add({});
		}
	},
	
	save: function(btn, e){
		var grid = Ext.ComponentQuery.query('button[id=' + btn.getId() +'] ^ grid')[0];
		if (grid){
			var store = grid.getStore();
			store.sync({callback : function(){
				grid.getStore().load();
			}});
			grid.getStore().commitChanges();
			
		}
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Identify configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.Identify', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.identify',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'Identify'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Identify configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.Popup', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.popup',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'Popup'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Draw geometry configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.DrawGeometry', {
	extend :  Ext.panel.Panel ,

	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'draw geometry'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Print configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.Print', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.print',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'Print'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Delete geometry configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.DeleteGeometry', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.deletegeometry',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'DeleteGeometry'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Modify geometry configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.ModifyGeometry', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.modifygeometry',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'ModifyGeometry'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Measure line configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.MeasureLine', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.measureline',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'MeasureLine'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Draw object configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.DrawObject', {
	extend :  Ext.form.Panel ,
	alias : 'widget.drawobject',
	
	type: 'drawobject',
	
	typeLabel: 'Type',
    widthLabel: 'Width',
    lengthLabel: 'Length',
    m1Label: 'M1',
    m2Label: 'M2',
    angleLabel: 'Angle',
    
	initComponent : function() {
	    
	    var formItems = [{
            xtype: 'numberfield',
            fieldLabel: this.widthLabel,
            itemId: 'w',
            minValue: 0
        },{
            xtype: 'numberfield',
            fieldLabel: this.lengthLabel,
            itemId: 'l',
            minValue: 0
        },{
            xtype: 'numberfield',
            fieldLabel: this.m1Label,
            itemId: 'm1',
            minValue: 0
        },{
            xtype: 'numberfield',
            fieldLabel: this.m2Label,
            itemId: 'm2',
            minValue: 0
        },{
            xtype: 'numberfield',
            itemId: 'angle',
            fieldLabel: this.angleLabel,
            value: 0
        }];
	    
		this.items = [ {
			xtype : 'checkboxfield',
			boxLabel : 'User customizable'
		}, {
		    width: 230,
		    xtype : 'radiogroup',
            vertical : true,
            fieldLabel: 'Type',
            itemId: 'type',
		    items : [ {
                boxLabel : '<div class="objectconfig-radio-r"></div>',
                name : 'rb',
                inputValue : 'R',
                checked : true
            }, {
                boxLabel : '<div class="objectconfig-radio-l"></div>',
                name : 'rb',
                enabled: false,
                inputValue : 'L'
            }, {
                boxLabel : '<div class="objectconfig-radio-d"></div>',
                name : 'rb',
                enabled: false,
                inputValue : 'D'
            }, {
                boxLabel : '<div class="objectconfig-radio-o"></div>',
                name : 'rb',
                enabled: false,
                inputValue : 'O'
            } ]
		} ];
		
		this.items = this.items.concat(formItems);
		
		this.callParent(arguments);
		
		this.getConfig();
	},
	
	setConfig: function() {
	    var toolCfg = this.getToolConfig();
	},
	
	getConfig: function() {
	    var toolCfg = this.getToolConfig();
	    var objectConfig = toolCfg.objectConfig;
	    
	    if (objectConfig) {
	        objectConfig.type = this.down('#type').getValue();
	    }
	},
	
	getToolConfig: function() {
	    return AdmClient.app.config.tools.filter(function(tool) {
	        return (tool.type = this.type);
	    }, this);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Full extent configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.FullExtent', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.fullextent',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'FullExtent'
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * General tool configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.General', {
	extend :  Ext.tab.Panel ,
	                                                                     
	style : {
		marginTop : '20px'
	},

	toolName : null,

	constructor : function() {
		this.tool = arguments[0] || '';
		this.toolName = arguments[1] || '';
		this.callParent(arguments);
	},

	initComponent : function() {
		this.items = [ {

			title : 'Settings for tool ' + this.toolName,

			items : [ {
				title : 'General settings',
				xtype : 'fieldset',
				items : [ {
					xtype : 'textfield',
					fieldLabel : 'Tooltip'
				}, {
					xtype : 'textfield',
					fieldLabel : 'Min scale',
					maskRe : /[0-9]/
				} ]
			}, {
				xtype : 'fieldset',
				title : 'Details settings',
				itemId : 'details'
			} ]
		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Measure area configuration details
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.MeasureArea', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.measurearea',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'MeasureArea'
		} ];
		this.callParent(arguments);
	}
});

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
* A controller to handle main tools grid.
*/


Ext.define('AdmClient.controller.ToolsGrid', {
	extend :  Ext.app.Controller ,
	                                                                                                   
	refs : [{
		ref	: 'configurations',
		selector : '#configurations'
	},{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	},{
		ref : 'toolGeneral',
		selector : '#toolGeneral'
	}],
	init : function() {
		this.control({

			'#toolsGrid' : {
				render : this.gridRender
			},
			'#details' : {
				render : this.detailsRender
			}
		});

		this.application.on({
            configuration_change: this.markTools,
            scope: this
        });
	},

	views : [],
	
	gridRender : function(panel, opts) {
		this.markTools();
	},
	
	markTools : function(){
		var panel = this.getToolsGrid();
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			panel.store.data.items[i].save();
		}
		
		
		// IMPORTANT
		// this needs to rewrite
		for (i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			var toolName = panel.store.data.items[i];
			for (var j = 0; j < AdmClient.app.config.tools.length; j++){
				var configTool = AdmClient.app.config.tools[j];
				if (configTool.id === toolName.data.id) {
					toolname.data.selected = true;
				} 
				toolName.save();
			}
		}
		panel.updateLayout();
	},
	
	toolsHasEmptyObject : function(){
		for (var i = 0; i < AdmClient.app.config.tools.length; i++){
			if (Object.keys(AdmClient.app.config.tools[i]).length > 0){
				return true;
			}
		}
		return false;
	},
	
	// function show details about a tool
	detailsRender : function() {
		var detailsPanel = arguments[0];
		detailsPanel.removeAll(false);
		var toolName = this.getToolsGrid().getSelectionModel().selected.items[0].data.toolName;
		var tool = 'AdmClient.view.mapconfiguration.tools.details.' + toolName;
		var toolPanel = Ext.create(tool);
		detailsPanel.add(toolPanel);
	}
	
});

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
* A model store for det grouped Layers. 
*/

Ext.define('AdmClient.store.Layers', {
    extend:  Ext.data.Store ,
    model: 'AdmClient.model.Layer',
                                         
    proxy: {
        type: 'rest',
        url: '/openemapadmin/layers'
    },
    autoLoad: true
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Configured layers
 */
Ext.define('AdmClient.view.settings.LayersConfigured', {
    extend :  Ext.grid.Panel ,
                                            
    alias : 'widget.layersconfigured',
    title : 'Configured layers',
    store : 'Layers',
    itemId : 'layers',
    autoScroll : true,
    minHeight : 200,
    hideHeaders : true,
    selType : 'cellmodel',
    viewConfig: {
        stripeRows: false
    },
    initComponent : function() {

        
        this.columns = [ {
            dataIndex : "name",
            sortable : false,
            flex : 1
        }, {
            xtype:'actioncolumn',
            width:25,
            itemId: 'settings',
            items: [{
                icon: 'resources/images/gear.png',
                tooltip: 'Settings'
            }]
        }, {
            xtype:'actioncolumn',
            width:25,
            itemId: 'delete',
            items: [{
                icon: 'resources/images/cross.png',
                tooltip: 'Delete'
            }]
        } ];

        this.callParent(arguments);
    }
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * WMS Layers
 */
Ext.define('AdmClient.view.settings.LayersWMS', {
    extend :  Ext.panel.Panel ,
    alias : 'widget.layerswms',
    layout : {
        type : 'vbox',
        align : 'stretch'
    },
    title : 'WMS layers',
    initComponent : function() {
        var wms = Ext.create("GeoExt.data.WmsCapabilitiesLayerStore", {
            url: '/riges/geoserver/wms?request=GetCapabilities&version=1.1.0',
            //url : "capabilities.xml",
            autoLoad : true
        });
        
        this.items = [ {
            xtype : 'combobox',
            fieldLabel : 'WMS server'
        }, {
            xtype : 'grid',
            store : wms,
            itemId : 'wmslayers',
            flex : 1,
            hideHeaders : true,
            autoScroll : true,
            columns : [ {
                dataIndex : "name",
                sortable : true,
                flex : 1
            } ]
        } ];

        this.callParent(arguments);
    }
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Layers
 */
Ext.define('AdmClient.view.settings.Layers', {
    extend :  Ext.panel.Panel ,
                                                         
                                     
                                                       
                                                  
    alias : 'widget.layers',
    title : 'Layers',
    layout : {
        type : 'hbox',
        align : 'stretch'
    },
    initComponent : function() {

        this.items = [ {
            xtype : 'layerswms',
            //padding : '0 5 0 0',
            padding : 10,
            flex : 1
        }, {
            layout : {
                type : 'vbox',
                align : 'center',
                pack : 'center'
            },
            items : {
                xtype : 'button',
                text : 'Add ->',
                itemId : 'add'
            }
        }, {
            xtype : 'layersconfigured',
            //padding : '0 0 0 5',
            padding : 10,
            flex : 1
        } ];
        
        this.callParent(arguments);
    }
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Layer settings
 */
Ext.define('AdmClient.view.settings.LayerSettings', {
    extend :  Ext.form.Panel ,
    requires : [],
    alias : 'widget.layersettings',
    defaultType: 'textfield',
    initComponent : function() {

        this.items = [ {
            fieldLabel : 'Name',
            name : 'name'
        } ];

        this.callParent(arguments);
    }
});

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
* A controller to handle layer view.
*/

Ext.define('AdmClient.controller.Layers', {
    extend :  Ext.app.Controller ,
                                                 
                                                         
    refs: [{
        ref: 'layers',
        selector: '#layers'
    },{
        ref: 'wmslayers',
        selector: '#wmslayers'
    }],
    views: ['settings.Layers'],
    stores: ['Layers'],
    
    init : function() {
        this.control({
            '#add': {
                click: this.onAddClick
            },
            '#layers': {
                edit: this.onEdit
            },
            '#save': {
                click: this.onSaveClick
            },
            '#settings': {
                click: this.onSettingsClick
            },
            '#delete': {
                click: this.onDeleteClick
            }
        });
    },

    onSaveClick: function() {
        var layers = this.getLayersStore();
        layers.sync();
    },
    onAddClick: function() {
        var layers = this.getLayersStore();
        var wmslayers = this.getWmslayers();
        var selection = wmslayers.getSelectionModel().getSelection();
        
        if (selection.length !== 1) return;
        
        var wmslayer = selection[0];
        
        var layer = Ext.create('AdmClient.model.Layer', {
            name: wmslayer.get('name'),
            isGroupLayer : null,
            wms: {
                params: {
                    layers: wmslayer.get('name')
                }
            }
        });
        
        layers.add(layer);
        
        layer.save();
    },
    onEdit: function(editor, e) {
        e.record.save();
    },
    onSettingsClick: function(gridview, rl, rowIndex, colIndex, e, record) {
        var layerSettings = Ext.create('AdmClient.view.settings.LayerSettings');
        
        var w = Ext.create('Ext.Window', {
            height: 200,
            width: 300,
            padding: 10,
            title: 'Layer settings',
            layout: 'fit',
            modal: true,
            items: layerSettings,
            buttons: [{ text: 'Save'}]
        });
        
        w.show();
                
        layerSettings.getForm().loadRecord(record);
    },
    onDeleteClick: function(gridview, rl, rowIndex, colIndex, e, record) {
        record.destroy();
    }
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Search panel
 *
 *{@img search.png}
 *
 * In this view the administrator simple checks the municipalies the configuration 
 * should search inside. 
 * 
 * The view uses an Arraystore to populate lists.
 */
Ext.define('AdmClient.view.mapconfiguration.search.SearchPanel', {
	extend :  Ext.grid.Panel ,
	alias : 'widget.searchPanel',

	initComponent : function() {
		
		Ext.applyIf(this, {

			columns : [ {
				text : 'Municipality',
				dataIndex : 'Municipality',
				width : 200
			}, {
				xtype : 'checkcolumn',
				dataIndex : 'selected'
			} ]
		});

		this.store = new AdmClient.store.Municipalities();
		this.callParent(arguments);
	}
});

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
* A controller to handle main search view.
*/


Ext.define('AdmClient.controller.Search', {
	extend :  Ext.app.Controller ,
	                                                                                                      
	refs : [{
			ref	: 'configurations',
			selector : '#configurations'
		},{
			ref : 'searchGrid',
			selector : '#searchGridConfig'
	}],
	
	init : function() {
		this.control({
			'#searchGridConfig' :{
				render : this.markGrid

			},
			'#searchGridConfig checkcolumn' : {
				checkchange : this.municipalityChanged
			}
		});

		this.application.on({
            configuration_change: this.configurationChanged,
            scope: this
        });
	},

	markGrid : function(){

		var panel = this.getSearchGrid();
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			panel.store.data.items[i].save();
		}

		for (i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			var municipality = panel.store.data.items[i];
			if (AdmClient.app.config.search){
				for (var j = 0; j < AdmClient.app.config.search.searchAddresses.options.municipalities.length; j++){
					var searchMunicipality = AdmClient.app.config.search.searchAddresses.options.municipalities[j];
					if (searchMunicipality.constructor === String){
						if (searchMunicipality === municipality.data.Municipality){
							municipality.data.selected = true;
							municipality.save();
						}
					}
				}
			}
		}
		panel.updateLayout();

	},
	
	configurationChanged : function(){
		this.markGrid();
	},
	
	municipalityChanged : function(chkBox, rowIndex, checked, eOpts){

		var store = this.getSearchGrid().getStore();
		store.sync();
		
		AdmClient.app.config.search = AdmClient.app.config.search || {};
		AdmClient.app.config.search.searchEstates = {};
		AdmClient.app.config.search.searchEstates.options = {};
		AdmClient.app.config.search.searchEstates.options.municipalities = [];

		AdmClient.app.config.search.searchAddresses = {};
		AdmClient.app.config.search.searchAddresses.options = {};
		AdmClient.app.config.search.searchAddresses.options.municipalities = [];
		
		AdmClient.app.config.search.searchPlacenames = {};
		AdmClient.app.config.search.searchPlacenames.options = {};
		AdmClient.app.config.search.searchPlacenames.options.municipalities = [];

		
		var municipalities = store.data.items.forEach(function(m){
			if (m.data.selected){
				AdmClient.app.config.search.searchEstates.options.municipalities.push(m.data.Municipality);
				AdmClient.app.config.search.searchAddresses.options.municipalities.push(m.data.Municipality);
				AdmClient.app.config.search.searchPlacenames.options.municipalities.push(m.data.municipalityCode);
			}
		});
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Preview map
 */
Ext.define('AdmClient.view.mapconfiguration.map.PreviewMap', {
	extend :  Ext.panel.Panel ,
	                                                                    
	alias : 'widget.previewMap',

	initComponent : function() {
		this.items = [ {
			border : false,
			itemId : 'previewMapPanel',
			margin : 12
		} ];
		this.callParent(arguments);
	}
});

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
* A controller to handle preview map - obselete
*/


Ext.define('AdmClient.controller.PreviewMap', {
	extend :  Ext.app.Controller ,
	                                                               

	init : function() {
		this.control({
			'#previewMap' : {
				show : this.previewRender
			}
		});
	},

	previewRender : function(panel) {
		
		
		if (this.mapPanel){
			this.mapPanel.removeAll();
			delete this.mapPanel;
			panel.doLayout();
		}
		
		this.mapPanel = panel;
		
		var mapClient = Ext.create('OpenEMap.Client');

		var gui = {
				map : {},
//    			toolbar: {}, // at the moment this don't work
    			zoomTools: {},
    			layers: {},
    			baseLayers: {},
    			objectconfig : {}
		};
		
		mapClient.destroy();
		var config = Ext.clone(AdmClient.app.config);
		
		mapClient.configure(config, {
			gui : gui
		});

		panel.add(mapClient.gui.container);
		panel.doLayout();
	}
	
	
});

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
* A model store for det grouped layers. 
*/

Ext.define('AdmClient.store.GroupedLayerTree' ,{
    extend:  Ext.data.TreeStore ,

               
                            
                                     
                                                
                                                
                               
      
    id: 'configurationTreeStore',

    model: 'AdmClient.model.Layer',
    defaultRootProperty: 'layers',

    proxy: {
        type: 'memory'
    },

    maxLayerIndex: 1000,

    listeners: {
        beforeinsert: function(store, node, refNode, eOpts) { return this.onBeforeInsertAppend(store, node, refNode); },
        beforeappend: function(store, node, eOpts) { return this.onBeforeInsertAppend(store, node); },
        insert: function(store, node, refNode, eOpts) { this.onInsertAndAppend(store, node); },
        append: function(store, node, index, eOpts) { this.onInsertAndAppend(store, node); },
        remove: function(store, node, isMove, eOpts) { this.onRemove(store, node, isMove); },
        move: function(store, oldParent, newParent, index, eOpts) {this.onMove(store, oldParent, newParent, index, eOpts);},
        datachanged: function() { this.onUpdate(); },
        layerMetadataChange: function(){
            AdmClient.app.config.layers = this.getLayerConfiguration();
        }
    },

    constructor: function(config) {
        config = Ext.apply({}, config);
        this.callParent([config]);
        
    },

	onMove: function(store, oldParent, newParent, index, eOpts) {
		console.log('onMove');
		console.log(oldParent);
	},
    /**
    * Before insert to store
    * @param {Ext.data.Store} store
    * @param {Ext.data.Model} node
    * @param {Ext.data.Model} refNode
    */
    onBeforeInsertAppend: function(store, node, refNode) {
/*    	var layerName = this.getLayerName(node.data);
        if ((node.$className === 'GeoExt.data.WmsCapabilitiesLayerModel' && (!node.data.wms && node.raw && node.raw.url && layerName)) || node.$className === 'AdmClient.model.Layer') {
        	return true;
        } else {
        	return false;
        }
*/
		return true;
    },

    /**
     * Get a nodes layer name
     * @param {Ext.data.Model} data
     */
	getLayerName: function(data) {
    	if (data.wms && data.wms.params && (data.wms.params.LAYERS || data.wms.params.layers)) {
    			return data.wms.params.LAYERS || data.wms.params.layers;
    	} else {
    		return data.name;
    	}
	},

	onInsertAndAppend: function(store, node) {
		if(!this._inserting) {
			this._inserting = true; 
	        if (node.$className === 'GeoExt.data.WmsCapabilitiesLayerModel') {
		    	node.set('allowDrag', true);
	        	var layerName = this.getLayerName(node.data);
	        	
    			// Add this node layers and subnodes to map. 
//				store.cascadeBy(function(node) {
					
			        if(node.raw && node.raw.CLASS_NAME && node.raw.CLASS_NAME.indexOf('OpenLayers.Layer') > -1) {
		    			node.set('layer', node.raw);
		
						if (node.raw.CLASS_NAME.indexOf('OpenLayers.Layer.WMS') > -1) {
			            	var wms = {url: node.raw.url, options: {displayInLayerSwitcher: true, isBaseLayer: false, visibility: true}};
			    			if (node.raw.params) {
			    				wms.params = node.raw.params; 
			    			} else {
			    				wms.params = {layers: layerName};
			    			}
			    			if (node.raw.metadata && node.raw.metadata.legendURL) {
			    				wms.options.legendURL = node.raw.metadata.legendURL; 
			    			}
			    			if (node.raw.metadata && node.raw.metadata.metadataURLs && node.raw.metadata.metadataURLs.length > 0) {
			    				wms.metadataURL = node.raw.metadata.metadataURLs[0]; 
			    			}
			    			node.set('wms', wms);
			    		}
		    			
		    			if (node.raw.metadata && node.raw.metadata.queryable) {
		    				node.set('queryable', node.raw.metadata.queryable); 
		    			}
		    	    	node.set('isGroupLayer', false);
		    	    	node.set('clickable', false);
		    	    	
		    	    	// Add getLayer function to support GeoExt
		    	    	var layer = node.get('layer');
		    	    	node.getLayer = function() {
		    	    		this.get('layer');
		    	    	};
		    	    	
						// Add ´metadata and WFS info to node if it is queryable
		    	    	this.getWFSSettings(node);
		        	}
//	        	});
//	        } else if (node.$className === 'AdmClient.model.Layer') {
//				console.log('onInsertAndAppend');
//	        	console.log(node);
	      }
	      this._inserting = false;
	    }
    },
    
    /**
     * Handler for a store's remove event.
     *
     * @param {Ext.data.Store} store
     * @param {Ext.data.Model} node
     * @param {Boolean} isMove
     * @private
     */
    onRemove: function(store, node, isMove) {
        if(!this._removing && !isMove) {
            this._removing = true;
            // Remove layer and sublayers from map
            node.cascadeBy(function(subnode) {
                var layer = subnode.get('layer');
                if(layer && layer.map) {
                    this.map.removeLayer(layer);
                }
            }, this);

            // Remove layers from app configuration
            AdmClient.app.config.layers = this.getLayerConfiguration();

            delete this._removing;
        }
    },

    onUpdate: function(chkBox, opt, eOpts ) {
        if(!this._updating) {
            this._updating = true;

            var data = null;
            if (chkBox && chkBox.data)
            	data = chkBox.data;

            if (data && data.id === "root"){
                this._updating = false;
                return;
            }

            var s = Ext.getStore('configurationTreeStore');
            AdmClient.app.config.layers = s.getLayerConfiguration();
        }
        this._updating = false;
    },

    
    /**
     * Tries to get WFS-settings for a layer 
     * @private
     * @param  {Ext.data.NodeInterface} node     
     */
    getWFSSettings: function(node) {
        var stripName = function(name) {
            var parts = name.split(':');
            return parts.length > 1 ? parts : ['',name];
        };
        if (!(node.data && node.data.wms)) {
        	return false;
        }
    	var layerPieces = stripName(node.data.wms.params.layers || node.data.wms.params.LAYERS);
        var wfsUrl = proxyUrl + wfsServer + '?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=' + (node.data.wms.params.layers || node.data.wms.params.LAYERS);
	    var localWfsStore = Ext.create('GeoExt.data.AttributeStore');
	    localWfsStore.setUrl(wfsUrl);
	    localWfsStore.load({
	        scope: node,
	        callback: function(records, operation, success) {
	        	if (success && records.length > 0) {
	        		var metadata = {};
		            records.forEach(function(a){
		                if (this.get('metadata') === '' || !this.get('metadata')){
		                    metadata.attributes = {};
		                }
		                metadata.attributes[a.data.name] = {
		                    "alias" : a.data.name
		                };
		            }, this);
	        		this.set('metadata', metadata);
		            this.set('wfs', {
		            	featurePrefix: layerPieces[0],
		                featureType: layerPieces[1],
		                url: wfsServer
		               });
		            this.set('queryable', true);
		            this.set('clickable', true);
	                var s = Ext.getStore('configurationTreeStore');
	                AdmClient.app.config.layers = s.getLayerConfiguration();
	            // WFS Fails, try WMS 
		        } else if (this.get('wms')  && this.get('wms').params && (this.get('wms').params.LAYERS || this.get('wms').params.layers)) {
					var srsName = null;
					var wms = this.get('wms');
					for (srsName in this.get('srs')) {
						break;
					}
					var boundary = this.get('bbox')[srsName].bbox;
					var extent = new OpenLayers.Bounds.fromArray(boundary);
					var layerName = wms.params.LAYERS || wms.params.layers; 

					var requestUrl = proxyUrl + wmsServer + '?' + 'request=GetFeatureInfo&service=WMS&version=1.1.1&layers=' + layerName + '&styles=&srs=' + srsName + '&bbox=' + extent.toString() + 
						'&width=1&height=1&query_layers=' + layerName + '&info_format=application/vnd.ogc.gml&feature_count=1&x=0&y=0';
					Ext.Ajax.request({
						scope: this,
						url: requestUrl,
						success: function(){
							var format = new OpenLayers.Format.GML();
							var feature = format.read(arguments[0].responseXML);
			                var store = Ext.getStore('configurationTreeStore');

							if (feature.length > 0) { 
								metadata = {};
								if (this.get('metadata') === '' || !this.get('metadata')){
									metadata.attributes = {};
								}
								for (var attribute in feature[0].attributes){
									//var item = [attribute, attribute, true];
									metadata.attributes[attribute] = {
										alias: attribute
									};
								}
								this.set('metadata', metadata);
								this.set('clickable', true); 
				                AdmClient.app.config.layers = store.getLayerConfiguration();
							} else {
								this.set('clickable', false); 
								this.set('queryable', false); 
				                AdmClient.app.config.layers = store.getLayerConfiguration();
							}
						}
					});
		        }
	        }
	    });
    },

    /*
     * Since not all models include all AdmClient attributes, like wms and wfs
     * try to get attributes from the raw json data. As a last solution set defaults
     * @param    {Ext.data.NodeInterface}    node        node to search for attributes in
     * @param    {string}                    attribute   searched attribute
     */
    tryToGetRecordAttribute: function(node, attribute) {
        var attr = null;
        var modelNodeAttr = node.get(attribute);
        
        if( (modelNodeAttr && typeof modelNodeAttr !== 'undefined')) {
            attr = modelNodeAttr;
        } else if(typeof node.data[attribute] !== 'undefined') {
            attr = node.data[attribute];
        }
        return attr;
    },
     
    /**
    * Converts a store node to layer configuration
    * !TODO Change into writer and add something like nameProperty: 'mapping' to get mapped JSON
    * @param  {Ext.data.NodeInterface}    node    Node to convert
    * @return {object}                    layer   OpenEMap layer
    */
    nodeToLayerConfig: function(node) {
        var attributeList = ['name','wms','wfs','metadataUrl', 'isGroupLayer', 'queryable', 'clickable'];
        var layer = {};
        var me = this;

        var stripName = function(name) {
            var parts = name.split(':');
            return parts.length > 1 ? parts : ['',name];
        };

        attributeList.forEach(function(attributeName) {
            var attr = this.tryToGetRecordAttribute(node, attributeName);
            if(attr !== undefined) {
                layer[attributeName] = attr;
            }
        }, this);

        if(layer.wms && layer.wms.options) {
            var isBaseLayer = this.tryToGetRecordAttribute(node, 'isBaseLayer');
            if(!isBaseLayer) {
                isBaseLayer = false;
            }
             
            layer.wms.options.isBaseLayer = isBaseLayer;
            layer.wms.options.visibility = this.tryToGetRecordAttribute(node, 'visibility');
             
            if (layer.wms.options.visibility === undefined || layer.wms.options.visibility === null){
                layer.wms.options.visibility = false;
            }

            if (node.data.metadata && node.data.metadata !== ''){
                layer.metadata = node.data.metadata;
            }
             
            var queryable = this.tryToGetRecordAttribute(node, 'queryable');
            var clickable = this.tryToGetRecordAttribute(node, 'clickable');
            if ((queryable && clickable) || (clickable && this._updating)){
            	var layerPieces = stripName(layer.wms.params.layers ? layer.wms.params.layers : layer.wms.params.LAYERS);
                layer.wfs = {};
                layer.wfs.featurePrefix = layerPieces[0];
                layer.wfs.featureType = layerPieces[1];
                layer.wfs.url = wfsServer;
            } else {
                if (layer.wfs) delete layer.wfs;
            }
        }
         
        if (node.hasChildNodes()) {
	        layer.layers = [];
	        node.childNodes.forEach(function(subnode) {
	        	layer.layers.push(me.nodeToLayerConfig(subnode));
	        });
        }
        return layer;
    },

    /**
    * Returns all layers as OpenEMap layer configuration tree.
    * @return {object} layerConfig  OpenEMap layer configuration
    */
    getLayerConfiguration: function() {
    	var layerConfig  = [];
        // Get layers and sublayers.
        this.getRootNode().childNodes.forEach(function(node, i) {
        	layerConfig.push(this.nodeToLayerConfig(node));
        }, this);
        return layerConfig;
    },

    layerUpdate : function(){
        AdmClient.app.config.layers = this.getLayerConfiguration();
    },

    /**
     * Reorder map layers from store order
     *
     * @private
     */
    reorderLayersOnMap: function() {
        if(this.map) {
            var node = this.getRootNode();
            if(node) {
                var i = this.maxLayerIndex;
                node.cascadeBy(function(subnode) {
                    var layer = subnode.get('layer');
                    if(layer) {
                        layer.setZIndex(i);
                        i--;
                    }
                   
                }, this);
            }
        }
    },

    /**
    * Adds a WMS-legend to a node
    * @param {Ext.data.Model} node
    * @return {Ext.data.Model} node
    */
    addWMSLegend: function(node) {
        if(node.get('layer')) {
            node.gx_wmslegend = Ext.create('GeoExt.container.WmsLegend',{
                layerRecord: node,
                showTitle: false,
                hidden: true,
                deferRender: true,
                // custom class for css positioning
                // see tree-legend.html
                cls: "legend"
            });
        }
        return node;
    },

    /**
     * Unbind this store from the map it is currently bound.
     */
    unbind: function() {
        var me = this;
        me.un('beforeinsert', me.onBeforeInsertAndAppend, me);
        me.un('beforeappend', me.onBeforeInsertAndAppend, me);
        me.un('insert', me.onInsertAndAppend, me);
        me.un('append', me.onInsertAndAppend, me);
        me.un('remove', me.onRemove, me);
        me.un('datachangded', me.onUpdate, me);
        me.map = null;
    },

    /**
     * Unbinds listeners by calling #unbind prior to being destroyed.
     *
     * @private
     */
    destroy: function() {
        //this.unbind();
        //this.callParent();
    }
});

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
* A controller to handle layers, see layer store for more implementation specifics regarding
*/

Ext.define('AdmClient.controller.ConfigLayers', {
    extend :  Ext.app.Controller ,
                                                                   
                                                        
                                                  
                  
    refs: [
        {
            ref: 'mapConfigLayerTree',
            selector: '#mapConfigLayerTree'
        },
        {
            ref: 'mapConfigWMSLayerTree',
            selector: '#mapConfigWMSLayerTree'
        },
        {
            ref: 'layerServiceSelector',
            selector: '#layerServiceSelector'
        }
    ],
    views: ['mapconfiguration.layer.LayerPanel'],
    stores :['GroupedLayerTree'],
    
    init : function() {
        this.control({
            '#mapConfigLayerTree': {
                checkchange: this.onNodeCheckChange
            },
            '#layerServiceSelector' : {
                keyup : this.onWMSServiceKeyup,
                render: function(field) {
                    // Intial select
                    this.loadWMSCapabilities(field.getValue());
                }
            },
            '#newGroupLayer' :{
                click: this.onNewGrouplayer,
                scope: this
            },
            'checkcolumn' : {
            	checkchange : this.onChangeLayer
            }
        });

        this.application.on({
            configuration_change: this.updateLayerTree,
            scope: this
        });

        
    },

    onNewGrouplayer : function(){
        var self = this;
        Ext.Msg.prompt('Name', 'Nytt grupplagernamn:', function(btn, text){
            if (btn == 'ok'){
                var tree = self.getMapConfigLayerTree();
                var root = tree.getRootNode();
                root.appendChild({
                    name : text,
                    isGroupLayer: true
                });
            }
        });
    },
    
    onChangeLayer : function(chkBox, rowIndex, checked, eOpts){
    	var layerTree = this.getMapConfigLayerTree();
    	layerTree.store.save();
    },

    onWMSServiceKeyup: function(combo, e, eOpts) {
        if(e.getKey() === e.ENTER) {
            this.loadWMSCapabilities(combo.getValue());
        }

    },

    onNodeCheckChange: function(node, rowIndex, checked, eOpts ) {
        if(node.data.wms) {
            node.data.wms.visibility = checked;
        }
    },

    loadWSLayers: function(url) {
         if(url) {
            this.getMapConfigWMSLayerTree().setLoading(true);
            var wmsCapabilitiesStore = this.getMapConfigWMSLayerTree().getStore();
            Ext.Ajax.request({
                url: url,
                success: function(response) {
                    if(response && response.responseText) {
                        var json = Ext.decode(response.responseText);
                        // Load nodes into the tree store.
                        wmsCapabilitiesStore.setRootNode({ 
                            root: true, 
                            expanded: true, 
                            name: 'Lager', 
                            layers: this.parseLayerTree(json).map(function(layer) {
                                // Ugly solution to support the stores, GeoExt.data.WmsCapabilitiesLayerModel
                                layer.metadata = layer;
                                return layer;
                            })
                        });
                    } else {
                        // !TODO Throw error
                    }
                    this.getMapConfigWMSLayerTree().setLoading(false);
                },
                failure: function() {
                    // !TODO Throw error
                    this.getMapConfigWMSLayerTree().setLoading(false);
                },
                scope: this
            });
        }
    },

    loadWMSCapabilities: function(url) {
        if(url) {
            this.getMapConfigWMSLayerTree().setLoading(true);
            var wmsCapabilitiesStore = this.getMapConfigWMSLayerTree().getStore();
            
            // Load data into a plain GeoExt Capablities store.
            var geoExtWMSStore = Ext.create("GeoExt.data.WmsCapabilitiesLayerStore", {
                url: url
            });

            geoExtWMSStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(records && records.length > 0) {
                        // Make sure that records in the store is leafs and remove GeoExts defaulted checkcolumn
                        records.forEach(function(record) {
                            record.data.leaf = true;
                            record.data.checked = null;
                        });
                        // Load nodes into the tree store.
                        wmsCapabilitiesStore.setRootNode({ root: true, expanded: true, name: 'Lager', layers: records });
                        this.getMapConfigWMSLayerTree().setLoading(false);
                    } else {
                        // !TODO Throw error
                    }
                }
            });
        } else {
            // !TODO Throw error
        }
    },

    updateLayerTree: function(config) {
        if(config.layers && config.layers.length > 0) {
            // Update layer tree with new layers
            var layerTree = this.getMapConfigLayerTree();
            layerTree.getStore().setRootNode({
                name: (config.name ? config.name : 'Lager'),
                expanded: true,
                layers: this.getLayerSwitcherLayers(this.parseLayerTree(config.layers))
            });
        }
    },

    isWMSLayer: function(layer) {
        return layer.wms ? true : false;
    },

    isOpenLayersLayer: function(layer) {
        if (layer.wms || layer.osm || layer.google || layer.bing) {
            return true;
        } else {
            return false;
        }
    },
    isBaseLayer: function(layer) {
        var options = this.getOptions(layer);
        if (options && options.isBaseLayer) {
            return true;
        } else {
            return false;
        }
    },
    getOptions: function(layer) {
        if (layer.wms) {
            return layer.wms.options;
        } else if (layer.osm) {
            return layer.osm.options;
        } else if (layer.google) {
            return layer.google.options;
        } else if (layer.bing) {
            return layer.bing.options;
        }
    },

    /**
    * Iterate over the layertree and create a ExtJS-tree structure
    */
    parseLayerTree: function(layers) {
        layers.forEach(this.iterateLayers, this);
        return layers;
    },

    /**
    * Get all layers and layer groups that should show up in the layer switcher
    */
    getLayerSwitcherLayers: function(layers) {
        return layers.filter(function(layer) { 
            return (layer.layers || this.isWMSLayer(layer)) ? true : false;
        }, this);
    },

    iterateLayers: function(layer) {
        // Is node checked?
        //layer.checked = layer.wms && layer.wms.options ? layer.wms.options.visibility : false;
        // Get url from Server and set to layer
        if(typeof layer.serverId !== 'undefined' && layer.serverId !== '') {
            var server = Ext.StoreManager.get('servers').getById(layer.serverId);
            if(server) {
                if(layer.wms && !layer.wms.url) {
                    var wmsService = '/wms';
                    if(layer.wms.gwc) {
                        wmsService = '/gwc/service/wms';
                    }
                    layer.wms.url = server.get('url') + wmsService;
                }

                if(layer.wfs && !layer.wfs.url) {
                    layer.wfs.url = server.get('url');
                }
            }
        }

        // Create and store a reference to OpenLayers layer for this node
        if(this.isOpenLayersLayer(layer)) {
            //layer.layer = this.createLayer(layer);
        }
        // Do the node have sublayers, iterate over them
        if(layer.layers) {
            // Expand all groups
            layer.expanded = true;
            layer.layers.forEach(arguments.callee, this);
        } else {
            // If no sublayers, this is a leaf
            layer.leaf = true;
        }
    }
});

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
* A controller to handle tooldetails for draw point tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawPoint', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawPoint',
	config : {id: 'DrawPoint', type: 'DrawGeometry', iconCls : 'action-drawpoint', geometry : 'Point'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for draw path tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawPath', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawLine',
	config : {id: 'DrawLine', type: 'DrawGeometry', iconCls : 'action-drawline', geometry : 'Path'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for draw polygon tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawPolygon', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawPolygon',
	config: {id: 'DrawPolygon', type: 'DrawGeometry', iconCls : 'action-drawpolygon', geometry : 'Polygon'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for draw polygon tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawText', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawText',
	config : {id: 'DrawText', type: 'DrawGeometry', tooltip : 'Rita etikett', iconCls : 'action-drawpoint', geometry : 'Point', attributes: {type: 'label', label: 'Ny label', metadata: {type: {hidden: true}}}},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for draw polygon tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawRectangle', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawRectangle',
	config : {id: 'DrawRectangle', type : 'DrawObject', itemId : 'DrawObjectR', tooltip : 'Rita rektangel', iconCls : 'action-draw-R', disable : false, obectConfig : {type : 'R'}, attributes: {state: 'GEOMETRY', metadata: {state: {hidden: false}}}},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for draw polygon tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawOctagon', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawOctagon',
	config: {id: 'DrawOctagon', type : 'DrawObject', itemId : 'DrawObjectO', tooltip : 'Rita åttkantigt objekt', iconCls : 'action-draw-O', disable : false, obectConfig : {type : 'O'}, attributes: {state: 'GEOMETRY', metadata: {state: {hidden: false}}}},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for draw polygon tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawL-shape', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawL-shape',
	config : {id: 'DrawL-shape', type : 'DrawObject', itemId : 'DrawObjectL', tooltip : 'Rita L-format objekt', iconCls : 'action-draw-L', disable : false, obectConfig : {type : 'L'}, attributes: {state: 'GEOMETRY', metadata: {state: {hidden: false}}}},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for draw polygon tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawD-shape', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawD-shape',
	config : {id: 'DrawD-shape', type : 'DrawObject', itemId : 'DrawObjectD', tooltip : 'Rita objekt med avfasade hörn', iconCls : 'action-draw-D', disable : false, obectConfig : {type : 'D'}, attributes: {state: 'GEOMETRY', metadata: {state: {hidden: false}}}},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for modify geometry tool.
*/

Ext.define('AdmClient.controller.toolDetails.ModifyGeometry', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'ModifyGeometry',
	config : {id: 'ModifyGeometry', type: 'ModifyGeometry'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for select geometry tool.
*/

Ext.define('AdmClient.controller.toolDetails.SelectGeometry', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'SelectGeometry',
	config: {id: 'SelectGeometry', type: 'SelectGeometry'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for delete all features tool.
*/

Ext.define('AdmClient.controller.toolDetails.DeleteGeometry', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DeleteGeometry',
	config : {id: 'DeleteGeometry', type: 'DeleteGeometry'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for delete all features tool.
*/


Ext.define('AdmClient.controller.toolDetails.DeleteAllFeatures', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DeleteAllFeatures',
	config : {id: 'DeleteAllFeatures', type: 'DeleteAllFeatures'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for full extent tool.
*/


Ext.define('AdmClient.controller.toolDetails.FullExtent', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'FullExtent',
	config : {id: 'FullExtent', type: 'FullExtent'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for delete measure tool.
*/

Ext.define('AdmClient.controller.toolDetails.ZoomSelector', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'ZoomSelector',
	config : {id: 'ZoomSelector', type: 'ZoomSelector'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for print tool.
*/


Ext.define('AdmClient.controller.toolDetails.Print', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'Print',
	config : {id: 'Print', type: 'Print'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for identify tool.
*/

Ext.define('AdmClient.controller.toolDetails.Identify', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'Identify',
	config : {id: 'Identify', type: 'Identify', tooltip: 'Få information om objekt i kartan', iconCls: 'action-identify'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for identify tool.
*/

Ext.define('AdmClient.controller.toolDetails.Popup', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'Popup',
	config: {id: 'Popup', type: 'Popup', showOnlyFirstHit: true, tolerance: 3, iconCls: 'action-popup', tooltip: 'Klicka på ett object för information'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for details report tool.
*/

Ext.define('AdmClient.controller.toolDetails.DetailReport', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DetailReport',
	config : {id: 'DetailReport', type: 'DetailReport'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for measure line tool.
*/

Ext.define('AdmClient.controller.toolDetails.MeasureLine', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'MeasureLine',
	config: {id: 'MeasureLine', type: 'MeasureLine'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for measure area tool.
*/

Ext.define('AdmClient.controller.toolDetails.MeasureArea', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'MeasureArea',
	config: {id: 'MeasureArea', type: 'MeasureArea'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle tooldetails for delete measure tool.
*/

Ext.define('AdmClient.controller.toolDetails.DeleteMeasure', {
	extend :  AdmClient.controller.MapConfiguration ,
	                                                                                                   
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DeleteMeasure',
	config : {id: 'DeleteMeasure', type: 'DeleteMeasure'},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});

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
* A controller to handle layer details view.
*/

Ext.define('AdmClient.controller.LayerDetails', {
	extend:  Ext.app.Controller ,
	                                                                   
	refs : [{
		ref : 'saveLayerDetail',
		selector : '#saveLayerDetail'
	},{
		ref: 'layerDetailsGrid',
		selector: '#layerDetailsGrid'
	},{
		ref: 'layerDetails',
		selector: 'layerDetails'
	}],

	init : function() {
		this.control({
			'#saveLayerDetail' : {
				click : this.save
			}
		});
	},

	save : function(btn, e, eOpts){
		var store = this.getLayerDetailsGrid().getStore();
		var layer = this.getLayerDetails().layer;
		layer.metadata = {};
		store.data.items.forEach(function(c){
			if (c.data.visible || c.data.alias){
				if (c.data.alias === "") return;
				if (!layer.metadata.attributes){
					layer.metadata.attributes = {};
				}
				layer.metadata.attributes[c.data.name] = {alias : c.data.alias};
			}
		});

		if (Object.keys(layer.metadata).length === 0){
			delete layer.metadata;
		}

		store = this.getLayerDetails().panelGrid.store;
		AdmClient.app.config.layers = store.treeStore.getLayerConfiguration();

		this.getLayerDetails().close();
	}
});

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
* A model base model for settings section. 
*/
Ext.define('AdmClient.model.Server', {
	                                           
	extend :  AdmClient.model.SettingBase ,

	proxy : {
		type : 'rest',
		url : appPath + '/settings/servers',
		reader : {
			type : 'json'
		}
	}
});

Ext.define('AdmClient.model.SettingBase', {
	extend :  Ext.data.Model ,
	fields : [  {
		name : 'name',
		type : 'string'
	}, {
		name : 'url',
		type : 'string'
	}, {
		name : 'username',
		type : 'string'
	}, {
		name : 'password',
		type : 'string'
	}, {
		name : 'note',
		type : 'string'
	},{
		name : 'ID',
		type : 'integer'
	}]
});

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


/*
* A model store for det grouped Servers. 
*/


Ext.define('AdmClient.store.Servers', {
	extend :  Ext.data.Store ,
	                                      
	model : 'AdmClient.model.Server',
	storeId: 'servers',
	autoLoad : true
});
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


/*
* A model store for det grouped ToolStore.
* To add a tool, add it to the data section 
*/

Ext.define('AdmClient.store.ToolStore', {
	extend :  Ext.data.ArrayStore ,

	fields : [ {
		name : 'toolName',
		type : 'string'
	},{
		name : 'tool',
		type : 'string'
	}, {
		name : 'info',
		type : 'string'
	},{
		name : 'id',
		type : 'string'
	}, {  
		name : 'selected'
	} ],

	data : [ [ 'DrawGeometry', 'Point', 'Draw point', 'DrawPoint', false ],
	         [ 'DrawGeometry', 'Path', 'Draw line', 'DrawLine', false ],
	         [ 'DrawGeometry', 'Polygon', 'Draw polygon.', 'DrawPolygon', false ],
	         [ 'DrawGeometry', 'Text', 'Draw text.', 'DrawText', false ],
	         [ 'DrawObject', 'Rectangle', 'Draw rectangular object.', 'DrawRectangle', false ],
	         [ 'DrawObject', 'Octagon', 'Draw octagonal object.', 'DrawOctagon', false ],
	         [ 'DrawObject', 'L-shape', 'Draw L-shaped object.', 'DrawL-shape', false ],
	         [ 'DrawObject', 'D-shape', 'Draw D-shaped object.', 'DrawD-shape', false ],
			[ 'SelectGeometry', 'Select geometry', 'Tool for selecting geometry.', 'SelectGeometry', false ],
			[ 'ModifyGeometry', 'Modify geometry', 'Tool for modify geometry.', 'ModifyGeometry', false ],
			[ 'DeleteGeometry', 'Delete geometry', 'Tool for delete single geometry.', 'DeleteGeometry', false ],
			[ 'DeleteAllFeatures', 'Delete all geometries', 'Tool for delete all geometries on map.', 'DeleteAllFeatures', false ],
			[ 'FullExtent', 'Full extent', 'Zoom to full extent.', 'FullExtent', false ],
			[ 'ZoomSelector', 'Zoom to scale', 'Zoom to scale.', 'ZoomSelector', false ],
			[ 'Print', 'Print', 'Tool for printing.', 'Print', false ],
			[ 'Identify', 'Identify', 'Identify features.', 'Identify', false ],
			[ 'Popup', 'Popup', 'Tool to show popup window for features in popup layers.', 'Popup', false ],
			[ 'DetailReport', 'Detail report', 'Tool for detail report.', 'DetailReport', false],
			[ 'MeasureArea', 'Measure area', 'Measure area in 2D.', 'MeasureArea', false ],
			[ 'MeasureLine', 'Measure line', 'Measure line in 2D.', 'MeasureLine', false ],
			[ 'DeleteMeasure', 'Delete measure', 'Tool for delete measure.', 'DeleteMeasure', false]
			//[ 'A', 'Detail report', 'Tool for detail report.', false]
	],
	
	checkTool: function(rowIndex, checked, tool) {
		var toolObject = this.data.items[rowIndex].data;

		if (checked){
			//find the right place in config object
			var configItems = AdmClient.app.config.tools.filter(function(t){
				return (t.id === toolObject.id);
			});
			if (configItems.length === 0){ // add tool to config object
				AdmClient.app.config.tools.push(tool);
			}
		} else {
			for (var i = 0; i < AdmClient.app.config.tools.length; i++){
				tool = AdmClient.app.config.tools[i];
				if (toolObject.id === tool.id) {
					AdmClient.app.config.tools.splice(i, 1);
				}
			}
		}
		this.commitChanges();
	}
});
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
* A model that represents the search server. 
*/

Ext.define('AdmClient.model.SearchServer', {
	                                           
	extend :  AdmClient.model.SettingBase ,

	proxy : {
		type : 'rest',
		url : appPath + '/searchserver/server',
		reader : {
			type : 'json'
		}
	}
});

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
* A model store for det grouped SearchServer. 
*/


Ext.define('AdmClient.store.SearchServer', {
	extend :  Ext.data.Store ,
	                                            
	model : 'AdmClient.model.SearchServer',
	autoLoad : true
});

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
* A model store for det grouped Municipalities. 
*/

Ext.define('AdmClient.store.Municipalities', {
	extend :  Ext.data.ArrayStore ,

	fields : [ {
		name : 'Municipality',
		type : 'string'
	},{
		name : 'municipalityCode',
		type : 'string'
	},{
		name : 'selected'
	} ],

	data : [ [ 'Nordanstig', '2132', false ],
	         [ 'Sundsvall', '2281', false ],
	         [ 'Timrå', '2262', false ],
	         [ 'Ånge', '2260', false ],
	         [ 'Härnösand', '2280', false ],
	         [ 'Kramfors', '2282', false ],
	         [ 'Sollefteå', '2283', false ],
	         [ 'Örnskoldsvik', '2284', false ],
	         [ 'Nordmaling', '2401', false ]
	]
});

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


/*
* A model store for det WmsCapabilitiesLayerTree. 
*/

Ext.define('AdmClient.store.WmsCapabilitiesLayerTree',{
    extend:  Ext.data.TreeStore ,
                                                     
    model: 'GeoExt.data.WmsCapabilitiesLayerModel',

    alias: 'widget.wmsCapabilitiesLayerTree',

    defaultRootProperty: 'layers'
});
/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Main toolbar
 */
Ext.define('AdmClient.view.main.MainToolbar', {
	extend :  Ext.toolbar.Toolbar ,
	alias : 'widget.mainToolbar',
	margin : 8,
	items : [ 
	'->',{
		xtype : 'button',
		text : 'About',
		pack : 'right',
		itemId : 'about'
	} ],

	initComponent : function() {
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Tools grid
 *
 *{@img tools.png}
 *
 * In this view the administrator simple checks the tools in the configuration. 
 * 
 * The view uses an Arraystore to populate lists.
 */
Ext.define('AdmClient.view.mapconfiguration.tools.ToolsGrid', {
	extend :  Ext.grid.Panel ,
	                            
	alias : 'widget.toolsGrid',
	
	initComponent : function() {

		Ext.applyIf(this, {

			columns : [ {
				text : 'Verktyg',
				dataIndex : 'tool',
				width : 200
			}, {
				text : 'Info',
				dataIndex : 'info',
				width : 400
			}, {
				xtype : 'checkcolumn',
				dataIndex : 'selected'
			} ]
		});

		this.store = new AdmClient.store.ToolStore();

		this.callParent(arguments);
	}
});

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
* Main settings view for the application
*/
Ext.define('AdmClient.view.Settings', {
	extend :  Ext.panel.Panel ,
	                                                                                                        
	alias : 'widget.settings',
	title : 'Settings',
	layout: 'fit',
	initComponent : function() {
		this.items = [ {
			xtype : 'tabpanel',
			items : [ {
				margin : 8,
				title : 'Servers',
				border : true,
				items : [ {
					xtype : 'gisServersGrid',
					margin : 8,
					store : new AdmClient.store.Servers(),
					itemId : 'srvGrid',
					title : 'GIS-Servers',
					border : true
				}, {
					xtype : 'settingsGridBase',
					margin : 8,
					store : new AdmClient.store.SearchServer(),
					itemId : 'searchGrid',
					title : 'Geosearch',
					border : true
				} ]
			},{
				xtype : 'layers'
			} ]

		} ];
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Settings grid
 */
Ext.define('AdmClient.view.settings.SettingsGridBase', {
	extend :  Ext.grid.Panel ,
	                            
	alias : 'widget.settingsGridBase',

	tbar : [ {
		text : 'Save',
		itemId : 'saveSettings'
	},{
		text : '+',
		itemId : 'addSettingsRow'
	} ],

	initComponent : function() {

		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 1
		});

		Ext.applyIf(this, {
			plugins : [ this.cellEditing ],

			columns : [ 
			            
			{
				text : 'Name',
				dataIndex : 'name',
				editor : {
					allowBlank : false
				}
			}, {
				text : 'URL',
				dataIndex : 'url',
				editor : {
					allowBlank : false
				}
			}, {
				text : 'Username',
				dataIndex : 'username',
				editor : {
					allowBlank : false
				}
			}, {
				text : 'Password',
				dataIndex : 'password',
				editor : {
					allowBlank : false
				},
				renderer : function(value) {
					var a = new Array(value.length + 1);
					return a.join('*');
				}
			}, {
				text : 'Note',
				dataIndex : 'note',
				editor : {
					allowBlank : true
				}
			}, {
				xtype : 'actioncolumn',
				menudisabled : true,
				items : [ {
					icon : 'icons/minus-small.png',
					handler: function(grid, rowIndex, colIndex) {
						Ext.MessageBox.confirm('Delete?', 'Sure you want to unregister server? Layers from this server would not be feeded to configurations associated with this server.',
								function(opts){
									if (opts === 'yes'){
										var rec = grid.getStore().getAt(rowIndex);
										grid.getStore().remove(rec);
										grid.getStore().sync();
									}
								},
								this
						);
	                }
				} ]
			} ]
		});

		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * GIS Servers grid
 */
Ext.define('AdmClient.view.settings.GisServersGrid', {
	extend :  AdmClient.view.settings.SettingsGridBase ,
	alias : 'widget.gisServersGrid' 
	                         
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Search servers grid
 */
Ext.define('AdmClient.view.settings.SearchServersGrid', {
	extend :  AdmClient.view.settings.SettingsGridBase ,
	alias : 'widget.SearchServersGrid',
	                          
	
	initComponent : function(){
		
		this.callParent(arguments);
	}
});

/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * About window
 */
Ext.define('AdmClient.view.about.About',{
	extend :  Ext.window.Window ,
	alias : 'widget.admAbout',
	
	initComponent : function(){
		Ext.applyIf(this, {
			title : 'About',
			width : 600,
			height : 400,
			html : '<center>About</center>'
		});
		this.callParent(arguments);
	}
});

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
* A model that represents the configuration - obselete. 
*/

Ext.define('AdmClient.model.Config', {
	mixins : {
		observable :  Ext.util.Observable 
	},
	
	setId : function(configId){
		this.configId = configId;
	},
	
	setName : function(name){
		this.name = name;
	},
	
	setMaxExtent : function(maxExtent){
		this.maxExtent = maxExtent;
	},
	
	setExtent : function(extent){
		this.extent = extent;
	},
	
	setAttribution : function(attribution){
		this.attribution = attribution;
	},
	
	setDrawStyle : function(drawStyle){
		this.drawStyle = drawStyle;
	},
	
	setTools : function(tools){
		this.tools = tools;
	},
	
	setLayers : function(layers){
		this.layers = layers;
	},
	
	setVersion : function(version){
		this.version = version;
	},
	
	setAutoClearDrawLayer : function(autoClearDrawLayer){
		this.autoClearDrawLayer = autoClearDrawLayer;
	},
	
	getConfig : function(){
		var config = {};
		config.configId = this.configId;
		config.name = this.name;
		config.maxExtent = this.maxExtent;
		config.extent = this.extent;
		config.attribution = this.attribution;
		config.drawStyle = this.drawStyle;
		config.tools = this.tools;
		config.layers = this.layers;
		config.version = this.version;
		config.autoClearDrawLayer = this.autoClearDrawLayer;
		return config;
	},
	
	loadConfig : function(config){
		for (var k in config){
			this[k] = config[k];
		}
	},
	
	constructor : function(config){
		this.mixins.observable.constructor.call(this, config);
		
		this.addEvents(
				'updatedConfig'
		);
	}
});

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
 * @class AdmClient
 * Main class in the app.
 * @singleton
 * {@img app.png alt app image}
 *
 * This adminstration tool is build on top of ExtJS. It uses a MVC pattern from Sencha. More
 * information can be found [here](http://docs.sencha.com/extjs/4.2.2/#!/guide/application_architecture)
 * 
 * To add tools or search items, add a row to the corresponding Array store. 
 * 
 * For tools a details part must be added in the controller.
 *
 * In general No ID's are being used to identify components. Instead the application uses ItemID to avoid 
 * ID collisions. 
 *
 */
Ext.application({
	                                     
	                                       
	                                              
	                                                   
	                                          
	                                            
	                                         
	                                         
	                                             
	                                               
	                                                        
	                                                       
	                                                          
	                                                       
	                                                            
	                                                          
	                                                          
	                                                          
	                                                             
	                                                             
	                                                             
	                                                                
	                                                         
	                                                           
	                                                    
	                                                       
	                                                    
	                                                           
	                                                          
	                                                          
	                                                            
	                                               
	           
	                                     
	                                       
	                                    
	                                          
	                                            
	                                                      
	           
	                                             
	                                 
	                                                             
	                                                                   
	                                                                        
                                                                            
                                                                        
                                                                        
                                                                      
                                                                         
                                                                         
                                                                   
                                                                            
                                                              
                                                                  
               
                                                                  
               
                                                 
                                         
                                                          
                                                        
                                                           
                                                
                                            

                                        
                                             
                                              
                                       
                                        
               
                                
                 
    name: 'AdmClient',
    appFolder: 'src/main/javascript/',
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
                  'toolDetails.DrawText',
                  'toolDetails.DrawRectangle',
                  'toolDetails.DrawOctagon',
                  'toolDetails.DrawL-shape',
                  'toolDetails.DrawD-shape',
                  'toolDetails.DeleteGeometry',
                  'toolDetails.ModifyGeometry',
                  'toolDetails.SelectGeometry',
                  'toolDetails.DeleteAllFeatures',
                  'toolDetails.FullExtent',
                  'toolDetails.ZoomSelector',
                  'toolDetails.Print',
                  'toolDetails.Identify',
                  'toolDetails.Popup',
                  'toolDetails.DetailReport',
                  'toolDetails.MeasureLine',
                  'toolDetails.MeasureArea',
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
});

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
* A model that represents the server. 
*/
Ext.define('AdmClient.model.Server', {
	                                           
	extend :  AdmClient.model.SettingBase ,

	proxy : {
		type : 'rest',
		url : appPath + '/settings/servers',
		reader : {
			type : 'json'
		}
	}
});

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
* A model store for det grouped LayerDetails. 
*/
Ext.define('AdmClient.store.LayerDetails', {
    extend:  GeoExt.data.AttributeStore 
});

Ext.define('AdmClient.store.WmsCapabilitiesLayerStore',{
    extend:  Ext.data.JsonStore ,
                                                     
    model: 'GeoExt.data.WmsCapabilitiesLayerModel',
    alias: 'widget.wmsCapabilities'
});
/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

/**
 * Map extent
 */
Ext.define('AdmClient.view.mapconfiguration.map.Extent', {
	extend :  Ext.panel.Panel ,
	alias : 'widget.extent',

	initComponent : function() {
		this.items = [ {
			title : 'Map extent',
			layout : 'fit',
			border : false,
			itemId : 'mapPanel',
			margin : 12,
			tbar : [ {
				xtype : 'button',
				itemId : 'pan',
				icon : 'resources/images/arrow-move.png',
				enableToggle : true,
				pressed : true

			}, {
				xtype : 'button',
				itemId : 'markExtent',
				icon : 'resources/images/figur-R.png',
				enableToggle : true
			} ]
		} ];
		this.callParent(arguments);
	}
});

