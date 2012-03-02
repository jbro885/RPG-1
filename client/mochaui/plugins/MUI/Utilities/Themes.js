MUI.files[MUI.path.plugins+"MUI/Utilities/Themes.js"]=1;MUI.Themes={init:function(newTheme){this.newTheme=newTheme.toLowerCase();if(!this.newTheme||this.newTheme==null||this.newTheme==MUI.options.theme.toLowerCase()){return}if($("spinner")){$("spinner").show()}this.oldURIs=[];this.oldSheets=[];$$("link").each(function(link){var href=link.get("href");if(href.contains(MUI.path.themes+MUI.options.theme)){this.oldURIs.push(href);this.oldSheets.push(link)}}.bind(this));this.newSheetURLs=this.oldURIs.map(function(item,index){return item.replace("/"+MUI.options.theme+"/","/"+MUI.Themes.newTheme+"/")}.bind(this));this.sheetsToLoad=this.oldURIs.length;this.sheetsLoaded=0;this.newSheets=[];this.newSheetURLs.each(function(link){var href=link;var cssRequest=new Request({method:"get",url:href,onComplete:function(response){var newSheet=new Element("link",{rel:"stylesheet",media:"screen",type:"text/css",href:href});this.newSheets.push(newSheet)}.bind(this),onFailure:function(response){this.themeLoadSuccess=false;if($("spinner")){$("spinner").hide()}MUI.notification("Stylesheets did not load.")},onSuccess:function(){this.sheetsLoaded++;if(this.sheetsLoaded==this.sheetsToLoad){this.updateThemeStylesheets();this.themeLoadSuccess=true}}.bind(this)});cssRequest.send()}.bind(this))},updateThemeStylesheets:function(){this.oldSheets.each(function(sheet){sheet.destroy()});this.newSheets.each(function(sheet){MUI.files[sheet.get("href")]=1;sheet.inject(document.head)});if(Browser.Engine.trident){this.redraw.delay(1250,this)}else{this.redraw.delay(250,this)}},redraw:function(){$$(".replaced").removeClass("replaced");$$(".mocha").each(function(element){var instance=element.retrieve("instance");instance.setColors();instance.drawWindow()});if(MUI.Dock){if(MUI.Dock.options.useControls){MUI.Dock.setDockColors();MUI.Dock.renderDockControls()}}if(MUI.Desktop.desktop){var checker=(function(){if(MUI.Desktop.desktop.getStyle("overflow")!="hidden"){return}$clear(checker);MUI.Desktop.setDesktopSize()}).periodical(50)}if($("spinner")){$("spinner").hide()}MUI.options.theme=this.newTheme}};window.addEvent("load",function(){if($("themeControl")){$("themeControl").getElements("option").setProperty("selected","false");if($("chooseTheme")){$("chooseTheme").setProperty("selected","true")}}});