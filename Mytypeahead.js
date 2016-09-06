
			function Mytypeahead( settings ) {

				if( ! window.salgado ){
					window.salgado = { data : {} } ;
				}

				window.salgado.data[settings.table] = false ;

				var self = this,

						request = false;

						self.get = function(source) {
							self.selector.typeahead( {
									source: source,
									displayField: 'name',
									updater : function(item){
										self.selector.parent().find("input[type=\"hidden\"]").val( item.id )
										self.selector.attr("placeholder",item.name )
										self.selector.removeAttr("required")
									}
								} )
						}

						search = function(){
							if( window.salgado.data[settings.table] ){
								self.get( window.salgado.data[settings.table] );
								return false ;
							}
													$.ajax(
															{
																url:settings.url,
																type:"POST",
																dataType:"JSON",
																data : {
																	table:settings.table,
																	fields:settings.fields
																},
																success : function(data){
																	var source = data.rows;
																	if ( data && source.length > 0 ){
																		self.get(source);
																	} else {
																		self.selector.attr("placeholder",self.placeholder )
																	}
																}
															}
														)
										} ;

				self.selector = $(settings.selector).bind("click", function(){
					$(this).val("")
				}) ;

				return function(){
					self.placeholder = self.selector.attr("placeholder")
					search()
				}()
			}
