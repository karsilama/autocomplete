
			function Mytypeahead( settings ) {

				var self = this,

						request = false,

						search = function(){
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
																	if ( data && data.source.length > 0 ){
																		self.selector.typeahead( {
																				source: data.source,
																				displayField: 'name',
																				updater : function(item){
																					self.selector.attr("data-id", item.id )
																					self.selector.attr("placeholder",item.name )
																				}
																			} )
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
