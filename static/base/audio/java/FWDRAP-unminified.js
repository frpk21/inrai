/**
 * Royal Audio Player
 * Display object.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, _s applies only if the position is relative.
	 */
	var FWDDisplayObject = function(type, position, overflow, display){

		'use strict';
		
		var _s = this;
		_s.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas"){
			_s.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		_s.children_ar = [];
		_s.position = position || "absolute";
		_s.overflow = overflow || "hidden";
		_s.display = display || "inline-block";
		_s.visible = true;
		_s.x = 0;
		_s.y = 0;
		_s.w = 0;
		_s.h = 0;
		_s.alpha = 1;
		_s.innerHTML = "";
		_s.opacityType = "";
		_s.isHtml5_bl = false;
		
		_s.hasTransform3d_bl =  FWDUtils.hasTransform3d;
		_s.hasTransform2d_bl =  FWDUtils.hasTransform2d;
		if(FWDUtils.isIE || (FWDUtils.isIE11 && !FWDUtils.isMobile)){
			_s.hasTransform3d_bl = false;
			_s.hasTransform2d_bl = false;
		} 

		_s.hasBeenSetSelectable_bl = false;
		

		//##############################//
		/* init */
		//#############################//
		_s.init = function(){
			_s.setScreen();
		};	
		

		//######################################//
		/* check if it supports transforms. */
		//######################################//
		_s.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof _s.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		

		//######################################//
		/* set opacity type */
		//######################################//
		_s.getOpacityType = function(){
			var opacityType;
			if (typeof _s.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		

		//######################################//
		/* setup main screen */
		//######################################//
		_s.setScreen = function(element){
			if(_s.type == "img" && element){
				_s.screen = element;
				_s.setMainProperties();
			}else{
				_s.screen = document.createElement(_s.type);
				_s.setMainProperties();
			}
		};

		
		//########################################//
		/* set main properties */
		//########################################//
		_s.setMainProperties = function(){
			
			_s.transform = _s.getTransform();
			_s.setPosition(_s.position);
			_s.setOverflow(_s.overflow);
			_s.opacityType = _s.getOpacityType();
			
			if(_s.opacityType == "opacity") _s.isHtml5_bl = true;
			
			if(_s.opacityType == "filter") _s.screen.style.filter = "inherit";
			_s.screen.style.left = "0px";
			_s.screen.style.top = "0px";
			_s.screen.style.margin = "0px";
			_s.screen.style.padding = "0px";
			_s.screen.style.maxWidth = "none";
			_s.screen.style.maxHeight = "none";
			_s.screen.style.border = "none";
			_s.screen.style.lineHeight = "1";
			_s.screen.style.backgroundColor = "transparent";
			_s.screen.style.backfaceVisibility = "hidden";
			_s.screen.style.webkitBackfaceVisibility = "hidden";
			_s.screen.style.MozBackfaceVisibility = "hidden";	
			_s.screen.style.MozImageRendering = "optimizeSpeed";	
			_s.screen.style.WebkitImageRendering = "optimizeSpeed";
			
			if(type == "img"){
				_s.setWidth(_s.screen.width);
				_s.setHeight(_s.screen.height);
			}
		};
			
		_s.setBackfaceVisibility =  function(){
			_s.screen.style.backfaceVisibility = "visible";
			_s.screen.style.webkitBackfaceVisibility = "visible";
			_s.screen.style.MozBackfaceVisibility = "visible";		
		};
		

		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		_s.setSelectable = function(val){
			if(!val){
				_s.screen.style.userSelect = "none";
				_s.screen.style.MozUserSelect = "none";
				_s.screen.style.webkitUserSelect = "none";
				_s.screen.style.khtmlUserSelect = "none";
				_s.screen.style.oUserSelect = "none";
				_s.screen.style.msUserSelect = "none";
				_s.screen.msUserSelect = "none";
				_s.screen.ondragstart = function(e){return false;};
				_s.screen.onselectstart = function(){return false;};
				_s.screen.ontouchstart = function(){return false;};
				_s.screen.style.webkitTouchCallout='none';
				_s.hasBeenSetSelectable_bl = true;
			}
		};
		
		_s.getScreen = function(){
			return _s.screen;
		};
		
		_s.setVisible = function(val){
			_s.visible = val;
			if(_s.visible == true){
				_s.screen.style.visibility = "visible";
			}else{
				_s.screen.style.visibility = "hidden";
			}
		};
		
		_s.getVisible = function(){
			return _s.visible;
		};
			
		_s.setResizableSizeAfterParent = function(){
			_s.screen.style.width = "100%";
			_s.screen.style.height = "100%";
		};
		
		_s.getStyle = function(){
			return _s.screen.style;
		};
		
		_s.setOverflow = function(val){
			_s.overflow = val;
			_s.screen.style.overflow = _s.overflow;
		};
		
		_s.setPosition = function(val){
			_s.position = val;
			_s.screen.style.position = _s.position;
		};
		
		_s.setDisplay = function(val){
			_s.display = val;
			_s.screen.style.display = _s.display;
		};
		
		_s.setButtonMode = function(val){
			_s.buttonMode = val;
			if(_s.buttonMode ==  true){
				_s.screen.style.cursor = "pointer";
			}else{
				_s.screen.style.cursor = "default";
			}
		};
		
		_s.setBkColor = function(val){
			_s.screen.style.backgroundColor = val;
		};
		
		_s.setInnerHTML = function(val){
			_s.innerHTML = val;
			_s.screen.innerHTML = _s.innerHTML;
		};
		
		_s.getInnerHTML = function(){
			return _s.innerHTML;
		};
		
		_s.getRect = function(){
			return _s.screen.getBoundingClientRect();
		};
		
		_s.setAlpha = function(val){
			_s.alpha = val;
			if(_s.opacityType == "opacity"){
				_s.screen.style.opacity = _s.alpha;
			}else if(_s.opacityType == "filter"){
				_s.screen.style.filter = "alpha(opacity=" + _s.alpha * 100 + ")";
				_s.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(_s.alpha * 100) + ")";
			}
		};
		
		_s.getAlpha = function(){
			return _s.alpha;
		};
		
		_s.getRect = function(){
			return _s.screen.getBoundingClientRect();
		};
		
		_s.getGlobalX = function(){
			return _s.getRect().left;
		};
		
		_s.getGlobalY = function(){
			return _s.getRect().top;
		};
		
		_s.setX = function(val){
			_s.x = val;
			if(_s.hasTransform3d_bl){
				_s.screen.style[_s.transform] = 'translate3d(' + _s.x + 'px,' + _s.y + 'px,0)';
			}else if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = 'translate(' + _s.x + 'px,' + _s.y + 'px)';
			}else{
				_s.screen.style.left = _s.x + "px";
			}
		};
		
		_s.getX = function(){
			return  _s.x;
		};
		
		_s.setY = function(val){
			_s.y = val;
			if(_s.hasTransform3d_bl){
				_s.screen.style[_s.transform] = 'translate3d(' + _s.x + 'px,' + _s.y + 'px,0)';	
			}else if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = 'translate(' + _s.x + 'px,' + _s.y + 'px)';
			}else{
				_s.screen.style.top = _s.y + "px";
			}
		};
		
		_s.getY = function(){
			return  _s.y;
		};
		
		_s.setWidth = function(val){
			_s.w = val;
			if(_s.type == "img"){
				_s.screen.width = _s.w;
				_s.screen.style.width = _s.w + "px";
			}else{
				_s.screen.style.width = _s.w + "px";
			}
		
		};
		
		_s.getWidth = function(){
			if(_s.type == "div"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				return _s.w;
			}else if(_s.type == "img"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				if(_s.screen.width != 0) return  _s.screen.width;
				return _s._w;
			}else if( _s.type == "canvas"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				return _s.w;
			}
		};
		
		_s.setHeight = function(val){
			_s.h = val;
			if(_s.type == "img"){
				_s.screen.height = _s.h;
				_s.screen.style.height = _s.h + "px";
			}else{
				_s.screen.style.height = _s.h + "px";
			}
		};
		
		_s.getHeight = function(){
			if(_s.type == "div"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				return _s.h;
			}else if(_s.type == "img"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				if(_s.screen.height != 0) return  _s.screen.height;
				return _s.h;
			}else if(_s.type == "canvas"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				return _s.h;
			}
		};
		

		//#####################################//
		/* DOM list */
		//#####################################//
		_s.addChild = function(e){
			if(_s.contains(e)){	
				_s.children_ar.splice(FWDUtils.indexOfArray(_s.children_ar, e), 1);
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}else{
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}
		};
		
		_s.removeChild = function(e){
			if(_s.contains(e)){
				_s.children_ar.splice(FWDUtils.indexOfArray(_s.children_ar, e), 1);
				_s.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child dose't exist, it can't be removed!");
			};
		};
		
		_s.contains = function(e){
			if(FWDUtils.indexOfArray(_s.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		_s.addChildAt = function(e, index){
			if(_s.getNumChildren() == 0){
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}else if(index == 1){
				_s.screen.insertBefore(e.screen, _s.children_ar[0].screen);
				_s.screen.insertBefore(_s.children_ar[0].screen, e.screen);	
				if(_s.contains(e)){
					_s.children_ar.splice(FWDUtils.indexOfArray(_s.children_ar, e), 1, e);
				}else{
					_s.children_ar.splice(FWDUtils.indexOfArray(_s.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > _s.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				_s.screen.insertBefore(e.screen, _s.children_ar[index].screen);
				if(_s.contains(e)){
					_s.children_ar.splice(FWDUtils.indexOfArray(_s.children_ar, e), 1, e);
				}else{
					_s.children_ar.splice(FWDUtils.indexOfArray(_s.children_ar, e), 0, e);
				}
			}
		};
		
		_s.getChildAt = function(index){
			if(index < 0  || index > _s.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(_s.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
			return _s.children_ar[index];
		};
		
		_s.removeChildAtZero = function(){
			_s.screen.removeChild(_s.children_ar[0].screen);
			_s.children_ar.shift();
		};
		
		_s.getNumChildren = function(){
			return _s.children_ar.length;
		};
		
		
		//################################//
		/* event dispatcher */
		//#################################//
		_s.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = _s;
	        _s.listeners.events_ar.push(event);
	    };
	    
	    _s.dispatchEvent = function(type, props){
	    	if(_s.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s && _s.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		_s.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		_s.listeners.events_ar[i].listener.call(_s, _s.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    _s.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s 
	        			&& _s.listeners.events_ar[i].type === type
	        			&& _s.listeners.events_ar[i].listener ===  listener
	        	){
	        		_s.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    

	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		_s.disposeImage = function(){
			if(_s.type == "img") _s.screen.src = null;
		};
		
		
		_s.destroy = function(){
		
			if(_s.hasBeenSetSelectable_bl){
				_s.screen.ondragstart = null;
				_s.screen.onselectstart = null;
				_s.screen.ontouchstart = null;
			};
			
			_s.screen.removeAttribute("style");
			
			//destroy properties
			_s.listeners = [];
			_s.listeners = null;
			_s.children_ar = [];
			_s.children_ar = null;
			_s.style = null;
			_s.screen = null;
			_s.transform = null;
			_s.position = null;
			_s.overflow = null;
			_s.display = null;
			_s.visible = null;
			_s.buttonMode = null;
			_s.x = null;
			_s.y = null;
			_s.w = null;
			_s.h = null;
			_s.rect = null;
			_s.alpha = null;
			_s.innerHTML = null;
			_s.opacityType = null;
			_s.isHtml5_bl = null;
		
			_s.hasTransform3d_bl = null;
			_s.hasTransform2d_bl = null;
			_s = null;
		};
		
	    /* init */
		_s.init();
	};
	
	window.FWDDisplayObject = FWDDisplayObject;
}(window));/**
 * Royal Audio Player
 * Event dispatcher.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
	
	var FWDEventDispatcher = function (){

		'use strict';
		
	    this.listeners = {events_ar:[]};
	     
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    	
	    	this.addListener = null;
		    this.dispatchEvent = null;
		    this.removeListener = null;
	    };
	    
	};	
	
	window.FWDEventDispatcher = FWDEventDispatcher;
}(window));/**
 * Royal Audio Player
 * Main class.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAP = function(props){

		'use strict';
		
		var _s = this;
		_s.listeners = {events_ar:[]};
	
		_s.mainFolderPath_str = props.mainFolderPath;
		if((_s.mainFolderPath_str.lastIndexOf("/") + 1) != _s.mainFolderPath_str.length){
			_s.mainFolderPath_str += "/";
		}
		
		_s.skinPath_str = props.skinPath;
		if((_s.skinPath_str.lastIndexOf("/") + 1) != _s.skinPath_str.length){
			_s.skinPath_str += "/";
		}
		
		_s.warningIconPath_str = _s.mainFolderPath_str + _s.skinPath_str + "warningIcon.png";
		
		_s.useYoutube_bl = props.useYoutube || "no"; 
		_s.useYoutube_bl = _s.useYoutube_bl == "yes" ? true : false;
		
		_s.useVideo_bl = props.useVideo || "no"; 
		_s.useVideo_bl = _s.useVideo_bl == "yes" ? true : false;
		
		_s.instanceName_str = props.instanceName;
		if(!_s.instanceName_str){
			alert("FWDRAP instance name is requires please make sure that the instanceName parameter exsists and it's value is uinique.");
			return;
		}
		
		if(window[_s.instanceName_str]){
			alert("FWDRAP instance name " + _s.instanceName_str +  " is already defined and contains a different instance reference, set a different instance name.");
			return;
		}else{
			window[_s.instanceName_str] = _s;
		}
		
		if(document.cookie.indexOf("FWDRAP=" + _s.instanceName_str) != -1 && !_s.isMbl) return;
		
		FWDRAP.instaces_ar.push(_s);	
	
		/* Init */
		_s.init = function(){
			
			FWDTweenLite .ticker.useRAF(false);
			_s.props_obj = props;
			 
		
			if(!_s.props_obj){
				alert("FWDRAP constructor properties object is not defined!");
				return;
			}
			
			_s.useOnlyAPI_bl = _s.props_obj.useOnlyAPI; 
			_s.useOnlyAPI_bl = _s.useOnlyAPI_bl == "yes" ? true : false;
			
			if(!_s.props_obj.parentId && !_s.useOnlyAPI_bl){		
				alert("Property parentId is not defined in the FWDRAP constructor, _s property represents the div id into which the megazoom is added as a child!");
				return;
			}
			
			if(!FWDRAPUtils.getChildById(_s.props_obj.parentId) && !_s.useOnlyAPI_bl){
				alert("FWDRAP holder div is not found, please make sure that the div exsists and the id is correct! " + _s.props_obj.parentId);
				return;
			}

			_s.stageContainer = FWDRAPUtils.getChildById(_s.props_obj.parentId);
			
			_s.popupWindowBackgroundColor = _s.props_obj.popupWindowBackgroundColor || "#000000";
			
			_s.prevCatId = -1;
			_s.catId = -1;
			_s.id = -1;
			_s.prevId = -1;
			_s.lastPercentPlayed = 0;
			_s.totalAudio = 0;
			_s.sW = 0;
			_s.sH = 0;
			_s.maxWidth = _s.props_obj.maxWidth || 2000;
			_s.maxHeight = 0;
			_s.popupWindowWidth = _s.props_obj.popupWindowWidth || 500;
			_s.popupWindowHeight = _s.props_obj.popupWindowHeight || 400;
		
			_s.hasOpenedInPopup_bl = false;
			_s.isAPIReady_bl = false;
			_s.isPlaylistLoaded_bl = false;
			_s.isFlashScreenReady_bl = false;
			_s.orintationChangeComplete_bl = true;
			_s.useDeepLinking_bl = _s.props_obj.useDeepLinking;
			_s.useDeepLinking_bl = _s.useDeepLinking_bl == "yes" ? true : false;
			_s.openInPopup_bl = false;
			
			_s.initializeOnlyWhenVisible_bl = _s.props_obj.initializeOnlyWhenVisible; 
			_s.initializeOnlyWhenVisible_bl = _s.initializeOnlyWhenVisible_bl == "yes" ? true : false;
			
			setTimeout(function(){
				
				try{
					if(window.opener 
						&& window.opener.openedPlayerInstance 
						&& window.opener.openedPlayerInstance == _s.instanceName_str){
						_s.openInPopup_bl = true;
						_s.popupWindow = window.opener[_s.instanceName_str];
						window.opener[_s.instanceName_str].removeAndDisablePlayer();
					}else{
						if(window.opener 
						&& window.opener.openedPlayerInstance 
						&& window.opener.openedPlayerInstance != _s.instanceName_str){
							return;
						}
					}
				}catch(e){}
				
				
				_s.isMbl = FWDRAPUtils.isMobile;
				_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
				_s.setupmain_do();
				_s.startResizeHandler();
				
				if(_s.initializeOnlyWhenVisible_bl){
					window.addEventListener("scroll", _s.onInitlalizeScrollHandler);
					_s.initTimer_to = setTimeout(_s.onInitlalizeScrollHandler, 500);
				}else{
					_s.setupPlayer();
				}
				
			}, 49);
			
		
			_s.googleAnalyticsTrackingCode = _s.props_obj.googleAnalyticsTrackingCode; 
			if(!window['gtag'] && _s.googleAnalyticsTrackingCode && !FWDRAPUtils.isLocal){
				var script = document.createElement('script');
			    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + _s.googleAnalyticsTrackingCode;
			    script.setAttribute("async", "true");
			    script.onload = function() {
			      	_s.initGoogleAnalytics();
			    };
			    document.head.appendChild(script);
			}else if(window['gtag'] && _s.googleAnalyticsTrackingCode && !FWDRAPUtils.isLocal){
				 _s.initGoogleAnalytics();
			}
			
		};

		_s.initGoogleAnalytics = function(){
			  // Once the script is loaded, initialize Google Analytics
		      window.dataLayer = window.dataLayer || [];
			  _s.gtag = function(){dataLayer.push(arguments);}

		      _s.gtag('js', new Date());
		      _s.gtag('config', _s.googleAnalyticsTrackingCode);
		}
		
		_s.onInitlalizeScrollHandler = function(){
			
			var scrollOffsets = FWDRAPUtils.getScrollOffsets();
			_s.pageXOffset = scrollOffsets.x;
			_s.pageYOffset = scrollOffsets.y;
			
			if(_s.main_do.getRect().top >= -_s.sH && _s.main_do.getRect().top < _s.ws.h){
				window.removeEventListener("scroll", _s.onInitlalizeScrollHandler);
				_s.setupPlayer();
			}
		};
		
		_s.setupPlayer = function(){
			clearTimeout(_s.initTimer_to);
			_s.setupInfo();
			_s.setupData();
		}
		
		_s.popup = function(){
			if(_s.popupWindow && !_s.popupWindow.closed) return
			var myWindow;
			var left = (screen.width/2)-(_s.popupWindowWidth/2);
			var top = (screen.height/2)-(_s.popupWindowHeight/2);
			var loc = "no";
			if(FWDRAPUtils.isSafari) loc = "yes";
			
			try{
				if(FWDRAPUtils.isMobile){
					_s.popupWindow = window.open(location.href);
				}else{
					_s.popupWindow = window.open(location.href,"",'location='+loc+', width='+_s.popupWindowWidth+', height='+_s.popupWindowHeight+', top='+top+', left='+left);
				}
				
				if(_s.popupWindow){
					_s.stageContainer.style.display = "none";
					if(_s.preloader_do) _s.preloader_do.hide(false);
					_s._d.closeData();
					_s.stop();
					window.openedPlayerInstance = _s.instanceName_str;
					_s.hasOpenedInPopup_bl = true;
					_s.isAPIReady_bl = false;
				}
				_s.stopResizeHandler();
				_s.dispatchEvent(FWDRAP.POPUP);
			}catch(e){
			}
		};
		
		
		_s.removeAndDisablePlayer = function(){
			try{
				_s.stageContainer.style.display = "none";
			}catch(e){}
		};
		

		//#############################################//
		/* setup main do */
		//#############################################//
		_s.setupmain_do = function(){
			_s.main_do = new FWDRAPDisplayObject("div", "relative");
			_s.main_do.getStyle().msTouchAction = "none";
			_s.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			_s.main_do.setBackfaceVisibility();
			_s.main_do.setOverflow("visible");
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) _s.main_do.setSelectable(false);
			
			if(_s.openInPopup_bl){
				if(!FWDRAPUtils.isIEAndLessThen9) document.getElementsByTagName("body")[0].style.display = "none";
				document.documentElement.appendChild(_s.main_do.screen);
				_s.main_do.setPosition("fixed");
				_s.main_do.getStyle().zIndex = "2147483646";
				document.documentElement.style.overflow = "hidden";
				document.documentElement.style.backgroundColor = _s.popupWindowBackgroundColor;	
				_s.main_do.setBkColor(_s.popupWindowBackgroundColor);
				_s.main_do.getStyle().width = "100%";
				_s.main_do.setHeight(3000);
			}else{
				_s.stageContainer.style.overflow = "visible";
				_s.stageContainer.appendChild(_s.main_do.screen);
			}
		};
		

		//#############################################//
		/* setup info_do */
		//#############################################//
		_s.setupInfo = function(){
			FWDRAPInfo.setPrototype();
			_s.info_do = new FWDRAPInfo(_s, _s.warningIconPath_str);
		};	
		

		//#############################################//
		/* resize handler */
		//#############################################//
		_s.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", _s.onResizeHandler);
			}else if(window.attachEvent){
				window.attachEvent("onresize", _s.onResizeHandler);
			}
			_s.onResizeHandler(true);
			_s.resizeHandlerId_to = setTimeout(function(){_s.resizeHandler(true);}, 50);
		};
		
		_s.stopResizeHandler = function(){
			clearTimeout(_s.resizeHandlerId_to);
			clearTimeout(_s.resizeHandler2Id_to);
			clearTimeout(_s.orientationChangeId_to);
			if(window.removeEventListener){
				window.removeEventListener("resize", _s.onResizeHandler);
			}else if(window.detachEvent){
				window.detachEvent("onresize", _s.onResizeHandler);
			}	
		};
		
		_s.onResizeHandler = function(e){
			_s.resizeHandler();
			clearTimeout(_s.resizeHandler2Id_to);
			_s.resizeHandler2Id_to = setTimeout(function(){_s.resizeHandler();}, 300);
		};
		
		_s.resizeHandler = function(overwrite){
			
			_s.ws = FWDRAPUtils.getViewportSize();
			
			if(!_s.openInPopup_bl){
				_s.stageContainer.style.width = "100%";
				if(_s.stageContainer.offsetWidth > _s.maxWidth && !_s.openInPopup_bl){
					_s.stageContainer.style.width = _s.maxWidth + "px";
				}
				_s.sW = _s.stageContainer.offsetWidth;
				if(_s.controller_do) _s.maxHeight = _s.controller_do.h;
				
				_s.sH = _s.maxHeight;
				_s.main_do.setWidth(_s.sW);
			}else{
				_s.sW = _s.ws.w;
				if(_s.controller_do){
					_s.sH = _s.controller_do.sH;
				}
			}
			
			if(_s.preloader_do) _s.positionPreloader();
			if(_s.controller_do) _s.controller_do.resizeAndPosition(overwrite);
			if(_s.categories_do) _s.categories_do.resizeAndPosition();
			if(_s.playlist_do) _s.playlist_do.resizeAndPosition();
			if(_s.info_do && _s.info_do.isShowed_bl) _s.info_do.positionAndResize();
			if(_s.shareWindow_do && _s.shareWindow_do.isShowed_bl) _s.shareWindow_do.positionAndResize();
			if(_s.passWindow_do && _s.passWindow_do.isShowed_bl) _s.passWindow_do.positionAndResize();
			if(_s.lgdWindow_do && _s.lgdWindow_do.isShowed_bl) _s.lgdWindow_do.positionAndResize();
			if(_s.playbackRateWindow_do && _s.playbackRateWindow_do.isShowed_bl) _s.playbackRateWindow_do.positionAndResize();
			if(_s.atb_do && _s.atb_do.isShowed_bl) _s.atb_do.positionAndResize();
			if(_s.ytb_do) _s.ytb_do.resizeAndPosition();

			_s.positionVideoHolder();
			
			if(_s._d && !overwrite){
				_s.setStageContainerHeight(false);
			}else{
				_s.setStageContainerHeight(true);
			}
		};

		
		//#############################################//
		/* resize main container */
		//#############################################//
		_s.setStageContainerHeight = function(animate){
			
			if(!_s.controller_do){
				if(!_s.openInPopup_bl){
					if(_s.sH){
						_s.main_do.setHeight(_s.sH);
						_s.stageContainer.style.height = _s.sH + "px";
					}
				}
				return;
			}
			
			if(_s.openInPopup_bl){
				if(!_s.ws) _s.ws = FWDRAPUtils.getViewportSize();
				
				_s.sW = _s.ws.w;
				_s.main_do.setX(0);
				_s.main_do.setY(0);
				_s.main_do.getStyle().width = "100%";
				
				_s.main_do.setHeight(3000);
				_s.controller_do.setX(0);
				FWDAnimation.killTweensOf(_s.controller_do);
				
				if(!_s.isFullScreen_bl) _s.controller_do.setY(0);
				_s.controller_do.setX(0);
				
				if(!_s.isFullScreen_bl) _s.controller_do.setY(0);
				_s.controller_do.setX(0);
			
				if(_s.playlist_do){
					FWDAnimation.killTweensOf(_s.playlist_do);
					_s.playlist_do.setX(0);
					
					_s.playlist_do.setY(_s.controller_do.h);	
					
					_s.playlist_do.setX(0);
					_s.playlist_do.setY(_s.controller_do.h);
				}
				return;
			}
			
			if(_s.playlist_do && _s.playlist_do.isShowed_bl){
				_s.maxHeight += _s.playlist_do.h;
			}
			if(_s.playlist_do) _s.playlist_do.setY(_s.controller_do.h);
		
			FWDAnimation.killTweensOf(_s.stageContainer);
			if(animate){
				if(_s.playlist_do){
					if(_s.playlist_do.isShowed_bl){
						_s.main_do.setHeight(_s.controller_do.h + _s.playlist_do.h);
						FWDAnimation.to(_s.stageContainer, .8, {css:{height:_s.controller_do.h + _s.playlist_do.h}, ease:Expo.easeInOut});
					}else{
						_s.main_do.setHeight(_s.controller_do.h);
						FWDAnimation.to(_s.stageContainer, .8, {css:{height:_s.controller_do.h}, ease:Expo.easeInOut});
					}
				}else{
					_s.main_do.setHeight(_s.controller_do.h);
					FWDAnimation.to(_s.stageContainer, .8, {css:{height:_s.controller_do.h}, ease:Expo.easeInOut});
				}
				
			}else{
				if(_s.playlist_do){
					if(_s.playlist_do.isShowed_bl){
						_s.main_do.setHeight(_s.controller_do.h + _s.playlist_do.h);
						_s.stageContainer.style.height = (_s.controller_do.h + _s.playlist_do.h) + "px";
					}else{
						_s.main_do.setHeight(_s.controller_do.h);
						_s.stageContainer.style.height = (_s.controller_do.h) + "px";
					}
				}else{
					_s.main_do.setHeight(_s.controller_do.h);
					_s.stageContainer.style.height = _s.controller_do.h + "px";
				}
			}	
		};

		
		//#############################################//
		/* setup context menu */
		//#############################################//
		_s.setupContextMenu = function(){
			_s.customContextMenu_do = new FWDRAPContextMenu(_s.main_do, _s._d.rightClickContextMenu_str);
		};
		

		//#############################################//
		/* Setup main instances */
		//#############################################//
		_s.setupMainInstances = function(){
			if(_s.controller_do) return;
			_s.setupAudioScreen();
			_s.setupController();
			if(_s.useYoutube_bl || _s.useVideo_bl){
				_s.setupVideosHolder();
				_s.setupHider();
			}
			if(_s.useYoutube_bl) _s.setupYoutubePlayer();
			if(_s.useVideo_bl) _s.setupVideoScreen();
			if(_s._d.showShareButton_bl) _s.setupShareWindow();
			if(_s._d.showPlaybackRateButton_bl) _s.setupPlaybackRateWindow();
			_s.setupPasswordWindow();
			_s.setupLoggedInWindow();
			if(_s._d.showPlaylistsButtonAndPlaylists_bl) _s.setupCategories();
			if(_s._d.showPlayListButtonAndPlaylist_bl) _s.setupPlaylist();
			_s.controller_do.resizeAndPosition();
			if(_s._d.addKeyboardSupport_bl) _s.addKeyboardSupport();
		};
		

		//######################################//
		/* Add keyboard support */
		//######################################//
		_s.addKeyboardSupport = function(){
			document.addEventListener("keydown",  _s.onKeyDownHandler);	
			document.addEventListener("keyup",  _s.onKeyUpHandler);	
		};
		
		_s.onKeyDownHandler = function(e){

			if(_s.isSpaceDown_bl || !_s.hasStartedToPlay_bl || FWDRAP.isSearchedFocused_bl) return;
			_s.isSpaceDown_bl = true;
			if(e.preventDefault) e.preventDefault();

			//pause
			if(_s != FWDRAP.keyboardCurInstance) return
			if (e.keyCode == 32){
				
				if(_s.audioType_str == FWDRAP.YOUTUBE){
					if(!_s.ytb_do.isSafeToBeControlled_bl) return;
					_s.ytb_do.togglePlayPause();
				}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
					if(!_s.videoScreen_do.isSafeToBeControlled_bl) return;
					if(_s.videoScreen_do) _s.videoScreen_do.togglePlayPause();
				}else{
					if(!_s.audioScreen_do.isSafeToBeControlled_bl) return;
					_s.audioScreen_do.togglePlayPause();
				}
				if(e.preventDefault) e.preventDefault();
				return false;
			}else if (e.keyCode == 77){
				if(_s.volume != 0) _s.lastVolume = _s.volume;
				if(_s.volume != 0){
					_s.volume = 0;
				}else{
					_s.volume = _s.lastVolume;
				}
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 38){
				_s.volume += .1;
				if(_s.volume > 1) _s.volume = 1;
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 40){
				_s.volume -= .1;
				if(_s.volume < 0) _s.volume = 0;
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 77){
				if(_s.volume < 0) _s.volume = 0;
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 39 && !_s.isAdd_bl){
				var curTime = _s.getCurrentTime();
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				curTime = FWDRAPUtils.getSecondsFromString(curTime);
				curTime += 5;
				curTime = FWDRAPUtils.formatTime(curTime);
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				
				_s.scrubbAtTime(curTime);
			}else if (e.keyCode == 37 && !_s.isAdd_bl){
				var curTime = _s.getCurrentTime();
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				curTime = FWDRAPUtils.getSecondsFromString(curTime);
				curTime -= 5;
				curTime = FWDRAPUtils.formatTime(curTime);
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				_s.scrubbAtTime(curTime);
			}
		};
		
		_s.onKeyUpHandler = function(e){
			_s.isSpaceDown_bl = false;
		};


		//##########################################//
		/* Setup embed window */
		//##########################################//
		_s.setupLoggedInWindow = function(){
			FWDRAPPassword.setPrototype();
			_s.lgdWindow_do = new FWDRAPPassword(_s._d, _s, true);
		};

		
		//##########################################//
		/* Setup embed window */
		//##########################################//
		_s.setupPasswordWindow = function(){
			FWDRAPPassword.setPrototype();
			_s.passWindow_do = new FWDRAPPassword(_s._d, _s);
			_s.passWindow_do.addListener(FWDRAPPassword.CORRECT, _s.passordCorrect);
		};
		
		_s.passordCorrect = function(){
			_s.passWindow_do.hide();
			_s.hasPassedPassowrd_bl = true;
			_s.play();
		}
		

		//###############################################//
		/* Setup click screen */
		//###############################################//
		_s.setupClickScreen = function(){
			_s.dumyClick_do = new FWDRAPDisplayObject("div");
			_s.dumyClick_do.getStyle().width = "100%";
			_s.dumyClick_do.getStyle().height = "100%";
			if(FWDRAPUtils.isIE){
				_s.dumyClick_do.setBkColor("#00FF00");
				_s.dumyClick_do.setAlpha(.00001);
			}
			if(_s.dumyClick_do.screen.addEventListener){
				_s.dumyClick_do.screen.addEventListener("click", _s.playPauseClickHandler);
			}else if(_s.dumyClick_do.screen.attachEvent){
				_s.dumyClick_do.screen.attachEvent("onclick", _s.playPauseClickHandler);
			}
		};
		
		_s.playPauseClickHandler = function(e){
			if(e.button == 2) return;
			
			if(_s.disableClick_bl) return;
			_s.firstTapPlaying_bl = _s.isPlaying_bl;
			
			FWDRAP.keyboardCurInstance = _s;
			
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.ytb_do.togglePlayPause();
			}else if(_s.audioType_str == FWDRAP.VIDEO){
				if(_s.videoScreen_do) _s.videoScreen_do.togglePlayPause();
			}
		};
		

		//########################################//
		/* add double click and tap support */
		//########################################//
		_s.addDoubleClickSupport = function(){	
			if(!_s.isMbl && _s.dumyClick_do.screen.addEventListener){
				_s.dumyClick_do.screen.addEventListener("mousedown", _s.onFirstDown);
				if(FWDRAPUtils.isIEWebKit) _s.dumyClick_do.screen.addEventListener("dblclick", _s.onSecondDown);
			}else if(_s.isMbl){
				_s.dumyClick_do.screen.addEventListener("touchstart", _s.onFirstDown);
			}else if(_s.dumyClick_do.screen.addEventListener){
				_s.dumyClick_do.screen.addEventListener("mousedown", _s.onFirstDown);
			}
		};
		
		_s.onFirstDown = function(e){
			if(e.button == 2) return;
			if(_s.isFullscreen_bl && e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.firstTapX = viewportMouseCoordinates.screenX;
			_s.firstTapY = viewportMouseCoordinates.screenY;
			
			_s.firstTapPlaying_bl = _s.isPlaying_bl;
			
			if(FWDRAPUtils.isIEWebKit) return;
			
			if(_s.isMbl){
				_s.dumyClick_do.screen.addEventListener("touchstart", _s.onSecondDown);
				_s.dumyClick_do.screen.removeEventListener("touchstart", _s.onFirstDown);
			}else{
				if(_s.dumyClick_do.screen.addEventListener){
					_s.dumyClick_do.screen.addEventListener("mousedown", _s.onSecondDown);
					_s.dumyClick_do.screen.removeEventListener("mousedown", _s.onFirstDown);
				}
			}
			clearTimeout(_s.secondTapId_to);
			_s.secondTapId_to = setTimeout(_s.doubleTapExpired, 250);
		};
		
		_s.doubleTapExpired = function(){
			clearTimeout(_s.secondTapId_to);
			if(_s.isMbl){
				_s.dumyClick_do.screen.removeEventListener("touchstart", _s.onSecondDown);
				_s.dumyClick_do.screen.addEventListener("touchstart", _s.onFirstDown);
			}else{
				if(_s.dumyClick_do.screen.addEventListener){
					_s.dumyClick_do.screen.removeEventListener("mousedown", _s.onSecondDown);
					_s.dumyClick_do.screen.addEventListener("mousedown", _s.onFirstDown);
				}
			}
		};
		
		_s.onSecondDown = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);
			var dx;
			var dy;
			
			if(FWDRAPUtils.isIEWebKit) _s.firstTapPlaying_bl = _s.isPlaying_bl;

			if(e.touches && e.touches.length != 1) return;
			dx = Math.abs(viewportMouseCoordinates.screenX - _s.firstTapX);   
			dy = Math.abs(viewportMouseCoordinates.screenY - _s.firstTapY); 
		
			if(_s.isMbl && (dx > 10 || dy > 10)){
				return;
			}else if(!_s.isMbl && (dx > 2 || dy > 2)){
				return
			}
			_s.switchFullScreenOnDoubleClick();
			
			if(!FWDRAPUtils.isIEWebKit){
				if(_s.firstTapPlaying_bl){
					_s.play();
				}else{
					_s.pause();
				}
			}
		};
		
		_s.switchFullScreenOnDoubleClick = function(){
			_s.disableClick();
			if(!_s.isFullScreen_bl){
				_s.goFullScreen();
			}else{
				_s.goNormalScreen();
			}
		};

		
		//####################################//
		/* Setup hider */
		//####################################//
		_s.setupHider = function(){
			FWDRAPHider.setPrototype();
			_s.hider = new FWDRAPHider(_s.main_do, _s.controller_do.videoControllerHolder_do, 2000);
			_s.hider.addListener(FWDRAPHider.SHOW, _s.hiderShowHandler);
			_s.hider.addListener(FWDRAPHider.HIDE, _s.hiderHideHandler);
			_s.hider.addListener(FWDRAPHider.HIDE_COMPLETE, _s.hiderHideCompleteHandler);
		};
		
		_s.hiderShowHandler = function(){
			if(_s.controller_do) _s.controller_do.showVideoContoller(true);
			_s.showCursor();
		};
		
		_s.hiderHideHandler = function(){
			if(FWDRAPUtils.isIphone) return;
			
			if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do && !_s.videoScreen_do.isPlaying_bl){
				_s.hider.reset();
				return;
			}else if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && !_s.ytb_do.isPlaying_bl){
				_s.hider.reset();
				return;
			}
			
			if(FWDRAPUtils.hitTest(_s.controller_do.videoControllerHolder_do.screen, _s.hider.globalX, _s.hider.globalY)){
				_s.hider.reset();
				return;
			}
			
			_s.hideCursor();
			_s.controller_do.hideVideoContoller(true);
		};
		
		_s.hiderHideCompleteHandler = function(){};
		
		_s.setupVideosHolder = function(){
			
			_s.videosHolder_do = new FWDRAPDisplayObject("div");
			_s.videosHolder_do.getStyle().background = "url('" + _s._d.thumbnailBkPath_str + "')";
			_s.controller_do.mainHolder_do.addChild(_s.videosHolder_do);
			if(!_s._d.showVideoFullScreenButton_bl || _s.openInPopup_bl) return;
			
			_s.setupClickScreen();
			_s.setupDisableClick();
			_s.addDoubleClickSupport();
			
			
			_s.fullScreenButtonOverlay_do = new FWDRAPDisplayObject("div");
			_s.fullScreenButtonOverlay_do.getStyle().background = "url('" + _s._d.thumbnailBkPath_str + "')";
			_s.fullScreenButtonOverlay_do.screen.className = 'fwdrap-video-player-overlay';
			_s.fullScreenButtonOverlay_do.setWidth(_s._d.controllerHeight);
			_s.fullScreenButtonOverlay_do.setHeight(_s._d.controllerHeight);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s._d.useVectorIcons){				
				_s.largePlayButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-play'></span></div>",
						"fwdrap-large-play-button-normal-state",
						"fwdrap-large-play-button-selected-state"
				);
			}else{
				_s.largePlayButton_do = new FWDRAPSimpleButton(_s._d.largePlayN_img, _s._d.largePlayS_str, undefined, true,
														 _s._d.useHEX,
														 _s._d.nBC,
														 _s._d.sBC,
														 false, false, false, true);
			}
			
			_s.largePlayButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.largePlayButtonUpHandler);
			_s.largePlayButton_do.screen.className = 'fwdrap-large-play-button';
			_s.largePlayButton_do.hide();
			
			FWDRAPComplexButton.setPrototype();
			if(_s._d.useVectorIcons){
				_s.fullScreenButton_do = new FWDRAPComplexButton(0, 0, 0, 0, true, 0, 0, 0,
					"<span class='fwdrap-icon fwdrap-icon-screen-maximise'></span>",
					"<span class='fwdrap-icon fwdrap-icon-screen-minimise'></span>",
					"fwdrap-main-button-normal-state",
					"fwdrap-main-button-selected-state"
				);
			}else{
				_s.fullScreenButton_do = new FWDRAPComplexButton(
					_s._d.fullScreenN_img,
					_s._d.fullScreenS_str,
					_s._d.normalScreenN_img,
					_s._d.normalScreenS_str,
					true,
					_s._d.useHEX,
					_s._d.nBC,
					_s._d.sBC
				);
			}
			
			if(_s._d.showButtonsToolTips_bl){
				FWDRAPToolTip.setPrototype();
				_s.fullscreenToolTip_do = new FWDRAPToolTip(_s.fullScreenButton_do, _s._d.toopTipBk_str,  "full screen / normal screen", _s._d.toolTipsBkClr, _s._d.toolTipsFntClr, _s._d.toolTipsDl);
				document.documentElement.appendChild(_s.fullscreenToolTip_do.screen);
				_s.fullScreenButton_do.addListener(FWDRAPComplexButton.SHOW_TOOLTIP, _s.fullScreenShowToolTipHandler);
			}
			
			_s.fullScreenButton_do.addListener(FWDRAPComplexButton.MOUSE_UP, _s.toggleFullScreen);
			_s.videosHolder_do.setWidth(_s._d.controllerHeight);
			_s.videosHolder_do.setHeight(_s._d.controllerHeight);
			_s.checkShowFullScreenButtonHitTest();
			
			setTimeout(function(){
				_s.videosHolder_do.addChild(_s.dumyClick_do);
				if(_s.disableClick_do) _s.main_do.addChild(_s.disableClick_do);
				_s.videosHolder_do.addChild(_s.fullScreenButtonOverlay_do);
				if(!_s.controller_do.mainHolder_do.contains(_s.fullScreenButton_do)) _s.videosHolder_do.addChild(_s.fullScreenButton_do);
				_s.videosHolder_do.addChild(_s.largePlayButton_do);
				_s.hideFullScreenButtonAndOverlay(false, true);
			}, 50);
		};
		
		_s.largePlayButtonUpHandler = function(){
			_s.disableClick();
			_s.largePlayButton_do.hide();
			_s.play();
		};
		
		_s.fullScreenShowToolTipHandler = function(e){
			_s.controller_do.showToolTip(_s.fullScreenButton_do, _s.fullscreenToolTip_do, e.e);
		};
		
		_s.toggleFullScreen = function(){
			if(_s.isMbl && _s.fullScreenButton_do.alpha < .5){
				_s.showFullScreenButtonAndOverlay(true);
				return;
			}
			if(_s.fullScreenButton_do.currentState == 1){
				_s.goFullScreen();
			}else{
				_s.goNormalScreen();
			}
		}
		
		_s.positionVideoHolder = function(){
			if(_s.isFullScreen_bl){
				var viewportSize = FWDRAPUtils.getViewportSize();
				_s.videosHolder_do.setWidth(viewportSize.w);
				_s.videosHolder_do.setHeight(viewportSize.h);
				_s.largePlayButton_do.setX(parseInt((viewportSize.w - _s.largePlayButton_do.w)/2));
				_s.largePlayButton_do.setY(parseInt((viewportSize.h - _s.largePlayButton_do.h)/2));
			}else{
				if(_s.videosHolder_do ){
					_s.videosHolder_do.setWidth(_s._d.controllerHeight);
					_s.videosHolder_do.setHeight(_s._d.controllerHeight);
				}
			}
		};
		
		_s.checkShowFullScreenButtonHitTest = function(){
			if(_s.fullScreenButtonOverlay_do && _s.fullScreenButtonOverlay_do.screen.addEventListener){
				_s.fullScreenButtonOverlay_do.screen.addEventListener("mousemove", _s.checkShowFullScreenButtonHitTestHandler);
				window.removeEventListener("mousemove", _s.checkFullScreenAndOverlayHit);
			}
		};
		
		_s.checkShowFullScreenButtonHitTestHandler = function(){
			if(_s.isFullScreen_bl) return;
			if(_s.fullScreenButtonOverlay_do.screen.addEventListener){
				_s.fullScreenButtonOverlay_do.screen.removeEventListener("mousemove", _s.checkShowFullScreenButtonHitTestHandler);
				window.addEventListener("mousemove", _s.checkFullScreenAndOverlayHit);
			}
			_s.showFullScreenButtonAndOverlay(true);
		}
		
		_s.checkFullScreenAndOverlayHit = function(e){
			if(_s.isFullScreen_bl) return;
			if(_s.fullScreenButtonOverlay_do.screen.EventListener){
				_s.fullScreenButtonOverlay_do.screen.removeEventListener("mousemove", _s.showFullScreenButtonAndOverlay);
			}
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(!FWDRAPUtils.hitTest(_s.fullScreenButtonOverlay_do.screen, vc.screenX, vc.screenY)){
				_s.checkShowFullScreenButtonHitTest();
				_s.hideFullScreenButtonAndOverlay(true);
			}
		};
		
		_s.showFullScreenButtonAndOverlay = function(animate){
			if(_s.isFullScreenButtonAndOverlayShowed_bl) return;
			_s.isFullScreenButtonAndOverlayShowed_bl = true;
		
			FWDAnimation.killTweensOf(_s.fullScreenButton_do);
			FWDAnimation.killTweensOf(_s.fullScreenButtonOverlay_do);
			if(animate){
				FWDAnimation.to(_s.fullScreenButton_do, .8, {alpha:1, ease:Expo.easeOut});
				FWDAnimation.to(_s.fullScreenButtonOverlay_do, .8, {alpha:.6, ease:Expo.easeOut});
			}else{
				_s.fullScreenButton_do.setAlpha(1);
				_s.fullScreenButtonOverlay_do.setAlpha(.6);
			}
			_s.positionVideoHolder();
		};
		
		_s.hideFullScreenButtonAndOverlay = function(animate, overwrite){
			if(!_s.isFullScreenButtonAndOverlayShowed_bl && !overwrite) return;
			_s.isFullScreenButtonAndOverlayShowed_bl = false;
			if(!_s.fullScreenButton_do) return;
			FWDAnimation.killTweensOf(_s.fullScreenButton_do);
			FWDAnimation.killTweensOf(_s.fullScreenButtonOverlay_do);
			if(animate){
				if(_s.videosHolder_do.x == 0) FWDAnimation.to(_s.fullScreenButton_do, .8, {alpha:0, ease:Expo.easeOut});
				FWDAnimation.to(_s.fullScreenButtonOverlay_do, .8, {alpha:0, ease:Expo.easeOut});
			}else{
				if(_s.videosHolder_do.x == 0) _s.fullScreenButton_do.setAlpha(0);
				_s.fullScreenButtonOverlay_do.setAlpha(0);
			}
		};
		

		//#####################################//
		/* Setup disable click */
		//#####################################//
		_s.setupDisableClick = function(){
			_s.disableClick_do = new FWDRAPDisplayObject("div");
		};
		
		_s.disableClick = function(){
			_s.disableClick_bl = true;
			clearTimeout(_s.disableClickId_to);
			if(_s.disableClick_do){
				_s.disableClick_do.getStyle().width = "5000px";
				_s.disableClick_do.getStyle().height = "5000px";
			}
			_s.disableClickId_to =  setTimeout(function(){
				if(_s.disableClick_do){
					_s.disableClick_do.setWidth(0);
					_s.disableClick_do.setHeight(0);
				}
				_s.disableClick_bl = false;
			}, 500);
		};
		

		//#############################################//
		/* go fullscreen / normal screen */
		//#############################################//
		_s.goFullScreen = function(){
			if(!_s.isAPIReady_bl) return;
			
			if(document.addEventListener){
				document.addEventListener("fullscreenchange", _s.onFullScreenChange);
				document.addEventListener("mozfullscreenchange", _s.onFullScreenChange);
				document.addEventListener("webkitfullscreenchange", _s.onFullScreenChange);
				document.addEventListener("MSFullscreenChange", _s.onFullScreenChange);
			}
			
			if(document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			}else if(document.documentElement.mozRequestFullScreen){ 
				document.documentElement.mozRequestFullScreen();
			}else if(document.documentElement.webkitRequestFullScreen){
				document.documentElement.webkitRequestFullScreen();
			}else if(document.documentElement.msRequestFullscreen){
				document.documentElement.msRequestFullscreen();
			}
			
			_s.disableClick();
			
			_s.main_do.getStyle().position = "fixed";
			_s.controller_do.setOverflow("visible");
			_s.controller_do.mainHolder_do.setOverflow("visible");
			document.documentElement.style.overflow = "hidden";
			_s.main_do.getStyle().zIndex = 9999999999998;
			if(_s.playlist_do) _s.playlist_do.setVisible(false);
			_s.controller_do.goFullScreen();
			_s.controller_do.videoControllerHolder_do.addChild(_s.fullScreenButton_do);
			_s.videosHolder_do.setX(0);
			_s.fullScreenButtonOverlay_do.setVisible(false);
		
			_s.isFullScreen_bl = true;
			_s.fullScreenButton_do.setButtonState(0);
			
			var scrollOffsets = FWDRAPUtils.getScrollOffsets();
			_s.lastX = scrollOffsets.x;
			_s.lastY = scrollOffsets.y;
			if(_s.hider && _s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do && _s.videoScreen_do.isPlaying_bl){
				_s.hider.start();
			}else if(_s.hider && _s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && _s.ytb_do.isPlaying_bl){
				_s.hider.start();
			}
			if(_s.playlist_do && _s.playlist_do.ascDscButton_do) _s.playlist_do.ascDscButton_do.setAlpha(0);
			
			if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do && !_s.videoScreen_do.isPlaying_bl){
				_s.largePlayButton_do.show();
			}else if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && !_s.ytb_do.isPlaying_bl && !_s.isMbl){
				_s.largePlayButton_do.show();
			}
			
			window.scrollTo(0,0);
		
			if(_s.isMbl) window.addEventListener("touchmove", _s.disableFullScreenOnMobileHandler, {passive:false});
			
			_s.resizeHandler(true);
			
		};
		
		_s.disableFullScreenOnMobileHandler = function(e){
			if(e.preventDefault) e.preventDefault();
		};
		
		_s.goNormalScreen = function(){		
			if(!_s.isAPIReady_bl || !_s.isFullScreen_bl) return;
			
			if(document.cancelFullScreen) {  
				document.cancelFullScreen();  
			}else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			}else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}else if (document.msExitFullscreen) {  
				document.msExitFullscreen();  
			}
			_s.disableClick();
			_s.addmain_doToTheOriginalParent();
			_s.showCursor();
			if(_s.fullScreenButton_do) _s.fullScreenButton_do.setButtonState(1);
			if(_s.playlist_do && _s.playlist_do.ascDscButton_do) _s.playlist_do.ascDscButton_do.setAlpha(1);
			_s.isFullScreen_bl = false;
		};
		
		_s.addmain_doToTheOriginalParent = function(){
			if(!_s.isFullScreen_bl) return;
			
			if(document.removeEventListener){
				document.removeEventListener("fullscreenchange", _s.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", _s.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", _s.onFullScreenChange);
				document.removeEventListener("MSFullscreenChange", _s.onFullScreenChange);
			}
			
			_s.isFullScreen_bl = false;
			if(!_s.isEmbedded_bl){
				if(FWDRAPUtils.isIEAndLessThen9){
					document.documentElement.style.overflow = "auto";
				}else{
					document.documentElement.style.overflow = "visible";
				}	
				_s.main_do.getStyle().position = "relative";
			}

			_s.controller_do.setOverflow("hidden");
			_s.controller_do.mainHolder_do.setOverflow("hidden");
			_s.controller_do.goNormalScreen();
			_s.videosHolder_do.addChild(_s.fullScreenButton_do);
			document.documentElement.style.overflow = "visible";

			_s.main_do.getStyle().zIndex = 0;
			if(_s.playlist_do){
				_s.playlist_do.setVisible(true);
				if(_s.playlist_do.ascDscButton_do) _s.playlist_do.ascDscButton_do.setAlpha(1);
			}
			_s.hideFullScreenButtonAndOverlay(false);
			_s.fullScreenButtonOverlay_do.setVisible(true);
			_s.checkShowFullScreenButtonHitTest();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			_s.resizeHandler(true);
			
			window.scrollTo(_s.lastX, _s.lastY);
			if(!FWDRAPUtils.isIE){
				setTimeout(function(){
					window.scrollTo(_s.lastX, _s.lastY);
				}, 150);
			}
			
			if(_s.isMbl) window.removeEventListener("touchmove", _s.disableFullScreenOnMobileHandler);
		};
		
		_s.onFullScreenChange = function(e){
			if(!(document.fullScreen || document.msFullscreenElement  || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen)){
				_s.fullScreenButton_do.setButtonState(1);
				_s.addmain_doToTheOriginalParent();
				_s.isFullScreen_bl = false;
				_s.resizeHandler(true);
			}
		};
		

		//###########################################//
		/* Hide / show cursor */
		//###########################################//
		_s.hideCursor = function(){
			document.documentElement.style.cursor = "none";
			if(_s.dumyClick_do) _s.dumyClick_do.getStyle().cursor = "none";
			document.getElementsByTagName("body")[0].style.cursor = "none";
		};
		
		_s.showCursor = function(){
			document.documentElement.style.cursor = "auto";
			document.getElementsByTagName("body")[0].style.cursor = "auto";
			if(_s.dumyClick_do) _s.dumyClick_do.getStyle().cursor = "auto";
		};
	

		//#############################################//
		/* setup _d */
		//#############################################//
		_s.setupData = function(){
			if(_s._d) return;
			FWDRAPAudioData.setPrototype();
			_s._d = new FWDRAPAudioData(_s.props_obj, _s.rootElement_el, _s);

			_s._d.addListener(FWDRAPAudioData.UPDATE_IMAGE, _s.onImageUpdate);
			_s._d.addListener(FWDRAPAudioData.PRELOADER_LOAD_DONE, _s.onPreloaderLoadDone);
			_s._d.addListener(FWDRAPAudioData.SOUNDCLOUD_TRACK_READY, _s.onSoundClooudReady);
			_s._d.addListener(FWDRAPAudioData.RADIO_TRACK_READY, _s.onRadioReady);
			_s._d.addListener(FWDRAPAudioData.RADIO_TRACK_UPDATE, _s.onRadioTrackUpdate);
			_s._d.addListener(FWDRAPAudioData.LOAD_ERROR, _s._dLoadError);
			_s._d.addListener(FWDRAPAudioData.SKIN_PROGRESS, _s._dSkinProgressHandler);
			_s._d.addListener(FWDRAPAudioData.SKIN_LOAD_COMPLETE, _s._dSkinLoadComplete);
			_s._d.addListener(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE, _s._dPlayListLoadComplete);
		};
		
		_s.onSoundClooudReady = function(e){
			_s._d.playlist_ar[_s.id].source = e.source;
			_s.setSource();
			if(_s.isPlaylistItemClicked_bl) _s.play();
		};
		
		_s.onImageUpdate = function(e){
			_s.controller_do.loadThumb(e.image);
		}
		
		_s.onRadioReady = function(e){
			if(!_s.isShoutcast_bl && !_s.isIcecast_bl){
				_s._d.closeJsonPLoader();
				return
			}
			
			_s.audioPath = _s.radioSource_str = e.source;
			if(_s.prevAudioPath == _s.audioPath && _s.prevSongTitle == e.songTitle) return;
			
			if(_s.prevAudioPath != _s.audioPath){
				_s.setSource();
				if(_s.isPlaylistItemClicked_bl) _s.play();
			}

			_s.controller_do.setTitle(_s._d.playlist_ar[_s.id].title + ' - ' + e.songTitle);
			
			_s.prevAudioPath = _s.audioPath;
			_s.prevSongTitle = e.songTitle;
		};
		
		_s.onRadioTrackUpdate = function(e){
			_s.curTitle = e.songTitle;
			if(_s.curTitle ==  _s.prevTitle) return;
			_s.controller_do.setTitle(e.songTitle);
			_s.prevTitle = _s.curTitle;
		}
		
		_s.onPreloaderLoadDone = function(){

			_s.maxHeight = _s._d.controllerHeight;
			_s.setupPreloader();
			if(!_s.isMbl) _s.setupContextMenu();
			
			_s.resizeHandler();
			
			if(!_s.openInPopup_bl) _s.main_do.setHeight(_s._d.controllerHeight);
			_s.stageContainer.style.height = _s._d.controllerHeight + "px";
		};
		
		_s._dLoadError = function(e){
			_s.maxHeight = 200;
			if(_s.preloader_do) _s.preloader_do.hide(false);
			_s.main_do.addChild(_s.info_do);
			_s.info_do.showText(e.text);
			if(e.doNotResize){
				_s.main_do.setHeight(_s._d.controllerHeight);
				_s.stageContainer.style.height = (_s._d.controllerHeight) + "px";	
			}
			
			_s.dispatchEvent(FWDRAP.ERROR, {error:e.text});
		};
		
		_s._dSkinProgressHandler = function(e){};
		
		_s._dSkinLoadComplete = function(){	
			if(_s.openInPopup_bl) _s._d.showPopupButton_bl = false;
			if(_s.useDeepLinking_bl){
				setTimeout(function(){_s.setupDL();}, 200);
			}else{
				if(FWDRAPUtils.getCookie('FWDRAPusePP')){
					_s.catId = FWDRAPUtils.getCookie('FWDRAPcatId');
					_s.id = FWDRAPUtils.getCookie('FWDRAPid');
				}else if(_s.openInPopup_bl){
					_s.catId = _s.popupWindow.catId;
					_s.id = _s.popupWindow.id;
				}else{
					_s.catId = _s._d.startAtPlaylist;
					_s.id = _s._d.startAtTrack;
				}
				_s.loadInternalPlaylist();
			}
			_s.setupContinousPlayback();
		};
	
		_s._dPlayListLoadComplete = function(){
		
			if(!_s.isAPIReady_bl){
				_s.dispatchEvent(FWDRAP.READY);
				
			} 
			if(_s._d.randomizePlaylist_bl) _s._d.playlist_ar = FWDRAPUtils.randomizeArray(_s._d.playlist_ar);
			if(_s._d.startAtRandomTrack_bl){
				_s.id = Math.max(0,parseInt(Math.random() * _s._d.playlist_ar.length) - 1);
				if(_s.useDeepLinking_bl){
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
				}
			}
			
			_s.isAPIReady_bl = true;
			_s.isPlaylistLoaded_bl = true;
			if(_s.openInPopup_bl){
				_s._d.autoPlay_bl = true;
				_s._d.showPlayListByDefault_bl = true;
			}
		
			
			_s.setupMainInstances();
			_s.updatePlaylist();
			_s.resizeHandler();
		
			_s.dispatchEvent(FWDRAP.LOAD_PLAYLIST_COMPLETE);
		};
		
		_s.updatePlaylist = function(){
			if(_s.main_do) if(_s.main_do.contains(_s.info_do)) _s.main_do.removeChild(_s.info_do);
			_s.preloader_do.hide(true);
			_s.prevId = -1;
			_s.totalAudio = _s._d.playlist_ar.length;
			_s.controller_do.enableControllerWhileLoadingPlaylist();
	    	_s.controller_do.cleanThumbnails(true);
	    	
	    	if(_s.playlist_do) _s.playlist_do.updatePlaylist(_s._d.playlist_ar);
	    	if(_s.openInPopup_bl && _s.popupWindow.videoScreen_do) _s.lastPercentPlayed = _s.popupWindow.videoScreen_do.lastPercentPlayed;
	    	_s.setSource();
			if(_s._d.autoPlay_bl || _s._d.playTrackAfterPlaylistLoad_bl){
				setTimeout(_s.play, 1000);
			} 
		
			
			if(_s.playlist_do && _s.playlist_do.isShowed_bl){
				_s.controller_do.setPlaylistButtonState("selected");
				
			}
			if(_s.playlist_do && _s.playlist_do.comboBox_do) _s.playlist_do.comboBox_do.setButtonsStateBasedOnId(_s.catId);
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"];
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];
			}	
		};
		
		_s.loadInternalPlaylist = function(){
			_s.isPlaylistLoaded_bl = false;
			_s.isPlaylistItemClicked_bl = false;
			_s.stop();

			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}

			_s.preloader_do.show(true);

			if(_s.controller_do){
				_s.controller_do.disableControllerWhileLoadingPlaylist();
				_s.controller_do.loadThumb();
			}
			
			if(_s.playlist_do){
				_s.playlist_do.destroyPlaylist();
				if( _s.playlist_do.comboBox_do)  _s.playlist_do.comboBox_do.hide(false, true);
			} 
			
			_s._d.loadPlaylist(_s.catId);
			if(_s.isAPIReady_bl) _s.dispatchEvent(FWDRAP.START_TO_LOAD_PLAYLIST);
		};


		//#############################################//
		/* Setup continuous playback */
		//#############################################//
		this.setupContinousPlayback =  function(){
			if(!_s._d.useContinuousPlayback_bl) return;
			_s.ppPplayedOnce = false;
			window.onbeforeunload = function (e) {
				var date = new Date();
		   		date.setTime(date.getTime() + (20000));
		   		var pp = 0;
				var isPlaying_bl;
		   		if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
					if(_s.ytb_do){
						pp = _s.ytb_do.lastPercentPlayed;
						isPlaying_bl = _s.ytb_do.isPlaying_bl;
					}
				}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
					if(_s.videoScreen_do){
						pp = _s.videoScreen_do.lastPercentPlayed;
						isPlaying_bl = _s.videoScreen_do.isPlaying_bl;
					}
				}else{
					if(_s.audioScreen_do){
						pp = _s.audioScreen_do.lastPercentPlayed;
						isPlaying_bl = _s.audioScreen_do.isPlaying_bl;
					}
				}
		
				document.cookie = "FWDRAPusePP=true; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPVolume=" + _s.volume + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPpp=" + pp + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPppPlay=" + isPlaying_bl + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPcatId=" + _s.catId + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPid=" + _s.id + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
			};
		}


		//#####################//
		/* Setup a to b */
		//####################//
		_s.setupAtbWindow = function(){
			FWDRAPATB.setPrototype();
			_s.atb_do = new FWDRAPATB(_s.controller_do, _s);
			_s.atb_do.addListener(FWDRAPATB.HIDE_COMPLETE, _s.atbWindowHideCompleteHandler);
		};
		
		_s.atbWindowHideCompleteHandler = function(){
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.atbButton_do.isDisabled_bl = false;
				_s.controller_do.atbButton_do.setNormalState(true);
			}
		};
		

		//#####################//
		/* Setup share window */
		//####################//
		_s.setupPlaybackRateWindow = function(){
			FWDRAPPlaybackRateWindow.setPrototype();
			_s.playbackRateWindow_do = new FWDRAPPlaybackRateWindow(_s._d, _s);
			_s.playbackRateWindow_do.addListener(FWDRAPPlaybackRateWindow.HIDE_COMPLETE, _s.playbackRateWindowHideCompleteHandler);
			_s.playbackRateWindow_do.addListener(FWDRAPPlaybackRateWindow.SET_PLAYBACK_RATE, _s.playbackRateWindowSetPlaybackRateHandler);
		};
		
		_s.playbackRateWindowHideCompleteHandler = function(){
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.playbackRateButton_do.isDisabled_bl = false;
				_s.controller_do.playbackRateButton_do.setNormalState(true);
			}
		};
		
		_s.playbackRateWindowSetPlaybackRateHandler = function(e){
			_s.setPlaybackRate(e.rate);
		}
		
		_s.setupVideoScreen = function(){
			FWDRAPVideoScreen.setPrototype();
			_s.videoScreen_do = new FWDRAPVideoScreen(_s, _s._d.volume);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.ERROR, _s.audioScreenErrorHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.SAFE_TO_SCRUBB, _s.audioScreenSafeToScrubbHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.STOP, _s.audioScreenStopHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.PLAY, _s.audioScreenPlayHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.PAUSE, _s.audioScreenPauseHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.UPDATE, _s.audioScreenUpdateHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.UPDATE_TIME, _s.audioScreenUpdateTimeHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.LOAD_PROGRESS, _s.audioScreenLoadProgressHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.PLAY_COMPLETE, _s.audioScreenPlayCompleteHandler);
			_s.videosHolder_do.addChild(_s.videoScreen_do);
		};
		

		//############################################//
		/* Setup youtube player */
		//############################################//
		_s.setupYoutubePlayer = function(){
			if(location.protocol.indexOf("file:") != -1 && (FWDRAPUtils.isOpera || FWDRAPUtils.isIE)) return;
			FWDRAPYoutubeScreen.setPrototype();
			_s.ytb_do = new FWDRAPYoutubeScreen(_s, _s._d.volume);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.READY, _s.youtubeReadyHandler);
			_s.ytb_do.addListener(FWDRAPAudioScreen.START, _s.audioScreenStartHandler);
			_s.ytb_do.addListener(FWDRAPAudioScreen.ERROR, _s.audioScreenErrorHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.SAFE_TO_SCRUBB, _s.audioScreenSafeToScrubbHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.STOP, _s.audioScreenStopHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.PLAY, _s.audioScreenPlayHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.PAUSE, _s.audioScreenPauseHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.UPDATE, _s.audioScreenUpdateHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.UPDATE_TIME, _s.audioScreenUpdateTimeHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.LOAD_PROGRESS, _s.audioScreenLoadProgressHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.PLAY_COMPLETE, _s.audioScreenPlayCompleteHandler);
			_s.videosHolder_do.addChild(_s.ytb_do);	
			
		};
		
		_s.youtubeReadyHandler = function(e){};
		
		
		//############################################//
		/* update deeplink */
		//############################################//
		_s.setupDL = function(){
			_s.setOnceDL = true;
			FWDAddress.onChange = _s.dlChangeHandler;
			_s.dlChangeHandler();
		};
		
		_s.dlChangeHandler = function(){
			if(_s.hasOpenedInPopup_bl) return;
			var mustReset_bl = false;
			
			if(_s.categories_do && _s.categories_do.isOnDOM_bl){
				_s.categories_do.hide();
				return;
			}
			
			_s.catId = parseInt(FWDAddress.getParameter("catid"));
			_s.id = parseInt(FWDAddress.getParameter("trackid"));

			if(FWDRAPUtils.getCookie('FWDRAPusePP') == 'true' && _s.setOnceDL && location.hash.indexOf('catid=') == -1){
				_s.catId = FWDRAPUtils.getCookie('FWDRAPcatId');
				_s.id = FWDRAPUtils.getCookie('FWDRAPid');
				_s.setOnceDL = false;
				location.hash = _s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id;
				return;
			}
			
			if(_s.catId == undefined || _s.id == undefined || isNaN(_s.catId) || isNaN(_s.id)){
				
				_s.catId = _s._d.startAtPlaylist;
				_s.id = _s._d.startAtTrack;
				
				mustReset_bl = true;
			}
			
			if(_s.catId < 0 || _s.catId > _s._d.totalCategories - 1 && !mustReset_bl){
				_s.catId = _s._d.startAtPlaylist;
				_s.id = _s._d.startAtTrack;
				mustReset_bl = true;
			}
			
			if(_s._d.playlist_ar){
				if(_s.id < 0 && !mustReset_bl){
					_s.id = _s._d.startAtTrack;
					mustReset_bl = true;
				}else if(_s.prevCatId == _s.catId && _s.id > _s._d.playlist_ar.length - 1  && !mustReset_bl){
					_s.id = _s._d.playlist_ar.length - 1;
					mustReset_bl = true;
				}
			}
			
			if(mustReset_bl){
				location.hash = _s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id;
				return;
			}
			
			
			if(_s.prevCatId != _s.catId){
				_s.loadInternalPlaylist();
				_s.prevCatId = _s.catId;
			}else{
				_s.setSource(false);
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
				_s.changeHLS_bl = true;
			}
		};

		
		//#############################################//
		/* setup preloader */
		//#############################################//
		_s.setupPreloader = function(){
			FWDRAPPreloader.setPrototype();
			_s.preloader_do = new FWDRAPPreloader(_s._d, 60, 40);
			_s.preloader_do.show(true);
			_s.main_do.addChild(_s.preloader_do);
		};
		
		_s.positionPreloader = function(){
			_s.preloader_do.setX(parseInt((_s.sW - _s.preloader_do.w)/2));
			if(_s.controller_do){
				_s.preloader_do.setY(parseInt((_s.controller_do.h - _s.preloader_do.h)/2) - 12);
			}else{
				_s.preloader_do.setY(parseInt((_s.maxHeight - _s.preloader_do.h)/2) - 12);
			}
		};
		

		//###########################################//
		/* setup categories */
		//###########################################//
		_s.setupCategories = function(){
			FWDRAPCategories.setPrototype();
			_s.categories_do = new FWDRAPCategories(_s._d);
			_s.categories_do.getStyle().zIndex = "2147483647";
			_s.categories_do.addListener(FWDRAPCategories.HIDE_COMPLETE, _s.categoriesHideCompleteHandler);
			if(_s._d.showPlaylistsByDefault_bl){
				_s.showCatWidthDelayId_to = setTimeout(function(){
					_s.showCategories();
				}, 1400);
			};
		};
		
		_s.categoriesHideCompleteHandler = function(e){
			_s.controller_do.setCategoriesButtonState("unselected");
			if(_s.customContextMenu_do) _s.customContextMenu_do.updateParent(_s.main_do);
			
			if(_s.useDeepLinking_bl){
				if(_s.categories_do.id != _s.catId){
					_s.catId = _s.categories_do.id;
					_s.id = 0;
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
				}
			}else{
				if(_s.catId == _s.categories_do.id) return;
				_s.catId = _s.categories_do.id;
				_s.id = 0;
				_s.loadInternalPlaylist(_s.catId);
			}
		};
		

		//###########################################//
		/* setup playslist */
		//###########################################//
		_s.setupPlaylist = function(){
			FWDRAPPlaylist.setPrototype();
			_s.playlist_do = new FWDRAPPlaylist(_s._d, _s);
			_s.playlist_do.addListener(FWDRAPPlaylist.CHANGE_PLAYLIST, _s.playlistChangePlaylistHandler);
			_s.playlist_do.addListener(FWDRAPPlaylistItem.MOUSE_UP, _s.palylistItemOnUpHandler);
			_s.playlist_do.addListener(FWDRAPPlaylistItem.DOWNLOAD, _s.palylistItemDownloadHandler);
			_s.playlist_do.addListener(FWDRAPPlaylistItem.BUY, _s.palylistItemBuyHandler);
			_s.playlist_do.addListener(FWDRAPPlaylist.UPDATE_TRACK_TITLE_if_FOLDER, _s.palylistUpdateFolderTrackTitle);
			_s.main_do.addChild(_s.playlist_do);
		};
		
		_s.playlistChangePlaylistHandler = function(e){
			_s.controller_do.setCategoriesButtonState("unselected");
			if(_s.customContextMenu_do) _s.customContextMenu_do.updateParent(_s.main_do);
			
			if(_s.useDeepLinking_bl){
				if(e.id != _s.catId){
					_s.catId = e.id;
					_s.id = 0;
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
				}
			}else{
				if(_s.catId == e.id) return;
				_s.catId = e.id;
				_s.id = 0; 
				_s.loadInternalPlaylist(_s.catId);
			}
		}
		
		_s.palylistItemOnUpHandler = function(e){
			_s.isPlaylistItemClicked_bl = true;

			if(e.id == _s.id){
				if(_s.audioType_str == FWDRAP.AUDIO && _s.audioScreen_do.isPlaying_bl){
					_s.pause();
				}else if(_s.audioType_str == FWDRAP.AUDIO && (!_s.audioScreen_do.isStopped_bl || _s.audioScreen_do.isStopped_bl)){
					_s.play();
				}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS) && _s.videoScreen_do.isPlaying_bl){
					_s.pause();
				}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS) && !_s.videoScreen_do.isStopped_bl){
					_s.play();
				}else if(_s.ytb_do && _s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do.isPlaying_bl){
					_s.pause();
				}else if(_s.audioType_str == FWDRAP.YOUTUBE){
					_s.play();
				}
			}else{
				if(_s.useDeepLinking_bl && _s.id != e.id){
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + e.id);
					_s.id = e.id;
				}else{
					_s.id = e.id;
					_s.setSource(true);
					_s.changeHLS_bl = true;
					if(_s.autioType_str != FWDRAP.HLS) _s.play();
				}
			}
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.palylistItemDownloadHandler = function(e){
			_s.downloadMP3(e.id);
		};
		
		_s.palylistUpdateFolderTrackTitle = function(e){
			_s.controller_do.setTitle(e.title);
		};
		
		_s.palylistItemBuyHandler = function(e){
			_s.buy(e.id);
		};
		

		//#####################//
		/* Setup share window */
		//####################//
		_s.setupShareWindow = function(){
			FWDRAPShareWindow.setPrototype();
			_s.shareWindow_do = new FWDRAPShareWindow(_s._d, _s);
			_s.shareWindow_do.addListener(FWDRAPShareWindow.HIDE_COMPLETE, _s.shareWindowHideCompleteHandler);
		};
		
		_s.shareWindowHideCompleteHandler = function(){
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.shareButton_do.isDisabled_bl = false;
				_s.controller_do.shareButton_do.setNormalState(true);
			}
		};
		

		//###########################################//
		/* setup controller */
		//###########################################//
		_s.setupController = function(){
			FWDRAPController.setPrototype();
			_s.controller_do = new FWDRAPController(_s._d, _s);
			_s.controller_do.addListener(FWDRAPController.POPUP, _s.controllerOnPopupHandler);
			_s.controller_do.addListener(FWDRAPController.PLAY, _s.controllerOnPlayHandler);
			_s.controller_do.addListener(FWDRAPController.PLAY_NEXT, _s.controllerPlayNextHandler);
			_s.controller_do.addListener(FWDRAPController.PLAY_PREV, _s.controllerPlayPrevHandler);
			_s.controller_do.addListener(FWDRAPController.PAUSE, _s.controllerOnPauseHandler);
			_s.controller_do.addListener(FWDRAPController.VOLUME_START_TO_SCRUB, _s.volumeStartToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.VOLUME_STOP_TO_SCRUB, _s.volumeStopToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.START_TO_SCRUB, _s.controllerStartToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.SCRUB, _s.controllerScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.SCRUB_PLAYLIST_ITEM, _s.controllerPlaylistItemScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.STOP_TO_SCRUB, _s.controllerStopToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.CHANGE_VOLUME, _s.controllerChangeVolumeHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_CATEGORIES, _s.showCategoriesHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_PLAYLIST, _s.showPlaylistHandler);
			_s.controller_do.addListener(FWDRAPController.HIDE_PLAYLIST, _s.hidePlaylistHandler);
			_s.controller_do.addListener(FWDRAPController.ENABLE_LOOP, _s.enableLoopHandler);
			_s.controller_do.addListener(FWDRAPController.DISABLE_LOOP, _s.disableLoopHandler);
			_s.controller_do.addListener(FWDRAPController.ENABLE_SHUFFLE, _s.enableShuffleHandler);
			_s.controller_do.addListener(FWDRAPController.DISABLE_SHUFFLE, _s.disableShuffleHandler);
			_s.controller_do.addListener(FWDRAPController.SHARE, _s.controllerShareHandler);
			_s.controller_do.addListener(FWDRAPController.DOWNLOAD_MP3, _s.controllerButtonDownloadMp3Handler);
			_s.controller_do.addListener(FWDRAPController.BUY, _s.controllerButtonBuyHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_ATOB, _s.showAtobWindowHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_PLAYBACKRATE, _s.showPlaybacrateWindowHandler);
			_s.main_do.addChild(_s.controller_do);
			if(_s.openInPopup_bl && _s._d.showPlaylistsButtonAndPlaylists_bl){
				_s.controller_do.setPlaylistButtonState("selected");
				if(_s.controller_do.playlistButton_do) _s.controller_do.playlistButton_do.disableForGood();
			}
		};
		
		_s.showPlaybacrateWindowHandler = function(e){
			_s.playbackRateWindow_do.show();
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.playbackRateButton_do.setSelectedState();
				_s.controller_do.playbackRateButton_do.isDisabled_bl = true;
			}
		};
		
		_s.controllerShareHandler = function(e){
			_s.shareWindow_do.show();
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.shareButton_do.setSelectedState();
				_s.controller_do.shareButton_do.isDisabled_bl = true;
			}
		};
		
		_s.controllerOnPopupHandler = function(){
			_s.popup();
		};
		
		_s.controllerOnPlayHandler = function(e){
			_s.play();
		};
		
		_s.controllerPlayNextHandler = function(e){
			if(_s._d.shuffle_bl){
				_s.playShuffle();
			}else{
				_s.playNext();
			}
		};
		
		_s.controllerPlayPrevHandler = function(e){
			if(_s._d.shuffle_bl){
				_s.playShuffle();
			}else{
				_s.playPrev();
			}
		};
		
		_s.controllerOnPauseHandler = function(e){
			_s.isPlaylistItemClicked_bl = true;
			_s.pause();
		};
		
		_s.volumeStartToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.showDisable();
		};
		
		_s.volumeStopToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.hideDisable();
		};
		
		
		_s.controllerStartToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.showDisable();
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.startToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.startToScrub();
			}else{
				_s.audioScreen_do.startToScrub();
			}
		};
		
		_s.controllerScrubbHandler = function(e){
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.scrub(e.percent);
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.scrub(e.percent);
			}else{
				_s.audioScreen_do.scrub(e.percent);
			}
		};
		
		_s.controllerPlaylistItemScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.updateCurItemProgress(e.percent);
		};
		
		_s.controllerStopToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.hideDisable();
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.stopToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.stopToScrub();
			}else{
				_s.audioScreen_do.stopToScrub();
			}
		};
		
		_s.controllerChangeVolumeHandler = function(e){
			_s.setVolume(e.percent);
		};
		
		_s.showCategoriesHandler = function(e){
			_s.showCategories();
			_s.controller_do.setCategoriesButtonState("selected");
		};
		
		_s.showPlaylistHandler = function(e){
			if(_s._d.animateOnIntro_bl){
				_s.playlist_do.show(true);
			}else{
				_s.playlist_do.show(false);
			}
			
			_s.controller_do.setPlaylistButtonState("selected");
		};
		
		_s.hidePlaylistHandler = function(e){
			if(_s._d.animateOnIntro_bl){
				_s.playlist_do.hide(true);
			}else{
				_s.playlist_do.hide(false);
			}
			
			_s.controller_do.setPlaylistButtonState("unselected");
		};
		
		_s.enableLoopHandler = function(e){
			_s._d.loop_bl = true;
			_s._d.shuffle_bl = false;
			_s.controller_do.setLoopStateButton("selected");
			_s.controller_do.setShuffleButtonState("unselected");
		};
		
		_s.disableLoopHandler = function(e){
			_s._d.loop_bl = false;
			_s.controller_do.setLoopStateButton("unselected");
		};
		
		_s.enableShuffleHandler = function(e){
			_s._d.shuffle_bl = true;
			_s._d.loop_bl = false;
			_s.controller_do.setShuffleButtonState("selected");
			_s.controller_do.setLoopStateButton("unselected");
		};
		
		_s.disableShuffleHandler = function(e){
			_s._d.shuffle_bl = false;
			_s.controller_do.setShuffleButtonState("unselected");
		};
		
		_s.controllerButtonDownloadMp3Handler = function(e){
			_s.downloadMP3();
		};

		_s.showAtobWindowHandler =  function(e){
			_s.atb_do.show(true);
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.atbButton_do.setSelectedState();
				_s.controller_do.atbButton_do.isDisabled_bl = true;
			}
		}
		
		_s.controllerButtonBuyHandler = function(){
			_s.buy();
		};
		

		//###########################################//
		/* setup FWDRAPAudioScreen */
		//###########################################//
		_s.setupAudioScreen = function(){	
			FWDRAPAudioScreen.setPrototype();
			_s.audioScreen_do = new FWDRAPAudioScreen(_s._d.volume, _s._d.autoPlay_bl, _s._d.loop_bl);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.START, _s.audioScreenStartHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.ERROR, _s.audioScreenErrorHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.SAFE_TO_SCRUBB, _s.audioScreenSafeToScrubbHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.STOP, _s.audioScreenStopHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.PLAY, _s.audioScreenPlayHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.PAUSE, _s.audioScreenPauseHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.UPDATE, _s.audioScreenUpdateHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.UPDATE_TIME, _s.audioScreenUpdateTimeHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.LOAD_PROGRESS, _s.audioScreenLoadProgressHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.PLAY_COMPLETE, _s.audioScreenPlayCompleteHandler);
			if(_s.useOnlyAPI_bl){
				document.documentElement.appendChild(_s.audioScreen_do.screen);
			}else{
				_s.main_do.addChild(_s.audioScreen_do);	
			}
		};
		
		_s.audioScreenStartHandler = function(){
			_s.sendGAPlayedEvent();
			_s.dispatchEvent(FWDRAP.START);
		};
		
		_s.audioScreenErrorHandler = function(e){
			var error;
			_s.isPlaying_bl = false;
			_s.showCursor();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			
			error = e.text;
			if(_s.main_do) _s.main_do.addChild(_s.info_do);
			if(_s.info_do) _s.info_do.showText(error);
		
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			_s.dispatchEvent(FWDRAP.ERROR, {error:error});
		};
		
		_s.audioScreenSafeToScrubbHandler = function(){
			if(_s.controller_do) _s.controller_do.enableMainScrubber(); 
			if(_s.hider && _s.isFullScreen_bl) _s.hider.start();
			if(FWDRAPUtils.getCookie('FWDRAPusePP') && !_s.playedOnceCP_bl){
				_s.setVolume(Number(FWDRAPUtils.getCookie('FWDRAPVolume')));
				setTimeout(function(){
					_s.scrub(Number(FWDRAPUtils.getCookie('FWDRAPpp')));
				}, 200);
			}
		};
		
		_s.audioScreenStopHandler = function(e){
			_s.isPlaying_bl = false;
			_s.showCursor();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			if(_s.main_do) if(_s.main_do.contains(_s.info_do)) _s.main_do.removeChild(_s.info_do);
			if(_s.controller_do){
				_s.controller_do.showPlayButton();
				_s.controller_do.pauseVis();
				_s.controller_do.disableMainScrubber();
			}
			_s.dispatchEvent(FWDRAP.STOP);
		};
		
		_s.sendGAPlayedEvent = function(){

			if(_s.gtag && _s.videoNameGa){
				var params = {
					'track_url': _s.audioPath,
					'playlist_name' : _s.videoCat,
					'track_name': _s.videoNameGa
					
				}
				
				_s.gtag('event', 'played', params);
			}
			
			_s.prevVideoNameGa = _s.videoNameGa;
		}
		
		_s.audioScreenPlayHandler = function(){
			if(_s.main_do) if(_s.main_do.contains(_s.info_do)) _s.main_do.removeChild(_s.info_do);
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"];
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];
			}

			if(_s._d.openPopupOnPlay_bl && !_s.openInPopup_bl){
				_s.popup();
				return;
			}
		
			
			_s.isPlaying_bl = true;
			FWDRAP.keyboardCurInstance = _s;
			_s.showCursor();
			if(_s.controller_do){
				_s.controller_do.showPauseButton();
				_s.controller_do.startVis();
			}
			if(_s.hider && _s.isFullScreen_bl) _s.hider.start();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.playlist_do) _s.playlist_do.setCurItemPauseState();
			if(_s.openInPopup_bl){
				setTimeout(function(){
					if(!_s.scrubbedFirstTimeInPopup_bl) _s.scrub(_s.lastPercentPlayed);
					_s.scrubbedFirstTimeInPopup_bl = true;
				},600);
			}
			if(!_s.hasStartedToPlay_bl) if(_s._d.playlist_ar[_s.id].startAtTime) _s.scrubbAtTime(_s._d.playlist_ar[_s.id].startAtTime);

			if(_s.audioType_str == FWDRAP.AUDIO){
				_s.controller_do.initVisualizer(_s.audioScreen_do.audio_el);
			}
			
			_s.hasStartedToPlay_bl = true;
			_s.dispatchEvent(FWDRAP.PLAY);
		};
		
		_s.audioScreenPauseHandler = function(){
			_s.isPlaying_bl = false;
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			if(!FWDRAPUtils.isIphone && _s.largePlayButton_do && _s.isFullScreen_bl){
				if(_s.audioType_str == FWDRAP.VIDEO){
					_s.largePlayButton_do.show();
				}else if(_s.audioType_str == FWDRAP.YOUTUBE && !_s.isMbl){
					_s.largePlayButton_do.show();
				}
			}
			_s.showCursor();
			if(_s.controller_do){
				_s.controller_do.showPlayButton();
				_s.controller_do.pauseVis();
			}
			
			if(_s.playlist_do){
				_s.playlist_do.setCurItemPlayState();
			}
			_s.dispatchEvent(FWDRAP.PAUSE);
		};
		
		_s.audioScreenUpdateHandler = function(e){
			var percent;	
			
			percent = e.percent;
			if(_s.controller_do) _s.controller_do.updateMainScrubber(percent);
			if(_s.playlist_do) _s.playlist_do.updateCurItemProgress(percent);
			
			_s.dispatchEvent(FWDRAP.UPDATE, {percent:percent});
		};
		
		_s.audioScreenUpdateTimeHandler = function(e, e2){
			if(_s.prevSeconds != e.seconds) _s.totalTimePlayed += 1;
			_s.totalTimeInSeconds = e.totalTimeInSeconds;

			_s.curTimeInSecond = e.seconds;
			_s.totalTime = e.totalTime;
			_s.curTime = e.curTime;
			_s.prevSeconds = e.seconds
			_s.totalPercentPlayed = _s.totalTimePlayed / e.totalTimeInSeconds;
			if(!isFinite(_s.totalPercentPlayed)) _s.totalPercentPlayed = 0;

			if(_s.controller_do 
			   && !_s.controller_do.isMainScrubberScrubbing_bl
			   && _s.atb_do
			   && _s.atb_do.isShowed_bl
			   && !_s.atb_do.scrub){
				
				var a = _s.totalTimeInSeconds * _s.atb_do.pa;
				var b = _s.totalTimeInSeconds * _s.atb_do.pb;

				if(_s.prevCurTimeInSeconds != _s.curTimeInSecond){
					_s.prevCurTimeInSeconds = _s.curTimeInSecond;
					if(_s.curTimeInSecond < a){
						_s.scrub(_s.atb_do.pa);
					}else if(_s.curTimeInSecond > b){
						_s.scrub(_s.atb_do.pa);
					}
				}
			}

			var curTime;
			var totalTime;
			
			curTime = e.curTime;
			totalTime = e.totalTime;
			
			if(_s.controller_do) _s.controller_do.updateTime(curTime, totalTime);
			
			if(_s._d.playlist_ar[_s.id] && _s._d.playlist_ar[_s.id].stopAtTime && FWDRAPUtils.getSecondsFromString(_s._d.playlist_ar[_s.id].stopAtTime) <= e.seconds) _s.stop();
			
			if(totalTime.length>5){
				_s.totalDuration = FWDRAPUtils.getSecondsFromString(totalTime);
			}else{
				_s.totalDuration = FWDRAPUtils.getSecondsFromString("00:" + totalTime);
			}
		
			_s.dispatchEvent(FWDRAP.UPDATE_TIME, {curTime:curTime, totalTime:totalTime});
		};
		
		_s.audioScreenLoadProgressHandler = function(e){
			if(_s.controller_do) _s.controller_do.updatePreloaderBar(e.percent);
		};
		
		_s.audioScreenPlayCompleteHandler = function(){
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
			
			_s.dispatchEvent(FWDRAP.PLAY_COMPLETE);
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				if(_s._d.loop_bl){
					_s.ytb_do.replay();
				}else if(_s._d.shuffle_bl){
					_s.playShuffle();
				}else{
					if(_s._d.playlistLoop_bl){	
						_s.playNext();
					}else{
						if(_s.id == _s.playlist_do.items_ar.length - 1){
							var tempId = _s.catId + 1;
							if(tempId > _s._d.totalCategories - 1) tempId = 0;
							_s._d.autoPlay_bl = true;
							_s.loadPlaylist(tempId);
						}else{
							_s.playNext();
						}
					}
				}
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				if(_s._d.loop_bl){
					_s.videoScreen_do.replay();
				}else if(_s._d.shuffle_bl){
					_s.playShuffle();
				}else{
					if(_s._d.playlistLoop_bl){	
						_s.playNext();
					}else{
						if(_s.id == _s.playlist_do.items_ar.length - 1){
							var tempId = _s.catId + 1;
							if(tempId > _s._d.totalCategories - 1) tempId = 0;
							_s._d.autoPlay_bl = true;
							_s.loadPlaylist(tempId);
						}else{
							_s.playNext();
						}
					}
				}
			}else{
				
				if(_s._d.loop_bl){
					_s.audioScreen_do.replay();
				}else if(_s._d.shuffle_bl){
					_s.playShuffle();
				}else{
					if(_s._d.playlistLoop_bl){	
						_s.playNext();
					}else{
						if(_s.id == _s.playlist_do.items_ar.length - 1){
							var tempId = _s.catId + 1;
							if(tempId > _s._d.totalCategories - 1) tempId = 0;
							_s._d.autoPlay_bl = true;
							_s.loadPlaylist(tempId);
						}else{
							_s.playNext();
						}
					}
				}
			}
		};
		
		_s.loadID3IfPlaylistDisabled = function(){
			var source = _s._d.playlist_ar[_s.id].source;
			var title = _s._d.playlist_ar[_s.id].title;
			if(title != "...") return;
			source = source + "?rand=" + parseInt(Math.random() * 99999999);
				
			ID3.loadTags(source, function() {
				var obj = _s._d.playlist_ar[_s.id];
				var tags = ID3.getAllTags(source);
				
				obj.title = tags.artist + " - " +  tags.title;
				obj.titleText = obj.title;
				_s.controller_do.setTitle(obj.title);
			});
		};
		
		
		//#######################################//
		/* Set source based on id */
		//#######################################//
		_s.setSource = function(itemClicked){
			if(_s.totalAudio == 0) return
			
			_s.stop(true);

			if(_s._d.playlist_ar[_s.id] && !_s._d.playlist_ar[_s.id]['playIfLoggedIn']){
				_s.lgdWindow_do.hide();
			}
			
			if(_s.useYoutube_bl && _s.ytb_do && !_s.ytb_do.isReady_bl){
				setTimeout(_s.setSource, 200);
				return
			}
			
			if(itemClicked) _s.itemClicked = itemClicked;

			if(_s.passWindow_do) _s.passWindow_do.hide();

			if(_s.id < 0){
				_s.id = 0;
			}else if(_s.id > _s.totalAudio - 1){
				_s.id = _s.totalAudio - 1;
			}
			
			if(_s.id == -1) return;
			_s.audioPath = _s._d.playlist_ar[_s.id].source;

			_s.isShoutcast_bl = _s._d.playlist_ar[_s.id].isShoutcast_bl;
			_s.isIcecast_bl = _s._d.playlist_ar[_s.id].isIcecast_bl;
			
			if(_s._d.playlist_ar[_s.id].controlerThumbnailPath) _s.controller_do.loadThumb(_s._d.playlist_ar[_s.id].controlerThumbnailPath);
			if(_s._d.playlist_ar[_s.id].title) _s.controller_do.setTitle(_s._d.playlist_ar[_s.id].title);
		
			if(_s.isShoutcast_bl && _s.prevAudioPath != _s.audioPath){
				_s.radioSource_str = undefined;
				_s.prevAudioPath = _s.audioPath;
				if(_s.playlist_do) _s.playlist_do.activateItems(_s.id, _s.itemClicked);
				_s.resizeHandler();
				_s._d.startLoadingShoutcast(_s.audioPath);
				return;
			}
			
			if(_s.isIcecast_bl && _s.prevAudioPath != _s.audioPath){
				_s.radioSource_str = undefined;
				_s.prevAudioPath = _s.audioPath;
				if(_s.playlist_do) _s.playlist_do.activateItems(_s.id, _s.itemClicked);
				_s.resizeHandler();
				_s._d.startLoadingIcecast(_s.audioPath);
				return;
			}
			
			if((_s.isShoutcast_bl || _s.isIcecast_bl) && _s.radioSource_str){
				_s.audioPath = _s.radioSource_str;
			}

			_s.prevAudioPath = _s.audioPath;
		
			_s.isShoutcast_bl = _s._d.playlist_ar[_s.id].isShoutcast_bl;
			_s.isIcecast_bl = _s._d.playlist_ar[_s.id].isIcecast_bl;
		
			_s.videoPosterPath = _s._d.playlist_ar[_s.id].videoPosterPath;
			
			if(_s.audioPath.indexOf("soundcloud.") != -1 && _s.audioPath.indexOf("https://api.soundcloud.") == -1){
				_s._d.startToGetSoundcloudUrl(_s.audioPath);
				_s.isLoadingSoundcloudTrack_bl = true;
				_s.audioType_str = FWDRAP.AUDIO;
			}else{
				_s.audioType_str = FWDRAP.AUDIO;
				_s.isLoadingSoundcloudTrack_bl = false;
			}
			
			_s.finalAudioPath_str = _s.audioPath;
			if(_s.audioPath.indexOf(".") == -1 && _s.audioPath.length == 11){
				_s.audioType_str = FWDRAP.YOUTUBE;
			}else if(_s.audioPath.toLowerCase().indexOf(".mp4") != -1){
				_s.audioType_str = FWDRAP.VIDEO;
				
			}else{
				if(!_s.isMbl && !FWDRAP.hasHTMLHLS && _s.audioPath.toLowerCase().indexOf(".m3u8") != -1){	
					_s.audioType_str = FWDRAP.HLS;
				}else{
					_s.audioType_str = FWDRAP.AUDIO;
				}
			}
			
			if(_s.isMbl){	
				if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			}else{
				if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
			}

			//LOAD atb plugin
			if(_s._d.playlist_ar[_s.id]['atb'] && !_s.isATBJsLoaded_bl){
				var script = document.createElement('script');
				script.src = _s._d.mainFolderPath_str + 'java/FWDRAPATB.js';
				document.head.appendChild(script);
				script.onerror = function(){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText('A to B plugin js file named <font color="#FF0000">FWDRAPATB.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDRAPATB.js</font> file.');
					if(_s.preloader_do) _s.preloader_do.hide();
					return;
				}
				
				script.onload = function () {
					_s.isATBJsLoaded_bl = true;
					_s.setupAtbWindow();
					_s.setSource(_s.audioPath);
					if(_s.isPlaylistItemClicked_bl) _s.play()
				}
				return;
			}
			
			//LOAD HLS
			if(!_s.isMbl && !FWDRAP.hasHTMLHLS && _s.audioPath.indexOf(".m3u8") != -1 && !_s.isHLSJsLoaded_bl && !FWDRAP.isHLSJsLoaded_bl){
				if(location.protocol.indexOf("file:") != -1){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText("This browser dosen't allow playing HLS / live streaming videos local, please test online.");
					_s.resizeHandler();
					return;
				}
				
				var script = document.createElement('script');
				script.src = _s._d.hlsPath_str;
				document.head.appendChild(script);
				script.onerror = function(){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText("Error loading HLS library <font color='#FF0000'>" + _s._d.hlsPath_str + "</font>.");
					if(_s.preloader_do) _s.preloader_do.hide();
					return;
				}
				
				script.onload = function () {
					_s.isHLSJsLoaded_bl = true;
					FWDRAP.isHLSJsLoaded_bl = true;
					_s.setupHLS();
					_s.setSource(_s.audioPath);
				}
				return;
			}
					
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				if(!_s.ytb_do) return;
				if(_s.ytb_do.ytb && !_s.ytb_do.ytb.cueVideoById) return;	
				if(_s.videoScreen_do) _s.videoScreen_do.setX(-5000);
				_s.ytb_do.setX(0);
				if(!_s.isLoadingSoundcloudTrack_bl){
					_s.ytb_do.setSource(_s.audioPath);
					if(_s._d.autoPlay_bl || _s.isPlaylistItemClicked_bl) _s.play();
					if(FWDRAPUtils.getCookie('FWDRAPppPlay') && !_s.isMobile_bl && !_s.ppPplayedOnce){
						_s.play();
						setTimeout(_s.play, 1000);
					}
				}
				if(_s.isMbl){
					if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
				}else{
					if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
				}
			
			}else if(_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS){
			
				if(_s.ytb_do) _s.ytb_do.setX(-5000);
				if(!_s.isLoadingSoundcloudTrack_bl){
					_s.videoScreen_do.setSource(_s.audioPath);
					_s.videoScreen_do.initVideo();
					
					if(_s.audioType_str == FWDRAP.HLS){
						_s.videoScreen_do.setX(-5000);
						_s.setupHLS();
						_s.hlsJS.loadSource(_s.audioPath);
						_s.hlsJS.attachMedia(_s.videoScreen_do.video_el);
						_s.isHLSManifestReady_bl = true;
						if(_s._d.autoPlay_bl || _s.isPlaylistItemClicked_bl){
							_s.play();
						}
					}else{
						_s.videoScreen_do.setX(0);
						if(_s._d.autoPlay_bl || _s.isPlaylistItemClicked_bl) _s.play();
						if(Boolean(FWDRAPUtils.getCookie('FWDRAPppPlay') == 'true') && !_s.isMobile_bl && !_s.ppPplayedOnce){
							_s.play();
						}
					}
				}
				if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
			}else{
				_s.goNormalScreen();
				if(_s.ytb_do) _s.ytb_do.setX(-5000);
				if(_s.videoScreen_do) _s.videoScreen_do.setX(-5000);
				
				_s.audioScreen_do.setSource(_s.audioPath);
				if(_s._d.autoPlay_bl) _s.play();
				if(Boolean(FWDRAPUtils.getCookie('FWDRAPppPlay') == 'true') && !_s.isMobile_bl && !_s.ppPplayedOnce){
					_s.play();
				}
			}
			
			_s.controller_do.pauseVis();
			_s.controller_do.setTitle(_s._d.playlist_ar[_s.id].title);
			if(_s._d.playlist_ar[_s.id].duration == undefined){
				_s.controller_do.updateTime("00:00", "00:00");
			}else{
				_s.controller_do.updateTime("00:00", FWDRAPUtils.formatTotalTime(_s._d.playlist_ar[_s.id].duration));
			}
			_s.controller_do.loadThumb(_s._d.playlist_ar[_s.id].thumbPath);
		
			if(_s.playlist_do){
				_s.playlist_do.activateItems(_s.id, _s.itemClicked);
			}else{
				_s.loadID3IfPlaylistDisabled();
			}
			_s.setPlaybackRate(_s._d.defaultPlaybackRate);
		};
		
		_s.destroyHLS = function(){
			if(_s.hlsJS){
				_s.hlsJS.destroy();
				_s.hlsJS = null;
			}
		}
				
		_s.setupHLS = function(){
			if(_s.hlsJS) return;
			_s.isHLSJsLoaded_bl = true;
			_s.hlsJS = new Hls();

			FWDRAPRegisterHLSError(_s);
		}
		
		var recoverDecodingErrorDate,recoverSwapAudioCodecDate;
		function handleMediaError() {
			  if(autoRecoverError) {
				var now = performance.now();
				if(!recoverDecodingErrorDate || (now - recoverDecodingErrorDate) > 3000) {
				  recoverDecodingErrorDate = performance.now();
				  _s.HLSError_str = "try to recover media Error ..."
				  _s.hlsJS.recoverMediaError();
				} else {
				  if(!recoverSwapAudioCodecDate || (now - recoverSwapAudioCodecDate) > 3000) {
					recoverSwapAudioCodecDate = performance.now();
					_s.HLSError_str = "try to swap Audio Codec and recover media Error ...";
					_s.hlsJS.swapAudioCodec();
					_s.hlsJS.recoverMediaError();
				  } else {
					_s.HLSError_str = "cannot recover, last media error recovery failed ...";
				  }
				}
			  }
			  
			  if(_s.HLSError_str){
				if(console) console.log(_s.HLSError_str);
				_s.main_do.addChild(_s.info_do);
				_s.info_do.showText(_s.HLSError_str);
				_s.resizeHandler();
			}
		}
		
		
		//####################################//
		// API
		//###################################//
		_s.loadPlaylist = function(id){
			if(!_s.isAPIReady_bl) return;
			if(_s._d.prevId == id) return;
			
			_s.catId = id;
			_s.id = 0;
			
			if(_s.catId < 0){
				_s.catId = 0;
			}else if(_s.catId > _s._d.totalCategories - 1){
				_s.catId = _s._d.totalCategories - 1;
			};
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.loadInternalPlaylist();
			}
		};
		
		_s.playNext = function(){	
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;

			_s.isPlaylistItemClicked_bl = true;
			
			if(_s._d.showPlayListButtonAndPlaylist_bl){		
				if(_s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId + 1]){
					_s.id = _s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId + 1].id;
				}else{
					_s.id = _s.playlist_do.items_ar[0].id;
				}
			}else{
				_s.id ++;
				if(_s.id < 0){
					_s.id = _s.totalAudio - 1;
				}else if(_s.id > _s.totalAudio - 1){
					_s.id = 0;
				}
			}
			
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.playPrev = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			_s.isPlaylistItemClicked_bl = true;

			if(_s._d.showPlayListButtonAndPlaylist_bl){		
				if(_s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId - 1]){
					_s.id = _s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId - 1].id;
				}else{
					_s.id = _s.playlist_do.items_ar[_s.totalAudio - 1].id;
				}
			}else{
				_s.id --;	
				if(_s.id < 0){
					_s.id = _s.totalAudio - 1;
				}else if(_s.id > _s.totalAudio - 1){
					_s.id = 0;
				}
			}
			
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.playShuffle = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			_s.isPlaylistItemClicked_bl = true;

			var tempId = parseInt(Math.random() * _s._d.playlist_ar.length);
			while(tempId == _s.id) tempId = parseInt(Math.random() * _s._d.playlist_ar.length);
			_s.id = tempId;	
			if(_s.id < 0){
				_s.id = _s.totalAudio - 1;
			}else if(_s.id > _s.totalAudio - 1){
				_s.id = 0;
			}

			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.playSpecificTrack = function(catId, trackId){	
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			
			_s.catId = catId;
			_s.id = trackId;
			
			if(_s.catId < 0){
				_s.catId = 0;
			}else if(_s.catId > _s._d.totalCategories - 1){
				_s.catId = _s._d.totalCategories - 1;
			};
			if(_s.id < 0) _s.id = 0;
			
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.play = function(){
		
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl || _s.isLoadingSoundcloudTrack_bl) return;
			
			//_s.isPlaylistItemClicked_bl = true;
			
			if(_s.isShoutcast_bl && !_s._d.shoutcastReady) return;
			
			if(_s.audioType_str == FWDRAP.HLS){
				if(location.protocol.indexOf("file:") >= 0){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText("HLS m3u8 videos can't be played local on _s browser, please test it online!.");
					_s.info_do.positionAndResize();
					return;
				}
			}

			if((_s._d.playIfLoggedIn || _s._d.playlist_ar[_s.id]['playIfLoggedIn']) && _s.lgdWindow_do){
				_s.lgdWindow_do.show();
				return;
			}
			
			if(_s._d.playlist_ar[_s.id]["isPrivate"] && !_s.hasPassedPassowrd_bl && _s.passWindow_do){
				_s.passWindow_do.show();
				return;
			}
			_s.hasPassedPassowrd_bl = true;
		
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			FWDRAP.pauseAllAudio(_s);
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.play();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				if(_s.audioType_str == FWDRAP.HLS_JS && !_s.isHLSManifestReady_bl){
					_s.videoScreen_do.initVideo();
					_s.setupHLS();
					_s.hlsJS.loadSource(_s.audioPath);
					_s.hlsJS.attachMedia(_s.videoScreen_do.video_el);
					_s.hlsJS.on(Hls.Events.MANIFEST_PARSED,function(e){
						_s.isHLSManifestReady_bl = true;
						if(_s.audioType_str == FWDRAP.HLS_JS) _s.play();
					});
				}else{
					if(_s.videoScreen_do) _s.videoScreen_do.play();
				}
			}else{
				_s.audioScreen_do.play();
				
			}
		};
		
		_s.resume = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.audioType_str == FWDRAP.HLS){
				_s.flashObject.playerResume();
			}
		};
		
		_s.pause = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			_s.isPlaylistItemClicked_bl = true;
			if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.ytb_do.pause();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				_s.videoScreen_do.pause();
			}else{
				if(_s.audioScreen_do) _s.audioScreen_do.pause();
			}
		};
		
		_s.stop = function(resetRadio){
			if(!_s.isAPIReady_bl) return;
			
			if(_s.controller_do){
				if(_s.controller_do.ttm) _s.controller_do.ttm.hide();
				_s.controller_do.disableAtbButton();
			}
		
			_s.hasStartedToPlay_bl = false;
			_s.hasPassedPassowrd_bl = false;
			_s.isShoutcast_bl = false;
			_s.isIcecast_bl = false;
			
			_s._d.closeJsonPLoader();
			_s.destroyHLS();
			if(_s.opener_do) _s.opener_do.showPlayButton();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.playlist_do){
				_s.playlist_do.setCurItemPlayState();
				_s.playlist_do.updateCurItemProgress(0);
			} 
			_s.showCursor();
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.stop();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				_s.videoScreen_do.stop();
			}else{
				_s.audioScreen_do.stop();	
			}
			
			_s.setPlaybackRate(_s._d.defaultPlaybackRate);
			
			_s.hasHlsPlayedOnce_bl = false;
			_s.isSafeToScrub_bl = false;
			_s.hlsState = undefined;
			_s.changeHLS_bl = false;
		};
		
		_s.startToScrub = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.videoScreen_do.startToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.startToScrub();
			}else{
				_s.audioScreen_do.startToScrub();
			}
		};
		
		_s.stopToScrub = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.videoScreen_do.stopToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.stopToScrub();
			}else{
				_s.audioScreen_do.stopToScrub();
			}
		};
		
		_s.scrubbAtTime = function(duration){
			if(!_s.isAPIReady_bl || !duration) return;
			if(String(duration).indexOf(":") != -1) duration = FWDRAPUtils.getSecondsFromString(duration);
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && _s.ytb_do.isSafeToBeControlled_bl){
				_s.ytb_do.scrubbAtTime(duration);
			}else if(_s.audioType_str == FWDRAP.AUDIO){
				if(_s.audioScreen_do) _s.audioScreen_do.scrubbAtTime(duration);
			}else if(FWDRAP.VIDEO){
				if(_s.videoScreen_do) _s.videoScreen_do.scrubbAtTime(duration);
			}
		};
		
		_s.scrub = function(percent){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			if(isNaN(percent)) return;
			
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.ytb_do.scrub(percent);
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.scrub(percent);
			}else{
				if(_s.audioType_str == FWDRAP.HLS){
					_s.flashObject.playerSeek(percent * _s.HLSDuration);
				}else{
					if(_s.audioScreen_do) _s.audioScreen_do.scrub(percent);
				}
			}
		};
		
		_s.setPlaybackRate = function(rate){
			if(!_s.isAPIReady_bl) return;
			_s._d.defaultPlaybackRate = rate;
			if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.setPlaybackRate(rate);
			}else if(_s.audioType_str == FWDRAP.AUDIO && _s.audioScreen_do){
				_s.audioScreen_do.setPlaybackRate(rate);
			}else if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.setPlaybackRate(rate);
			}
		}
		
		_s.setVolume = function(volume){
			if(!_s.isAPIReady_bl) return;
			_s.volume = volume;
			
			if(_s.controller_do) _s.controller_do.updateVolume(volume, true);
		
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.setVolume(volume);
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				_s.videoScreen_do.setVolume(volume);
			}else{
				if(_s.audioScreen_do) _s.audioScreen_do.setVolume(volume);
			}
		};
		
		
		_s.showCategories = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.categories_do){
				_s.categories_do.show(_s.catId);
				if(_s.customContextMenu_do) _s.customContextMenu_do.updateParent(_s.categories_do);
				_s.controller_do.setCategoriesButtonState("selected");
			}
		};
		
		_s.hideCategories = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.categories_do){
				_s.categories_do.hide();
				_s.controller_do.setCategoriesButtonState("unselected");
			}
		};
		
		_s.showPlaylist = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.playlist_do){
				if(_s._d.animateOnIntro_bl){
					_s.playlist_do.show(true);
				}else{
					_s.playlist_do.show(false);
				}
				_s.controller_do.setPlaylistButtonState("selected");
			}
		};
		
		_s.hidePlaylist = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.playlist_do){
				if(_s._d.animateOnIntro_bl){
					_s.playlist_do.hide(true);
				}else{
					_s.playlist_do.hide(false);
				}
				_s.controller_do.setPlaylistButtonState("unselected");
			}
			if(_s.shareWindow_do) _s.shareWindow_do.hide(true);
		};
		
		_s.share = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.shareWindow_do) _s.shareWindow_do.show();
		};	
		
		_s.getIsAPIReady = function(){
			return _s.isAPIReady_bl;
		};
		
		_s.getCatId = function(){
			return _s.catId;
		};
		
		_s.getTrackId = function(){
			return _s.id;
		};
		
		
		_s.getTrackTitle = function(){
			if(!_s.isAPIReady_bl) return;
			return _s._d.playlist_ar[_s.id].title;
		};
		
		_s.getCurrentTime = function(){
			if(!_s.isAPIReady_bl) return;
			
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				return _s.ytb_do.getCurrentTime()
			}else if(_s.audioType_str == FWDRAP.AUDIO){
				return _s.audioScreen_do.getCurrentTime();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				return _s.videoScreen_do.getCurrentTime();
			}
		};
		
		_s.getDuration = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				return _s.ytb_do.getDuration()
			}else if(_s.audioType_str == FWDRAP.AUDIO){
				return _s.audioScreen_do.getDuration();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				return _s.videoScreen_do.getDuration();
			}
		};
		
		_s.downloadMP3 = function(pId){
			if(!_s.isAPIReady_bl) return;
			if(document.location.protocol == "file:"){
				var error = "Downloading mp3 files local is not allowed or possible!. To function properly please test online.";
				_s.main_do.addChild(_s.info_do);
				_s.info_do.showText(error);
				return;
			}
			
			if(pId == undefined) pId = _s.id;
			
			if((_s._d.playIfLoggedIn || _s._d.playlist_ar[_s.id]['playIfLoggedIn']) && _s.lgdWindow_do){
				_s.lgdWindow_do.positionAndResize();
				_s.lgdWindow_do.show();
				return;
			}

			_s.videoNameGa = _s._d.playlist_ar[pId]["titleText"];
			_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];
			
			if(_s.gtag && _s.videoNameGa){
				var params = {
					'track_url': _s.audioPath,
					'playlist_name' : _s.videoCat,
					'track_name': _s.videoNameGa
					
				}
				
				_s.gtag('event', 'download', params);
			}
			
			var source = _s._d.playlist_ar[pId].downloadPath;
			
			var sourceName = _s._d.playlist_ar[pId].titleText;
			_s._d.downloadMp3(source, sourceName);
		};
		
		_s.buy = function(pId){
			if(!_s.isAPIReady_bl) return;
			
			if(document.location.protocol == "file:"){
				var error = "Buying mp3 files local is not allowed or possible!. To function properly please test online.";
				_s.main_do.addChild(_s.info_do);
				_s.info_do.showText(error);
				return;
			}
			
			if(pId == undefined) pId = _s.id;
			
			var buy = _s._d.playlist_ar[pId].buy;
			if(buy.indexOf("http") != -1 && buy.indexOf("http") < 3){
				window.open(buy);
			}else{
				eval(buy);
			}
		};
		
		_s.addTrack = function(source, title, thumbnailSource, duration, addFirst, download, buy){
			if(_s.isReady_bl) return;
			if(_s.playlist_do) _s.playlist_do.addTrack(source, title, thumbnailSource, duration, addFirst, download, buy );
		}
		
		_s.updateHEXColors = function(normalColor, selectedColor){
			if(!_s.isAPIReady_bl) return;
			_s.controller_do.updateHEXColors(normalColor, selectedColor);
			if(_s.largePlayButton_do) _s.largePlayButton_do.updateHEXColors(normalColor, "#FFFFFF");
			if(_s.shareWindow_do) _s.shareWindow_do.updateHEXColors(normalColor, selectedColor);
			if(_s.playbackRateWindow_do) _s.playbackRateWindow_do.updateHEXColors(normalColor, selectedColor);
			
			if(_s.playlist_do) _s.playlist_do.updateHEXColors(normalColor, selectedColor);
		};
		

		//###########################################//
		/* event dispatcher */
		//###########################################//
		_s.addListener = function (type, listener){
	    	if(!_s.listeners) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = _s;
	        _s.listeners.events_ar.push(event);
	    };
	    
	    _s.dispatchEvent = function(type, props){
	    	if(_s.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s && _s.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		_s.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		_s.listeners.events_ar[i].listener.call(_s, _s.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   _s.removeListener = function(type, listener){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s 
	        			&& _s.listeners.events_ar[i].type === type
	        			&& _s.listeners.events_ar[i].listener ===  listener
	        	){
	        		_s.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };		
	    
		if(_s.useYoutube_bl){	
			if((location.protocol.indexOf("file:") != -1 && FWDRAPUtils.isIE)
			   || (location.protocol.indexOf("file:") != -1 && FWDRAPUtils.isOpera)){
				_s.stageContainer = FWDRAPUtils.getChildById(props.parentId);
				_s.setupmain_do();
				_s.setupInfo();
				_s.main_do.addChild(_s.info_do);
				_s.info_do.allowToRemove_bl = false;
				_s.info_do.showText("This browser dosen't allow the Youtube API to run local, please test it online or in another browser like Firefox or Chrome! If you don't want to use Youtube set <font color=\"#FF000000\">useYoutube:\"no\"</font>.");
				_s.resizeHandler();
				return;
			}	
		}
		
		setTimeout(FWDRAP.checkIfHasYoutube, 100);
	};
	
	
	FWDRAP.checkIfHasYoutube = function(){
		
		if(FWDRAP.checkIfHasYoutube_bl) return;
		FWDRAP.checkIfHasYoutube_bl = true;
		
		var hasYoutube_bl = false;
		var tt = FWDRAP.instaces_ar.length;
		var audio;
		for(var i=0; i<tt; i++){
			audio = FWDRAP.instaces_ar[i];
			if(audio.useYoutube_bl) hasYoutube_bl = true;
		}
		
		
		if(hasYoutube_bl){
			setTimeout(FWDRAP.setupYoutubeAPI, 500);
		}else{
			setTimeout(FWDRAP.setupAllInstances, 500);
		}
	};
	
	
	FWDRAP.setupYoutubeAPI = function(){
		
		if(FWDRAP.isYoutubeAPICreated_bl) return;
		FWDRAP.isYoutubeAPICreated_bl = true;
		
		if(typeof YT != "undefined"){
			FWDRAP.setupAllInstances();
		}else{
			window.onYouTubeIframeAPIReady = function(){
				FWDRAP.setupAllInstances();
			};
			var tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}
	};
	
	FWDRAP.setupAllInstances = function(){
		
		if(FWDRAP.areInstancesCreated_bl) return;
	
		var args = FWDRAPUtils.getUrlArgs(window.location.search);
		var embedTest = args.RAPInstanceName;
	
		if(FWDRAP.audioStartBehaviour != "pause" 
			&& FWDRAP.audioStartBehaviour != "stop"
			&& FWDRAP.audioStartBehaviour != "none"
		){
			FWDRAP.audioStartBehaviour = "pause";
		}
		if(FWDRAPUtils.isMbl) FWDRAP.audioStartBehaviour = "stop";

		FWDRAP.areInstancesCreated_bl = true;
		var tt = FWDRAP.instaces_ar.length;
		
		var audio;
		var autoPlayFound_bl = false;
		var prevVideo;
		
		if(embedTest){
			for(var i=0; i<tt; i++){
				audio = FWDRAP.instaces_ar[i];
				if(audio.props.instanceName == embedTest){
					FWDRAP.isEmbedded_bl = true;
					audio.init();
					return;
				}
			}
		}
		
		for(var i=0; i<tt; i++){
			audio = FWDRAP.instaces_ar[i];
			prevVideo = FWDRAP.instaces_ar[i - 1];
			audio.init();
		};
	};
	
	FWDRAP.pauseAllAudio = function(pAudio){
	
		var totalAudio = FWDRAP.instaces_ar.length;
		var audio;
		
		for(var i=0; i<totalAudio; i++){
			audio = FWDRAP.instaces_ar[i];
			if(audio != pAudio) audio.stop();
		};
	};
	
	FWDRAP.stopAllAudio = function(pAudio){
		var tt = FWDRAP.instaces_ar.length;
		var audio;
		for(var i=0; i<tt; i++){
			audio = FWDRAP.instaces_ar[i];
			if(audio != pAudio){
				audio.stop();
			}
		};
	};
	
	FWDRAP.hasHTMLHLS = (function(){
		var videoTest_el = document.createElement("video");
		var flag = false;
		if(videoTest_el.canPlayType){
			flag = Boolean(videoTest_el.canPlayType('application/vnd.apple.mpegurl') === "probably" || videoTest_el.canPlayType('application/vnd.apple.mpegurl') === "maybe");
		}
		return flag;
	}());
	
	FWDRAP.getAudioFormats = (function(){
		var audio_el = document.createElement("audio");
		if(!audio_el.canPlayType) return;
		var extention_str = "";
		var extentions_ar = [];
		if(audio_el.canPlayType('audio/mpeg') == "probably" || audio_el.canPlayType('audio/mpeg') == "maybe"){
			extention_str += ".mp3";
		}
		
		if(audio_el.canPlayType("audio/ogg") == "probably" || audio_el.canPlayType("audio/ogg") == "maybe"){
			extention_str += ".ogg";
		}
		
		if(audio_el.canPlayType("audio/mp4") == "probably" || audio_el.canPlayType("audio/mp4") == "maybe"){
			extention_str += ".webm";
		}
		
		extentions_ar = extention_str.split(".");
		extentions_ar.shift();
		
		audio_el = null;
		return extentions_ar;
	})();
	
	FWDRAP.hasCanvas = (function(){
		return Boolean(document.createElement("canvas"));
	})();
	

	FWDRAP.getAudioFormats = (function(){
		var audio_el = document.createElement("audio");
		if(!audio_el.canPlayType) return;
		var extention_str = "";
		var extentions_ar = [];
		if(audio_el.canPlayType('audio/mpeg') == "probably" || audio_el.canPlayType('audio/mpeg') == "maybe"){
			extention_str += ".mp3";
		}
		
		if(audio_el.canPlayType("audio/ogg") == "probably" || audio_el.canPlayType("audio/ogg") == "maybe"){
			extention_str += ".ogg";
		}
		
		if(audio_el.canPlayType("audio/mp4") == "probably" || audio_el.canPlayType("audio/mp4") == "maybe"){
			extention_str += ".webm";
		}
		
		extentions_ar = extention_str.split(".");
		extentions_ar.shift();
		
		audio_el = null;
		return extentions_ar;
	})();

	/* set prototype */
	FWDRAP.setPrototype =  function(){
		FWDRAP.prototype = new FWDRAPEventDispatcher();
	};
	
	
	FWDRAP.instaces_ar = [];
	
	FWDRAP.YOUTUBE = "youtube";
	FWDRAP.VIDEO = "video";
	FWDRAP.AUDIO = "audio";
	FWDRAP.READY = "ready";
	FWDRAP.START_TO_LOAD_PLAYLIST = "startToLoadPlaylist";
	FWDRAP.LOAD_PLAYLIST_COMPLETE = "loadPlaylistComplete";
	FWDRAP.STOP = "stop";
	FWDRAP.PLAY = "play";
	FWDRAP.PAUSE = "pause";
	FWDRAP.UPDATE = "update";
	FWDRAP.UPDATE_TIME = "updateTime";
	FWDRAP.ERROR = "error";
	FWDRAP.PLAY_COMPLETE = "playComplete";
	FWDRAP.POPUP = "popup";
	FWDRAP.START = "start";
	FWDRAP.HLS = "hls_flash";
	
	
	window.FWDRAP = FWDRAP;
	
}(window));/**
 * Royal Audio Player
 * Data.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(window){
	
	var FWDRAPAudioData = function(props, playListElement, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPAudioData.prototype;
	
		_s.plsCache_ar = [];
		_s.props_obj = props;
		_s.skinPaths_ar = [];
		_s.images_ar = [];
		_s.cats_ar = [];

		_s.sc_ar = props.soundCloudAPIKey || "9b7c5ab7e319a4cd630c70dd947d6bfb, 4e6c7139ca2791a89863367ba374a28e, r4wruADPCq7iqJomagvYpdehvILa2bgE, b972bf0e059078490e8579b43bf95923, 64c56d14d1844681f7cca8c61ec0082a, 86b6a66bb2d863f5d64dd8a91cd8de94, 8da368dc752f739dcf6e4abb8317548d, b4bee2a55625cf4ab8e3f7ea1d35e103, 0aff03b3b79c2ac02fd2283b300735bd";
	
		_s.sc_ar = _s.sc_ar.split(',');
		_s.sc_ar = FWDRAPUtils.randomizeArray(_s.sc_ar);
		for(var i=0; i<_s.sc_ar.length; i++){
			_s.sc_ar[i] = _s.sc_ar[i].replace(/ /g,'');
		}

		_s.hubhopperAPIKey = 'QiZ66BeNFQFluOlXvAmI34WQZWqb0ykazSWUGwe2';
		_s.ytbAPiKey = _s.props_obj.youtubeAPIKey || 'AIzaSyCGcO99gLK_2VOkm6vjvTZSIQNYVCSWQnw';
		_s.proxyCors = _s.props_obj.proxyCors;
		
		_s.prevId = -1;
		_s.totalCats = 0;
		_s.countLoadedSkinImages = 0;
		_s.volume = 1;
		_s.startSpaceBetweenButtons = 0;
		_s.spaceBetweenButtons = 0;
		_s.mainScrubberOffsetTop = 0;
		_s.spaceBetweenMainScrubberAndTime = 0;
		_s.startTimeSpace = 0;
		_s.scrubbersOffsetWidth = 0;
		_s.scrubbersOffestTotalWidth = 0;
		_s.volumeButtonAndScrubberOffsetTop = 0;
		_s.maxPlaylistItems = 0;
		_s.separatorOffsetOutSpace = 0;
		_s.separatorOffsetInSpace = 0;
		_s.lastButtonsOffsetTop = 0;
		_s.allButtonsOffsetTopAndBottom = 0;
		_s.controllerHeight = 0;
		_s.titleBarOffsetTop = 0;
		_s.scrubberOffsetBottom = 0;
		_s.equlizerOffsetLeft = 0;
		_s.nrOfVisiblePlaylistItems = 0;
		_s.trackTitleOffsetLeft = 0;
		_s.playPauseButtonOffsetLeftAndRight = 0;
		_s.durationOffsetRight = 0;
		_s.downloadButtonOffsetRight = 0;
		_s.scrollbarOffestWidth = 0;
		_s.resetLoadIndex = -1;
		_s.startAtPlaylist = 0;
		_s.startAtTrack = 0;
		_s.totalCategories = 0;
		_s.thumbnailMaxWidth = 0; 
		_s.buttonsMargins = 0;
		_s.thumbnailMaxHeight = 0;
		_s.horizontalSpaceBetweenThumbnails = 0;
		_s.verticalSpaceBetweenThumbnails = 0;
		_s.countID3 = 0;
		_s.toolTipsButtonsHideDelay = 0;
		
		_s.allowToChangeVolume_bl = true;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.head = document.getElementsByTagName("head")[0];
	

		//###################################//
		/*init*/
		//###################################//
		_s.init = function(){
			_s.parseProperties();
		};

		
		//#############################################//
		// parse properties.
		//#############################################//
		_s.parseProperties = function(){
		
			_s.useYoutube_bl = _s.props_obj.useYoutube || "no"; 
			_s.useYoutube_bl = _s.useYoutube_bl == "yes" ? true : false;
			
			_s.useVideo_bl = _s.props_obj.useVideo || "no"; 
			_s.useVideo_bl = _s.useVideo_bl == "yes" ? true : false;
			
			_s.useHEX = _s.props_obj.useHEXColorsForSkin; 
			_s.useHEX = _s.useHEX == "yes" ? true : false;
			if(location.protocol.indexOf("file:") != -1) _s.useHEX = false;

			_s.useVectorIcons = _s.props_obj.useVectorIcons;
			_s.useVectorIcons = _s.useVectorIcons == "yes" ? true : false;
			
			_s.categoriesId_str = _s.props_obj.playlistsId;
			if(!_s.categoriesId_str){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>playlistsId</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
				
			_s.mainFolderPath_str = _s.props_obj.mainFolderPath;
			if(!_s.mainFolderPath_str){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>mainFolderPath</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((_s.mainFolderPath_str.lastIndexOf("/") + 1) != _s.mainFolderPath_str.length){
				_s.mainFolderPath_str += "/";
			}
			
			_s.skinPath_str = _s.props_obj.skinPath;
			if(!_s.skinPath_str){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>skinPath</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
		
			if((_s.skinPath_str.lastIndexOf("/") + 1) != _s.skinPath_str.length){
				_s.skinPath_str += "/";
			}
			
			_s.skinPath_str = _s.mainFolderPath_str + _s.skinPath_str;
			_s.flashPath_str = _s.mainFolderPath_str + "flashlsChromeless.swf";
			_s.proxyPath_str =  _s.mainFolderPath_str + "proxy.php";
			_s.proxyFolderPath_str = _s.mainFolderPath_str  + "proxyFolder.php";
			_s.mailPath_str = _s.mainFolderPath_str  + "sendMail.php";
			_s.mp3DownloaderPath_str = _s.mainFolderPath_str  + "downloader.php";
			_s.hlsPath_str = _s.mainFolderPath_str  + "java/hls.js";

			_s.isDark = true;
			if(_s.skinPath_str.indexOf('dark') == -1){
				_s.isDark = false;
			}
			
			_s.categories_el = document.getElementById(_s.categoriesId_str);
			var catsChildren_ar = FWDRAPUtils.getChildren(_s.categories_el);
			_s.totalCats = catsChildren_ar.length;	
			
			if(_s.totalCats == 0){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "At least one category is required!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			for(var i=0; i<_s.totalCats; i++){
				var obj = {};
				var child = catsChildren_ar[i];
				
				if(!FWDRAPUtils.hasAttribute(child, "data-source")){
					setTimeout(function(){
						if(_s == null) return;
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Attribute <font color='#FF0000'>data-source</font> is required in the categories html element at position <font color='#FF0000'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(!FWDRAPUtils.hasAttribute(child, "data-thumbnail-path")){
					setTimeout(function(){
						if(_s == null) return;
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Attribute <font color='#FF0000'>data-thumbnail-path</font> is required in the categories html element at position <font color='#FF0000'>" + (i + 1)});
					}, 50);
					return;
				}
				
				obj.source = FWDRAPUtils.getAttributeValue(child, "data-source");
				obj.playlistsName = FWDRAPUtils.getAttributeValue(child, "data-playlist-name");
				obj.thumbnailPath = FWDRAPUtils.getAttributeValue(child, "data-thumbnail-path");
				obj.htmlContent = child.innerHTML;
				obj.htmlText_str = child.innerText;
				_s.cats_ar[i] = obj;
			}
			
			_s.facebookAppId_str = _s.props_obj.facebookAppId || undefined;
			_s.totalCategories = _s.cats_ar.length;
			_s.playlistIdOrPath_str = _s.props_obj.playlistIdOrPath || undefined;
			_s.timeColor_str = _s.props_obj.timeColor || "#FF0000";
			_s.trackTitleNormalColor_str = _s.props_obj.trackTitleNormalColor || "#FF0000";
			_s.trackTitleSelected_str = _s.props_obj.trackTitleSelectedColor || "#FF0000";
			_s.trackDurationColor_str = _s.props_obj.trackDurationColor || "#FF0000";
			_s.titleColor_str = _s.props_obj.titleColor || "#FF0000";
			_s.thumbnailSelectedType_str = _s.props_obj.thumbnailSelectedType || "opacity";
			if(_s.thumbnailSelectedType_str != "blackAndWhite"  
				&& _s.thumbnailSelectedType_str != "threshold" 
				&& _s.thumbnailSelectedType_str != "opacity"){
				_s.thumbnailSelectedType_str = "opacity";
			}
			if(_s.isMbl || FWDRAPUtils.isIEAndLessThen9)  _s.thumbnailSelectedType_str = "opacity";
			if(document.location.protocol == "file:") _s.thumbnailSelectedType_str = "opacity";
		
			_s.startAtPlaylist = _s.props_obj.startAtPlaylist || 0;
			if(isNaN(_s.startAtPlaylist)) _s.startAtPlaylist = 0;
			
			if(_s.startAtPlaylist < 0){
				_s.startAtPlaylist = 0;
			}else if(_s.startAtPlaylist > _s.totalCats - 1){
				_s.startAtPlaylist = _s.totalCats - 1;
			}
			
			_s.startAtRandomTrack_bl = _s.props_obj.startAtRandomTrack;
			_s.startAtRandomTrack_bl = _s.startAtRandomTrack_bl == "no" ? false : true;
			
			_s.startAtTrack = _s.props_obj.startAtTrack || 0; 
			
			_s.volume = _s.props_obj.volume;
			if(_s.volume === undefined) _s.volume = 1;
			if(isNaN(_s.volume)) volume = 1;
			if(_s.volume >= 1){
				_s.volume = 1;
			}else if(_s.volume <=0){
				_s.volume = 0;
			}
			
			_s.toolTipsFntClr = _s.props_obj.toolTipsButtonFontColor || "#FF0000";
			_s.toolTipsBkClr = _s.props_obj.toolTipsButtonsBackgroundColor || "#FFFFFF";
			_s.buttonsMargins = _s.props_obj.buttonsMargins || 0; 
			_s.thumbnailMaxWidth = _s.props_obj.thumbnailMaxWidth || 330; 
			_s.thumbnailMaxHeight = _s.props_obj.thumbnailMaxHeight || 330;
			_s.horizontalSpaceBetweenThumbnails = _s.props_obj.horizontalSpaceBetweenThumbnails;
			if(_s.horizontalSpaceBetweenThumbnails == undefined)  _s.horizontalSpaceBetweenThumbnails = 40;
			_s.verticalSpaceBetweenThumbnails = parseInt(_s.props_obj.verticalSpaceBetweenThumbnails);
			if(_s.verticalSpaceBetweenThumbnails == undefined)  _s.verticalSpaceBetweenThumbnails = 40;
			_s.toolTipsDl = _s.props_obj.toolTipsButtonsHideDelay || 1.5; 

			_s.playlistSelectorHeight = _s.props_obj.playlistSelectorHeight || 32;
			_s.playlistSelectorHeight = Math.min(100, _s.playlistSelectorHeight);
		
			_s.playIfLoggedIn = _s.props_obj.playIfLoggedIn; 
			_s.playIfLoggedIn = _s.playIfLoggedIn == "yes" ? true : false;
			_s.playIfLoggedInMessage = _s.props_obj.playIfLoggedInMessage || 'Please loggin';

			_s.inputSearchTextOffsetTop = _s.props_obj.inputSearchTextOffsetTop;
			_s.inputSearchOffsetLeft = _s.props_obj.inputSearchOffsetLeft;
			_s.startSpaceBetweenButtons = _s.props_obj.startSpaceBetweenButtons || 0;
			_s.spaceBetweenButtons = _s.props_obj.spaceBetweenButtons || 0;
			_s.mainScrubberOffsetTop = _s.props_obj.mainScrubberOffsetTop || 100;
			_s.spaceBetweenMainScrubberAndTime = _s.props_obj.spaceBetweenMainScrubberAndTime;
			_s.startTimeSpace = _s.props_obj.startTimeSpace;
			_s.scrubbersOffsetWidth  = _s.props_obj.scrubbersOffsetWidth || 0;
			_s.scrubbersOffestTotalWidth = _s.props_obj.scrubbersOffestTotalWidth || 0;
			_s.volumeButtonAndScrubberOffsetTop = _s.props_obj.volumeButtonAndScrubberOffsetTop || 0;
			_s.spaceBetweenVolumeButtonAndScrubber = _s.props_obj.spaceBetweenVolumeButtonAndScrubber || 0;
			_s.volumeScrubberOffestWidth = _s.props_obj.volumeScrubberOffestWidth || 0;
			_s.scrubberOffsetBottom = _s.props_obj.scrubberOffsetBottom || 0;
			_s.equlizerOffsetLeft = _s.props_obj.equlizerOffsetLeft || 0;
			_s.nrOfVisiblePlaylistItems = _s.props_obj.nrOfVisiblePlaylistItems || 0;
			_s.trackTitleOffsetLeft = _s.props_obj.trackTitleOffsetLeft || 0;
			_s.playPauseButtonOffsetLeftAndRight = _s.props_obj.playPauseButtonOffsetLeftAndRight || 0;
			_s.durationOffsetRight = _s.props_obj.durationOffsetRight || 0;
			_s.downloadButtonOffsetRight = _s.props_obj.downloadButtonOffsetRight || 0;
			_s.scrollbarOffestWidth = _s.props_obj.scrollbarOffestWidth || 0;
			_s.maxPlaylistItems = _s.props_obj.maxPlaylistItems || 200;
			_s.playlistItemHeight = _s.props_obj.playlistItemHeight || 23;
			_s.playlistItemHeight =  Math.min(_s.playlistItemHeight, 50);
			_s.controllerHeight = _s.props_obj.controllerHeight || 200;
			_s.titleBarOffsetTop = _s.props_obj.titleBarOffsetTop || 0;
			_s.separatorOffsetInSpace = _s.props_obj.separatorOffsetInSpace || 0;
			_s.lastButtonsOffsetTop = _s.props_obj.lastButtonsOffsetTop || 0;
			_s.allButtonsOffsetTopAndBottom = _s.props_obj.allButtonsOffsetTopAndBottom || 0;
			_s.separatorOffsetOutSpace = _s.props_obj.separatorOffsetOutSpace || 0;
			_s.searchBarHeight = _s.props_obj.searchBarHeight || 50;
			_s.inputOffestTop = _s.props_obj.inputOffestTop || 50;
			_s.playbackRateButtonsMargins = _s.props_obj.playbackRateButtonsMargins || 0;
			_s.volumeScrubberWidth = _s.props_obj.volumeScrubberWidth || 10;
			if(_s.volumeScrubberWidth > 200) _s.volumeScrubberWidth = 200;
			_s.playbackRateWindowTextColor_str = _s.props_obj.playbackRateWindowTextColor || "#FF0000";
			
			_s.addKeyboardSupport_bl = _s.props_obj.addKeyboardSupport || "no"; 
			_s.addKeyboardSupport_bl = _s.addKeyboardSupport_bl == "yes" ? true : false;
			
			_s.showPlaylistsSearchInput_bl = _s.props_obj.showPlaylistsSearchInput; 
			_s.showPlaylistsSearchInput_bl = _s.showPlaylistsSearchInput_bl == "yes" ? true : false;
			
			_s.randomizePlaylist_bl = _s.props_obj.randomizePlaylist; 
			_s.randomizePlaylist_bl = _s.randomizePlaylist_bl == "yes" ? true : false;

			_s.inversePlaylist = _s.props_obj.inversePlaylist; 
			_s.inversePlaylist = _s.inversePlaylist == "yes" ? true : false;
			
			_s.showPlaybackRateButton_bl = _s.props_obj.showPlaybackRateButton; 
			_s.showPlaybackRateButton_bl = _s.showPlaybackRateButton_bl == "yes" ? true : false;
			
			_s.playTrackAfterPlaylistLoad_bl = _s.props_obj.playTrackAfterPlaylistLoad; 
			_s.playTrackAfterPlaylistLoad_bl = _s.playTrackAfterPlaylistLoad_bl == "yes" ? true : false;
			
			_s.nBC = _s.props_obj.normalHEXButtonsColor || "#FFFFFF";
			_s.n2BC = _s.props_obj.normalHEXButtonsColor2 || "#FFFFFF";
			if(_s.skinPath_str.indexOf('dark') != -1){
				_s.sBC = '#FFFFFF';
			}else{
				_s.sBC = '#000000';
			}
		
			_s.secondaryLabelsColor_str = _s.props_obj.secondaryLabelsColor || "#FF0000"; 
			_s.mainLabelsColor_str = _s.props_obj.mainLabelsColor || "#FF0000"; 
			_s.borderColor_str = _s.props_obj.borderColor || "#FF0000";
			_s.textColor_str = _s.props_obj.textColor_str || "#FF0000";
			_s.inputBackgroundColor_str = _s.props_obj.inputBackgroundColor || "#FF0000";
			_s.inputColor_str = _s.props_obj.inputColor || "#FF0000";
			
			_s.defaultPlaybackRate = _s.props_obj.defaultPlaybackRate || 1;
			_s.defaultPlaybackRate = parseFloat(_s.defaultPlaybackRate); 
			if(isNaN(_s.defaultPlaybackRate)) _s.defaultPlaybackRate = 1;
			if(_s.defaultPlaybackRate < 0.5){
				_s.defaultPlaybackRate = 0.5;
			}else if(_s.defaultPlaybackRate > 2){
				_s.defaultPlaybackRate =2;
			}
			
			_s.rightClickContextMenu_str = _s.props_obj.rightClickContextMenu || "developer";
			var test = _s.rightClickContextMenu_str == "developer" 
				   || _s.rightClickContextMenu_str == "disabled"
				   || _s.rightClickContextMenu_str == "default";
			if(!test) _s.rightClickContextMenu_str = "developer";
			
			_s.playlistBackgroundColor_str = _s.props_obj.playlistBackgroundColor || "transparent";
			_s.searchInputColor_str = _s.props_obj.searchInputColor || "#FF0000";
			
			_s.shareWindowBackgroundColor_str = _s.props_obj.shareWindowBackgroundColor || "transparent";
			_s.shareWindowBackgroundColor_str = _s.props_obj.shareWindowBackgroundColor_str;
			
			_s.showButtonsToolTips_bl = _s.props_obj.showButtonsToolTips; 
			_s.showButtonsToolTips_bl = _s.showButtonsToolTips_bl == "no" ? false : true;
			if(_s.isMbl) _s.showButtonsToolTips_bl = false;
			
			_s.autoPlay_bl = _s.props_obj.autoPlay; 
			_s.autoPlay_bl = _s.autoPlay_bl == "yes" ? true : false;
			
			_s.useContinuousPlayback_bl = _s.props_obj.useContinuousPlayback; 
			_s.useContinuousPlayback_bl = _s.useContinuousPlayback_bl == "yes" ? true : false;
			
			_s.disableScrubber_bl = _s.props_obj.disableAudioScrubbar; 
			_s.disableScrubber_bl = _s.disableScrubber_bl == "yes" ? true : false;
			
			_s.showVideoFullScreenButton_bl = _s.props_obj.showFullScreenButton; 
			_s.showVideoFullScreenButton_bl = _s.showVideoFullScreenButton_bl == "yes" ? true : false;
			
			_s.showShareButton_bl = _s.props_obj.showShareButton; 
			_s.showShareButton_bl = _s.showShareButton_bl == "yes" ? true : false;
			
			_s.showSortButtons_bl = _s.props_obj.showSortButtons;
			_s.showSortButtons_bl = _s.showSortButtons_bl == "no" ? false : true;
		
			_s.loop_bl = _s.props_obj.loop; 
			_s.loop_bl = _s.loop_bl == "yes" ? true : false;
			
			_s.playVideoOnlyWhenLoggedIn_bl = _s.props_obj.playTrackOnlyWhenLoggedIn; 
			_s.playVideoOnlyWhenLoggedIn_bl = _s.playVideoOnlyWhenLoggedIn_bl == "yes" ? true : false;
		
			_s.playlistLoop_bl = _s.props_obj.playlistLoop; 
			_s.playlistLoop_bl = _s.playlistLoop_bl == "yes" ? true : false;
			
			_s.shuffle_bl = _s.props_obj.shuffle; 
			_s.shuffle_bl = _s.shuffle_bl == "yes" ? true : false;
			
			_s.useDeepLinking_bl = _s.props_obj.useDeepLinking; 
			_s.useDeepLinking_bl = _s.useDeepLinking_bl == "yes" ? true : false;
			
			_s.showSoundCloudUserNameInTitle_bl = _s.props_obj.showSoundCloudUserNameInTitle; 
			_s.showSoundCloudUserNameInTitle_bl = _s.showSoundCloudUserNameInTitle_bl == "yes" ? true : false;
			
			_s.showThumbnail_bl = _s.props_obj.showThumbnail; 
			_s.showThumbnail_bl = _s.showThumbnail_bl == "yes" ? true : false;

			_s.useID3ForFolderPlaylist = _s.props_obj.useID3ForFolderPlaylist; 
			_s.useID3ForFolderPlaylist = _s.useID3ForFolderPlaylist == "no" ? false : true;
			
			_s.showLoopButton_bl = _s.props_obj.showLoopButton; 
			_s.showLoopButton_bl = _s.props_obj.showLoopButton == "no" ? false : true;
			
			_s.showPlayListButtonAndPlaylist_bl = _s.props_obj.showPlayListButtonAndPlaylist; 
			_s.showPlayListButtonAndPlaylist_bl = _s.showPlayListButtonAndPlaylist_bl == "no" ? false : true;
			
			if(FWDRAPUtils.isMobile 
			   && _s.showPlayListButtonAndPlaylist_bl
			   && _s.props_obj.showPlayListOnMobile == "no"
			   ){
				_s.showPlayListButtonAndPlaylist_bl = false;
			}
			
			_s.privateVideoPassword_str = _s.props_obj.privatePassword;

			_s.useVis = _s.props_obj.useVisualizer; 
			_s.useVis = _s.useVis == "yes" ? true : false;
			_s.visPrst = _s.props_obj.visualizerPreset || 'wave1';

			_s.useDumyVisualizeOnIOS = _s.props_obj.useDumyVisualizeOnIOS; 
			_s.useDumyVisualizeOnIOS = _s.useDumyVisualizeOnIOS == "yes" ? true : false;
			

			var prst = ['wave1','wave2','bars1','bars2'];
			_s.visRand = _s.props_obj.visualizerRandomPreset;
			_s.visRand = _s.visRand == "yes" ? true : false;
			
			if(_s.visRand) _s.visPrst = prst[Math.floor(Math.random() * prst.length)];
			
			_s.visClr = _s.props_obj.visualizerColor || ["#FF22E7", "#F8EE0C", "#0FFA50", "#00FFFF", "#2730FF"];
			_s.visCapClr = _s.props_obj.visualizerCapColor || "FF0000";
			
			_s.showPlaylistsButtonAndPlaylists_bl = _s.props_obj.showPlaylistsButtonAndPlaylists;
			_s.showPlaylistsButtonAndPlaylists_bl = _s.showPlaylistsButtonAndPlaylists_bl == "no" ? false : true;
			
			_s.showPlaylistsByDefault_bl = _s.props_obj.showPlaylistsByDefault; 
			_s.showPlaylistsByDefault_bl = _s.showPlaylistsByDefault_bl == "yes" ? true : false;
		
			_s.showShuffleButton_bl = _s.props_obj.showShuffleButton; 
			_s.showShuffleButton_bl = _s.props_obj.showShuffleButton == "no" ? false : true;
			
			_s.showDownloadMp3Button_bl = _s.props_obj.showDownloadMp3Button; 
			_s.showDownloadMp3Button_bl = _s.showDownloadMp3Button_bl == "no" ? false : true;
			
			_s.showBuyButton_bl = _s.props_obj.showBuyButton; 
			_s.showBuyButton_bl = _s.showBuyButton_bl == "no" ? false : true;
			
			_s.showFacebookButton_bl = _s.props_obj.showFacebookButton; 
			_s.showFacebookButton_bl = _s.props_obj.showFacebookButton == "no" ? false : true;
			
			_s.showPopupButton_bl = _s.props_obj.showPopupButton; 
			_s.showPopupButton_bl = _s.showPopupButton_bl == "no" ? false : true;

			_s.openPopupOnPlay_bl = _s.props_obj.openPopupOnPlay; 
			_s.openPopupOnPlay_bl = _s.openPopupOnPlay_bl == "yes" ? true : false;

			_s.expandControllerBackground_bl = _s.props_obj.expandBackground; 
			_s.expandControllerBackground_bl = _s.expandControllerBackground_bl == "yes" ? true : false;

			_s.sortAscending_bl = true;
			if(_s.props_obj && _s.props_obj.playlistSort == 'descending'){
				_s.sortAscending_bl = false;
			}
			
			_s.showPlaylistItemPlayButton_bl = _s.props_obj.showPlaylistItemPlayButton; 
			_s.showPlaylistItemPlayButton_bl = _s.showPlaylistItemPlayButton_bl == "no" ? false : true;
			
			_s.showPlaylistItemDownloadButton_bl = _s.props_obj.showPlaylistItemDownloadButton; 
			_s.showPlaylistItemDownloadButton_bl = _s.showPlaylistItemDownloadButton_bl == "no" ? false : true;
			
			_s.showPlaylistItemBuyButton_bl = _s.props_obj.showPlaylistItemBuyButton; 
			_s.showPlaylistItemBuyButton_bl = _s.showPlaylistItemBuyButton_bl == "no" ? false : true;
			
			_s.forceDisableDownloadButtonForPodcast_bl = _s.props_obj.forceDisableDownloadButtonForPodcast; 
			_s.forceDisableDownloadButtonForPodcast_bl = _s.forceDisableDownloadButtonForPodcast_bl == "yes" ? true : false;
			
			_s.forceDisableDownloadButtonForOfficialFM_bl = _s.props_obj.forceDisableDownloadButtonForOfficialFM; 
			_s.forceDisableDownloadButtonForOfficialFM_bl = _s.forceDisableDownloadButtonForOfficialFM_bl == "yes" ? true : false;
			
			_s.forceDisableDownloadButtonForFolder_bl = _s.props_obj.forceDisableDownloadButtonForFolder; 
			_s.forceDisableDownloadButtonForFolder_bl = _s.forceDisableDownloadButtonForFolder_bl == "yes" ? true : false;
			
			_s.showTracksNumbers_bl = _s.props_obj.showTracksNumbers;  
			_s.showTracksNumbers_bl = _s.showTracksNumbers_bl == "yes" ? true : false;
			
			_s.disableAudioScrubbar_bl = _s.props_obj.disableAudioScrubbar; 
			_s.disableAudioScrubbar_bl = _s.disableAudioScrubbar_bl == "no" ? false : true;
			
			_s.animateOnIntro_bl = _s.props_obj.animateOnIntro; 
			_s.animateOnIntro_bl = _s.animateOnIntro_bl == "yes" ? true : false;
			
			_s.showNextAndPrevButtons_bl = _s.props_obj.showNextAndPrevButtons; 
			_s.showNextAndPrevButtons_bl = _s.showNextAndPrevButtons_bl == "yes" ? true : false;
			
			_s.showPlayListByDefault_bl = _s.props_obj.showPlayListByDefault; 
			_s.showPlayListByDefault_bl = _s.showPlayListByDefault_bl == "no" ? false : true;
			
			_s.showSoundAnimation_bl = _s.props_obj.showSoundAnimation; 
			_s.showSoundAnimation_bl = _s.showSoundAnimation_bl == "yes" ? true : false;
			
			_s.showPlaylistItemPlayButton_bl = _s.props_obj.showPlaylistItemPlayButton; 
			_s.showPlaylistItemPlayButton_bl = _s.showPlaylistItemPlayButton_bl == "no" ? false : true;
			
			_s.addScrollBarMouseWheelSupport_bl = _s.props_obj.addScrollBarMouseWheelSupport; 
			_s.addScrollBarMouseWheelSupport_bl = _s.addScrollBarMouseWheelSupport_bl == "no" ? false : true;

			_s.showMainScrubberToolTipLabel_bl = _s.props_obj.showMainScrubberAndVolumeScrubberToolTipLabel;
			_s.showMainScrubberToolTipLabel_bl = _s.showMainScrubberToolTipLabel_bl == "yes" ? true : false;
			
			_s.showSearchBar_bl = _s.props_obj.showSearchBar;
			_s.showSearchBar_bl = _s.showSearchBar_bl == "no" ? false : true;

			_s.searchBarPosition = _s.props_obj.searchBarPosition;
			if(!_s.showSearchBar_bl) _s.searchBarPosition = 'bottom';
			
			_s.usePlaylistsSelectBox_bl = _s.props_obj.usePlaylistsSelectBox;
			_s.usePlaylistsSelectBox_bl = _s.usePlaylistsSelectBox_bl == "yes" ? true : false;
			
			_s.showPlaylistsSelectBoxNumbers_bl = _s.props_obj.showPlaylistsSelectBoxNumbers;
			_s.showPlaylistsSelectBoxNumbers_bl = _s.showPlaylistsSelectBoxNumbers_bl == "yes" ? true : false;
			
			_s.mainSelectorBackgroundSelectedColor = _s.props_obj.mainSelectorBackgroundSelectedColor || "#FFFFFF";
			_s.mainSelectorTextNormalColor = _s.props_obj.mainSelectorTextNormalColor || "#FFFFFF";
			_s.mainSelectorTextSelectedColor = _s.props_obj.mainSelectorTextSelectedColor || "#000000";
			_s.mainButtonBackgroundNormalColor = _s.props_obj.mainButtonBackgroundNormalColor || "#212021";
			_s.mainButtonBackgroundSelectedColor = _s.props_obj.mainButtonBackgroundSelectedColor || "#FFFFFF"; 
			_s.mainButtonTextNormalColor = _s.props_obj.mainButtonTextNormalColor || "#FFFFFF";
			_s.mainButtonTextSelectedColor = _s.props_obj.mainButtonTextSelectedColor || "#000000";

			_s.atbTimeBackgroundColor = _s.props_obj.atbTimeBackgroundColor || "transparent";
			_s.atbTimeTextColorNormal = _s.props_obj.atbTimeTextColorNormal ||  "#888888";
			_s.atbTimeTextColorSelected = _s.props_obj.atbTimeTextColorSelected || "#FFFFFF";
			_s.atbButtonTextNormalColor = _s.props_obj.atbButtonTextNormalColor || "#888888";
			_s.atbButtonTextSelectedColor = _s.props_obj.atbButtonTextSelectedColor || "#FFFFFF";
			_s.atbButtonBackgroundNormalColor = _s.props_obj.atbButtonBackgroundNormalColor || "#FFFFFF";
			_s.atbButtonBackgroundSelectedColor = _s.props_obj.atbButtonBackgroundSelectedColor || "#000000";

			_s.scrubbersToolTipLabelBackgroundColor = _s.props_obj.scrubbersToolTipLabelBackgroundColor || "#FFFFFF";
			_s.scrubbersToolTipLabelFontColor  = _s.props_obj.scrubbersToolTipLabelFontColor || "#000000";
			
			_s.preloaderPath_str = _s.skinPath_str + "logo.png";
			_s.mainPreloader_img = new Image();
			_s.mainPreloader_img.onerror = _s.onSkinLoadErrorHandler;
			_s.mainPreloader_img.onload = _s.onPreloaderLoadHandler;
			_s.mainPreloader_img.src = _s.skinPath_str + "preloader.png";
			_s.arrowN_str = _s.skinPath_str + "combobox-arrow-normal.png"; 
			_s.arrowS_str = _s.skinPath_str + "combobox-arrow-selected.png"; 
			_s.comboboxBk1_str = _s.skinPath_str + "combobox-item-background1.png"; 
			_s.comboboxBk2_str = _s.skinPath_str + "combobox-item-background2.png"; 
			_s.shareBkPath_str = _s.skinPath_str + "categories-background.png"; 

			_s.skinPaths_ar = [];

			if(!_s.useVectorIcons){
				_s.skinPaths_ar.push(
					{img:_s.prevN_img = new Image(), src:_s.skinPath_str + "prev-button.png"},
				     {img:_s.playN_img = new Image(), src:_s.skinPath_str + "play-button.png"},
				     {img:_s.pauseN_img = new Image(), src:_s.skinPath_str + "pause-button.png"},
				     {img:_s.nextN_img = new Image(), src:_s.skinPath_str + "next-button.png"},
				     {img:_s.volumeN_img = new Image(), src:_s.skinPath_str + "volume-icon.png"},
				     {img:_s.categoriesN_img = new Image(), src:_s.skinPath_str + "categories-button.png"},
				     {img:_s.replayN_img = new Image(), src:_s.skinPath_str + "replay-button.png"},
				     {img:_s.playlistN_img = new Image(), src:_s.skinPath_str + "playlist-button.png"},
				     {img:_s.shuffleN_img = new Image(), src:_s.skinPath_str + "shuffle-button.png"},
				     {img:_s.shareN_img = new Image(), src:_s.skinPath_str + "share.png"},
				     {img:_s.popupN_img = new Image(), src:_s.skinPath_str + "popup-button.png"},
				     {img:_s.downloaderN_img = new Image(), src:_s.skinPath_str + "download-button.png"},
				     {img:_s.buyN_img = new Image(), src:_s.skinPath_str + "buy-button.png"},
				     {img:_s.passColoseN_img = new Image(), src:_s.skinPath_str + "categories-close-button.png"},
			     	 {img:_s.atbNPath_img = new Image(), src:_s.skinPath_str + "a-to-b-button.png"},
			     	 {img:_s.closeClooseN_img = new Image(), src:_s.skinPath_str + "categories-close-button.png"}
				);

				if(_s.useYoutube_bl || _s.useVideo_bl){
					_s.skinPaths_ar.push(
						{img:_s.fullScreenN_img = new Image(), src:_s.skinPath_str + "full-screen.png"},
						{img:_s.normalScreenN_img = new Image(), src:_s.skinPath_str + "normal-screen.png"},
						{img:_s.largePlayN_img = new Image(), src:_s.skinPath_str + "large-play.png"}
					);
				}
			}
			
			_s.skinPaths_ar.push(
		         {img:_s.controllerBk_img = new Image(), src:_s.skinPath_str + "controller-background.png"},
			     {img:_s.separator1_img = new Image(), src:_s.skinPath_str + "separator.png"},
			     {img:_s.separator2_img = new Image(), src:_s.skinPath_str + "separator.png"},
			     {img:_s.mainScrubberBkLeft_img = new Image(), src:_s.skinPath_str + "scrubber-left-background.png"},
			     {img:_s.mainScrubberBkRight_img = new Image(), src:_s.skinPath_str + "scrubber-right-background.png"},
			     {img:_s.mainScrubberDragLeft_img = new Image(), src:_s.skinPath_str + "scrubber-left-drag.png"},
			     {img:_s.mainScrubberLine_img = new Image(), src:_s.skinPath_str + "scrubber-line.png"},
			     {img:_s.mainScrubberLeftProgress_img = new Image(), src:_s.skinPath_str + "progress-left.png"},
			     {img:_s.volumeScrubberDragLeft_img = new Image(), src:_s.skinPath_str + "scrubber-left-drag.png"},
			     {img:_s.progressLeft_img = new Image(), src:_s.skinPath_str + "progress-left.png"},
			     {img:_s.titlebarLeftPath_img = new Image(), src:_s.skinPath_str + "titlebar-grad-left.png"},
				 {img:_s.playbackRateNormal_img = new Image(), src:_s.skinPath_str + "playback-rate-normal.png"},
			     {img:_s.titleBarLeft_img = new Image(), src:_s.skinPath_str + "titlebar-left-pattern.png"}
    		)

    		_s.titleBarRigthPath = _s.skinPath_str + "titlebar-right-pattern.png";

			
			//setup skin paths
			_s.atbSPath_str = _s.skinPath_str + "a-to-b-button-over.png";
			_s.playbackRateSelectedPath_str = _s.skinPath_str + "playback-rate-selected.png"; 
			_s.largePlayS_str = _s.skinPath_str + "large-play-over.png"; 
			_s.fullScreenS_str = _s.skinPath_str + "full-screen-over.png"; 
			_s.normalScreenS_str = _s.skinPath_str + "normal-screen-over.png"; 
			_s.prevSPath_str = _s.skinPath_str + "prev-button-over.png"; 
			_s.playSPath_str = _s.skinPath_str + "play-button-over.png";
			_s.pauseSPath_str = _s.skinPath_str + "pause-button-over.png";
			_s.nextSPath_str = _s.skinPath_str + "next-button-over.png"; 
			
			_s.controllerBkPath_str = _s.skinPath_str + "controller-background.png";
			_s.thumbnailBkPath_str = _s.skinPath_str + "thumbnail-background.png";

			_s.mainScrubberBkMiddlePath_str = _s.skinPath_str + "scrubber-middle-background.png";
			_s.mainScrubberDragMiddlePath_str = _s.skinPath_str + "scrubber-middle-drag.png";
	
			_s.volumeScrubberBkMiddlePath_str = _s.skinPath_str + "scrubber-middle-background.png";
			_s.volumeScrubberDragMiddlePath_str = _s.skinPath_str + "scrubber-middle-drag.png";	
		
			_s.volumeSPath_str = _s.skinPath_str + "volume-icon-over.png";
			_s.volumeDPath_str = _s.skinPath_str + "volume-icon-disabled.png";
			_s.progressMiddlePath_str = _s.skinPath_str + "progress-middle.png";
			
			_s.categoriesSPath_str = _s.skinPath_str + "categories-button-over.png"; 
			_s.replaySPath_str = _s.skinPath_str + "replay-button-over.png"; 
			_s.playlistSPath_str = _s.skinPath_str + "playlist-button-over.png"; 
			_s.shuffleSPath_str = _s.skinPath_str + "shuffle-button-over.png"; 
			_s.shareSPath_str = _s.skinPath_str + "share-over.png"; 
			_s.popupSPath_str = _s.skinPath_str + "popup-button-over.png"; 
			_s.downloaderSPath_str = _s.skinPath_str + "download-button-over.png"; 
			_s.buySPath_str = _s.skinPath_str + "buy-button-over.png";  
			_s.titlebarRightPath_str = _s.skinPath_str + "titlebar-grad-right.png"; 
	
			_s.titlebarBkMiddlePattern_str = _s.skinPath_str + "titlebar-middle-pattern.png"; 
			_s.passButtonNPath_str = _s.skinPath_str + "pass-button.png";
			_s.passButtonSPath_str = _s.skinPath_str + "pass-button-over.png";
			_s.playlistItemProgress1_img = _s.skinPath_str + "playlist-item-progress1.png";
			_s.playlistItemProgress2_img = _s.skinPath_str + "playlist-item-progress2.png";
			
			
			if(_s.showPlayListButtonAndPlaylist_bl){
				_s.skinPaths_ar.push(
				    {img:_s.playlistItemBk1_img = new Image(), src:_s.skinPath_str + "playlist-item-background1.png"},
				    {img:_s.playlistItemBk2_img = new Image(), src:_s.skinPath_str + "playlist-item-background2.png"},
				    {img:_s.playlistSeparator_img = new Image(), src:_s.skinPath_str + "playlist-separator.png"},
				    {img:_s.playlistScrBkTop_img = new Image(), src:_s.skinPath_str + "playlist-scrollbar-background-top.png"},
				    {img:_s.playlistScrDragTop_img = new Image(), src:_s.skinPath_str + "playlist-scrollbar-drag-bottom.png"},
				    {img:_s.playlistScrLines_img = new Image(), src:_s.skinPath_str + "playlist-scrollbar-lines.png"},
				    {img:_s.playlistPlayButtonN_img = new Image(), src:_s.skinPath_str + "playlist-play-button.png"},
				    {img:_s.playlistDownloadButtonN_img = new Image(), src:_s.skinPath_str + "playlist-download-button.png"},
				    {img:_s.playlistBuyButtonN_img = new Image(), src:_s.skinPath_str + "playlist-buy-button.png"}
			    );

			    _s.playlistItemGrad1Path = _s.skinPath_str + "playlist-item-grad1.png";
				_s.playlistItemGrad2Path = _s.skinPath_str + "playlist-item-grad2.png";
				
				_s.playlistDownloadButtonS_str = _s.skinPath_str + "playlist-download-button-over.png"; 
				_s.playlistBuyButtonS_str = _s.skinPath_str + "playlist-buy-button-over.png"; 
				_s.scrBkMiddlePath_str = _s.skinPath_str + "playlist-scrollbar-background-middle.png"; 
				_s.scrBkBottomPath_str = _s.skinPath_str + "playlist-scrollbar-background-bottom.png"; 
				_s.scrDragMiddlePath_str = _s.skinPath_str + "playlist-scrollbar-drag-middle.png"; 
				_s.scrDragBottomPath_str = _s.skinPath_str + "playlist-scrollbar-drag-top.png"; 
				_s.scrLinesSPath_str = _s.skinPath_str + "playlist-scrollbar-lines-over.png";
				
				_s.playlistPlayButtonN_str = _s.skinPath_str + "playlist-play-button.png"; 
				_s.playlistPlayButtonS_str = _s.skinPath_str + "playlist-play-button-over.png"; 
				_s.playlistPauseButtonN_str = _s.skinPath_str + "playlist-pause-button.png"; 
				_s.playlistPauseButtonS_str = _s.skinPath_str + "playlist-pause-button-over.png"; 
			}
			
			if(_s.showSearchBar_bl && !_s.useVectorIcons){
				_s.skinPaths_ar.push(
					{img:_s.sortAN_img = new Image(), src:_s.skinPath_str + "sort-alphabetical-button.png"},
					{img:_s.sortNN_img = new Image(), src:_s.skinPath_str + "sort-numerical-button.png"},
					{img:_s.ascendingN_img = new Image(), src:_s.skinPath_str + "ascending-button.png"},
					{img:_s.decendingN_img = new Image(), src:_s.skinPath_str + "descending-button.png"}
				);
			}

			_s.sortASPath_str = _s.skinPath_str + "sort-alphabetical-button-over.png"; 
			_s.sortNSPath_str = _s.skinPath_str + "sort-numerical-button-over.png"; 
			_s.ascendingSpath_str = _s.skinPath_str + "ascending-button-over.png"; 
			_s.decendingSpath_str = _s.skinPath_str + "descending-button-over.png";
			_s.inputArrowPath_str = _s.skinPath_str + "input-arrow.png";  
			
			if(_s.showPlaylistsButtonAndPlaylists_bl && !_s.useVectorIcons){
				_s.skinPaths_ar.push(
				    {img:_s.catNextN_img = new Image(), src:_s.skinPath_str + "categories-next-button.png"},
				    {img:_s.catPrevN_img = new Image(), src:_s.skinPath_str + "categories-prev-button.png"},
				    {img:_s.catCloseN_img = new Image(), src:_s.skinPath_str + "categories-close-button.png"}
				);
			}

			_s.catBkPath_str = _s.skinPath_str + "categories-background.png"; 
			_s.catThumbBkPath_str = _s.skinPath_str + "categories-thumbnail-background.png"; 
			_s.catThumbBkTextPath_str = _s.skinPath_str + "categories-thumbnail-text-backgorund.png"; 
			_s.catNextSPath_str = _s.skinPath_str + "categories-next-button-over.png"; 
			_s.catNextDPath_str = _s.skinPath_str + "categories-next-button-disabled.png";
			_s.catPrevSPath_str = _s.skinPath_str + "categories-prev-button-over.png"; 
			_s.catPrevDPath_str = _s.skinPath_str + "categories-prev-button-disabled.png"; 
			_s.catCloseSPath_str = _s.skinPath_str + "categories-close-button-over.png"; 
			
			
			if(_s.showShareButton_bl && !_s.useVectorIcons){
				
				_s.skinPaths_ar.push(
					{img:_s.shareClooseN_img = new Image(), src:_s.skinPath_str + "embed-close-button.png"},
					{img:_s.facebookN_img = new Image(), src:_s.skinPath_str + "facebook.png"},
					{img:_s.googleN_img = new Image(), src:_s.skinPath_str + "google-plus.png"},
					{img:_s.twitterN_img = new Image(), src:_s.skinPath_str + "twitter.png"},
					{img:_s.likedInkN_img = new Image(), src:_s.skinPath_str + "likedin.png"},
					{img:_s.bufferkN_img = new Image(), src:_s.skinPath_str + "buffer.png"},
					{img:_s.diggN_img = new Image(), src:_s.skinPath_str + "digg.png"},
					{img:_s.redditN_img = new Image(), src:_s.skinPath_str + "reddit.png"},
					{img:_s.thumbrlN_img = new Image(), src:_s.skinPath_str + "thumbrl.png"}
				);
				
				_s.facebookSPath_str = _s.skinPath_str + "facebook-over.png";
				_s.googleSPath_str = _s.skinPath_str + "google-plus-over.png";
				_s.twitterSPath_str = _s.skinPath_str + "twitter-over.png";
				_s.likedInSPath_str = _s.skinPath_str + "likedin-over.png";
				_s.bufferSPath_str = _s.skinPath_str + "buffer-over.png";
				_s.diggSPath_str = _s.skinPath_str + "digg-over.png";
				_s.redditSPath_str = _s.skinPath_str + "reddit-over.png";
				_s.thumbrlSPath_str = _s.skinPath_str + "thumbrl-over.png";
			}
			_s.embedWindowClosePathS_str = _s.skinPath_str + "embed-close-button-over.png";
			
			if(_s.showPlaybackRateButton_bl && !_s.useVectorIcons){
				
				_s.skinPaths_ar.push(
					{img:_s.playbackRateWindowClooseN_img = new Image(), src:_s.skinPath_str + "embed-close-button.png"}
				);
				
				_s.playbackRateClosePathS_str = _s.skinPath_str + "embed-close-button-over.png";
			}
		
			_s.totalGraphics = _s.skinPaths_ar.length;
			_s.loadSkin();
		};
		

		//####################################//
		/* Preloader load done! */
		//###################################//
		_s.onPreloaderLoadHandler = function(){
			setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PRELOADER_LOAD_DONE);
			}, 50);
		};
		

		//####################################//
		/* load buttons graphics */
		//###################################//
		_s.loadSkin = function(){
			var img;
			var src;
			for(var i=0; i<_s.totalGraphics; i++){
				img = _s.skinPaths_ar[i].img;
				src = _s.skinPaths_ar[i].src;
				img.onload = _s.onSkinLoadHandler;
				img.onerror = _s.onSkinLoadErrorHandler;
				img.src = src;
			}
		};
		
		_s.onSkinLoadHandler = function(e){
			_s.countLoadedSkinImages++;
			if(_s.countLoadedSkinImages == _s.totalGraphics){
				setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		_s.onSkinLoadErrorHandler = function(e){
			if (FWDRAPUtils.isIEAndLessThen9){
				message = "Graphics image not found!";
			}else{
				message = "The skin icon with label <font color='#FF0000'>" + e.target.src + "</font> can't be loaded, check path!";
			}
			
			if(window.console) console.log(e);
			var err = {text:message};
			setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, err);
			}, 50);
		};
		

		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		_s.showPropertyError = function(error){
			_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"The property called <font color='#FF0000'>" + error + "</font> is not defined."});
		};
		
		_s.downloadMp3 = function(sourcePath, pName){
			
			if(document.location.protocol == "file:"){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Downloading mp3 files local is not allowed or possible!. To function properly please test online."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			var defaultSourcePath = sourcePath;
			var path1 = location.origin;
			var path2 = location.pathname;
		
			if(path2.indexOf(".") != -1){
				path2 = path2.substr(0, path2.lastIndexOf("/") + 1);
			}
			
			var hasHTTPorHTTPS_bl = sourcePath.indexOf("http:") == -1 && sourcePath.indexOf("https:") == -1;
		
			
			if(hasHTTPorHTTPS_bl){
				sourcePath = path1 + path2 + sourcePath;
			}
	
			if(!pName) return;
		
			pName = pName.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
			var ext = '.mp3';
			if((/\.m4a$/i).test(sourcePath))  ext= '.m4a';
			if(!(/\.(mp3)$/i).test(pName)) pName+= ext;
			
			sourcePath = sourcePath;
		
			var url = _s.mp3DownloaderPath_str;
			if(!_s.dlIframe){
				_s.dlIframe = document.createElement("IFRAME");
				_s.dlIframe.style.display = "none";
				document.documentElement.appendChild(_s.dlIframe);
			}
			
			if(_s.isMbl && FWDRAPUtils.isIOS){
			
				var email = _s.getValidEmail();
				if(!email) return;
				
				if(_s.emailXHR != null){
					try{_s.emailXHR.abort();}catch(e){}
					_s.emailXHR.onreadystatechange = null;
					_s.emailXHR.onerror = null;
					_s.emailXHR = null;
				}
				
				_s.emailXHR = new XMLHttpRequest();
				
				_s.emailXHR.onreadystatechange = function(e){
					if(_s.emailXHR.readyState == 4){
						if(_s.emailXHR.status == 200){
							if(_s.emailXHR.responseText == "sent"){
								alert("Email sent.");
							}else{
								alert("Error sending email, _s is a server side error, the php file can't send the email!");
							}
							
						}else{
							alert("Error sending email: " + _s.emailXHR.status + ": " + _s.emailXHR.statusText);
						}
					}
				};
				
				_s.emailXHR.onerror = function(e){
					try{
						if(window.console) console.log(e);
						if(window.console) console.log(e.message);
					}catch(e){};
					alert("Error sending email: " + e.message);
				};

				_s.emailXHR.open("get", _s.mailPath_str + "?mail=" + email + "&name=" + pName + "&path=" + sourcePath, true);
				_s.emailXHR.send();
				return;
			}
		
			if(sourcePath.indexOf("soundcloud.com") != -1){
				_s.dlIframe.src = sourcePath;
			}else{
				_s.dlIframe.src = url + "?path="+ sourcePath +"&name=" + pName;
			}
		};
		
		_s.getValidEmail = function(){
			var email = prompt("Please enter your email address where the mp3 download link will be sent:");
			var emailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
			while(!emailRegExp.test(email) || email == ""){
				if(email === null) return;
				email = prompt("Please enter a valid email address:");
			}
			return email;
		};
		
		
		//####################################//
		/* load playlist */
		//####################################//
		_s.ID3Loaded = false;
		_s.loadPlaylist = function(id){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			var source =  _s.cats_ar[id].source;
			_s.playlistId = id;

			if(!source){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"<font color='#FF0000'>loadPlaylist()</font> - Please specify an html elementid, podcast link, soudcloud link or xml path"});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(!isNaN(source)){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"<font color='#FF0000'>loadPlaylist()</font> - The parameter must be of type string!"});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			_s.closeData();
			_s.resetYoutubePlaylistLoader();
			_s.isYoutbe_bl = false;
			
			if(source.indexOf("soundcloud.com") != -1){
				if(_s.plsCache_ar[_s.playlistId]){
					_s.playlist_ar = _s.plsCache_ar[_s.playlistId]
					_s.loadSoundCloudComplete();
				}else{
					_s.startToLoadSoundCloudList(source);	
				}
			}else if(source.indexOf("hubhopper.") != -1){
				_s.loadHubhopperPlaylist(source);	
			}else if(source.indexOf("list=") != -1 && _s.useYoutube_bl){
				_s.isYoutbe_bl = true;
				if(_s.plsCache_ar[_s.playlistId]){
					_s.playlist_ar = _s.plsCache_ar[_s.playlistId]
					_s.youtubePlLoadComplete();
				}else{
					_s.loadYoutubePlaylist(source);
				}
			}else if(source.indexOf("folder:") != -1){
				if(!_s.ID3Loaded){
					var script = document.createElement('script');
					script.src = _s.mainFolderPath_str + 'java/FWDRAPID3.js';
					document.head.appendChild(script);
					script.onerror = function(){
						var err = 'ID3 library named <font color="#FF0000">FWDRAPID3.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDRAPID3.js</font> file.';
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:err});
						return;
					}
					
					script.onload = function () {
						_s.ID3Loaded = true;
						_s.loadPlaylist(_s.playlistId);
					}					
				}
				_s.loadFolderPlaylist(source);
			}else if(source.indexOf(".xml") != -1
			  || source.indexOf("/rss") != -1
			  || source.indexOf("http:") != -1
			  || source.indexOf("https:") != -1
			  || source.indexOf("www.") != -1
			){
				_s.loadXMLPlaylist(source);
			}else{
				_s.parseDOMPlaylist(source);	
			}
			_s.prevId = id;
		};

		
		//##########################################//
		/* load youtube list */
		//##########################################//
		_s.loadYoutubePlaylist = function(url){
			if(_s.isPlaylistDispatchingError_bl && !_s.isYoutbe_bl) return;
			
			if(!_s.youtubeUrl_str){
				url = url.substr(url.indexOf("=") + 1);
				_s.youtubeUrl_str = url;
			}
		
			_s.loadFromFolder_bl = true;
			
			if(_s.nextPageToken_str){
				_s.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + _s.nextPageToken_str + "&playlistId=" + _s.youtubeUrl_str + "&key=" + _s.ytbAPiKey + "&maxResults=50&callback=" + prt.instanceName_str + "._d.parseYoutubePlaylist";
			}else{
				_s.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + _s.youtubeUrl_str + "&key=" + _s.ytbAPiKey + "&maxResults=50&callback=" + prt.instanceName_str + "._d.parseYoutubePlaylist";
			}

			try{
				_s.head.removeChild(_s.scs_el);
				_s.scs_el = null;
			}catch(e){}
			
			
			try{
				_s.scs_el = document.createElement('script');
				_s.scs_el.src = _s.sourceURL_str;
				_s.scs_el.id = prt.instanceName_str + "youtube";
				_s.head.appendChild(_s.scs_el);
			}catch(e){}
			
			_s.JSONPRequestTimeoutId_to = setTimeout(_s.JSONPRequestTimeoutError, 6000);
		
		};
		
		_s.JSONPRequestTimeoutError = function(){
			_s.closeData();
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading youtube playlist!<font color='#ff0000'>" + _s.youtubeUrl_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
		
		_s.resetYoutubePlaylistLoader = function(){
			_s.isYoutbe_bl = false;
			_s.youtubeObject_ar = null;
			_s.nextPageToken_str = null;
			_s.youtubeUrl_str = null;
		};
		
		_s.parseYoutubePlaylist = function(object){
			
			if(_s.isPlaylistDispatchingError_bl || !_s.isYoutbe_bl) return;
			
			if(object.error){
				_s.JSONPRequestTimeoutError();
				if(console) console.dir(object);
				return;
			}
			
			_s.playlist_ar = [];
			var tt;
			var item;
			var videoSource;
			
			if(!_s.youtubeObject_ar){
				_s.youtubeObject_ar = [];
			}
			
			for(var i=0; i<object.items.length; i++){
				_s.youtubeObject_ar.push(object.items[i]);
			}
			
			tt = _s.youtubeObject_ar.length;
			
			_s.closeData();
			
			if(object.nextPageToken && tt < _s.maxPlaylistItems){
				_s.nextPageToken_str = object.nextPageToken;
				_s.loadYoutubePlaylist();
				return;
			}
			
			for(var i=0; i< tt; i++){
				if(i > _s.maxPlaylistItems - 1) break;
				
				var obj = {};
				item = _s.youtubeObject_ar[i];
				
				obj.source = item.snippet.resourceId.videoId;
				obj.buy = undefined;
				var count = "";
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + "<span span class=\"fwdrap-title\">" + item.snippet.title + "</span>" ;
				}else{
					obj.title = "<span span class=\"fwdrap-title\">" + item.snippet.title + "</span>" ;
				}
				obj.titleText = item.snippet.title;
				
				obj.title = obj.title.replace(/\(Official Video\)/gi, "");
				obj.title = obj.title.replace(/\( Official Video \)/gi, "");
				obj.title = obj.title.replace(/Official Video/gi, "");
			
				obj.downloadable = false;
				try{
					obj.thumbPath = item.snippet.thumbnails["default"].url;
				}catch(e){}
				obj.posterSource =  "none";
				
				if(item.snippet.title.indexOf("eleted video") == -1 && item.snippet.title.indexOf("his video is unavailable") == -1){
					_s.playlist_ar.push(obj);
				}
			}
			_s.plsCache_ar[_s.playlistId] = _s.playlist_ar;
			_s.youtubePlLoadComplete();
		}

		if(_s.inversePlaylist){
			_s.playlist_ar.reverse();
		}

		_s.youtubePlLoadComplete = function(){
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
			
			_s.isDataLoaded_bl = true;
		}


		//##########################################//
		/* load soundcloud track */
		//##########################################//
		_s.startToGetSoundcloudUrl = function(url){
			_s.scId = 0;
			_s.originalURL_str = url;
			_s.getSoundcloudUrl(url);
		}
		
		_s.getSoundcloudUrl = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			try{
				_s.closeJsonPLoader();
			}catch(e){}

			var url;
			_s.scClientId = _s.sc_ar[_s.scId];
			if(_s.hasGoodKey){
				_s.scId = 0;
				_s.scClientId = _s.hasGoodKey;
			}
			
			_s.sourceURL_str = url;
			if(_s.sourceURL_str.indexOf("likes") != -1){
				_s.sourceURL_str =  _s.sourceURL_str.replace(/\/likes$/, "/favorites");
			}
			url = "https://api.soundcloud.com/resolve?format=json&url=" + _s.sourceURL_str + "&limit=100" + "&client_id=" + _s.scClientId;
			_s.isSCTrack = true;
			
			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler;

			try{
				_s.xhr.open("GET", _s.sourceURL_str, true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud track can't be loaded! <font color='#FF0000'>" + _s.sourceURL_str + "</font>. " + message, doNotResize:false});
			}
		};

		_s.checkSoundCloudTrackError = function(fErr){
			_s.scId ++;
			
			if(_s.scId == _s.sc_ar.length || fErr){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud track can't be loaded! <font color='#FF0000'>" + _s.originalURL_str + "</font>.", doNotResize:false});
				return;
			}
			_s.getSoundcloudUrl(_s.originalURL_str);
		}

		_s.parseSoundCloudURL = function(object){
			_s.closeJsonPLoader();
			
			var source;

			if(object["stream_url"]){
				source = object["stream_url"] + "?consumer_key=" + _s.scClientId;

				_s.xhr = new XMLHttpRequest();
				_s.xhr.onreadystatechange = function(e){
					if(_s.xhr.readyState == 4){
						if(_s.xhr.responseText.indexOf('error') != -1){
							_s.checkSoundCloudTrackError();
						}else{
							_s.hasGoodKey = _s.scClientId;
							_s.dispatchEvent(FWDRAPAudioData.SOUNDCLOUD_TRACK_READY, {source:source});
						}
					}
				}
			
				try{
					_s.xhr.open("GET", source, true);
					_s.xhr.send();
				}catch(e){}
			}else{
				_s.loadSoundcloudTrackError();
			}
		}
		
		_s.loadSoundcloudTrackError = function(){
			_s.closeJsonPLoader();
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading soundcloud track url!<font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
		

		//##########################################//
		/* load soundcloud list */
		//##########################################//
		_s.startToLoadSoundCloudList = function(url){
			_s.scId = 0;
			_s.originalURL_str = url;
			_s.loadSoundCloudList(url);
		}

		_s.loadSoundCloudList = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			var url;
			_s.scClientId_str = _s.sc_ar[_s.scId];
			
			_s.closeXHR();
			_s.isSClist = true;
			
			_s.sourceURL_str = url;
			
			if(_s.sourceURL_str.indexOf("likes") != -1){
				_s.sourceURL_str =  _s.sourceURL_str.replace(/\/likes$/, "/favorites");
			}

			if(_s.sourceURL_str.indexOf("api.soundcloud.") == -1){
				url = "https://api.soundcloud.com/resolve?format=json&url=" + _s.sourceURL_str + "&limit=200" + "&client_id=" + _s.scClientId_str;
			}else{
				url = _s.sourceURL_str + "?format=json&client_id=" + _s.scClientId_str  + "&limit=200";
			}

			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
		
			try{
				_s.xhr.open("GET", _s.sourceURL_str, true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud playlist can't be loaded! <font color='#FF0000'>" + _s.sourceURL_str + "</font>. " + message });
			}
		};

		_s.checkSoundCloudListError = function(fErr){
			_s.scId ++;	
			if(_s.scId == _s.sc_ar.length || fErr){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud playlist can't be loaded! <font color='#FF0000'>" + _s.originalURL_str + "</font>."});
				return;
			}
			_s.loadSoundCloudList(_s.originalURL_str);
		}
		
		_s.JSONPSoundcloudRequestTimeoutError = function(){
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading soundcloud url!<font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
	

		//#########################################//
		/* Icecast radio */
		//########################################//
		_s.startLoadingIcecast =  function(p){
			_s.originalSourceURL_str = p;
			_s.icecastReady = false;
			_s.useCors = 0;
			_s.closeJsonPLoader();
			_s.getIcecastRadioNameAndStream(p, false);
		}

		_s.startToUpdateIcecastName = function(){
			_s.closeJsonPLoader();
			_s.getIcecastRadioNameAndStream(_s.sourceURL_str, true);
		}
	
		_s.getIcecastRadioNameAndStream = function(url, updateTitle){
			
			if(_s.isPlaylistDispatchingError_bl) return;
			
			_s.sourceURL_str = url;
			
			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) == "/"){
				_s.sourceURL_str = _s.sourceURL_str.substr(0, _s.sourceURL_str.length - 1);
			}
			
			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) != "/"){
				_s.sourceURL_str += "/"
			}

			var proxyCors = '';
			if(_s.useCors == 1) proxyCors = _s.proxyCors;
			url = proxyCors + _s.sourceURL_str + "status-json.xsl";
			
			_s.originalSourceURL_str = _s.sourceURL_str;
			_s.icecastxmlHttp = new XMLHttpRequest();
			_s.icecastxmlHttp.onerror = _s.parseRadioErrorURL;
			_s.icecastxmlHttp.onreadystatechange = function() { 
				if (_s.icecastxmlHttp.readyState == 4 && _s.icecastxmlHttp.status == 200){
					_s.parseIcecastRadioURL(_s.icecastxmlHttp.responseText);
				}
			}
			_s.icecastxmlHttp.open("GET", url, true); // true for asynchronous 
			_s.icecastxmlHttp.send(null);
			
			if(!updateTitle){
				clearTimeout(_s.JSONPRequestTimeoutId_to);
				_s.JSONPRequestTimeoutId_to = setTimeout(_s.parseRadioErrorURL, 5000);
			}
		};
		
		_s.parseIcecastRadioURL = function(object){
			
			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) == "/"){
				_s.sourceURL_str = _s.sourceURL_str.substr(0, _s.sourceURL_str.length - 1);
			}
			
			object = JSON.parse(object);
			_s.closeJsonPLoader();

			var proxyCors = '';
			if(_s.useCors == 1) proxyCors = _s.proxyCors;
			
			if(object.icestats.source[0]){
				var source = proxyCors + object.icestats.source[0].listenurl;
				var songTitle = object.icestats.source[0].title;
			}else{
				var source = proxyCors + object.icestats.source.listenurl;
				var songTitle = object.icestats.source.title;
				
			}

			if(!songTitle) songTitle = "";
		
			
			if(object.icestats.source[0]){
				var infoWindowStr =  "<span class='" + _s.stationLabelClassName + "'>Station title:</span>" + "<span class='" + _s.stationClassName  + "'> " + object.icestats.source[0]['server_name'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.genreLabelClassName + "'>Genre:</span>" + "<span class='" + _s.genreClassName  + "'> " + object.icestats.source[0]['genre'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.currentListenersLabelClassName + "'>Current listeners:</span>" + "<span class='" + _s.currentListenersClassName  + "'> " + object.icestats.source[0]['listeners'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" +  "<span class='" + _s.bitrateLabelClassName + "'>Bitrate:</span>" + "<span class='" + _s.bitrateClassName  + "'> " + object.icestats.source[0]['bitrate'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;"
			}else{
				var infoWindowStr =  "<span class='" + _s.stationLabelClassName + "'>Station title:</span>" + "<span class='" + _s.stationClassName  + "'> " + object.icestats.source['server_name'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.genreLabelClassName + "'>Genre:</span>" + "<span class='" + _s.genreClassName  + "'> " + object.icestats.source['genre'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.currentListenersLabelClassName + "'>Current listeners:</span>" + "<span class='" + _s.currentListenersClassName  + "'> " + object.icestats.source['listeners'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" +  "<span class='" + _s.bitrateLabelClassName + "'>Bitrate:</span>" + "<span class='" + _s.bitrateClassName  + "'> " + object.icestats.source['bitrate'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;"
			}
		
			_s.dispatchEvent(FWDRAPAudioData.RADIO_TRACK_READY, {source:source, songTitle:songTitle});
			
			_s.updateRadioTitleId_to = setTimeout(function(){
				if(prt.isIcecast_bl){
					_s.startToUpdateIcecastName();
				}
			}, 5000)
			
			var df = songTitle;
			var artsist = df.substr(0, df.indexOf("-") - 1);
			var song = df.substr(df.indexOf("-") + 2);
			_s.getImage(artsist, song);
		}
		

		//#########################################//
		/* Shoutcast radio */
		//########################################//
		_s.startLoadingShoutcast =  function(p){
			_s.originalSourceURL_str = p;
			_s.shoutcastReady = false;
			_s.useCors = 0;
			_s.closeJsonPLoader();
			_s.getShoutcastRadioNameAndStream(p, false);
		}

		_s.startToUpdateShoutcast = function(){
			_s.closeJsonPLoader();
			_s.getShoutcastRadioNameAndStream(_s.sourceURL_str, true);
		}

		_s.getShoutcastRadioNameAndStream = function(url, updateTitle){
			
			if(_s.isPlaylistDispatchingError_bl) return;
			
			_s.sourceURL_str = url;

			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) == "/"){
				_s.sourceURL_str = _s.sourceURL_str.substr(0, _s.sourceURL_str.length - 1);
			}

			var proxyCors = '';
			if(_s.useCors == 1) proxyCors = _s.proxyCors;
			url = proxyCors + _s.sourceURL_str + "/stats?sid=1&json=1&callback=" + prt.instanceName_str + "._d.parseShoutcastRadioURL";
			
			try{
				_s.head.removeChild(_s.scs_el);
				_s.scs_el = null;
			}catch(e){}

			_s.scs_el = document.createElement('script');
			_s.scs_el.src = url;
			_s.scs_el.id = prt.instanceName_str + "_shoutcast";
			_s.scs_el.onerror = _s.parseRadioErrorURL;
			_s.head.appendChild(_s.scs_el);
			
			if(!updateTitle){
				clearTimeout(_s.JSONPRequestTimeoutId_to);
				_s.JSONPRequestTimeoutId_to = setTimeout(_s.parseRadioErrorURL, 5000);
			} 
		};

		_s.parseRadioErrorURL = function(){	
			if(!prt.isShoutcast_bl && !prt.isIcecast_bl){
				_s.closeJsonPLoader();
				 return;
			}
			
			if(_s.useCors == 0){
				_s.useCors ++;
				if(prt.isIcecast_bl){
					_s.getIcecastRadioNameAndStream(_s.sourceURL_str, false);
				}else{
					_s.getShoutcastRadioNameAndStream(_s.sourceURL_str, false);
				}
				return;
			}

			_s.closeJsonPLoader();
			
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading radio track <font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			if(prt.isShoutcast_bl) _s.startToUpdateShoutcast();
		};
		
		_s.parseShoutcastRadioURL = function(object){
			
			if(!prt.isShoutcast_bl && !prt.isIcecast_bl) return;
			_s.closeJsonPLoader();
			
			var source;
			
			if(object["streampath"]){
				_s.shoutcastReady = true;
				var proxyCors = '';
				if(_s.useCors == 1) proxyCors = _s.proxyCors;

				source = proxyCors + _s.sourceURL_str + object["streampath"];
				if(object["streampath"] == "/") source += "/";
				var songTitle = object["songtitle"];
				
				var infoWindowStr =  "<span class='" + _s.stationLabelClassName + "'>Station title:</span>" + "<span class='" + _s.stationClassName  + "'> " + object['servertitle'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.genreLabelClassName + "'>Genre:</span>" + "<span class='" + _s.genreClassName  + "'> " + object['servergenre'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.currentListenersLabelClassName + "'>Current listeners:</span>" + "<span class='" + _s.currentListenersClassName  + "'> " + object['currentlisteners'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" +  "<span class='" + _s.bitrateLabelClassName + "'>Bitrate:</span>" + "<span class='" + _s.bitrateClassName  + "'> " + object['bitrate'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;"
				
				var artsist = songTitle.substr(0, songTitle.indexOf("-") - 1);
				var song = songTitle.substr(songTitle.indexOf("-") + 2);
				
				_s.getImage(artsist, song);
				_s.dispatchEvent(FWDRAPAudioData.RADIO_TRACK_READY, {source:source, songTitle:songTitle});
				
				_s.updateRadioTitleId_to = setTimeout(function(){
					if(prt.isShoutcast_bl){
						_s.startToUpdateShoutcast();
					}
				}, 5000)
				
			}else{
				_s.parseRadioErrorURL();
			}
		}
		
		_s.getImage =  function(artist, song){
			if(!prt.isShoutcast_bl && !prt.isIcecast_bl) return;
			artist = encodeURI(artist);
            song = encodeURI(song);	
           
            var url = "https://itunes.apple.com/search?type=jsonp&term==" + artist + "-" + song + "&media=music&limit=1&callback=" + prt.instanceName_str + "._d.parseImage";
			
			try{
				document.documentElement.removeChild(_s.scs3_el);
			}catch(e){}
			
			try{
				_s.scs3_el = document.createElement('script');
				_s.scs3_el.src = url;
				document.documentElement.appendChild(_s.scs3_el);
			}catch(e){}
		}
		
		_s.parseImage = function(object){
			if(!object["results"]) return;
			if(!object["results"][0]) return;
			_s.dispatchEvent(FWDRAPAudioData.UPDATE_IMAGE, {image:object["results"][0]["artworkUrl100"]});
		}
		
		_s.updateRadioName = function(){}
		
		_s.closeJsonPLoader = function(){
			
			_s.isSCTrack = false;
			_s.isSClist = false;
			_s.isLoadingShoutcast_bl = false;
			_s.isLoadingIcecast_bl = false;
			clearTimeout(_s.JSONPRequestTimeoutId_to);
			clearTimeout(_s.updateRadioTitleId_to);
			try{
				_s.icecastxmlHttp.abort();
			}catch(e){}
			_s.icecastxmlHttp = null;
			
			try{
				_s.shoutcastxmlHttp.abort();
			}catch(e){}
			_s.shoutcastxmlHttp = null;
			
			try{
				document.documentElement.removeChild(_s.scs_el);
			}catch(e){}
			
			try{
				document.documentElement.removeChild(_s.scs2_el);
			}catch(e){}
			
			try{
				document.documentElement.removeChild(_s.scs3_el);
			}catch(e){}
			
		};

		_s.loadHubhopperPlaylist = function(url){
			_s.closeXHR();
			var match1 = url.match(/\/(\d)+(\/)?/g)[0];
			var pId = match1.match(/\d+/)[0];
			
			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler2;

			_s.xhr.open("get", 'https://nwb3zg07k1.execute-api.ap-south-1.amazonaws.com/v4/podcasts/' + pId + '/episodes?pageSize=' + _s.maxPlaylistItems + "&rand=" + parseInt(Math.random() * 99999999), true);
			_s.xhr.setRequestHeader("x-api-key",  _s.hubhopperAPIKey);
			_s.xhr.send();

			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.sourceURL_str + "</font>, Invalid API key."});
				_s.isPlaylistDispatchingError_bl = false;
			}, 10000);

		}
		_s.ajaxOnErrorHandler2 = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
		};
	
		
		//#######################################//
		/* load XML playlist (warning _s will will work only online on a web server,
		 *  it is not working local!) */
		//######################################//
		_s.loadXMLPlaylist = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:" && url.indexOf("official.fm") == -1){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Loading XML files local is not allowed or possible!. To function properly please test online."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			_s.closeXHR();
			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler;
			
			try{
				_s.xhr.open("get", _s.proxyPath_str + "?url=" +  _s.sourceURL_str, true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"XML file can't be loaded! <font color='#FF0000'>" + _s.sourceURL_str + "</font>. " + message });
			}
		};
		

		//#######################################//
		/* load folder1 */
		//######################################//
		_s.loadFolderPlaylist = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:" && url.indexOf("official.fm") == -1){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Creating a mp3 playlist from a folder is not allowed or possible local! To function properly please test online."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}	
			
			_s.closeXHR();
			_s.loadFromFolder_bl = true;
			_s.countID3 = 0;
			_s.sourceURL_str = url.substr(url.indexOf(":") + 1);
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler;
			
			try{
				_s.xhr.open("get", _s.proxyFolderPath_str + "?dir=" +  encodeURIComponent(_s.sourceURL_str) + "&rand=" + parseInt(Math.random() * 9999999), true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FF0000'>" + _s.proxyFolderPath_str + "</font>"});
			}
		};

		_s.ajaxOnLoadHandler = function(e){
			var response;
			var isXML = false;
		
			if(_s.xhr.readyState == 4){
				clearTimeout(_s.showLoadPlaylistErrorId_to);
				if(_s.xhr.status == 401){
					if(e.target.responseURL.indexOf('soundcloud.com/') != -1){
						if(_s.isSClist){
							_s.checkSoundCloudListError();
						}else if(_s.isSCTrack){
							_s.checkSoundCloudTrackError();
						}
					}
				}else if(_s.xhr.status == 404){
					if(_s.loadFromFolder_bl){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FF0000'>" + _s.proxyFolderPath_str + "</font>"});
					}else if(_s.isSClist){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud playlist can't be loaded! <font color='#FF0000'>" + _s.originalURL_str + "</font>."});
					}else{
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Proxy file path is not found: <font color='#FF0000'>" + _s.proxyPath_str + "</font>"});
					}
				}else if(_s.xhr.status == 401){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.sourceURL_str + "</font>."});
				}else if(_s.xhr.status == 408){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Request load timeout!"});
				}else if(_s.xhr.status == 200){
					
					if(_s.xhr.responseText.indexOf("<b>Warning</b>:") != -1){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading folder: <font color='#FF0000'>" + _s.sourceURL_str + "</font>. Make sure that the folder path is correct!"});
						return;
					}

					if(window.JSON){
						response = JSON.parse(_s.xhr.responseText);
					}else{
						response = eval('('+ _s.xhr.responseText +')');
					}
					
					if(_s.xhr.responseText.indexOf('api.soundcloud.com') != -1){
						if(_s.isSCTrack){
							_s.parseSoundCloudURL(response);
						}else{
							_s.parseSoundCloud(response);
						}
						_s.isSCTrack = false;
					}else if(response.episodes){
						_s.parseHubhopper(response);
					}else if(response.channel){
						_s.parsePodcast(response);
					}else if(response.folder){
						_s.parseFolderJSON(response);
					}else if(response.li){
						_s.parseXML(response);
					}else if(response.error){//_s applies only with proxy (xml and poscast)
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading file: <font color='#FF0000'>" + _s.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"});
					}
				}
			}
		};
		
		_s.ajaxOnErrorHandler = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			if(_s.loadFromFolder_bl){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading file : <font color='#FF0000'>" + _s.proxyFolderPath_str + "</font>. Make sure the path is correct"});
			}else{
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.proxyPath_str + "</font>. Make sure the path is correct"});
			}
		};
		

		//#####################################//
		/* Parse soundcloud JSON */
		//####################################//
		_s.parseSoundCloud = function(object){
			_s.closeJsonPLoader();
			_s.playlist_ar = [];
			var obj;
			var track;
			var testUrl;
			
			if(object && object.uri){
				if(object.kind == "track"){
					_s.createSoundcloudPlaylist(object);
					return;
				}
				
				if(object.uri.indexOf("/tracks") == -1){
					testUrl = object.uri + "/tracks";
				}else{
					testUrl = object.uri + "/favorites";
				}
				
				_s.loadSoundCloudList(testUrl);
				return;
			}else if(object.length || object.kind == "track"){
				_s.createSoundcloudPlaylist(object);
			}else{
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Please provide a playlist or track URL : <font color='#FF0000'>" + _s.sourceURL_str + "</font>."});
			}
		};
		
		_s.createSoundcloudPlaylist = function(object){
			if(object.length){
				for(var i=0; i<object.length; i++){
					var track = object[i];
					var obj = {};
					obj.source = track["permalink_url"];
					obj.downloadPath = track["downloadable"] == true ? track["download_url"] + "?consumer_key=" + _s.scClientId_str : undefined;
					obj.downloadable = track["downloadable"];
					obj.buy = undefined;
					obj.thumbPath = track["artwork_url"];
					if(_s.showSoundCloudUserNameInTitle_bl){
						var count = "";
						if(_s.showTracksNumbers_bl){
							if(i<9) count = "0";
							count = count + (i + 1) + ". ";
							obj.title = count + "<span class=\"fwdrap-artist\">" + track["user"]["username"] + "</span>" + " - " + "<span class=\"fwdrap-title\">" + track["title"] + "</span>";
						}else{
							obj.title = "<span class=\"fwdrap-artist\">" + track["user"]["username"] + "</span>" + " - " + "<span class=\"fwdrap-title\">" + track["title"] + "</span>";
						}
						obj.titleText = track["user"]["username"] + " - " + track["title"];
					}else{
						var count = "";
						if(_s.showTracksNumbers_bl){
							if(i<9) count = "0";
							count = count + (i + 1) + ". ";
							obj.title = count + track["title"];
						}else{
							obj.title = track["title"];
						}
						obj.titleText = track["title"];
					}
					
					obj.duration = track["duration"];
					if(track["streamable"]) _s.playlist_ar.push(obj);
					if(i > _s.maxPlaylistItems - 1) break;
				}
			}else{
				track = object;
				obj = {};
				obj.source = track["stream_url"] + "?consumer_key=" + _s.scClientId_str;
				obj.downloadPath = track["downloadable"] == true ? track["download_url"] + "?consumer_key=" + _s.scClientId_str : undefined;
				obj.downloadable = track["downloadable"];
				obj.buy = undefined;
				obj.thumbPath = track["artwork_url"];
				if(_s.showSoundCloudUserNameInTitle_bl){
					obj.title = "<span style='font-weight:bold;'>" + track["user"]["username"] + "</span>" + " - " + track["title"];
					obj.titleText = track["user"]["username"] + " - " + track["title"];
				}else{
					obj.title = track["title"];
					obj.titleText = track["title"];
				}
				
				obj.duration = track["duration"];
				if(track["streamable"]) _s.playlist_ar.push(obj);
			}

			_s.plsCache_ar[_s.playlistId] = _s.playlist_ar;
			_s.loadSoundCloudComplete();
		};

		_s.loadSoundCloudComplete =  function(){
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
			
			_s.isDataLoaded_bl = true;
		}


		//####################################//
		/* parse Hubhopper JSON */
		//####################################//
		_s.parseHubhopper = function(response){
			
			_s.playlist_ar = [];
			var obj;
			var obj_ar = response.episodes;
			var thumbPath = undefined;

			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.source = encodeURI(obj_ar[i]["play"]["url"]);
				obj.downloadPath = obj.source;
				obj.thumbPath = obj_ar[i]["image"];
				var count = "";
				var author = '';
				if(obj_ar[i].author.length > 1) author = obj_ar[i].author + ' - ';
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + author + obj_ar[i].title;
				}else{
					obj.title = author + obj_ar[i].title;
				}

				obj.titleText = obj_ar[i].title;
				obj.duration = undefined;
				_s.playlist_ar[i] = obj;
			}
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
		
			_s.isDataLoaded_bl = true;
		}

		
		//####################################//
		/* parse podcast JSON */
		//####################################//
		_s.parsePodcast = function(response){
			_s.playlist_ar = [];
			var obj = response.channel.item;
			var obj_ar;
			var thumbPath = undefined;
			try{thumbPath = response["channel"]["image"]["url"];}catch(e){}
		
			if(!obj.length){
				obj_ar = [obj];
			}else{
				obj_ar = obj;	
			}
			
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				
				if(obj_ar[i]["enclosure"]){
					obj.source = encodeURI(obj_ar[i]["enclosure"]["@attributes"]["url"]);
				}else{
					obj.source = encodeURI(obj_ar[i]["link"]);
				}
				
				obj.downloadPath = obj.source;
				obj.downloadable = _s.showDownloadMp3Button_bl;
				if(_s.forceDisableDownloadButtonForPodcast_bl) obj.downloadable = false;
				obj.thumbPath = thumbPath;
				var count = "";
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + obj_ar[i].title;
				}else{
					obj.title = obj_ar[i].title;
				}
				
				obj.titleText = obj_ar[i].title;
				obj.duration = undefined;
				_s.playlist_ar[i] = obj;
				if(i > _s.maxPlaylistItems - 1) break;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
		
			_s.isDataLoaded_bl = true;
		};
		

		//####################################//
		/* parse xml JSON */
		//####################################//
		_s.parseXML = function(response){
			_s.playlist_ar = [];
			var obj;
			var obj_ar = response.li;
			
			if(!obj_ar.length){
				obj_ar = [obj_ar];
			}
			
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.source = obj_ar[i]["@attributes"]["data-path"];
				if(obj.source.indexOf("encrypt:") != -1){
					obj.source = atob(obj.source.substr(8));
				}
				
				var firstUrlPath = encodeURI(obj.source.substr(0,obj.source.lastIndexOf("/") + 1));
				var secondUrlPath = obj.source.substr(obj.source.lastIndexOf("/") + 1);	

				if(obj.source.indexOf("youtube.") !=-1){
					var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
					var match = obj.source.match(regExp);
					obj.source =  match[2];
				}else{
					obj.source = FWDRAPUtils.getValidSource(obj.source);
				}
			
				obj.downloadPath = obj.source;
				obj.downloadable = obj_ar[i]["@attributes"]["data-downloadable"] == "yes" ? true : false;
				obj.buy = obj_ar[i]["@attributes"]["data-buy-url"];
				
				if(obj_ar[i]["@attributes"]["data-buy-url"]){
					obj.buy = obj_ar[i]["@attributes"]["data-buy-url"];
				}

				if(obj_ar[i]["@attributes"]["data-play-if-logged-in"]){
					obj.playIfLoggedIn = obj_ar[i]["@attributes"]["data-play-if-logged-in"];
					if(obj.playIfLoggedIn == 'no') obj.playIfLoggedIn = undefined;
				}
				
				obj.thumbPath = obj_ar[i]["@attributes"]["data-thumbpath"];
				var count = "";
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + obj_ar[i]["@attributes"]["data-title"];
				}else{
					obj.title = obj_ar[i]["@attributes"]["data-title"];
				}
				
				obj.isPrivate = obj_ar[i]["@attributes"]["data-is-private"]; 
				if(obj.isPrivate == "yes"){
					obj.isPrivate = true;
				}else{
					obj.isPrivate = false;
				}
				
			
				obj.privateVideoPassword_str =  obj_ar[i]["@attributes"]["data-private-video-password"];
				
				obj.startAtTime = obj_ar[i]["@attributes"]["data-start-at-time"];
				if(obj.startAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.startAtTime)) obj.startAtTime = undefined;
				
				obj.stopAtTime = obj_ar[i]["@attributes"]["data-stop-at-time"];
				if(obj.stopAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.stopAtTime)) obj.stopAtTime = undefined;
				
				obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				obj.duration = obj_ar[i]["@attributes"]["data-duration"];
				obj.atb = obj_ar[i]["@attributes"]["data-use-a-to-b"];
						
				obj.isShoutcast_bl = obj_ar[i]["@attributes"]["data-type"];
				if(obj.isShoutcast_bl){
					if(obj.isShoutcast_bl.toLowerCase().indexOf("shoutcast") != -1){
						obj.isShoutcast_bl = true;
					}else{
						obj.isShoutcast_bl = false;
					}
				}
				
				obj.isIcecast_bl = obj_ar[i]["@attributes"]["data-type"];
				if(obj.isIcecast_bl){
					if(obj.isIcecast_bl.toLowerCase().indexOf("icecast") != -1){
						obj.isIcecast_bl = true;
					}else{
						obj.isIcecast_bl = false;
					}
				}
				
				
				_s.playlist_ar[i] = obj;
				if(i > _s.maxPlaylistItems - 1) break;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
			
			_s.isDataLoaded_bl = true;
		};
		

		//####################################//
		/* parse folder JSON */
		//####################################//
		_s.parseFolderJSON = function(response){
			_s.playlist_ar = [];
			var obj;
			var obj_ar = response.folder;
			var counter = 0;
		
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.source = obj_ar[i]["@attributes"]["data-path"];
				if(obj.source.indexOf("encrypt:") != -1){
					obj.source = atob(obj.source.substr(8));
				}
				var firstUrlPath = encodeURI(obj.source.substr(0,obj.source.lastIndexOf("/") + 1));
				var secondUrlPath = encodeURIComponent(obj.source.substr(obj.source.lastIndexOf("/") + 1));
				obj.source = firstUrlPath + secondUrlPath;
				obj.downloadPath = obj.source;
				obj.downloadable = _s.showDownloadMp3Button_bl;
				obj.buy = undefined;
				if(_s.forceDisableDownloadButtonForFolder_bl) obj.downloadable = true;
				obj.thumbPath = obj_ar[i]["@attributes"]["data-thumbpath"];
				if(_s.useID3ForFolderPlaylist){
					obj.title = obj.titleText = "...";
				}else{
					var count = "";
					if(_s.showTracksNumbers_bl){
						if(i<9) count = "0";
						count = count + (i + 1) + ". ";
						obj.title = count + "<span span class=\"fwdrap-artist\">" + obj_ar[i]["@attributes"]["data-title"] + '</span>';
					}else{
						obj.title = "<span span class=\"fwdrap-title\">" + obj_ar[i]["@attributes"]["data-title"] + '</span>'
					}

					obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				}
				
				_s.playlist_ar[i] = obj;
				if(i > _s.maxPlaylistItems - 1) break;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			_s.isDataLoaded_bl = true;
		};
		

		//##########################################//
		/* parse DOM playlist */
		//##########################################//
		_s.parseDOMPlaylist = function(idOrObject){
			if(_s.isPlaylistDispatchingError_bl) return;
			var root_el;
			
			_s.closeXHR();
			
			root_el = document.getElementById(idOrObject);
			if(!root_el){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"The playlist with id <font color='#FF0000'>" + idOrObject + "</font> is not found in the DOM."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			var children_ar = FWDRAPUtils.getChildren(root_el);
			var totalChildren = children_ar.length;
			var child;
			_s.playlist_ar = [];
			
			if(totalChildren == 0){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"The playlist whit the id  <font color='#FF0000'>" + idOrObject + "</font> must contain at least one track."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			for(var i=0; i<totalChildren; i++){
				var obj = {};
				child = children_ar[i];
				
				if(!FWDRAPUtils.hasAttribute(child, "data-path")){
					_s.isPlaylistDispatchingError_bl = true;
					_s.showLoadPlaylistErrorId_to = setTimeout(function(){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Attribute <font color='#FF0000'>data-path</font> is required in the playlist at position <font color='#FF0000'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(i > _s.maxPlaylistItems - 1) break;
				
				obj.isShoutcast_bl = FWDRAPUtils.getAttributeValue(child, "data-type");
				if(obj.isShoutcast_bl){
					if(obj.isShoutcast_bl.toLowerCase().indexOf("shoutcast") != -1){
						obj.isShoutcast_bl = true;
					}else{
						obj.isShoutcast_bl = false;
					}
				}
				
				obj.isIcecast_bl = FWDRAPUtils.getAttributeValue(child, "data-type");
				if(obj.isIcecast_bl){
					if(obj.isIcecast_bl.toLowerCase().indexOf("icecast") != -1){
						obj.isIcecast_bl = true;
					}else{
						obj.isIcecast_bl = false;
					}
				}
			
				obj.source = FWDRAPUtils.getAttributeValue(child, "data-path");
				
				if(obj.source.indexOf("encrypt:") != -1){
					obj.source = atob(obj.source.substr(8));
				}
				
				if(obj.source.indexOf("youtube.") !=-1){
					var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
					var match = obj.source.match(regExp);
					obj.source = match[2];
				}else{
					obj.source = FWDRAPUtils.getValidSource(obj.source);
				}

				obj.downloadPath = obj.source;
				if(FWDRAPUtils.hasAttribute(child, "data-thumbpath")){
					obj.thumbPath = FWDRAPUtils.getAttributeValue(child, "data-thumbpath");
				}else{
					obj.thumbPath = undefined;
				}
				
				if(FWDRAPUtils.hasAttribute(child, "data-video-poster-path")){
					obj.videoPosterPath = FWDRAPUtils.getAttributeValue(child, "data-video-poster-path");
				}else{
					obj.videoPosterPath = undefined;
				}
				
				if(FWDRAPUtils.hasAttribute(child, "data-downloadable")){
					obj.downloadable = FWDRAPUtils.getAttributeValue(child, "data-downloadable") == "yes" ? true : false;
				}else{
					obj.downloadable = undefined;
				}
				
				if(FWDRAPUtils.hasAttribute(child, "data-buy-url")){
					obj.buy = FWDRAPUtils.getAttributeValue(child, "data-buy-url");
				}else{
					obj.buy = undefined;
				}

				if(FWDRAPUtils.hasAttribute(child, "data-play-if-logged-in")){
					obj.playIfLoggedIn = FWDRAPUtils.getAttributeValue(child, "data-play-if-logged-in");
					if(obj.playIfLoggedIn == 'no') obj.playIfLoggedIn = undefined;
				}
				
				obj.title = "not defined!";
				try{
					var count = "";
					if(_s.showTracksNumbers_bl){
						if(i<9) count = "0";
						count = count + (i + 1) + ". ";
						obj.title = count + FWDRAPUtils.getChildren(child)[0].innerHTML;
					}else{
						obj.title = FWDRAPUtils.getChildren(child)[0].innerHTML;
					}
				}catch(e){};
				
				obj.isPrivate = FWDRAPUtils.getAttributeValue(child, "data-is-private");
				
				if(obj.isPrivate == "yes"){
					obj.isPrivate = true;
				}else{
					obj.isPrivate = false;
				}
				
				obj.privateVideoPassword_str = FWDRAPUtils.getAttributeValue(child, "data-private-video-password");
				
				obj.startAtTime = FWDRAPUtils.getAttributeValue(child, "data-start-at-time");
				if(obj.startAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.startAtTime)) obj.startAtTime = undefined;
				
				obj.stopAtTime = FWDRAPUtils.getAttributeValue(child, "data-stop-at-time");
				if(obj.stopAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.stopAtTime)) obj.stopAtTime = undefined;
					
				
				try{obj.titleText = FWDRAPUtils.getChildren(child)[0].textContent || FWDRAPUtils.getChildren(child)[0].innerText;}catch(e){};
				
				if(FWDRAPUtils.hasAttribute(child, "data-duration")) obj.duration = FWDRAPUtils.getAttributeValue(child, "data-duration");
				if(FWDRAPUtils.hasAttribute(child, "data-use-a-to-b")) obj.atb = FWDRAPUtils.getAttributeValue(child, "data-use-a-to-b");
			
				_s.playlist_ar[i] = obj;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			_s.isDataLoaded_bl = true;
		};
		

		//####################################//
		/* close xhr */
		//####################################//
		_s.closeXHR = function(){
			_s.closeJsonPLoader();
			try{
				_s.head.removeChild(_s.scs_el);
				_s.scs_el = null;
			}catch(e){}
			
			if(_s.xhr != null){
				try{_s.xhr.abort();}catch(e){}
				_s.xhr.onreadystatechange = null;
				_s.xhr.onerror = null;
				_s.xhr = null;
			}
			_s.countID3 = 2000;
		};
		
		_s.closeData = function(){
			_s.closeXHR();
			clearTimeout(_s.loadImageId_to);
			clearTimeout(_s.showLoadPlaylistErrorId_to);
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			clearTimeout(_s.loadImageId_to);
			clearTimeout(_s.loadPreloaderId_to);
			if(_s.image_img){
				_s.image_img.onload = null;
				_s.image_img.onerror = null;
			}
		};
	
		_s.init();
	};
	

	/* set prototype */
	FWDRAPAudioData.setPrototype = function(){
		FWDRAPAudioData.prototype = new FWDRAPEventDispatcher();
	};
	
	FWDRAPAudioData.prototype = null;
	
	FWDRAPAudioData.UPDATE_IMAGE = "updateIamage";
	FWDRAPAudioData.RADIO_TRACK_UPDATE = "shoutcastTitleUpdate";
	FWDRAPAudioData.RADIO_TRACK_READY = "radioTrackReady";
	FWDRAPAudioData.SOUNDCLOUD_TRACK_READY = "soundcloudTrackready";
	FWDRAPAudioData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDRAPAudioData.LOAD_DONE = "onLoadDone";
	FWDRAPAudioData.LOAD_ERROR = "onLoadError";
	FWDRAPAudioData.IMAGE_LOADED = "onImageLoaded";
	FWDRAPAudioData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
	FWDRAPAudioData.SKIN_PROGRESS = "onSkinProgress";
	FWDRAPAudioData.IMAGES_PROGRESS = "onImagesPogress";
	FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE = "onPlaylistLoadComplete";
	
	window.FWDRAPAudioData = FWDRAPAudioData;
}(window));/**
 * Royal Audio Player
 * Audio screen.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(window){
	
	var FWDRAPAudioScreen = function(volume){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPAudioScreen.prototype;
	
		
		_s.lastPercentPlayed = 0;
		_s.volume = volume;
		_s.curDuration = 0;
		_s.countNormalMp3Errors = 0;
		_s.countShoutCastErrors = 0;
		_s.maxShoutCastCountErrors = 5;
		_s.maxNormalCountErrors = 1;
		_s.hasError_bl = true;
		_s.isStopped_bl = true;
		
		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.setupAudio();
			_s.setHeight(0);
		};

	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		_s.setupAudio = function(){
			if(_s.audio_el == null){
				_s.audio_el = document.createElement("audio");
				_s.screen.appendChild(_s.audio_el);
				_s.audio_el.controls = false;
				_s.audio_el.preload = "auto";
				if(!FWDRAPUtils.isLocal) _s.audio_el.crossOrigin = "*";
				_s.audio_el.volume = _s.volume;
			}
			
			_s.audio_el.addEventListener("error", _s.errorHandler);
			_s.audio_el.addEventListener("canplay", _s.safeToBeControlled);
			_s.audio_el.addEventListener("canplaythrough", _s.safeToBeControlled);
			_s.audio_el.addEventListener("progress", _s.updateProgress);
			_s.audio_el.addEventListener("timeupdate", _s.updateAudio);
			_s.audio_el.addEventListener("pause", _s.pauseHandler);
			_s.audio_el.addEventListener("play", _s.playHandler);
			_s.audio_el.addEventListener("ended", _s.endedHandler);
		};
		
		_s.destroyAudio = function(){
			if(_s.audio_el){
				_s.audio_el.removeEventListener("error", _s.errorHandler);
				_s.audio_el.removeEventListener("canplay", _s.safeToBeControlled);
				_s.audio_el.removeEventListener("canplaythrough", _s.safeToBeControlled);
				_s.audio_el.removeEventListener("progress", _s.updateProgress);
				_s.audio_el.removeEventListener("timeupdate", _s.updateAudio);
				_s.audio_el.removeEventListener("pause", _s.pauseHandler);
				_s.audio_el.removeEventListener("play", _s.playHandler);
				_s.audio_el.removeEventListener("ended", _s.endedHandler);
				_s.audio_el.src = "";
				_s.audio_el.load();
			}
		};
		

		//##########################################//
		/* Video error handler. */
		//##########################################//
		_s.errorHandler = function(e){
			if(_s.sourcePath_str == null || _s.sourcePath_str == undefined) return;
			
			if(_s.isNormalMp3_bl && _s.countNormalMp3Errors <= _s.maxNormalCountErrors){
				_s.stop();
				_s.testShoutCastId_to = setTimeout(_s.play, 200);
				_s.countNormalMp3Errors ++;
				return;
			}
			
			if(_s.isShoutcast_bl && _s.countShoutCastErrors <= _s.maxShoutCastCountErrors && _s.audio_el.networkState == 0){
				_s.testShoutCastId_to = setTimeout(_s.play, 200);
				_s.countShoutCastErrors ++;
				return;
			}
			
			var error_str;
			_s.hasError_bl = true;
			_s.stop();
			
			if(_s.audio_el.networkState == 0){
				error_str = "error '_s.audio_el.networkState = 1'";
			}else if(_s.audio_el.networkState == 1){
				error_str = "error '_s.audio_el.networkState = 1'";
			}else if(_s.audio_el.networkState == 2){
				error_str = "'_s.audio_el.networkState = 2'";
			}else if(_s.audio_el.networkState == 3){
				error_str = "source not found <font color='#FF0000'>" + _s.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(_s.audio_el.networkState);
			
			_s.dispatchEvent(FWDRAPAudioScreen.ERROR, {text:error_str });
		};

		
		//##############################################//
		/* Set path */
		//##############################################//
		_s.setSource = function(sourcePath){
			
			_s.sourcePath_str = sourcePath;
			clearTimeout(_s.testShoutCastId_to);
			
			if(_s.sourcePath_str.indexOf(";") != -1){
				_s.isShoutcast_bl = true;
				_s.countShoutCastErrors = 0;
			}else{
				_s.isShoutcast_bl = false;
			}
			
			if(_s.sourcePath_str.indexOf(";") == -1){
				_s.isNormalMp3_bl = true;
				_s.countNormalMp3Errors = 0;
			}else{
				_s.isNormalMp3_bl = false;
			}
			
			
			_s.lastPercentPlayed = 0;
			if(_s.audio_el) _s.stop(true);
		};
	

		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite){
		
			if(_s.isStopped_bl){
				_s.isPlaying_bl = false;
				_s.hasError_bl = false;
				_s.allowScrubing_bl = false;
				_s.isStopped_bl = false;
				_s.setupAudio();
				_s.audio_el.src = _s.sourcePath_str;

				_s.play();
			}else if(!_s.audio_el.ended || overwrite){
				try{
					_s.isPlaying_bl = true;
					_s.hasPlayedOnce_bl = true;
					var prm = _s.audio_el.play();
					if(prm !== undefined) {
					    prm.then(function(){}, function(){});
					}
					
					if(FWDRAPUtils.isIE) _s.dispatchEvent(FWDRAPAudioScreen.PLAY);
				}catch(e){};
			}
		};

		_s.pause = function(){
			if(_s == null) return;
			if(_s.audio_el == null) return;
			if(!_s.audio_el.ended){
				try{
					_s.audio_el.pause();
					_s.isPlaying_bl = false;
					if(FWDRAPUtils.isIE) _s.dispatchEvent(FWDRAPAudioScreen.PAUSE);
				}catch(e){};
				
			}
		};
		
		_s.pauseHandler = function(){
			if(_s.allowScrubing_bl) return;
			_s.dispatchEvent(FWDRAPAudioScreen.PAUSE);
		};
		
		_s.playHandler = function(){
			if(_s.allowScrubing_bl) return;
			if(!_s.isStartEventDispatched_bl){
				_s.dispatchEvent(FWDRAPAudioScreen.START);
				_s.isStartEventDispatched_bl = true;
			}
			_s.dispatchEvent(FWDRAPAudioScreen.PLAY);
		};
		
		_s.endedHandler = function(){
			_s.dispatchEvent(FWDRAPAudioScreen.PLAY_COMPLETE);
		};
		
		
		_s.getDuration = function(){
			return FWDRAPUtils.formatTime(_s.audio_el.duration);
		}
		
		_s.getCurrentTime = function(){
			return FWDRAPUtils.formatTime(_s.audio_el.currentTime);
		}
	
		_s.stop = function(overwrite){
			_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0});
			if((_s == null || _s.audio_el == null || _s.isStopped_bl) && !overwrite) return;
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.hasPlayedOnce_bl = true;
			_s.isSafeToBeControlled_bl = false;
			_s.isStartEventDispatched_bl = false;
			clearTimeout(_s.testShoutCastId_to);
			_s.audio_el.pause();
			_s.destroyAudio();
			_s.dispatchEvent(FWDRAPAudioScreen.STOP);
			_s.dispatchEvent(FWDRAPAudioScreen.LOAD_PROGRESS, {percent:0});
		};
		
		_s.togglePlayPause = function(){
			if(_s == null) return;
			if(!_s.isSafeToBeControlled_bl) return;
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};


		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		_s.safeToBeControlled = function(){
			if(!_s.isSafeToBeControlled_bl){
				_s.hasHours_bl = Math.floor(_s.audio_el.duration / (60 * 60)) > 0;
				_s.isPlaying_bl = true;
				_s.isSafeToBeControlled_bl = true;
				_s.dispatchEvent(FWDRAPAudioScreen.SAFE_TO_SCRUBB);
				_s.dispatchEvent(FWDRAPAudioScreen.SAFE_TO_UPDATE_VOLUME);
			}
		};
	

		//###########################################//
		/* Update progress */
		//##########################################//
		_s.updateProgress = function(){
			var buffered;
			var percentLoaded = 0;
			
			if(_s.audio_el.buffered.length > 0){
				buffered = _s.audio_el.buffered.end(_s.audio_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/_s.audio_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) _s.audio_el.removeEventListener("progress", _s.updateProgress);
			
			_s.dispatchEvent(FWDRAPAudioScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		

		//##############################################//
		/* Update audio */
		//#############################################//
		_s.updateAudio = function(){
			var percentPlayed; 
			if (!_s.allowScrubing_bl) {
				percentPlayed = _s.audio_el.currentTime /_s.audio_el.duration;
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = FWDRAPUtils.formatTime(_s.audio_el.duration);
			var curTime = FWDRAPUtils.formatTime(_s.audio_el.currentTime);
			
			
			if(!isNaN(_s.audio_el.duration)){
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:Math.round(_s.audio_el.currentTime), totalTimeInSeconds:_s.audio_el.duration});
			}else{
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0, totalTimeInSeconds:0});
			}
			_s.lastPercentPlayed = percentPlayed;
			_s.curDuration = curTime;
		};
		

		//###############################################//
		/* Scrub */
		//###############################################//
		_s.startToScrub = function(){
			_s.allowScrubing_bl = true;
		};
		
		_s.stopToScrub = function(){
			_s.allowScrubing_bl = false;
		};
		
		_s.scrubbAtTime = function(duration){
			_s.audio_el.currentTime = duration;
			var totalTime = FWDRAPUtils.formatTime(_s.audio_el.duration);
			var curTime = FWDRAPUtils.formatTime(_s.audio_el.currentTime);
			_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:duration});
		};
		
		_s.scrub = function(percent, e){
			if(_s.audio_el == null || !_s.audio_el.duration) return;
			if(e) _s.startToScrub();
			try{
				_s.audio_el.currentTime = _s.audio_el.duration * percent;
				var totalTime = FWDRAPUtils.formatTime(_s.audio_el.duration);
				var curTime = FWDRAPUtils.formatTime(_s.audio_el.currentTime);
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		

		//###############################################//
		/* replay */
		//###############################################//
		_s.replay = function(){
			_s.scrub(0);
			_s.play();
		};
		

		//###############################################//
		/* Volume */
		//###############################################//
		_s.setVolume = function(vol){
			if(vol != undefined) _s.volume = vol;
			if(_s.audio_el) _s.audio_el.volume = _s.volume;
		};
		
		
		_s.setPlaybackRate = function(rate){
			if(!_s.audio_el) return;
			_s.audio_el.defaultPlaybackRate = rate;
			_s.audio_el.playbackRate = rate;
		}

		_s.init();
	};


	/* set prototype */
	FWDRAPAudioScreen.setPrototype = function(){
		FWDRAPAudioScreen.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPAudioScreen.ERROR = "error";
	FWDRAPAudioScreen.UPDATE = "update";
	FWDRAPAudioScreen.UPDATE = "update";
	FWDRAPAudioScreen.UPDATE_TIME = "updateTime";
	FWDRAPAudioScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDRAPAudioScreen.SAFE_TO_UPDATE_VOLUME = "safeToUpdateVolume";
	FWDRAPAudioScreen.LOAD_PROGRESS = "loadProgress";
	FWDRAPAudioScreen.START = "start";
	FWDRAPAudioScreen.PLAY = "play";
	FWDRAPAudioScreen.PAUSE = "pause";
	FWDRAPAudioScreen.STOP = "stop";
	FWDRAPAudioScreen.PLAY_COMPLETE = "playComplete";
	window.FWDRAPAudioScreen = FWDRAPAudioScreen;

}(window));/**
 * Royal Audio Player
 * Categories.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(){
var FWDRAPCategories = function(data, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPCategories.prototype;

		_s.d = data;
		
		_s.catThumbBk_img = data.catThumbBk_img;
		_s.catNextN_img = data.catNextN_img;
		_s.catPrevN_img = data.catPrevN_img;
		_s.catCloseN_img = data.catCloseN_img;
	
		_s.thumbs_ar = [];
		_s.categories_ar = data.cats_ar;	
		_s.catBkPath_str = data.catBkPath_str;
		
		_s.id = 0;
		_s.mouseX = 0;
		_s.mouseY = 0;
		_s.dif = 0;
		_s.tempId = _s.id;
		_s.sW = 0;
		_s.sH = 0;
		_s.thumbW = 0;
		_s.thumbH = 0;
		_s.buttonsMargins = data.buttonsMargins;
		_s.thumbnailMaxWidth = data.thumbnailMaxWidth;
		_s.thumbnailMaxHeight = data.thumbnailMaxHeight;
		_s.spacerH = data.horizontalSpaceBetweenThumbnails;
		_s.spacerV = data.verticalSpaceBetweenThumbnails;
		_s.dl;
		_s.howManyThumbsToDisplayH = 0;
		_s.howManyThumbsToDisplayV = 0;
		if(_s.catNextN_img){
			_s.categoriesOffsetTotalWidth = _s.catNextN_img.width * 2 + 40 + _s.buttonsMargins * 2; 
			_s.categoriesOffsetTotalHeight = _s.catNextN_img.height + 40;
		}
		_s.totalThumbnails = _s.categories_ar.length;
		_s.delayRate = .06;
		_s.countLoadedThumbs = 0;
		
		_s.inputBackgroundColor_str = data.inputBackgroundColor_str;
		_s.inputColor_str = data.searchInputColor_str;
	

		_s.showSearchInpt = data.showPlaylistsSearchInput_bl;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.useVectorIcons_bl = data.useVectorIcons;


		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			if(data.skinPath_str.indexOf("hex_white") != -1){
				_s.sBC = "#FFFFFF";
			}else{
				_s.sBC = data.sBC;
			}
			
			_s.getStyle().zIndex = 2147483647;
			_s.getStyle().msTouchAction = "none";
			_s.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			_s.getStyle().width = "100%";
			
			_s.mainHld = new FWDRAPDisplayObject("div");
			_s.mainHld.screen.className = 'fwdrap-categories-background';
			_s.mainHld.getStyle().background = "url('" + _s.catBkPath_str + "')";
			_s.mainHld.setY(- 3000);
			_s.addChild(_s.mainHld);
			_s.setupButtons();
			_s.setupDisable();
			if(_s.isMbl){
				_s.setupMobileMove();
				if(FWDRAPUtils.isChrome){
					if(FWDRAPUtils.isIEAndLessThen9){
						document.getElementsByTagName("body")[0].appendChild(_s.screen);
					}else{
						document.documentElement.appendChild(_s.screen);
					}
				}
			}
			
			if(!_s.isMbl || (_s.isMbl && _s.hasPointerEvent_bl)) _s.setSelectable(false);
			
			if(window.addEventListener){
				_s.screen.addEventListener ("mousewheel", _s.mouseWheelDumyHandler);
				_s.screen.addEventListener('DOMMouseScroll', _s.mouseWheelDumyHandler);
			}else if(document.attachEvent){
				_s.screen.attachEvent ("onmousewheel", _s.mouseWheelDumyHandler);
			}
			if(_s.showSearchInpt) _s.setupInput();

		};
		
		_s.mouseWheelDumyHandler = function(e){	
			var thumb;
			if(FWDAnimation.isTweening(_s.mainHld)){
				if(e.preventDefault){
					e.preventDefault();
				}
				return false;
			}
			
			for (var i = 0; i<_s.totalThumbnails; i++) {
				thumb = _s.thumbs_ar[i];
				if(FWDAnimation.isTweening(thumb)){
					if(e.preventDefault){
						e.preventDefault();
					}
					return false;
				}
			}
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(FWDRAPUtils.isOpera) dir *= -1;
			
			if(dir > 0){
				_s.nextButtonOnMouseUpHandler();
			}else if(dir < 0){
				if(_s.leftId <= 0) return;
				_s.prevButtonOnMouseUpHandler();
			}
		
		
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};

		
		//###########################################//
		// Resize and position ...
		//###########################################//
		_s.resizeAndPosition = function(overwrite){
			if(!_s.isShowed_bl && !overwrite) return;
			
			var scrollOffsets = FWDRAPUtils.getScrollOffsets();
			var viewportSize = FWDRAPUtils.getViewportSize();

			_s.sW = viewportSize.w;
			_s.sH = viewportSize.h;
			
			FWDAnimation.killTweensOf(_s.mainHld);
			_s.mainHld.setX(0);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			
			_s.setX(scrollOffsets.x);
			_s.setY(scrollOffsets.y);
			
			_s.setHeight(_s.sH);
			if(_s.isMbl) _s.setWidth(_s.sW);
			_s.positionButtons();
			_s.tempId = _s.id;
			_s.resizeAndPositionThumbnails();
			_s.disableEnableNextAndPrevButtons();
			
			if(_s.input_do){
				_s.input_do.setX(_s.sW - _s.input_do.getWidth() - _s.buttonsMargins);
				_s.input_do.setY(_s.sH - _s.input_do.getHeight() - _s.buttonsMargins);
				_s.inputArrow_do.setX(_s.input_do.x +  _s.input_do.getWidth() - 20);
				_s.inputArrow_do.setY(_s.input_do.y + _s.input_do.getHeight()/2 - _s.inputArrow_do.getHeight()/2 );
			}
		};
		

		//##########################################//
		/* resize and scroll handler */
		//##########################################//
		_s.onScrollHandler = function(){
			var scrollOffsets = FWDRAPUtils.getScrollOffsets();
			_s.setX(scrollOffsets.x);
			_s.setY(scrollOffsets.y);
		};
		

		//################################################//
		/* setup input */
		//################################################//
		_s.setupInput = function(){
			
			_s.input_do = new FWDRAPDisplayObject("input");
			_s.input_do.screen.className = 'fwdrap-categories-search-input';
			_s.input_do.screen.maxLength = 20;
			_s.input_do.getStyle().textAlign = "left";
			_s.input_do.getStyle().outline = "none";
			_s.input_do.getStyle().boxShadow  = "none";
			_s.input_do.getStyle().fontSmoothing = "antialiased";
			_s.input_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.input_do.getStyle().textRendering = "optimizeLegibility";
			_s.input_do.getStyle().fontFamily = "Arial";
			_s.input_do.getStyle().fontSize= "12px";
			_s.input_do.getStyle().padding = "14px 10px";
			_s.input_do.getStyle().boxSizing = 'border-box';
			_s.input_do.getStyle().backgroundColor = _s.inputBackgroundColor_str;
			_s.input_do.getStyle().color = _s.inputColor_str;
			_s.input_do.screen.value = "search";
			_s.input_do.setHeight(20);
			_s.input_do.setX(18);

			
			_s.noSearchFound_do = new FWDRAPDisplayObject("div");
			_s.noSearchFound_do.setX(0);
			_s.noSearchFound_do.getStyle().textAlign = "center";
			_s.noSearchFound_do.getStyle().width = "100%";
			_s.noSearchFound_do.getStyle().fontSmoothing = "antialiased";
			_s.noSearchFound_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.noSearchFound_do.getStyle().textRendering = "optimizeLegibility";
			_s.noSearchFound_do.getStyle().fontFamily = "Arial";
			_s.noSearchFound_do.getStyle().fontSize= "12px";
			_s.noSearchFound_do.getStyle().color = _s.inputColor_str;
			_s.noSearchFound_do.setInnerHTML("NOTHING FOUND!");
			_s.noSearchFound_do.setVisible(false);
			_s.addChild(_s.noSearchFound_do);
			
			var img = new Image();
			img.src = data.inputArrowPath_str;
			
			_s.inputArrow_do = new FWDRAPDisplayObject("img"); 
			_s.inputArrow_do.screen.className = 'fwdrap-playlist-search-icon';
			_s.inputArrow_do.setScreen(img);
			_s.inputArrow_do.setWidth(12);
			_s.inputArrow_do.setHeight(12);
			
			if(_s.hasPointerEvent_bl){
				_s.input_do.screen.addEventListener("pointerdown", _s.inputFocusInHandler);
			}else if(_s.input_do.screen.addEventListener){
				_s.input_do.screen.addEventListener("mousedown", _s.inputFocusInHandler);
				_s.input_do.screen.addEventListener("touchstart", _s.inputFocusInHandler);
			}
			
			_s.input_do.screen.addEventListener("keyup", _s.keyUpHandler);
			
			_s.mainHld.addChild(_s.input_do);
			_s.mainHld.addChild(_s.inputArrow_do);
		};
		
		_s.inputFocusInHandler = function(){
			if(_s.hasInputFocus_bl) return;
			_s.hasInputFocus_bl = true;
			
			if(_s.input_do.screen.value == "search"){
				_s.input_do.screen.value = "";
			}
			
			_s.input_do.screen.focus();
			
			setTimeout(function(){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("pointerdown", _s.inputFocusOutHandler);
				}else if(window.addEventListener){
					window.addEventListener("mousedown", _s.inputFocusOutHandler);
					window.addEventListener("touchstart", _s.inputFocusOutHandler);
				}
			}, 50);
		};
		
		_s.inputFocusOutHandler = function(e){
			if(!_s.hasInputFocus_bl) return;
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(!FWDRAPUtils.hitTest(_s.input_do.screen, vc.screenX, vc.screenY)){
				_s.hasInputFocus_bl = false;
				if(_s.input_do.screen.value == ""){
					_s.input_do.screen.value = "search";
					if(_s.hasPointerEvent_bl){
						window.removeEventListener("pointerdown", _s.inputFocusOutHandler);
					}else if(window.removeEventListener){
						window.removeEventListener("mousedown", _s.inputFocusOutHandler);
						window.removeEventListener("touchstart", _s.inputFocusOutHandler);
					}
				}
				return;
			}
		};
		
		_s.keyUpHandler = function(e){
			if(e.stopPropagation) e.stopPropagation();
			if(_s.prevInputValue_str != _s.input_do.screen.value){
				clearTimeout(_s.keyPressedId_to);
				_s.keyPressed_bl = true;
				clearTimeout(_s.rsId_to);
				_s.rsId_to = setTimeout(function(){
					_s.resizeAndPositionThumbnails(true);
					_s.disableEnableNextAndPrevButtons();
				}, 400);
			}
			_s.prevInputValue_str = _s.input_do.screen.value;
			_s.keyPressedId_to = setTimeout(function(){
				_s.keyPressed_bl = false;
			}, 450)
		};
		
		_s.showNothingFound = function(){
			if(_s.isShowNothingFound_bl) return;
			
			_s.isShowNothingFound_bl = true;
			
			_s.noSearchFound_do.setVisible(true);
			_s.noSearchFound_do.setY(parseInt((_s.sH - _s.noSearchFound_do.getHeight())/2));
			_s.noSearchFound_do.setAlpha(0);
			FWDAnimation.to(_s.noSearchFound_do, .1, {alpha:1, yoyo:true, repeat:4});
		};
		
		_s.hideNothingFound = function(){
			if(!_s.isShowNothingFound_bl) return;
			_s.isShowNothingFound_bl = false;
			
			FWDAnimation.killTweensOf(_s.noSearchFound_do);
			_s.noSearchFound_do.setVisible(false);
		};
		

		//###############################//
		/* setup disable */
		//##############################//
		_s.setupDisable = function(){
			_s.disable_do = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.disable_do.setBkColor("#FFFFFF");
				_s.disable_do.setAlpha(0.01);
			}
			_s.addChild(_s.disable_do);
		};
		
		_s.showDisable = function(){
			if(_s.disable_do.w == _s.sW) return;
			_s.disable_do.setWidth(_s.sW);
			_s.disable_do.setHeight(_s.sH);
		};
		
		_s.hideDisable = function(){
			if(_s.disable_do.w == 0) return;
			_s.disable_do.setWidth(0);
			_s.disable_do.setHeight(0);
		};
		

		//############################################//
		/* setup buttons */
		//############################################//
		_s.setupButtons = function(){
			if(_s.clsBtn) return;
			
			//setup close button
			if(_s.useVectorIcons_bl){
				FWDRAPSimpleButton.setPrototype();
				_s.clsBtn = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
						"fwdrap-categories-next-and-prev-normal-state",
						"fwdrap-categories-next-and-prev-selected-state"
				);
			}else{
				FWDRAPSimpleButton.setPrototype();
				_s.clsBtn = new FWDRAPSimpleButton(_s.catCloseN_img, data.catCloseSPath_str, undefined,
						true,
						data.useHEX,
						data.nBC,
						_s.sBC,
						false, false, false, true);

			}
			_s.clsBtn.screen.className = 'fwdrap-close-button';
			_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			
			if(_s.useVectorIcons_bl){
				FWDRAPSimpleButton.setPrototype();
				_s.nextButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-FF-right'></span></div>",
						"fwdrap-categories-next-and-prev-normal-state",
						"fwdrap-categories-next-and-prev-selected-state"
				);
			}else{
				FWDRAPSimpleButton.setPrototype();
				_s.nextButton_do = new FWDRAPSimpleButton(_s.catNextN_img, data.catNextSPath_str, undefined,
						true,
						data.useHEX,
						data.nBC,
						_s.sBC,
						false, false, false, true);
			}
			_s.nextButton_do.screen.className = 'fwdrap-categories-next-button';
			_s.nextButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.nextButtonOnMouseUpHandler);
			
			if(_s.useVectorIcons_bl){
				FWDRAPSimpleButton.setPrototype();
				_s.prevButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-FF-left'></span></div>",
						"fwdrap-categories-next-and-prev-normal-state",
						"fwdrap-categories-next-and-prev-selected-state"
				);
			}else{
				FWDRAPSimpleButton.setPrototype();
				_s.prevButton_do = new FWDRAPSimpleButton(_s.catPrevN_img, data.catPrevSPath_str, undefined,
						true,
						data.useHEX,
						data.nBC,
						_s.sBC,
						false, false, false, true);
			}
			_s.prevButton_do.screen.className = 'fwdrap-categories-prev-button';
			_s.prevButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.prevButtonOnMouseUpHandler);
		};
		
		_s.closeButtonOnMouseUpHandler = function(){
			 _s.hide();
		};
		
		_s.nextButtonOnMouseUpHandler = function(){
			var availableThumbsPerSection = (_s.howManyThumbsToDisplayH * _s.howManyThumbsToDisplayV);
			_s.tempId += availableThumbsPerSection;
			if(_s.tempId > _s.totalThumbnails - 1) _s.tempId = _s.totalThumbnails - 1;
			var curSet = Math.floor(_s.tempId / availableThumbsPerSection);
			_s.tempId = curSet * availableThumbsPerSection;
			_s.resizeAndPositionThumbnails(true, "next");
			_s.disableEnableNextAndPrevButtons(false, true);
		};
		
		_s.prevButtonOnMouseUpHandler = function(){
			var availableThumbsPerSection = (_s.howManyThumbsToDisplayH * _s.howManyThumbsToDisplayV);
			_s.tempId -= availableThumbsPerSection;
			if(_s.tempId < 0) _s.tempId = 0;
			var curSet = Math.floor(_s.tempId / availableThumbsPerSection);
			_s.tempId = curSet * availableThumbsPerSection;
			_s.resizeAndPositionThumbnails(true, "prev");
			_s.disableEnableNextAndPrevButtons(true, false);
		};
		
		_s.positionButtons = function(){

			_s.clsBtn.setX(_s.sW - _s.clsBtn.w - _s.buttonsMargins);
			_s.clsBtn.setY(_s.buttonsMargins);
			_s.nextButton_do.setX(_s.sW - _s.nextButton_do.w - _s.buttonsMargins);
			_s.nextButton_do.setY(parseInt((_s.sH - _s.nextButton_do.h)/2));
			_s.prevButton_do.setX(_s.buttonsMargins);
			_s.prevButton_do.setY(parseInt((_s.sH - _s.prevButton_do.h)/2));
		};
		
		_s.disableEnableNextAndPrevButtons = function(hitTestLeft, hitTestRight){
			var availableThumbsPerSection = (_s.howManyThumbsToDisplayH * _s.howManyThumbsToDisplayV);
			var curSet = Math.floor(_s.tempId / availableThumbsPerSection);
			var totalSets = Math.ceil(_s.totalThumbnails / availableThumbsPerSection) - 1;
			var currentLeftColId = _s.howManyThumbsToDisplayH * curSet;
			var maxId = totalSets * _s.howManyThumbsToDisplayH;
		
			if(availableThumbsPerSection >= _s.totalThumbnails){
				_s.nextButton_do.disable();
				_s.prevButton_do.disable();
				_s.nextButton_do.setDisabledState();
				_s.prevButton_do.setDisabledState();
			}else if(curSet == 0){
				_s.nextButton_do.enable();
				_s.prevButton_do.disable();
				_s.nextButton_do.setEnabledState();
				_s.prevButton_do.setDisabledState();
			}else if(curSet == totalSets){
				_s.nextButton_do.disable();
				_s.prevButton_do.enable();
				_s.nextButton_do.setDisabledState();
				_s.prevButton_do.setEnabledState();
			}else{
				_s.nextButton_do.enable();
				_s.prevButton_do.enable();
				_s.nextButton_do.setEnabledState();
				_s.prevButton_do.setEnabledState();
			}
			
			if(!hitTestLeft){
				_s.prevButton_do.setNormalState();
			}
			
			if(!hitTestRight){
				_s.nextButton_do.setNormalState();
			}
		};

		
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		_s.setupMobileMove = function(){	
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerdown", _s.mobileDownHandler);
			}else{
				_s.screen.addEventListener("touchstart", _s.mobileDownHandler);
			}
		};
		
		_s.mobileDownHandler = function(e){
			if (e.touches) if(e.touches.length != 1) return;
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			_s.mouseX = vc.screenX;;
			_s.mouseY = vc.screenY;
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointerup", _s.mobileUpHandler);
				window.addEventListener("pointermove", _s.mobileMoveHandler);
			}else{
				window.addEventListener("touchend", _s.mobileUpHandler);
				window.addEventListener("touchmove", _s.mobileMoveHandler);
			}
		};
		
		_s.mobileMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if (e.touches) if(e.touches.length != 1) return;
			_s.showDisable();
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.dif = _s.mouseX - vc.screenX;
			_s.mouseX = vc.screenX;
			_s.mouseY = vc.screenY;
		};
		
		_s.mobileUpHandler = function(e){
			_s.hideDisable();
			if(_s.dif > 10){
				_s.nextButtonOnMouseUpHandler();
			}else if(_s.dif < -10){
				_s.prevButtonOnMouseUpHandler();
			}
			_s.dif = 0;
			
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointerup", _s.mobileUpHandler);
				window.removeEventListener("pointermove", _s.mobileMoveHandler);
			}else{
				window.removeEventListener("touchend", _s.mobileUpHandler);
				window.removeEventListener("touchmove", _s.mobileMoveHandler);
			}
		};
		

		//######################################//
		/* setup thumbnails */
		//######################################//
		_s.setupThumbnails = function(){
			if(_s.areThumbnailsCreated_bl) return;

			_s.areThumbnailsCreated_bl = true;
			var thumb;
			for(var i=0; i<_s.totalThumbnails; i++){
				FWDRAPCategoriesThumb.setPrototype();
				thumb = new FWDRAPCategoriesThumb(_s,
						i,
						data.catThumbBkPath_str,
						data.catThumbBkTextPath_str,
						data.thumbnailSelectedType_str, 
						_s.categories_ar[i].htmlContent,
						_s.categories_ar[i].htmlText_str);
				thumb.addListener(FWDRAPCategoriesThumb.MOUSE_UP, _s.thumbnailOnMouseUpHandler);
				_s.thumbs_ar[i] = thumb;
				_s.mainHld.addChild(thumb);
			}
			_s.mainHld.addChild(_s.clsBtn); 
			_s.mainHld.addChild(_s.nextButton_do); 
			_s.mainHld.addChild(_s.prevButton_do);
		};
		
		_s.thumbnailOnMouseUpHandler = function(e){
			_s.id = e.id;
			_s.disableOrEnableThumbnails();
			_s.hide();
		};
		

		//#############################################//
		/* set data for resize */
		//#############################################//
		_s.resizeAndPositionThumbnails = function(animate, direction){
			if(!_s.areThumbnailsCreated_bl) return;
			var thumb;
			var totalWidth;
			var curSet;
			var tempSet;
			var newX;
			var newY;
			var totalWidth;
			var totalHeight;
			var remainWidthSpace;
			var firsId;
			var lastId;
			var addToX;
			var currentLeftColId;
			var availableThumbsPerSection;
			
			var copy_ar = [].concat(_s.thumbs_ar);
			_s.isSearched_bl = false;
		
			if(_s.input_do){
				var inputValue = _s.input_do.screen.value.toLowerCase();
				if(inputValue != "search"){
					for(var i=0; i<copy_ar.length; i++){
						thumb = copy_ar[i];
						if(thumb.htmlText_str.toLowerCase().indexOf(inputValue.toLowerCase()) == -1){
							FWDAnimation.killTweensOf(thumb);
							thumb.hide();
							copy_ar.splice(i, 1);
							i--;
						}
					}
				}
			}
		
			_s.totalThumbnails = copy_ar.length;
			if(_s.totalThumbnails != _s.thumbs_ar.length) _s.isSearched_bl = true;
			
			if(_s.totalThumbnails == 0){
				_s.showNothingFound();
			}else{
				_s.hideNothingFound();
			}
			
			_s.remainWidthSpace = (_s.sW - totalWidth);
			
			var widthToResize = _s.sW - _s.categoriesOffsetTotalWidth;
			var heightToResize = _s.sH - _s.categoriesOffsetTotalHeight;
			
			_s.howManyThumbsToDisplayH = Math.ceil((widthToResize - _s.spacerH)/(_s.thumbnailMaxWidth + _s.spacerH));
			_s.thumbW = Math.floor(((widthToResize - _s.spacerH * (_s.howManyThumbsToDisplayH - 1)))/_s.howManyThumbsToDisplayH);
			if(_s.thumbW > _s.thumbnailMaxWidth){
				_s.howManyThumbsToDisplayH += 1;
				_s.thumbW = Math.floor(((widthToResize - _s.spacerH * (_s.howManyThumbsToDisplayH - 1)))/_s.howManyThumbsToDisplayH);
			}
			
			_s.thumbH = Math.floor((_s.thumbW/_s.thumbnailMaxWidth) * _s.thumbnailMaxHeight);
			
			_s.howManyThumbsToDisplayV = Math.floor(heightToResize/(_s.thumbH + _s.spacerV));
			if(_s.howManyThumbsToDisplayV < 1) _s.howManyThumbsToDisplayV = 1;
			
			totalWidth = (Math.min(_s.howManyThumbsToDisplayH, _s.totalThumbnails) * (_s.thumbW + _s.spacerH)) - _s.spacerH;
			totalHeight = Math.min(Math.ceil(_s.totalThumbnails/_s.howManyThumbsToDisplayH), _s.howManyThumbsToDisplayV) * (_s.thumbH + _s.spacerV) - _s.spacerV;
			
			if(_s.howManyThumbsToDisplayH > _s.totalThumbnails){
				remainWidthSpace = 0;
			}else{
				remainWidthSpace = (widthToResize - totalWidth);
			}
			
			if(_s.howManyThumbsToDisplayH > _s.totalThumbnails) _s.howManyThumbsToDisplayH = _s.totalThumbnails;
			availableThumbsPerSection = (_s.howManyThumbsToDisplayH * _s.howManyThumbsToDisplayV);
			
	
			curSet = Math.floor(_s.tempId / availableThumbsPerSection);
			if(_s.isSearched_bl) curSet = 0;
			currentLeftColId = _s.howManyThumbsToDisplayH * curSet;
			
			var firstId = curSet * availableThumbsPerSection;
			
			var lastId = firstId + availableThumbsPerSection;
			if(lastId > _s.totalThumbnails)  lastId = _s.totalThumbnails;
			
			for (var i = 0; i<_s.totalThumbnails; i++) {
				
				thumb = copy_ar[i];
				
				thumb.finalW = _s.thumbW;
				if(i % _s.howManyThumbsToDisplayH == _s.howManyThumbsToDisplayH - 1) thumb.finalW += remainWidthSpace;
				thumb.finalH = _s.thumbH;
				
				
				thumb.finalX = (i % _s.howManyThumbsToDisplayH) * (_s.thumbW + _s.spacerH);
				thumb.finalX += Math.floor((i / availableThumbsPerSection)) * _s.howManyThumbsToDisplayH * (_s.thumbW + _s.spacerH);
				thumb.finalX += (_s.sW - totalWidth)/2;
				thumb.finalX = Math.floor(thumb.finalX - currentLeftColId * (_s.thumbW + _s.spacerH));
				
				thumb.finalY = i % availableThumbsPerSection;
				thumb.finalY = Math.floor((thumb.finalY / _s.howManyThumbsToDisplayH)) * (_s.thumbH + _s.spacerV);
				thumb.finalY += (heightToResize - totalHeight)/2;
				thumb.finalY += _s.categoriesOffsetTotalHeight/2;
				thumb.finalY = Math.floor(thumb.finalY);
				
				tempSet = Math.floor((i / availableThumbsPerSection));
			
				if(tempSet > curSet){
					thumb.finalX += 150;
				}else if(tempSet < curSet){
					thumb.finalX -= 150;
				}
				
				if(animate){
					if ((i >= firstId) && (i < lastId)){
						if(direction == "next"){
							var dl = (i % availableThumbsPerSection) * _s.delayRate + .1;
						}else{
							var dl = (availableThumbsPerSection -  (i % availableThumbsPerSection)) * _s.delayRate + .1;
						}
						if(_s.keyPressed_bl) dl = 0;
						thumb.resizeAndPosition(true, dl);
					}else{
						thumb.resizeAndPosition(true, 0);
					}
					
				}else{
					thumb.resizeAndPosition();
				}	
				thumb.show();
			}
			if((_s.howManyThumbsToDisplayH * _s.howManyThumbsToDisplayV) >= _s.totalThumbnails){
				_s.nextButton_do.setVisible(false);
				_s.prevButton_do.setVisible(false);
				
			}else{
				_s.nextButton_do.setVisible(true);
				_s.prevButton_do.setVisible(true);
				
			}
		};

		
		//#############################################//
		/* load images */
		//#############################################//
		_s.loadImages = function(){

			if(_s.countLoadedThumbs > _s.totalThumbnails-1) return;
			
			if(_s.image_img){
				_s.image_img.onload = null;
				_s.image_img.onerror = null;
			}
			
			_s.image_img = new Image();
			_s.image_img.onerror = _s.onImageLoadError;
			_s.image_img.onload = _s.onImageLoadComplete;
			_s.image_img.src = _s.categories_ar[_s.countLoadedThumbs].thumbnailPath;
		};
		
		_s.onImageLoadError = function(e){};
		
		_s.onImageLoadComplete = function(e){
			var thumb = _s.thumbs_ar[_s.countLoadedThumbs];
			thumb.setImage(_s.image_img);
			_s.countLoadedThumbs++;
			_s.loadWithDelayId_to = setTimeout(_s.loadImages, 40);	
		};
		

		//###########################################//
		/* disable / enable thumbnails */
		//###########################################//
		_s.disableOrEnableThumbnails = function(){
			var thumb;
			for(var i = 0; i<_s.totalThumbnails; i++) {
				thumb = _s.thumbs_ar[i];	
				if(i == _s.id){
					thumb.disable();
				}else{
					thumb.enable();
				}
			}
		};

		
		//###########################################//
		/* show / hide */
		//###########################################//
		_s.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			_s.isOnDOM_bl = true;
			_s.id = id;
			
			if(FWDRAPUtils.isChrome && _s.isMbl){
				_s.setVisible(true);
			}else{
				if(FWDRAPUtils.isIEAndLessThen9){
					document.getElementsByTagName("body")[0].appendChild(_s.screen);
				}else{
					document.documentElement.appendChild(_s.screen);
				}
			}
			
			if(window.addEventListener){
				window.addEventListener("scroll", _s.onScrollHandler);
			}else if(window.attachEvent){
				window.attachEvent("onscroll", _s.onScrollHandler);
			}
				
			_s.setupThumbnails();	
			
			if(_s.useVectorIcons_bl){
			
				_s.clsBtn.setFinalSize(true);
				_s.nextButton_do.setFinalSize(true);
				_s.prevButton_do.setFinalSize(true);

				_s.checkButtonsId_to = setInterval(function(){
					if(_s.clsBtn.w != 0){
						_s.categoriesOffsetTotalWidth = _s.clsBtn.w * 2 + 40 + _s.buttonsMargins * 2;
						_s.categoriesOffsetTotalHeight = _s.clsBtn.h;
						_s.resizeAndPosition(true);
						_s.showDisable();
						_s.disableOrEnableThumbnails();
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);
						
						if(_s.isMbl){
							_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 1200);
							FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.4, ease:Expo.easeInOut});
						}else{
							_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 800);
							FWDAnimation.to(_s.mainHld, .8, {y:0, ease:Expo.easeInOut});
						}
					
						clearInterval(_s.checkButtonsId_to);
					}
				
				}, 50);
			}else{
				_s.resizeAndPosition(true);
				_s.showDisable();
				_s.disableOrEnableThumbnails();
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				if(_s.isMbl){
					_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 1200);
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.4, ease:Expo.easeInOut});
				}else{
					_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 800);
					FWDAnimation.to(_s.mainHld, .8, {y:0, ease:Expo.easeInOut});
				}
				
			}
		};
		
		_s.showCompleteHandler = function(){
			_s.mainHld.setY(0);
			_s.hideDisable();
			if(FWDRAPUtils.isIphone){
				if(prt.videoScreen_do) prt.videoScreen_do.setY(-5000);
				if(prt.ytb_do) prt.ytb_do.setY(-5000);
			}
			_s.resizeAndPosition(true);
			if(!_s.areThumbnailsLoaded_bl){
				_s.loadImages();
				_s.areThumbnailsLoaded_bl = true;
			}
		};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(FWDRAPUtils.isIphone){
				if(prt.videoScreen_do) prt.videoScreen_do.setY(0);
				if(prt.ytb_do) prt.ytb_do.setY(0);
			}
			
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			_s.showDisable();
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
			
			if(window.addEventListener){
				window.removeEventListener("scroll", _s.onScrollHandler);
			}else if(window.detachEvent){
				window.detachEvent("onscroll", _s.onScrollHandler);
			}
			_s.resizeAndPosition();
		};
		
		_s.hideCompleteHandler = function(){
			
			if(FWDRAPUtils.isChrome && _s.isMbl){
				_s.setVisible(false);
			}else{
				if(FWDRAPUtils.isIEAndLessThen9){
					document.getElementsByTagName("body")[0].removeChild(_s.screen);
				}else{
					document.documentElement.removeChild(_s.screen);
				}
			}
			
			_s.isOnDOM_bl = false;
			_s.dispatchEvent(FWDRAPCategories.HIDE_COMPLETE);
		};
		
		_s.init();
	};
	

	/* set prototype */
	FWDRAPCategories.setPrototype = function(){
		FWDRAPCategories.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPCategories.HIDE_COMPLETE = "hideComplete";

	FWDRAPCategories.prototype = null;
	window.FWDRAPCategories = FWDRAPCategories;
	
}());/**
 * Royal Audio Player
 * Categories thumnail.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	var FWDRAPCategoriesThumb = function(
			prt,
			pId, 
			catThumbBkTextPath_str,
			catThumbTextBkPath_str,
			thumbnailSelectedType_str,
			htmlContent,
			htmlText
		){

		'use strict';
		
		var _s = this;
		_s.prt = prt;
		var prototype = FWDRAPCategoriesThumb.prototype; _s.backgroundImagePath_str = catThumbBkTextPath_str;
		_s.catThumbTextBkPath_str = catThumbTextBkPath_str;
		_s.htmlContent = htmlContent;
		_s.htmlText_str = htmlText
	
		_s.thumbnailSelectedType_str = thumbnailSelectedType_str;
		
		_s.id = pId;
		_s.isDark = _s.prt.d.isDark;

		_s.hasCanvas_bl = FWDRAP.hasCanvas;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;

		_s.init = function(){
			_s.getStyle().background = "url('" + _s.backgroundImagePath_str + "')";
			_s.screen.className = 'fwdrap-categories-thumbnail-background';
			_s.setupMainContainers();
			_s.setupDescription();
			_s.setupDumy();
		};
		

		//#################################//
		/* set image */
		//#################################//
		_s.setupMainContainers = function(){
			_s.imageHolder_do = new FWDRAPDisplayObject("div");
			_s.addChild(_s.imageHolder_do);
		};
		

		//#################################//
		/* setup dumy */
		//#################################//
		_s.setupDumy = function(){
			_s.dumy_do = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.dumy_do.setBkColor("#FFFFFF");
				_s.dumy_do.setAlpha(0);
			}
			_s.addChild(_s.dumy_do);
		};
		

		//################################################//
		/* Setup title bar */
		//###############################################//
		_s.setupDescription = function(){
			_s.simpleText_do = new FWDRAPDisplayObject("div");
			_s.simpleText_do.getStyle().background = "url('" + _s.catThumbTextBkPath_str + "')";
			var cls = 'fwdrap-categories-white-text';
			if(_s.isDark){
				cls = 'fwdrap-categories-dark-text';
			}
			_s.simpleText_do.screen.className = cls;
			_s.slTitle = _s.simpleText_do.screen.className;

			if(FWDRAPUtils.isFirefox){
				_s.simpleText_do.hasTransform3d_bl = false;
				_s.simpleText_do.hasTransform2d_bl = false;
			}
			_s.simpleText_do.setBackfaceVisibility();
			_s.simpleText_do.getStyle().width = "100%";
			_s.simpleText_do.getStyle().fontFamily = "Arial";
			_s.simpleText_do.getStyle().fontSize= "12px";
			_s.simpleText_do.getStyle().textAlign = "left";
			_s.simpleText_do.getStyle().color = "#FFFFFF";
			_s.simpleText_do.getStyle().fontSmoothing = "antialiased";
			_s.simpleText_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.simpleText_do.getStyle().textRendering = "optimizeLegibility";		
			_s.simpleText_do.setInnerHTML(_s.htmlContent);
			_s.addChild(_s.simpleText_do);
		};
		
		_s.positionDescription = function(){
			_s.simpleText_do.setY(parseInt(_s.finalH - _s.simpleText_do.getHeight()));
		};

		
		//#################################//
		/* setup black an white image */
		//#################################//
		_s.setupBlackAndWhiteImage = function(image){
			if(!_s.hasCanvas_bl || _s.thumbnailSelectedType_str == "opacity") return;
			var canvas = document.createElement("canvas");

			var ctx = canvas.getContext("2d");
			
			canvas.width = _s.imageOriginalW;
			canvas.height = _s.imageOriginalH; 
			ctx.drawImage(image, 0, 0); 
			
			var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
			
			var d = imgPixels.data;
			
			if(_s.thumbnailSelectedType_str == "threshold"){
				//treshhold
				for (var i=0; i<d.length; i+=4) {
				    var r = d[i];
				    var g = d[i+1];
				    var b = d[i+2];
				    var v = (0.2126*r + 0.7152*g + 0.0722*b >= 150) ? 255 : 0;
				    d[i] = d[i+1] = d[i+2] = v;
				}
			}else if(_s.thumbnailSelectedType_str == "blackAndWhite"){
				//grayscale
				for (var i=0; i<d.length; i+=4) {
					var r = d[i];
				    var g = d[i+1];
				    var b = d[i+2];
				    // CIE luminance for the RGB
				    // The human eye is bad at seeing red and blue, so we de-emphasize them.
				    var v = 0.2126*r + 0.7152*g + 0.0722*b;
				    d[i] = d[i+1] = d[i+2] = v;
				}
			}
		
			ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
			
			_s.effectImage_do = new FWDRAPDisplayObject("canvas");
			_s.effectImage_do.screen = canvas;
			_s.effectImage_do.setAlpha(.9);
			
			_s.effectImage_do.setMainProperties();
		};

	
		//#################################//
		/* set image */
		//#################################//
		_s.setImage = function(image){
			_s.normalImage_do = new FWDRAPDisplayObject("img");
			_s.normalImage_do.setScreen(image);
			
			_s.imageOriginalW = _s.normalImage_do.w;
			_s.imageOriginalH = _s.normalImage_do.h;
			
			_s.setButtonMode(true);
			_s.setupBlackAndWhiteImage(image);
			
			_s.resizeImage();
			
			_s.imageHolder_do.setX(parseInt(_s.finalW/2));
			_s.imageHolder_do.setY(parseInt(_s.finalH/2));
			_s.imageHolder_do.setWidth(0);
			_s.imageHolder_do.setHeight(0);
			
			_s.normalImage_do.setX(- parseInt(_s.normalImage_do.w/2));
			_s.normalImage_do.setY(- parseInt(_s.normalImage_do.h/2));
			_s.normalImage_do.setAlpha(0);
			
			if(_s.effectImage_do){
				_s.effectImage_do.setX(- parseInt(_s.normalImage_do.w/2));
				_s.effectImage_do.setY(- parseInt(_s.normalImage_do.h/2));
				_s.effectImage_do.setAlpha(0.01);
			}
			
			FWDAnimation.to(_s.imageHolder_do, .8, {
				x:0, 
				y:0,
				w:_s.finalW,
				h:_s.finalH, 
				ease:Expo.easeInOut});
			
			FWDAnimation.to(_s.normalImage_do, .8, {
				alpha:1,
				x:_s.imageFinalX, 
				y:_s.imageFinalY, 
				ease:Expo.easeInOut});
			
			if(_s.effectImage_do){
				FWDAnimation.to(_s.effectImage_do, .8, {
					x:_s.imageFinalX, 
					y:_s.imageFinalY, 
					ease:Expo.easeInOut});
			}
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.screen.addEventListener("pointerover", _s.onMouseOver);
				_s.screen.addEventListener("pointerout", _s.onMouseOut);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMbl){
					_s.screen.addEventListener("mouseover", _s.onMouseOver);
					_s.screen.addEventListener("mouseout", _s.onMouseOut);
					_s.screen.addEventListener("mouseup", _s.onMouseUp);
				}
				_s.screen.addEventListener("touchend", _s.onMouseUp);
			}
		
			_s.imageHolder_do.addChild(_s.normalImage_do);
			if(_s.effectImage_do) _s.imageHolder_do.addChild(_s.effectImage_do);
			
			_s.hasImage_bl = true;
			
			if(_s.id == prt.id){
				_s.disable();
			}
			
		};
		
		_s.onMouseOver = function(e, animate){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				_s.setSelectedState(true);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				_s.setNormalState(true);
			}
		};
		
		_s.onMouseUp = function(e){
			if(_s.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPCategoriesThumb.MOUSE_UP, {id:_s.id});
		};

	
		//#################################//
		/* resize thumbnail*/
		//#################################//
		_s.resizeAndPosition = function(animate, dl){
			
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.killTweensOf(_s.imageHolder_do);
			
			if(animate){
				FWDAnimation.to(_s, .8, {
					x:_s.finalX, 
					y:_s.finalY,
					delay:dl,
					ease:Expo.easeInOut});
			}else{
				_s.setX(_s.finalX);
				_s.setY(_s.finalY);
			}
			
			_s.setWidth(_s.finalW);
			_s.setHeight(_s.finalH);
			_s.imageHolder_do.setX(0);
			_s.imageHolder_do.setY(0);
			_s.imageHolder_do.setWidth(_s.finalW);
			_s.imageHolder_do.setHeight(_s.finalH);
			
			_s.dumy_do.setWidth(_s.finalW);
			_s.dumy_do.setHeight(_s.finalH);
			
			_s.resizeImage();
			_s.positionDescription();
		};

	
		//#################################//
		/* resize image*/
		//#################################//
		_s.resizeImage = function(animate){
			
			if(!_s.normalImage_do) return;
			FWDAnimation.killTweensOf(_s.normalImage_do);
			var scX = _s.finalW/_s.imageOriginalW;
			var scY = _s.finalH/_s.imageOriginalH;
			var ttsc;
			
			if(scX >= scY){
				ttsc = scX;
			}else{
				ttsc = scY;
			}
			
			_s.imageFinalW = Math.ceil(ttsc * _s.imageOriginalW);
			_s.imageFinalH = Math.ceil(ttsc * _s.imageOriginalH);
			_s.imageFinalX = Math.round((_s.finalW - _s.imageFinalW)/2);
			_s.imageFinalY = Math.round((_s.finalH - _s.imageFinalH)/2);
			
			if(_s.effectImage_do){
				FWDAnimation.killTweensOf(_s.effectImage_do);
				_s.effectImage_do.setX(_s.imageFinalX);
				_s.effectImage_do.setY(_s.imageFinalY);
				_s.effectImage_do.setWidth(_s.imageFinalW);
				_s.effectImage_do.setHeight(_s.imageFinalH);
				if(_s.isDisabled_bl) _s.setSelectedState(false, true);
			}
			
			_s.normalImage_do.setX(_s.imageFinalX);
			_s.normalImage_do.setY(_s.imageFinalY);
			_s.normalImage_do.setWidth(_s.imageFinalW + 1);
			_s.normalImage_do.setHeight(_s.imageFinalH);
			
			if(_s.isDisabled_bl){
				_s.normalImage_do.setAlpha(.3);
			}else{
				_s.normalImage_do.setAlpha(1);
			}
		};
		

		//##############################//
		/* set normal/selected state*/
		//##############################//
		_s.setNormalState = function(animate){
			if(!_s.isSelected_bl) return;
			_s.isSelected_bl = false;
			if(_s.slTitle){
				_s.simpleText_do.screen.className = _s.slTitle;
			}

			if(_s.thumbnailSelectedType_str == "threshold" || _s.thumbnailSelectedType_str == "blackAndWhite"){
				if(animate){
					FWDAnimation.to(_s.effectImage_do, 1, {alpha:.01, ease:Quart.easeOut});
				}else{
					_s.effectImage_do.setAlpha(.01);
				}
			}else if(_s.thumbnailSelectedType_str == "opacity"){
				if(animate){
					FWDAnimation.to(_s.normalImage_do, 1, {alpha:1, ease:Quart.easeOut});
				}else{
					_s.normalImage_do.setAlpha(1);
				}
			}
		};
		
		_s.setSelectedState = function(animate, overwrite){
			if(_s.isSelected_bl && !overwrite) return;
			_s.isSelected_bl = true;
			_s.setTitleSelectedClass();
			if(_s.thumbnailSelectedType_str == "threshold" || _s.thumbnailSelectedType_str == "blackAndWhite"){
				if(animate){
					FWDAnimation.to(_s.effectImage_do, 1, {alpha:1, ease:Expo.easeOut});
				}else{
					_s.effectImage_do.setAlpha(1);
				}
			}else if(_s.thumbnailSelectedType_str == "opacity"){
				if(animate){
					FWDAnimation.to(_s.normalImage_do, 1, {alpha:.3, ease:Expo.easeOut});
				}else{
					_s.normalImage_do.setAlpha(.3);
				}
			}
		};
		

		//###############################//
		/* Hide / show */
		//###############################//
		_s.show = function(){
			FWDAnimation.to(_s, .8, {scale:1, ease:Expo.easeInOut});
		}
		
		_s.hide = function(){
			FWDAnimation.to(_s, .8, {scale:0, ease:Expo.easeInOut});
		}
		
		
		//###############################//
		/* enable / disable */
		//##############################//
		_s.enable = function(){
			if(!_s.hasImage_bl) return;
			_s.isDisabled_bl = false;
			_s.setButtonMode(true);
			_s.setNormalState(true);
		};
		
		_s.disable = function(){
			if(!_s.hasImage_bl) return;
			_s.isDisabled_bl = true;
			_s.setButtonMode(false);
			_s.setSelectedState(true);
			_s.setTitleSelectedClass();
		};

		_s.setTitleSelectedClass = function(){
			if(_s.slTitle){
				_s.simpleText_do.screen.className = _s.slTitle  + ' active';
			}
		}
	
		_s.init();
	};
	
	/* set prototype */
	FWDRAPCategoriesThumb.setPrototype = function(){
		FWDRAPCategoriesThumb.prototype = new FWDRAPTransformDisplayObject("div");
	};
	
	
	FWDRAPCategoriesThumb.MOUSE_UP = "onMouseUp";
	
	FWDRAPCategoriesThumb.prototype = null;
	window.FWDRAPCategoriesThumb = FWDRAPCategoriesThumb;
}(window));/**
 * Royal Audio Player
 * Playlist select box.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPComboBox = function(prt, props_obj){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPComboBox.prototype;
		
		_s.categories_ar = props_obj.categories_ar;
		_s.buttons_ar = [];
		
	
		_s.arrowW = props_obj.arrowW;
		_s.arrowH = props_obj.arrowH;
		
		_s.useHEX = prt._d.useHEX; 
		_s.nBC = prt._d.nBC;
		_s.sBC = prt._d.sBC;
	
		_s.arrowN_str = props_obj.arrowN_str 
		_s.arrowS_str = props_obj.arrowS_str;
		_s.bk1_str = props_obj.bk1_str;
		_s.bk2_str = props_obj.bk2_str;
		
		_s.selectorLabel_str = props_obj.selectorLabel;
		_s.selectorBkColorN_str = props_obj.selectorBackgroundNormalColor;
		_s.selectorBkColorS_str = props_obj.selectorBackgroundSelectedColor;
		_s.selectorTextColorN_str = props_obj.selectorTextNormalColor;
		_s.selectorTextColorS_str = props_obj.selectorTextSelectedColor;
		
		_s.itemBkColorN_str = props_obj.buttonBackgroundNormalColor;
		_s.itemBkColorS_str = props_obj.buttonBackgroundSelectedColor;
		_s.itemTextColorN_str = props_obj.buttonTextNormalColor;
		_s.itemTextColorS_str = props_obj.buttonTextSelectedColor;
		
		_s.scrollBarHandlerFinalY = 0;
		
		_s.finalX;
		_s.finalY;
		_s.totalButtons = _s.categories_ar.length;
		_s.curId = props_obj.startAtPlaylist;
		_s.buttonsHolderWidth = 0;
		_s.buttonsHolderHeight = 0;
		_s.totalWidth = prt.sW;
		_s.buttonHeight = props_obj.buttonHeight;
		
		_s.totalButtonsHeight = 0;
		_s.sapaceBetweenButtons = 0;
		_s.thumbnailsFinalY = 0;
		_s.vy = 0;
		_s.vy2 = 0;
		_s.friction = .9;
		
		_s.addMouseWheelSupport_bl = prt._d.addScrollBarMouseWheelSupport_bl;
		_s.scollbarSpeedSensitivity = .5;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isMbl = FWDRAPUtils.isMobile;
		
		_s.init = function(){
			_s.setOverflow("visible");
			_s.setupMainContainers();
			_s.setupScrollLogic();
			_s.getMaxWidthResizeAndPosition();
			_s.setupSeparator();
			_s.mainButtonsHolder_do.setVisible(false);
			_s.bk_do.setVisible(false);
			
		};

		
		//###############################//
		/* setup separator */
		//###############################//
		_s.setupSeparator = function(){
			_s.separator_do = new FWDRAPDisplayObject("div");
			_s.separator_do.setBackfaceVisibility();
			_s.separator_do.hasTransform3d_bl = false;
			_s.separator_do.hasTransform2d_bl = false;
			_s.separator_do.getStyle().background = "url('" + prt.playlistSeparator_img.src + "')";
			_s.separator_do.screen.className = 'fwdrap-controler-separator';
			_s.separator_do.setHeight(prt.playlistSeparator_img.height);
			_s.separator_do.setY(_s.buttonHeight);
			_s.addChild(_s.separator_do);
		};

		
		//#####################################//
		/* setup main containers */
		//####################################//
		_s.setupMainContainers = function(){
			var button_do;
			
			_s.mainHolder_do = new FWDRAPDisplayObject("div");
			_s.mainHolder_do.setOverflow("visible");
			_s.addChild(_s.mainHolder_do);
			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.setY(_s.buttonHeight);
			_s.bk_do.screen.className = 'fwdrap-playlist-background';
			_s.bk_do.setBkColor(prt.playlistBackgroundColor_str);
			_s.bk_do.setAlpha(0);
			
			_s.mainHolder_do.addChild(_s.bk_do);
			
			_s.mainButtonsHolder_do = new FWDRAPDisplayObject("div");
			_s.mainButtonsHolder_do.setY(_s.buttonHeight);
			_s.mainHolder_do.addChild(_s.mainButtonsHolder_do);
			
			if(!prt.expandPlaylistBackground_bl){
				_s.dummyBk_do =  new FWDRAPDisplayObject("div");
				_s.dummyBk_do.getStyle().background = "url('" + prt.controllerBkPath_str +  "')";
			}else{
				_s.dummyBk_do = new FWDRAPDisplayObject("img");
				var imageBk_img = new Image();
				imageBk_img.src = prt.controllerBkPath_str;
				_s.dummyBk_do.setScreen(imageBk_img);
				_s.dummyBk_do.getStyle().backgroundColor = "#000000";
			}
			_s.dummyBk_do.screen.className = 'fwdrap-combobox-background';
	
			_s.dummyBk_do.setHeight(_s.buttonHeight);
			_s.mainHolder_do.addChild(_s.dummyBk_do);
			
			_s.buttonsHolder_do = new FWDRAPDisplayObject("div");
			_s.mainButtonsHolder_do.addChild(_s.buttonsHolder_do);
			
			var selLabel = _s.selectorLabel_str;
			
			if(_s.selectorLabel_str == "default"){
				selLabel = _s.categories_ar[_s.curId];
			}
			
			FWDRAPComboBoxSelector.setPrototype();

			_s.selector_do = new FWDRAPComboBoxSelector(
					11,
					6,
					props_obj.arrowN_str,
					props_obj.arrowS_str,
					selLabel,
					_s.selectorBkColorN_str,
					_s.selectorBkColorS_str,
					_s.selectorTextColorN_str,
					_s.selectorTextColorS_str,
					_s.buttonHeight,
					_s.useHEX,
					_s.nBC,
					_s.sBC);
			_s.mainHolder_do.addChild(_s.selector_do);
			_s.selector_do.setNormalState(false);
			_s.selector_do.addListener(FWDRAPComboBoxSelector.MOUSE_DOWN, _s.openMenuHandler);
			
			for(var i=0; i<_s.totalButtons; i++){
				FWDRAPComboBoxButton.setPrototype();
				button_do = new FWDRAPComboBoxButton(
						_s,
						_s.categories_ar[i],
						_s.bk1_str,
						_s.bk2_str,
						_s.itemBkColorN_str,
						_s.itemBkColorS_str,
						_s.itemTextColorN_str,
						_s.itemTextColorS_str,
						i,
						_s.buttonHeight);
				_s.buttons_ar[i] = button_do;
				button_do.addListener(FWDRAPComboBoxButton.MOUSE_DOWN, _s.buttonOnMouseDownHandler);
				_s.buttonsHolder_do.addChild(button_do);
			}
		};
		
		_s.buttonOnMouseDownHandler = function(e){
		
			_s.curId = e.id;
			clearTimeout(_s.hideMenuTimeOutId_to);
			_s.hide(true);
			_s.selector_do.enable(); 
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.removeEventListener("RAPointerDown", _s.checkOpenedMenu);
				}else{
					window.removeEventListener("touchstart", _s.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.removeEventListener("mousedown", _s.checkOpenedMenu);
					window.removeEventListener("mousemove", _s.checkOpenedMenu);
				}else if(document.attachEvent){
					document.detachEvent("onmousemove", _s.checkOpenedMenu);
				}
			}
			
			if(prt._d.showPlaylistsSelectBoxNumbers_bl){
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str.substr(4));
			}else{
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str);
			}
			
			_s.isButtonCliecked_bl = true;
			_s.dispatchEvent(FWDRAPComboBox.BUTTON_PRESSED, {id:_s.curId})
		};
		
		_s.openMenuHandler = function(e){
			if(FWDAnimation.isTweening(_s.mainButtonsHolder_do)) return;
			if(_s.isShowed_bl){
				_s.checkOpenedMenu(e.e, true);
			}else{
				_s.selector_do.disable();
				_s.selector_do.setNormalState(true);
				_s.show(true);
				_s.startToCheckOpenedMenu();
				_s.dispatchEvent(FWDRAPComboBox.OPEN);
			}
		};
		

		//#######################################//
		/* Disable or enable buttons */
		//#######################################//
		_s.setButtonsStateBasedOnId = function(id){
			_s.curId = id;
			for(var i=0; i<_s.totalButtons; i++){
				var button_do = _s.buttons_ar[i];
				if(i == _s.curId){
					button_do.disable();
				}else{
					button_do.enable();
				}
			}
			if(prt._d.showPlaylistsSelectBoxNumbers_bl){
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str.substr(4));
			}else{
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str);
			}
			if(_s.scrHandler_do){
				_s.updateScrollBarSizeActiveAndDeactivate();
				_s.updateScrollBarHandlerAndContent(false, true);
			}else{
				_s.thumbnailsFinalY = 0;
			}
		};
		
		_s.setValue = function(id){
			_s.curId = id;
			_s.setButtonsStateBasedOnId();
		};

		
		//#######################################//
		/* Start to check if mouse is over menu */
		//#######################################//
		_s.startToCheckOpenedMenu = function(e){
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("RAPointerDown", _s.checkOpenedMenu);
				}else{
					window.addEventListener("touchstart", _s.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousedown", _s.checkOpenedMenu);
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", _s.checkOpenedMenu);
				}
			}
		};
		
		_s.checkOpenedMenu = function(e, forceHide){
		
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var hideDelay  = 1000;
			if(e.type == "mousedown") hideDelay = 0;
			if(!FWDRAPUtils.hitTest(_s.screen, vc.screenX, vc.screenY) &&
			   !FWDRAPUtils.hitTest(_s.mainButtonsHolder_do.screen, vc.screenX, vc.screenY)
			   || forceHide
			){
				_s.hide(true, e);
				_s.selector_do.enable();
			
				if(_s.isMbl){
					if(_s.hasPointerEvent_bl){
						window.removeEventListener("RAPointerDown", _s.checkOpenedMenu);
					}else{
						window.removeEventListener("touchstart", _s.checkOpenedMenu);
					}
				}else{
					if(window.addEventListener){
						window.removeEventListener("mousemove", _s.checkOpenedMenu);
						window.removeEventListener("mousedown", _s.checkOpenedMenu);
					}else if(document.attachEvent){
						document.detachEvent("onmousemove", _s.checkOpenedMenu);
					}
				}
				if(FWDRAPUtils.hitTest(_s.selector_do.screen, vc.screenX, vc.screenY)){
					setTimeout(function(){
						_s.selector_do.setSelectedState(true);
					}, 50)
				}
			}else{
				clearTimeout(_s.hideMenuTimeOutId_to);
			}
		};
		
		
		//########################################//
		/* Get max width and position */
		//#######################################//
		_s.getMaxWidthResizeAndPosition = function(){
			
			var button_do;
			var finalX;
			var finalY;
			_s.totalButtonsHeight = 0;		
			
			for(var i=0; i<_s.totalButtons; i++){
				button_do = _s.buttons_ar[i];
				button_do.setY(1 + (i * (button_do.totalHeight + _s.sapaceBetweenButtons)));
				_s.totalWidth = prt.sW;
				button_do.totalWidth =  _s.totalWidth;
				button_do.setWidth(_s.totalWidth);
				button_do.centerText();
			}
		
			_s.totalButtonsHeight = button_do.getY() + button_do.totalHeight - _s.sapaceBetweenButtons;
			
			_s.dummyBk_do.setWidth(_s.totalWidth + 6);
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.buttonHeight);
			_s.selector_do.totalWidth =  _s.totalWidth;
			_s.selector_do.setWidth(_s.totalWidth + 6);
			_s.selector_do.centerText();
			_s.buttonsHolder_do.setWidth(_s.totalWidth);
			_s.buttonsHolder_do.setHeight(_s.totalButtonsHeight);
		};


		//######################################//
		/* position */
		//######################################//
		_s.position = function(){		
			if (FWDRAPUtils.isAndroid){
				_s.setX(Math.floor(_s.finalX));
				_s.setY(Math.floor(_s.finalY-1));
				setTimeout(_s.poscombo-box, 100);
			}else{
				_s.poscombo-box();
			}
		};
			
		_s.resizeAndPosition = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			_s.bk_do.setWidth(_s.sW);
			_s.bk_do.setHeight(_s.sH);
			_s.mainButtonsHolder_do.setWidth(_s.sW);
			_s.mainButtonsHolder_do.setHeight(_s.sH);
			
			if(_s.totalButtonsHeight > _s.mainButtonsHolder_do.h){
				_s.allowToScrollAndScrollBarIsActive_bl = true;
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = false;
			}

			if(!_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
				_s.scrMainHolder_do.setVisible(false);
			}else if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do && _s.isShowed_bl){
				_s.scrMainHolder_do.setVisible(true);
			}
			
			_s.separator_do.setWidth(_s.sW);
			if(_s.scrHandler_do) _s.updateScrollBarSizeActiveAndDeactivate();
			_s.getMaxWidthResizeAndPosition();
			_s.updateScrollBarHandlerAndContent();
		};
		
		_s.hide = function(animate, overwrite){
			if(!_s.isShowed_bl && !overwrite) return;
			FWDAnimation.killTweensOf(_s);
			_s.isShowed_bl = false;
			
			FWDAnimation.killTweensOf(_s.mainButtonsHolder_do);
			FWDAnimation.killTweensOf(_s.bk_do);
			if(animate){
				FWDAnimation.to(_s.mainButtonsHolder_do, .8, {y:-_s.totalButtonsHeight, ease:Expo.easeInOut, onComplete:_s.hideComplete});	
				FWDAnimation.to(_s.bk_do, .8, {alpha:0});	
			}else{

				_s.bk_do.setVisible(false);
				_s.mainButtonsHolder_do.setY(_s.buttonHeight - _s.totalButtonsHeight);
				_s.bk_do.setAlpha(0);
				_s.setHeight(_s.buttonHeight);
				_s.hideComplete();
			}
		};
		
		_s.hideComplete = function(){
			_s.mainButtonsHolder_do.setVisible(false);
			_s.bk_do.setVisible(false);
		}

		_s.show = function(animate, overwrite){
			if(_s.isShowed_bl && !overwrite) return;
			FWDAnimation.killTweensOf(_s);
			_s.mainButtonsHolder_do.setY(- _s.totalButtonsHeight);
			_s.isShowed_bl = true;
			_s.mainButtonsHolder_do.setVisible(true);
			_s.bk_do.setVisible(true);
			_s.resizeAndPosition();
			_s.updateScrollBarHandlerAndContent(false, true);
			FWDAnimation.killTweensOf(_s.mainButtonsHolder_do);
			FWDAnimation.killTweensOf(_s.bk_do);
			if(_s.scrMainHolder_do && _s.allowToScrollAndScrollBarIsActive_bl) _s.scrMainHolder_do.setVisible(true);
			if(animate){
				FWDAnimation.to(_s.bk_do, .8, {alpha:1});
				FWDAnimation.to(_s.mainButtonsHolder_do, .8, {y:_s.buttonHeight, ease:Expo.easeInOut});
			}else{
				_s.bk_do.setAlpha(1);
				_s.mainButtonsHolder_do.setY(_s.buttonHeight);
			}
		};
		
		_s.setupScrollLogic = function(){
			if(_s.isMbl){
				_s.setupMobileScrollbar();
			}else{
				_s.setupScrollbar();
				if(_s.addMouseWheelSupport_bl) _s.addMouseWheelSupport();
			}
		};

		
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		_s.setupMobileScrollbar = function(){
			if(_s.hasPointerEvent_bl){
				_s.mainButtonsHolder_do.screen.addEventListener("pointerdown", _s.scrollBarTouchStartHandler);
			}else{
				_s.mainButtonsHolder_do.screen.addEventListener("touchstart", _s.scrollBarTouchStartHandler);
			}
			_s.mainButtonsHolder_do.screen.addEventListener("mousedown", _s.scrollBarTouchStartHandler);
			_s.updateMobileScrollBarId_int = setInterval(_s.updateMobileScrollBar, 16);
			
		};
		
		_s.scrollBarTouchStartHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			_s.isScrollingOnMove_bl = false;
			FWDAnimation.killTweensOf(_s.buttonsHolder_do);
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			_s.lastPresedY = vc.screenY;
			_s.checkLastPresedY = vc.screenY;
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.addEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", _s.scrollBarTouchMoveHandler, {passive:false});
			}
			
			window.addEventListener("mouseup", _s.scrollBarTouchEndHandler);
			window.addEventListener("mousemove", _s.scrollBarTouchMoveHandler);
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			_s.updateMoveMobileScrollbarId_int = setInterval(_s.updateMoveMobileScrollbar, 20);
		};
		
		_s.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			e.stopImmediatePropagation();
		
			if(_s.totalButtonsHeight < _s.mainButtonsHolder_do.h) return;
			prt.showDisable();
		
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(vc.screenY >= _s.checkLastPresedY + 6 || vc.screenY <= _s.checkLastPresedY - 6) _s.isScrollingOnMove_bl = true;
			var toAdd = vc.screenY - _s.lastPresedY;
		
			_s.thumbnailsFinalY += toAdd;
			_s.thumbnailsFinalY = Math.round(_s.thumbnailsFinalY);
			
			_s.lastPresedY = vc.screenY;
			_s.vy = toAdd  * 2;
		};
		
		_s.scrollBarTouchEndHandler = function(e){
			_s.isDragging_bl = false;
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			clearTimeout(_s.disableOnMoveId_to);
			_s.disableOnMoveId_to = setTimeout(function(){
				prt.hideDisable();
			},100);
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.removeEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", _s.scrollBarTouchMoveHandler);
			}
			window.removeEventListener("mousemove", _s.scrollBarTouchMoveHandler);
		};
		
		_s.updateMoveMobileScrollbar = function(){
			_s.buttonsHolder_do.setY(_s.thumbnailsFinalY);
		};
		
		_s.updateMobileScrollBar = function(animate){
			
			if(!_s.isDragging_bl){
			
				if(_s.totalButtonsHeight < _s.mainButtonsHolder_do.h) _s.thumbnailsFinalY = 0.01;
				
				_s.vy *= _s.friction;
				_s.thumbnailsFinalY += _s.vy;	
			
				if(_s.thumbnailsFinalY > 0){
					_s.vy2 = (0 - _s.thumbnailsFinalY) * .3;
					_s.vy *= _s.friction;
					_s.thumbnailsFinalY += _s.vy2;
				}else if(_s.thumbnailsFinalY < _s.mainButtonsHolder_do.h - _s.totalButtonsHeight){
					_s.vy2 = (_s.mainButtonsHolder_do.h - _s.totalButtonsHeight - _s.thumbnailsFinalY) * .3;
					_s.vy *= _s.friction;
					_s.thumbnailsFinalY += _s.vy2;
				}
				
				_s.buttonsHolder_do.setY(Math.round(_s.thumbnailsFinalY));
			}
		};
		
		
		//#################################//
		/* setup mouse scrollbar */
		//#################################//
		_s.setupScrollbar = function(){
			_s.scrMainHolder_do = new FWDRAPDisplayObject("div");
			_s.scrMainHolder_do.setVisible(false);
			
			_s.scrMainHolder_do.setWidth(prt.scrWidth);
			
			//track
			_s.scrTrack_do = new FWDRAPDisplayObject("div");
			_s.scrTrack_do.setWidth(prt.scrWidth);
			
			var playlistScrBkTop_img = new Image();
			playlistScrBkTop_img.src = prt.playlistScrBkTop_img.src;
			_s.scrTrackTop_do = new FWDRAPDisplayObject("img");
			_s.scrTrackTop_do.setWidth(prt.scrTrackTop_do.w);
			_s.scrTrackTop_do.setHeight(prt.scrTrackTop_do.h);
			_s.scrTrackTop_do.setScreen(playlistScrBkTop_img);
			_s.scrTrackTop_do.screen.className = 'fwdrap-scrollbar-top-background';
			
			
			_s.scrTrackMiddle_do = new FWDRAPDisplayObject("div");
			_s.scrTrackMiddle_do.screen.className = 'fwdrap-scrollbar-middle-background';
			_s.scrTrackMiddle_do.getStyle().background = "url('" + prt._d.scrBkMiddlePath_str + "')";
			_s.scrTrackMiddle_do.setWidth(prt.scrWidth);
			_s.scrTrackMiddle_do.setY(_s.scrTrackTop_do.h);
		
			var scrTrackBottomImage_img = new Image();
			scrTrackBottomImage_img.src = prt._d.scrBkBottomPath_str;
			_s.scrTrackBottom_do = new FWDRAPDisplayObject("img");
			_s.scrTrackBottom_do.setScreen(scrTrackBottomImage_img);
			_s.scrTrackBottom_do.setWidth(_s.scrTrackTop_do.w);
			_s.scrTrackBottom_do.setHeight(_s.scrTrackTop_do.h);
			_s.scrTrackBottom_do.screen.className = 'fwdrap-scrollbar-bottom-background';
			
			//handler
			_s.scrHandler_do = new FWDRAPDisplayObject("div");
			_s.scrHandler_do.setWidth(prt.scrWidth);
			
		
			_s.playlistScrDragTop_img = new Image();
			_s.playlistScrDragTop_img.src = prt._d.scrDragBottomPath_str;
			
			_s.playlistScrDragTop_img.width = prt.playlistScrDragTop_img.width;
			_s.playlistScrDragTop_img.height = prt.playlistScrDragTop_img.height;
			
			_s.scrHandlerTop_do = new FWDRAPDisplayObject("img");
			if(_s.useHEX){
				_s.scrHandlerTop_do = new FWDRAPDisplayObject("div");
				_s.scrHandlerTop_do.setWidth(_s.playlistScrDragTop_img.width);
				_s.scrHandlerTop_do.setHeight(_s.playlistScrDragTop_img.height);
				_s.mainScrubberDragTop_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.playlistScrDragTop_img, _s.nBC).canvas;
				_s.scrHandlerTop_do.screen.appendChild(_s.mainScrubberDragTop_canvas);	
			}else{
				_s.scrHandlerTop_do = new FWDRAPDisplayObject("img");
				_s.scrHandlerTop_do.setScreen(_s.playlistScrDragTop_img);
			}
			
			_s.scrHandlerMiddle_do = new FWDRAPDisplayObject("div");
			_s.middleImage = new Image();
			_s.middleImage.src = prt._d.scrDragMiddlePath_str;
			if(_s.useHEX){
				_s.middleImage.onload = function(){
					_s.scrubberDragMiddle_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.middleImage, _s.nBC, true);
					_s.scrubberDragImage_img = _s.scrubberDragMiddle_canvas.image;
					_s.scrHandlerMiddle_do.getStyle().background = "url('" + _s.scrubberDragImage_img.src + "') repeat-y";
				}
			}else{
				_s.scrHandlerMiddle_do.getStyle().background = "url('" + prt._d.scrDragMiddlePath_str + "')";
			}
	
			_s.scrHandlerMiddle_do.setWidth(prt.scrWidth);
			_s.scrHandlerMiddle_do.setY(_s.scrHandlerTop_do.h);
			
			_s.scrHandlerBottom_do = new FWDRAPDisplayObject("div");
			_s.bottomImage = new Image();
			_s.bottomImage.src = prt._d.scrDragMiddlePath_str;
			if(_s.useHEX){
				_s.bottomImage.onload = function(){
					_s.scrubberDragBottom_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.bottomImage, _s.nBC, true);
					_s.scrubberDragBottomImage_img = _s.scrubberDragBottom_canvas.image;
					_s.scrHandlerBottom_do.getStyle().background = "url('" + _s.scrubberDragBottomImage_img.src + "') repeat-y";
					
				}
			}else{
				_s.scrHandlerBottom_do.getStyle().background = "url('" + prt.playlistScrDragTop_img.src + "')";
			}
			_s.scrHandlerBottom_do.setWidth(prt.scrWidth);
			_s.scrHandlerBottom_do.setY(_s.scrHandlerTop_do.h);
		
			
			_s.scrHandlerBottom_do.setWidth(_s.scrHandlerTop_do.w);
			_s.scrHandlerBottom_do.setHeight(_s.scrHandlerTop_do.h);
			_s.scrHandler_do.setButtonMode(true);
			
			_s.playlistScrLines_img = new Image();
			_s.playlistScrLines_img.src = prt.playlistScrLines_img.src;
			_s.playlistScrLines_img.width = prt.playlistScrLines_img.width;
			_s.playlistScrLines_img.height = prt.playlistScrLines_img.height;
		
			_s.scrHandlerLinesN_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesN_do.setScreen(_s.playlistScrLines_img);
			_s.scrHandlerLinesN_do.screen.className = 'fwdrap-handler-lines-1';

			_s.scrHandlerLinesS_img = new Image();
			_s.scrHandlerLinesS_img.src = prt._d.scrLinesSPath_str;
			_s.scrHandlerLinesS_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesS_do.setScreen(_s.scrHandlerLinesS_img);
			_s.scrHandlerLinesS_do.setWidth(_s.scrHandlerLinesN_do.w);
			_s.scrHandlerLinesS_do.setHeight(_s.scrHandlerLinesN_do.h);
			_s.scrHandlerLinesS_do.screen.className = 'fwdrap-handler-lines-2';
		
			_s.scrHandlerLinesS_do.setAlpha(0);
					
			_s.scrHandlerLines_do = new FWDRAPDisplayObject("div");
			_s.scrHandlerLines_do.setWidth(_s.scrHandlerLinesN_do.w);
			_s.scrHandlerLines_do.setHeight(_s.scrHandlerLinesN_do.h);
			_s.scrHandlerLines_do.setButtonMode(true);
				
			_s.scrTrack_do.addChild(_s.scrTrackTop_do);
			_s.scrTrack_do.addChild(_s.scrTrackMiddle_do);
			_s.scrTrack_do.addChild(_s.scrTrackBottom_do);
			_s.scrHandler_do.addChild(_s.scrHandlerTop_do);
			_s.scrHandler_do.addChild(_s.scrHandlerMiddle_do);
			_s.scrHandler_do.addChild(_s.scrHandlerBottom_do);
			_s.scrHandlerLines_do.addChild(_s.scrHandlerLinesN_do);
			_s.scrHandlerLines_do.addChild(_s.scrHandlerLinesS_do);
			_s.scrMainHolder_do.addChild(_s.scrTrack_do);
			_s.scrMainHolder_do.addChild(_s.scrHandler_do);
			_s.scrMainHolder_do.addChild(_s.scrHandlerLines_do);
			_s.mainButtonsHolder_do.addChild(_s.scrMainHolder_do);
			
			_s.scrHandler_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandler_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandler_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			_s.scrHandlerLines_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandlerLines_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandlerLines_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			
		};
		
		
		_s.scrollBarHandlerOnMouseOver = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl) return; 
			FWDAnimation.killTweensOf(_s.scrHandlerLinesN_do);
			FWDAnimation.killTweensOf(_s.scrHandlerLinesS_do);
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseOut = function(e){
			if(_s.isDragging_bl || !_s.allowToScrollAndScrollBarIsActive_bl) return;
			FWDAnimation.killTweensOf(_s.scrHandlerLinesN_do);
			FWDAnimation.killTweensOf(_s.scrHandlerLinesS_do);
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseDown = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl) return;
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			_s.yPositionOnPress = _s.scrHandler_do.y;
			_s.lastPresedY = vc.screenY;
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			prt.showDisable();
			
			if(window.addEventListener){
				window.addEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.addEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.attachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
		};
		
		_s.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var linesY = _s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2);
	
			_s.scrollBarHandlerFinalY = Math.round(_s.yPositionOnPress + vc.screenY - _s.lastPresedY);
			if(_s.scrollBarHandlerFinalY >= _s.scrTrack_do.h - _s.scrHandler_do.h){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h -  _s.scrHandler_do.h;
			}else if(_s.scrollBarHandlerFinalY <= 0){
				_s.scrollBarHandlerFinalY = 0;
			}
			
			_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:linesY, ease:Quart.easeOut});
			_s.updateScrollBarHandlerAndContent(true);
		};
		
		_s.scrollBarHandlerEndHandler = function(e){
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			_s.isDragging_bl = false;
			
			if(!FWDRAPUtils.hitTest(_s.scrHandler_do.screen, vc.screenX, vc.screenY)){
				FWDAnimation.killTweensOf(_s.scrHandlerLinesN_do);
				FWDAnimation.killTweensOf(_s.scrHandlerLinesS_do);
				FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
				FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
			}
			
			prt.hideDisable();
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandler_do, .4, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
		};
		
		_s.updateScrollBarSizeActiveAndDeactivate = function(){
			if(_s.disableForAWhileAfterThumbClick_bl) return;
		
			if(_s.allowToScrollAndScrollBarIsActive_bl){
				_s.allowToScrollAndScrollBarIsActive_bl = true;
				_s.scrMainHolder_do.setX(_s.sW - _s.scrMainHolder_do.w);
				_s.scrMainHolder_do.setHeight(_s.mainButtonsHolder_do.h);
				_s.scrTrack_do.setHeight(_s.scrMainHolder_do.h);
				_s.scrTrackMiddle_do.setHeight(_s.scrTrack_do.h - (_s.scrTrackTop_do.h * 2));
				_s.scrTrackBottom_do.setY(_s.scrTrackMiddle_do.y + _s.scrTrackMiddle_do.h);
				_s.scrMainHolder_do.setAlpha(1);
				_s.scrHandler_do.setButtonMode(true);
				_s.scrHandlerLines_do.setButtonMode(true);
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = false;
				_s.scrMainHolder_do.setX(_s.sW - _s.scrMainHolder_do.w);
				_s.scrMainHolder_do.setHeight(_s.mainButtonsHolder_do.h);
				_s.scrTrack_do.setHeight(_s.scrMainHolder_do.h);
				_s.scrTrackMiddle_do.setHeight(_s.scrTrack_do.h - (_s.scrTrackTop_do.h * 2));
				_s.scrTrackBottom_do.setY(_s.scrTrackMiddle_do.y + _s.scrTrackMiddle_do.h);
				_s.scrMainHolder_do.setAlpha(.5);
				_s.scrHandler_do.setY(0);
				_s.scrHandler_do.setButtonMode(false);
				_s.scrHandlerLines_do.setButtonMode(false);
			}
			
			_s.scrHandler_do.setHeight(Math.max(30, Math.round(Math.min(1,(_s.scrMainHolder_do.h/_s.totalButtonsHeight)) * _s.scrMainHolder_do.h)));
			_s.scrHandlerMiddle_do.setHeight(_s.scrHandler_do.h - (_s.scrHandlerTop_do.h * 2));
			FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
			_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2));
			_s.scrHandlerBottom_do.setY(_s.scrHandler_do.h - _s.scrHandlerBottom_do.h - 1);
		};
		

		//###########################################//
		/* Add mousewheel support */
		//###########################################//
		_s.addMouseWheelSupport = function(){
			if(_s.screen.addEventListener){
				_s.screen.addEventListener('DOMMouseScroll', _s.mouseWheelHandler);
				_s.screen.addEventListener ("mousewheel", _s.mouseWheelHandler);
			}else if(_s.screen.attachEvent){
				_s.screen.attachEvent('onmousewheel', _s.mouseWheelHandler);
			}
		};
		
		_s.mouseWheelHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			
			if(_s.disableMouseWheel_bl || _s.isDragging_bl) return false;
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(dir > 0){
				_s.scrollBarHandlerFinalY += Math.round((160 * _s.scollbarSpeedSensitivity)  * (_s.mainButtonsHolder_do.h/_s.totalButtonsHeight));
			}else if(dir < 0){
				_s.scrollBarHandlerFinalY -= Math.round((160 * _s.scollbarSpeedSensitivity)  * (_s.mainButtonsHolder_do.h/_s.totalButtonsHeight));
			}
		
			if(_s.scrollBarHandlerFinalY >= _s.scrTrack_do.h - _s.scrHandler_do.h){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h -  _s.scrHandler_do.h;
			}else if(_s.scrollBarHandlerFinalY <= 0){
				_s.scrollBarHandlerFinalY = 0;
			}
			
			var linesY = _s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2);
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:linesY, ease:Quart.easeOut});
			FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
			_s.isDragging_bl = true;
			_s.updateScrollBarHandlerAndContent(true);
			_s.isDragging_bl = false;
		
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		_s.updateScrollBarHandlerAndContent = function(animate, overwrite){
			
			if(_s.disableForAWhileAfterThumbClick_bl) return;
			if(!_s.allowToScrollAndScrollBarIsActive_bl && !overwrite) return;
			var percentScrolled = 0;
			var thumb;
			
			if(_s.isDragging_bl && !_s.isMbl){
				percentScrolled = (_s.scrollBarHandlerFinalY/(_s.scrMainHolder_do.h - _s.scrHandler_do.h));
				if(percentScrolled == "Infinity"){
					percentScrolled = 0;
				}else if(percentScrolled >= 1){
					percentScrolled = 1;
				}
				_s.thumbnailsFinalY = Math.round(percentScrolled * (_s.totalButtonsHeight - _s.mainButtonsHolder_do.h)) * -1;
			}else{
			
				percentScrolled = _s.curId/(_s.totalButtons - 1);
				_s.thumbnailsFinalY = Math.min(0, Math.round(percentScrolled * (_s.totalButtonsHeight - _s.mainButtonsHolder_do.h)) * -1);
				
				if(_s.scrMainHolder_do){
					_s.scrollBarHandlerFinalY = Math.round((_s.scrMainHolder_do.h - _s.scrHandler_do.h) * percentScrolled);
					
					if(_s.scrollBarHandlerFinalY < 0){
						_s.scrollBarHandlerFinalY = 0;
					}else if(_s.scrollBarHandlerFinalY > _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1){
						_s.scrollBarHandlerFinalY = _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1;
					}
					
					FWDAnimation.killTweensOf(_s.scrHandler_do);
					FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
					if(animate){
						FWDAnimation.to(_s.scrHandler_do, .4, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
						FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2), ease:Quart.easeOut});
					}else{
						_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
						_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2));
					}
				}
			}
			
			if(_s.lastThumbnailFinalY != _s.thumbnailsFinalY){
				FWDAnimation.killTweensOf(_s.buttonsHolder_do);
				if(animate){
					FWDAnimation.to(_s.buttonsHolder_do, .5, {y:_s.thumbnailsFinalY, ease:Quart.easeOut});
				}else{
					_s.buttonsHolder_do.setY(_s.thumbnailsFinalY);
				}
			}
			
			_s.lastThumbnailFinalY = _s.thumbnailsFinalY;
		};
		
	
		_s.init();
	};
	
	/* set prototype */
	FWDRAPComboBox.setPrototype =  function(){
		FWDRAPComboBox.prototype = new FWDRAPDisplayObject("div");
	};

	FWDRAPComboBox.OPEN = "open";
	FWDRAPComboBox.HIDE_COMPLETE = "infoWindowHideComplete";
	FWDRAPComboBox.BUTTON_PRESSED = "buttonPressed";

	FWDRAPComboBox.prototype = null;
	window.FWDRAPComboBox = FWDRAPComboBox;
	
}(window));/**
 * Royal Audio Player
 * Playlist select box button.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
var FWDRAPComboBoxButton = function(
			prt,
			label1, 
			bk1_str,
			bk2_str,
			backgroundNormalColor,
			backgroundSelectedColor,
			textNormalColor,
			textSelectedColor,
			id,
			totalHeight
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPComboBoxButton.prototype;
		
		_s.label1_str = label1;
		_s.backgroundNormalColor_str = backgroundNormalColor;
		_s.backgroundSelectedColor_str = backgroundSelectedColor;
		_s.nBC = textNormalColor;
		_s.sBC = textSelectedColor;
		_s.bk1_str = bk1_str;
		_s.bk2_str = bk2_str;
		
		_s.totalWidth = 400;
		_s.totalHeight = totalHeight;
		_s.id = id;

		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isMbl = FWDRAPUtils.isMobile;

	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setBackfaceVisibility();
			_s.setButtonMode(true);
			_s.setupMainContainers();
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.totalHeight);
			_s.setNormalState();
		};
		

		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){

			_s.text_sdo = new FWDRAPDisplayObject("div");
			_s.text_sdo.getStyle().whiteSpace = "nowrap";
			_s.text_sdo.setBackfaceVisibility();
			_s.text_sdo.setOverflow("visible");
			_s.text_sdo.setDisplay("inline-block");
			_s.text_sdo.getStyle().fontFamily = "Arial";
			_s.text_sdo.getStyle().fontSize= "13px";
			_s.text_sdo.getStyle().padding = "6px";
			_s.text_sdo.getStyle().fontWeight = "100";
			_s.text_sdo.getStyle().color = _s.normalColor_str;
			_s.text_sdo.getStyle().fontSmoothing = "antialiased";
			_s.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			_s.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			
			_s.bk_sdo = new FWDRAPDisplayObject("div");
			_s.bk_sdo.setBkColor(_s.backgroundNormalColor_str);
			
			if(_s.id % 2 == 0){
				_s.bk_sdo.getStyle().background = "url('" + _s.bk1_str + "')";
				_s.bk_sdo.screen.className = 'fwdrap-playlist-item-background-even';
				_s.text_sdo.screen.className = 'fwdrap-playlist-selector-item-text fwdrap-even';
			}else{
				_s.bk_sdo.getStyle().background = "url('" + _s.bk2_str + "')";
				_s.bk_sdo.screen.className = 'fwdrap-playlist-item-background-odd';
				_s.text_sdo.screen.className = 'fwdrap-playlist-selector-item-text fwdrap-odd';
				_s.type = 2;
			}
		
			_s.addChild(_s.bk_sdo);
			
		
			if (FWDRAPUtils.isIEAndLessThen9){
				_s.text_sdo.screen.innerText = _s.label1_str;
			}else{
				_s.text_sdo.setInnerHTML(_s.label1_str);
			}
			
			_s.addChild(_s.text_sdo);
			
			_s.dumy_sdo = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.dumy_sdo.setBkColor("#FF0000");
				_s.dumy_sdo.setAlpha(0);
			};
			_s.addChild(_s.dumy_sdo);
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screen.addEventListener("MSPointerOver", _s.onMouseOver);
					_s.screen.addEventListener("MSPointerOut", _s.onMouseOut);
					_s.screen.addEventListener("MSPointerDown", _s.onMouseDown);
					_s.screen.addEventListener("MSPointerUp", _s.onClick);
				}else{
					_s.screen.addEventListener("touchend", _s.onMouseDown);
				}
			}else if(_s.screen.addEventListener){
				_s.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.screen.addEventListener("click", _s.onMouseDown);
				_s.screen.addEventListener("click", _s.onClick);
			}
		};
		
		_s.onMouseOver = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setSelectedState(true);
				_s.dispatchEvent(FWDRAPComboBoxButton.MOUSE_OVER);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setNormalState(true);
				_s.dispatchEvent(FWDRAPComboBoxButton.MOUSE_OUT);
			}
		};
		
		_s.onClick = function(e){
			if(_s.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxButton.CLICK);
		};
		
		_s.onMouseDown = function(e){
			if(_s.isDisabled_bl || prt.isScrollingOnMove_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxButton.MOUSE_DOWN, {id:_s.id});
		};


		//###########################################//
		/* set selected / normal state */
		//###########################################//
		_s.setSelectedState = function(animate){
			if(animate){
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.sBC}, ease:Quart.easeOut});
			}else{;
				_s.text_sdo.getStyle().color = _s.sBC;
			}
		};
		
		_s.setNormalState = function(animate){
			if(animate){
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.nBC}, ease:Quart.easeOut});
			}else{
				_s.text_sdo.getStyle().color = _s.nBC;
			}
		};

		
		//##########################################//
		/* center text */
		//##########################################//
		_s.centerText = function(){
			
			_s.dumy_sdo.setWidth(_s.totalWidth);
			_s.dumy_sdo.setHeight(_s.totalHeight);
			_s.bk_sdo.setWidth(_s.totalWidth);
			_s.bk_sdo.setHeight(_s.totalHeight);
			_s.text_sdo.setX(4);
			_s.text_sdo.setY(Math.round((_s.totalHeight - _s.text_sdo.getHeight())/2));
		};
		

		//###############################//
		/* get max text width */
		//###############################//
		_s.getMaxTextWidth = function(){
			return _s.text_sdo.getWidth();
		};

		
		//##############################//
		/* disable / enable */
		//#############################//
		_s.disable = function(){
			_s.isDisabled_bl = true;
			_s.setButtonMode(false);
			_s.setSelectedState(true);
		};
		
		_s.enable = function(){
			_s.isDisabled_bl = false;
			_s.setNormalState(true);
			_s.setButtonMode(true);
		};
		

		_s.init();
	};
	
	/* set prototype */
	FWDRAPComboBoxButton.setPrototype = function(){
		FWDRAPComboBoxButton.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPComboBoxButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDRAPComboBoxButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDRAPComboBoxButton.MOUSE_OVER = "onMouseOver";
	FWDRAPComboBoxButton.MOUSE_OUT = "onMouseOut";
	FWDRAPComboBoxButton.MOUSE_DOWN = "onMouseDown";
	FWDRAPComboBoxButton.CLICK = "onClick";
	
	FWDRAPComboBoxButton.prototype = null;
	window.FWDRAPComboBoxButton = FWDRAPComboBoxButton;
}(window));/**
 * Royal Audio Player
 * Playlist select box selector.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
var FWDRAPComboBoxSelector = function(
			arrowW,
			arrowH,
			arrowN_str,
			arrowS_str,
			label1, 
			backgroundNormalColor,
			backgroundSelectedColor,
			textNormalColor,
			textSelectedColor,
			totalHeight,
			useHEX,
			nBC,
			sBC
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPComboBoxSelector.prototype;

		_s.arrowN_str = arrowN_str;
		_s.arrowS_str = arrowS_str;
		
		_s.label1_str = label1;
		_s.backgroundNormalColor_str = backgroundNormalColor;
		_s.backgroundSelectedColor_str = backgroundSelectedColor;
		_s.textNormalColor_str = textNormalColor;
		_s.textSelectedColor_str = textSelectedColor;
		
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = textSelectedColor;
		
		_s.totalWidth = 400;
		
		_s.totalHeight = totalHeight;
		_s.arrowWidth = arrowW;
		_s.arrowHeight = arrowH;
		
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.isDisabled_bl = false;
		
		
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setBackfaceVisibility();
			_s.setButtonMode(true);
			_s.setupMainContainers();
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.totalHeight);
		};

	
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			
			_s.bk_sdo = new FWDRAPDisplayObject("div");
			_s.bk_sdo.getStyle().backgroundColor = _s.backgroundNormalColor_str;
			_s.bk_sdo.screen.className = 'fwdrap-combobox-selector-background';
			_s.addChild(_s.bk_sdo);
			
			_s.text_sdo = new FWDRAPDisplayObject("div");
			_s.text_sdo.screen.className = 'fwdrap-selector-text';
			_s.text_sdo.getStyle().whiteSpace = "nowrap";
			_s.text_sdo.setBackfaceVisibility();
			_s.text_sdo.setOverflow("visible");
			_s.text_sdo.setDisplay("inline-block");
			_s.text_sdo.getStyle().fontFamily = "Arial";
			_s.text_sdo.getStyle().fontSize= "13px";
			_s.text_sdo.getStyle().fontWeight = "100";
			_s.text_sdo.getStyle().padding = "6px 6px 6px 5px";
			_s.text_sdo.getStyle().color = _s.normalColor_str;
			_s.text_sdo.getStyle().fontSmoothing = "antialiased";
			_s.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			_s.text_sdo.getStyle().textRendering = "optimizeLegibility";
			
			_s.text_sdo.setInnerHTML(_s.label1_str);
			_s.addChild(_s.text_sdo);
			
			_s.arrow_do = new FWDRAPDisplayObject("div");
			_s.arrow_do.setOverflow("visible");
			
			if(_s.useHEX){
				_s.arrowN_img = new Image();
				_s.arrowN_img.src = _s.arrowN_str;
				_s.arrowS_img = new Image();
				_s.arrowS_img.src = _s.arrowS_str;
				_s.arrowN_sdo = new FWDRAPDisplayObject("div");
				_s.arrowS_sdo = new FWDRAPDisplayObject("div");
				
				_s.arrowN_img.onload = function(){
					_s.arrowN_sdo.setWidth(_s.arrowN_img.width);
					_s.arrowN_sdo.setHeight(_s.arrowN_img.height);
					_s.arrowN_cnv = FWDRAPUtils.getCanvasWithModifiedColor(_s.arrowN_img, _s.nBC, true);
					_s.scrubbelinesNImage_img = _s.arrowN_cnv.image;
					_s.arrowN_sdo.getStyle().background = "url('" + _s.scrubbelinesNImage_img.src + "') repeat-y";
				}

				_s.arrowS_img.onload = function(){
					_s.arrowS_sdo.setWidth(_s.arrowS_img.width);
					_s.arrowS_sdo.setHeight(_s.arrowS_img.height);
					_s.arrowS_cnv = FWDRAPUtils.getCanvasWithModifiedColor(_s.arrowS_img, _s.sBC, true);
					_s.scrubbelinesSImage_img = _s.arrowS_cnv.image;
					_s.arrowS_sdo.getStyle().background = "url('" + _s.scrubbelinesSImage_img.src + "') repeat-y";
				}
			}else{
				_s.arrowN_sdo = new FWDRAPDisplayObject("div");
				_s.arrowN_sdo.screen.style.backgroundImage = "url(" + _s.arrowN_str + ")";
				_s.arrowS_sdo = new FWDRAPDisplayObject("div");
				_s.arrowS_sdo.screen.style.backgroundImage = "url(" + _s.arrowS_str + ")";
			}
			
			_s.arrowS_sdo.setAlpha(0);
			_s.arrow_do.addChild(_s.arrowN_sdo);
			_s.arrow_do.addChild(_s.arrowS_sdo);
			_s.addChild(_s.arrow_do);
			
			_s.arrowN_sdo.setWidth(_s.arrowWidth);
			_s.arrowN_sdo.setHeight(_s.arrowHeight);
			_s.arrowS_sdo.setWidth(_s.arrowWidth);
			_s.arrowS_sdo.setHeight(_s.arrowHeight);
			
			_s.dumy_sdo = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.dumy_sdo.setBkColor("#FF0000");
				_s.dumy_sdo.setAlpha(0);
			};
			_s.addChild(_s.dumy_sdo);
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screen.addEventListener("MSPointerOver", _s.onMouseOver);
					_s.screen.addEventListener("MSPointerOut", _s.onMouseOut);
					_s.screen.addEventListener("MSPointerDown", _s.onMouseDown);
					_s.screen.addEventListener("MSPointerUp", _s.onClick);
				}else{
					_s.screen.addEventListener("touchend", _s.onMouseDown);
				}
			}else if(_s.screen.addEventListener){
				_s.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.screen.addEventListener("mousedown", _s.onMouseDown);
				_s.screen.addEventListener("click", _s.onClick);
			}

		};
		
		_s.onMouseOver = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setSelectedState(true, 0);
				_s.dispatchEvent(FWDRAPComboBoxSelector.MOUSE_OVER);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setNormalState(true, true);
				_s.dispatchEvent(FWDRAPComboBoxSelector.MOUSE_OUT);
			}
		};
		
		_s.onClick = function(e){
			if(_s.isDeveleper_bl){
				window.open("http://www.webdesign-flash.ro", "_blank");
				return;
			}
			if(_s.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxSelector.CLICK);
		};
		
		_s.onMouseDown = function(e){
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxSelector.MOUSE_DOWN, {e:e});
		};
		

		//###########################################//
		/* set selected / normal state */
		//###########################################//
		_s.setSelectedState = function(animate, dl){
			
			FWDAnimation.killTweensOf(_s.bk_sdo);
			FWDAnimation.killTweensOf(_s.text_sdo);
			FWDAnimation.killTweensOf(_s.arrowS_sdo);
			if(animate){
				FWDAnimation.to(_s.bk_sdo, .6, {alpha:1, ease:Expo.easeOut});	
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.textSelectedColor_str}, ease:Expo.easeOut});
				FWDAnimation.to(_s.arrowS_sdo, .6, {alpha:1, ease:Expo.easeOut});
			}else{
				_s.bk_sdo.setAlpha(1);
				_s.text_sdo.getStyle().color = _s.textSelectedColor_str;
				_s.arrowS_sdo.alpha = 1;
			}
		};
		
		_s.setNormalState = function(animate, removeDelay){
			var dll = .6;
			if(removeDelay) dll = 0;
			dll = 0;
			FWDAnimation.killTweensOf(_s.bk_sdo);
			FWDAnimation.killTweensOf(_s.text_sdo);
			FWDAnimation.killTweensOf(_s.arrowS_sdo);
			if(animate){
				FWDAnimation.to(_s.bk_sdo, .6, {alpha:0, delay:dll, ease:Expo.easeOut});	
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.textNormalColor_str}, delay:dll, ease:Expo.easeOut});
				FWDAnimation.to(_s.arrowS_sdo, .6, {alpha:0, delay:dll, ease:Expo.easeOut});
			}else{
				_s.bk_sdo.setAlpha(0);
				_s.text_sdo.getStyle().color = _s.textNormalColor_str;
				FWDAnimation.to(_s.text_sdo.screen, .01, {css:{color:_s.textNormalColor_str}});
				_s.arrowS_sdo.alpha = 0;
			}
		};
		

		//##########################################//
		/* center text */
		//##########################################//
		_s.centerText = function(){
			_s.dumy_sdo.setWidth(_s.totalWidth);
			_s.dumy_sdo.setHeight(_s.totalHeight);
			_s.bk_sdo.setWidth(_s.totalWidth);
			_s.bk_sdo.setHeight(_s.totalHeight);
			
			_s.text_sdo.setX(6);
			
			_s.text_sdo.setY(Math.round((_s.totalHeight - _s.text_sdo.getHeight())/2) + 1);
			
			_s.arrow_do.setX(_s.totalWidth - _s.arrowWidth - 9);
			_s.arrow_do.setY(Math.round((_s.totalHeight - _s.arrowHeight)/2));
		};

		
		//###############################//
		/* get max text width */
		//###############################//
		_s.getMaxTextWidth = function(){
			return _s.text_sdo.getWidth();
		};
		

		//##############################//
		/* disable / enable */
		//#############################//
		_s.disable = function(){
			_s.isDisabled_bl = true;
			_s.setSelectedState(true);
			if(FWDRAPUtils.hasTransform2d){
				FWDAnimation.to(_s.arrowN_sdo.screen, .8, {css:{rotation:180}, ease:Quart.easeOut});
				FWDAnimation.to(_s.arrowS_sdo.screen, .8, {css:{rotation:180}, ease:Quart.easeOut});
			}
		};
		
		_s.enable = function(){
			
			_s.isDisabled_bl = false;
			_s.setNormalState(true);
			if(FWDRAPUtils.hasTransform2d){
				FWDAnimation.to(_s.arrowN_sdo.screen, .8, {css:{rotation:0}, ease:Quart.easeOut});
				FWDAnimation.to(_s.arrowS_sdo.screen, .8, {css:{rotation:0}, ease:Quart.easeOut});
			}
			_s.setButtonMode(true);
		};
		
		_s.setText = function(text){
			if (FWDRAPUtils.isIEAndLessThen9){
				_s.text_sdo.screen.innerText = text;
			}else{
				_s.text_sdo.setInnerHTML(text);
			}
		};
		
		_s.init();
	};
	
	/* set prototype */
	FWDRAPComboBoxSelector.setPrototype = function(){
		FWDRAPComboBoxSelector.prototype = new FWDRAPDisplayObject ("div");
	};
	
	FWDRAPComboBoxSelector.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDRAPComboBoxSelector.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDRAPComboBoxSelector.MOUSE_OVER = "onMouseOver";
	FWDRAPComboBoxSelector.MOUSE_OUT = "onMouseOut";
	FWDRAPComboBoxSelector.MOUSE_DOWN = "onMouseDown";
	FWDRAPComboBoxSelector.CLICK = "onClick";
	
	FWDRAPComboBoxSelector.prototype = null;
	window.FWDRAPComboBoxSelector = FWDRAPComboBoxSelector;
}(window));/**
 * Royal Audio Player
 * Comple button.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
var FWDRAPComplexButton = function(
			n1Img, 
			s1Path, 
			n2Img, 
			s2Path, 
			disptachMainEvent_bl,
			useHEX,
		    nBC,
		    sBC,
			iconCSSString, 
			icon2CSSString, 
			normalCalssName,
			selectedCalssName
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPComplexButton.prototype;

		_s.iconCSSString = iconCSSString;
		_s.icon2CSSString = icon2CSSString;
		_s.normalCalssName = normalCalssName;
		_s.selectedCalssName = selectedCalssName;
		
		_s.n1Img = n1Img;
		_s.s1Path_str = s1Path;
		_s.n2Img = n2Img;
		_s.s2Path_str = s2Path;
		
		_s.buttonWidth = _s.n1Img.width;
		_s.buttonHeight = _s.n1Img.height;
		
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = sBC;
	
		_s.currentState = 1;
		_s.disptachMainEvent_bl = disptachMainEvent_bl;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.allowToCreateSecondButton_bl = !_s.isMbl || _s.hasPointerEvent_bl;
		_s.useFontAwesome_bl = Boolean(_s.iconCSSString);

		
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.hasTransform2d_bl = false;
			_s.setButtonMode(true);
			_s.setWidth(_s.buttonWidth);
			_s.setHeight(_s.buttonHeight);
			_s.setupMainContainers();
			_s.secondButton_do.setVisible(false);
			_s.setNormalState();
		};
		

		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			
			if(_s.useFontAwesome_bl){
				_s.setOverflow('visible');
				_s.firstButton_do = new FWDRAPDisplayObject("div");
				_s.firstButton_do.setOverflow('visible');
				_s.n1_do = new FWDRAPDisplayObject("div");	
				_s.n1_do.setBac
				_s.n1_do.setInnerHTML(_s.iconCSSString);
				_s.firstButton_do.addChild(_s.n1_do);
				
				//Second button
				_s.secondButton_do = new FWDRAPDisplayObject("div");
				_s.secondButton_do.setOverflow('visible');
				_s.n2_do = new FWDRAPDisplayObject("div");	
				_s.n2_do.setInnerHTML(_s.icon2CSSString);
				_s.secondButton_do.addChild(_s.n2_do);
				
				_s.setFinalSize();
				
			}else{
				_s.firstButton_do = new FWDRAPDisplayObject("div");
				_s.firstButton_do.setWidth(_s.buttonWidth);
				_s.firstButton_do.setHeight(_s.buttonHeight);
				
				if(_s.useHEX){
					_s.n1_do = new FWDRAPDisplayObject("div");
					_s.n1_do.setWidth(_s.buttonWidth);
					_s.n1_do.setHeight(_s.buttonHeight);
					_s.n1_sdo_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.n1Img, _s.nBC).canvas;
					_s.n1_do.screen.appendChild(_s.n1_sdo_canvas);			
				}else{
					_s.n1_do = new FWDRAPDisplayObject("img");	
					_s.n1_do.setScreen(_s.n1Img);
				}
				_s.firstButton_do.addChild(_s.n1_do);
				
				if(_s.allowToCreateSecondButton_bl){
					
					_s.s1_img = new Image();
					_s.s1_img.src = _s.s1Path_str;
					
					if(_s.useHEX){
						_s.s1_do = new FWDRAPTransformDisplayObject("div");
						_s.s1_do.setWidth(_s.buttonWidth);
						_s.s1_do.setHeight(_s.buttonHeight);
						_s.s1_img.onload = function(){
							_s.s1_do_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.s1_img, _s.sBC).canvas;
							_s.s1_do.screen.appendChild(_s.s1_do_canvas);
						}
						_s.s1_do.setAlpha(0);
					}else{
						_s.s1_do = new FWDRAPDisplayObject("img");
						_s.s1_do.setScreen(_s.s1_img);
						_s.s1_do.setWidth(_s.buttonWidth);
						_s.s1_do.setHeight(_s.buttonHeight);
						_s.s1_do.setAlpha(0);
					}
					_s.firstButton_do.addChild(_s.s1_do);
				}

				//Second button
				_s.secondButton_do = new FWDRAPDisplayObject("div");
				_s.secondButton_do.setWidth(_s.buttonWidth);
				_s.secondButton_do.setHeight(_s.buttonHeight);
				
				if(_s.useHEX){
					_s.n2_do = new FWDRAPDisplayObject("div");
					_s.n2_do.setWidth(_s.buttonWidth);
					_s.n2_do.setHeight(_s.buttonHeight);
					_s.n2_sdo_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.n2Img, _s.nBC).canvas;
					_s.n2_do.screen.appendChild(_s.n2_sdo_canvas);			
				}else{
					_s.n2_do = new FWDRAPDisplayObject("img");	
					_s.n2_do.setScreen(_s.n2Img);
				}
				_s.secondButton_do.addChild(_s.n2_do);
				
				if(_s.allowToCreateSecondButton_bl){
					
					_s.s2_img = new Image();
					_s.s2_img.src = _s.s2Path_str;
					
					if(_s.useHEX){
						_s.s2_do = new FWDRAPTransformDisplayObject("div");
						_s.s2_do.setWidth(_s.buttonWidth);
						_s.s2_do.setHeight(_s.buttonHeight);
						_s.s2_img.onload = function(){
							_s.s2_do_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.s2_img, _s.sBC).canvas;
							_s.s2_do.screen.appendChild(_s.s2_do_canvas);
						}
						_s.s2_do.setAlpha(0);
					}else{
						_s.s2_do = new FWDRAPDisplayObject("img");
						_s.s2_do.setScreen(_s.s2_img);
						_s.s2_do.setWidth(_s.buttonWidth);
						_s.s2_do.setHeight(_s.buttonHeight);
						_s.s2_do.setAlpha(0);
					}
					_s.secondButton_do.addChild(_s.s2_do);
				}	
			}
			
			_s.addChild(_s.secondButton_do);
			_s.addChild(_s.firstButton_do);
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screen.addEventListener("pointerdown", _s.onMouseUp);
					_s.screen.addEventListener("pointerover", _s.onMouseOver);
					_s.screen.addEventListener("pointerout", _s.onMouseOut);
				}else{
					_s.screen.addEventListener("toustart", _s.onDown);
					_s.screen.addEventListener("touchend", _s.onMouseUp);
				}
			}else if(_s.screen.addEventListener){	
				_s.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.screen.addEventListener("mouseup", _s.onMouseUp);
			}
		};
		
		_s.onMouseOver = function(e, animate){
			_s.dispatchEvent(FWDRAPComplexButton.SHOW_TOOLTIP, {e:e});
			if(_s.isDisabled_bl || _s.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.dispatchEvent(FWDRAPComplexButton.MOUSE_OVER, {e:e});
				_s.setSelectedState(true);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isDisabled_bl || !_s.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				_s.setNormalState(true);
				_s.dispatchEvent(FWDRAPComplexButton.MOUSE_OUT);
			}
		};
		
		_s.onDown = function(e){
			if(e.preventDefault) e.preventDefault();
		};
	
		_s.onMouseUp = function(e){
			if(_s.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			if(!_s.isMbl) _s.onMouseOver(e, false);
			if(_s.disptachMainEvent_bl) _s.dispatchEvent(FWDRAPComplexButton.MOUSE_UP, {e:e});
		};

		// Set final size.
		_s.checkCount = 0;
		_s.setFinalSize = function(){
			
			clearInterval(_s.checkId_int);
			_s.lastWidth = _s.n1_do.screen.firstChild.offsetWidth;
			if(_s.checkCount > 5) return;
			_s.checkCount ++;
				
			_s.checkId_int = setInterval(function(){
				_s.setFinalSize();
			},100);
			
			if(_s.prevWidth == _s.lastWidth || _s.lastWidth == 0) return;
			var maxWidth = Math.max(_s.n1_do.screen.firstChild.offsetWidth, _s.n2_do.screen.firstChild.offsetWidth); 
			var maxHeight = Math.max(_s.n1_do.screen.offsetHeight, _s.n2_do.screen.firstChild.offsetHeight); 
			_s.buttonWidth = maxWidth;
			_s.buttonHeight = maxHeight;
			
			_s.setWidth(maxWidth);
			_s.setHeight(maxHeight);
			_s.firstButton_do.setWidth(_s.w);
			_s.firstButton_do.setHeight(_s.h);
			_s.secondButton_do.setWidth(_s.w);
			_s.secondButton_do.setHeight(_s.h);
			
			_s.n1_do.setX(Math.round((maxWidth - _s.n1_do.getWidth())/2));
			_s.n1_do.setY(Math.round((maxHeight - _s.n1_do.getHeight())/2));
			_s.n2_do.setX(Math.round((maxWidth - _s.n2_do.getWidth())/2));
			_s.n2_do.setY(Math.round((maxHeight - _s.n2_do.getHeight())/2));
		
			_s.prevWidth = _s.lastWidth;
		}
		

		//##############################//
		/* toggle button */
		//#############################//
		_s.toggleButton = function(){
			if(_s.currentState == 1){
				_s.firstButton_do.setVisible(false);
				_s.secondButton_do.setVisible(true);
				_s.currentState = 0;
				_s.dispatchEvent(FWDRAPComplexButton.FIRST_BUTTON_CLICK);
			}else{
				_s.firstButton_do.setVisible(true);
				_s.secondButton_do.setVisible(false);
				_s.currentState = 1;
				_s.dispatchEvent(FWDRAPComplexButton.SECOND_BUTTON_CLICK);
			}
		};
		

		//##############################//
		/* set second buttons state */
		//##############################//
		_s.setButtonState = function(state){
			if(state == 1){
				_s.firstButton_do.setVisible(true);
				_s.secondButton_do.setVisible(false);
				_s.currentState = 1; 
			}else{
				_s.firstButton_do.setVisible(false);
				_s.secondButton_do.setVisible(true);
				_s.currentState = 0; 
			}
		};
		

		//###############################//
		/* set normal state */
		//################################//
		_s.setNormalState = function(animate){
			if(_s.isMbl && !_s.hasPointerEvent_bl && !_s.useFontAwesome_bl) return;
			_s.isSelectedState_bl = false;
			FWDAnimation.killTweensOf(_s.s1_do);
			FWDAnimation.killTweensOf(_s.s2_do);
				
			if(_s.useFontAwesome_bl){
				FWDAnimation.killTweensOf(_s.n1_do.screen);
				FWDAnimation.killTweensOf(_s.n2_do.screen);
					
				if(animate){
					FWDAnimation.to(_s.n1_do.screen, .8, {className:_s.normalCalssName, ease:Expo.easeOut});	
					FWDAnimation.to(_s.n2_do.screen, .8, {className:_s.normalCalssName, ease:Expo.easeOut});
				}else{
					_s.n1_do.screen.className = _s.normalCalssName;
					_s.n2_do.screen.className = _s.normalCalssName;
				}
			}else{
				FWDAnimation.to(_s.s1_do, .5, {alpha:0, ease:Expo.easeOut});	
				FWDAnimation.to(_s.s2_do, .5, {alpha:0, ease:Expo.easeOut});
			}
		};
		
		_s.setSelectedState = function(animate){
			_s.isSelectedState_bl = true;
			FWDAnimation.killTweensOf(_s.s1_do);
			FWDAnimation.killTweensOf(_s.s2_do);
			
			if(_s.useFontAwesome_bl){
				
					FWDAnimation.killTweensOf(_s.n1_do.screen);
					FWDAnimation.killTweensOf(_s.n2_do.screen);
					if(animate){
						FWDAnimation.to(_s.n1_do.screen, .8, {className:_s.selectedCalssName, ease:Expo.easeOut});	
						FWDAnimation.to(_s.n2_do.screen, .8, {className:_s.selectedCalssName, ease:Expo.easeOut});	
					}else{
						_s.n1_do.screen.className = _s.selectedCalssName;
						_s.n2_do.screen.className = _s.selectedCalssName;
					}
			}else{
				FWDAnimation.to(_s.s1_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
				FWDAnimation.to(_s.s2_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			}
		};
		
		_s.disable = function(){
			if(_s.isDisabled_bl) return;
			_s.isDisabled_bl = true;
			_s.setButtonMode(false);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, .6, {alpha:.4});
			_s.setNormalState();
		};
		
		_s.enable = function(){
			if(!_s.isDisabled_bl) return;
			_s.isDisabled_bl = false;
			_s.setButtonMode(true);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, .6, {alpha:1});
		};

		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			FWDRAPUtils.changeCanvasHEXColor(_s.n1Img, _s.n1_sdo_canvas, nBC);
			FWDRAPUtils.changeCanvasHEXColor(_s.s1_img, _s.s1_do_canvas, sBC);
			FWDRAPUtils.changeCanvasHEXColor(_s.n2Img, _s.n2_sdo_canvas, nBC);
			FWDRAPUtils.changeCanvasHEXColor(_s.s2_img, _s.s2_do_canvas, sBC);
		}
		
		_s.init();
	};
	
	
	/* set prototype */
	FWDRAPComplexButton.setPrototype = function(){
		FWDRAPComplexButton.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPComplexButton.SHOW_TOOLTIP = "showTooltip";
	FWDRAPComplexButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDRAPComplexButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDRAPComplexButton.MOUSE_OVER = "onMouseOver";
	FWDRAPComplexButton.MOUSE_OUT = "onMouseOut";
	FWDRAPComplexButton.MOUSE_UP = "onMouseUp";
	FWDRAPComplexButton.CLICK = "onClick";
	
	FWDRAPComplexButton.prototype = null;
	window.FWDRAPComplexButton = FWDRAPComplexButton;
}(window));/**
 * Royal Audio Player
 * Context menu.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
	var FWDRAPContextMenu = function(e, showMenu){

		'use strict';
		
		var _s = this;
		_s.prt = e;
		_s.url = "http://www.webdesign-flash.ro";
		
		_s.init = function(){
			_s.updateParent(_s.prt);
		};
	
		_s.updateParent = function(prt){
			if(_s.prt){
				if(_s.prt.screen.addEventListener){
					_s.prt.screen.removeEventListener("contextmenu", _s.contextMenuHandler);
				}else{
					_s.prt.screen.detachEvent("oncontextmenu", _s.contextMenuHandler);
				}
				
			}
			_s.prt = prt;
			
			if(_s.prt.screen.addEventListener){
				_s.prt.screen.addEventListener("contextmenu", _s.contextMenuHandler);
			}else{
				_s.prt.screen.attachEvent("oncontextmenu", _s.contextMenuHandler);
			}
		};
		
		_s.contextMenuHandler = function(e){
			if(_s.isDisabled_bl) return;
			if(showMenu =="disabled"){
				if(e.preventDefault){
					e.preventDefault();
					return;
				}else{
					return false;
				}
			}else if(showMenu =="default"){
				return;
			}
			
			if(_s.url.indexOf("sh.r") == -1) return;
			_s.setupMenus();
			_s.prt.addChild(_s.menu_do);
			_s.menu_do.setVisible(true);
			_s.positionButtons(e);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", _s.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.attachEvent("onclick", _s.contextMenuWindowOnMouseDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
			
		};
		
		_s.contextMenuWindowOnMouseDownHandler = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);
			
			var screenX = viewportMouseCoordinates.screenX;
			var screenY = viewportMouseCoordinates.screenY;
			
			if(!FWDRAPUtils.hitTest(_s.menu_do.screen, screenX, screenY)){
				if(window.removeEventListener){
					window.removeEventListener("mousedown", _s.contextMenuWindowOnMouseDownHandler);
				}else{
					document.documentElement.detachEvent("onclick", _s.contextMenuWindowOnMouseDownHandler);
				}
				_s.menu_do.setX(-500);
			}
		};

		
		/* setup menus */
		_s.setupMenus = function(){
			if(_s.menu_do) return;
			_s.menu_do = new FWDRAPDisplayObject("div");
			_s.menu_do.setX(-500);
			_s.menu_do.getStyle().width = "100%";
			
			_s.normalMenu_do = new FWDRAPDisplayObject("div");
			_s.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			_s.normalMenu_do.getStyle().padding = "4px";
			_s.normalMenu_do.getStyle().fontSize = "12px";
			_s.normalMenu_do.getStyle().color = "#000000";
			_s.normalMenu_do.setInnerHTML("&#0169; made by FWD");
			_s.normalMenu_do.setBkColor("#FFFFFF");
			
			_s.selectedMenu_do = new FWDRAPDisplayObject("div");
			_s.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			_s.selectedMenu_do.getStyle().padding = "4px";
			_s.selectedMenu_do.getStyle().fontSize = "12px";
			_s.selectedMenu_do.getStyle().color = "#FFFFFF";
			_s.selectedMenu_do.setInnerHTML("&#0169; made by FWD");
			_s.selectedMenu_do.setBkColor("#000000");
			_s.selectedMenu_do.setAlpha(0);
			
			_s.over_do = new FWDRAPDisplayObject("div");
			_s.over_do.setBkColor("#FF0000");
			_s.over_do.setAlpha(0);
			
			_s.menu_do.addChild(_s.normalMenu_do);
			_s.menu_do.addChild(_s.selectedMenu_do);
			_s.menu_do.addChild(_s.over_do);
			_s.prt.addChild(_s.menu_do);
			_s.over_do.setWidth(_s.selectedMenu_do.getWidth());
			_s.menu_do.setWidth(_s.selectedMenu_do.getWidth());
			_s.over_do.setHeight(_s.selectedMenu_do.getHeight());
			_s.menu_do.setHeight(_s.selectedMenu_do.getHeight());
			_s.menu_do.setVisible(false);
			
			_s.menu_do.setButtonMode(true);
			_s.menu_do.screen.onmouseover = _s.mouseOverHandler;
			_s.menu_do.screen.onmouseout = _s.mouseOutHandler;
			_s.menu_do.screen.onclick = _s.onClickHandler;
		};
		
		_s.mouseOverHandler = function(){
			if(_s.url.indexOf("w.we") == -1) _s.menu_do.visible = false;
			FWDAnimation.to(_s.normalMenu_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(_s.selectedMenu_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		_s.mouseOutHandler = function(){
			FWDAnimation.to(_s.normalMenu_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(_s.selectedMenu_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		_s.onClickHandler = function(){
			window.open(_s.url, "_blank");
		};
		

		/* position buttons */
		_s.positionButtons = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);
		
			var localX = viewportMouseCoordinates.screenX - _s.prt.getGlobalX(); 
			var localY = viewportMouseCoordinates.screenY - _s.prt.getGlobalY();
			var finalX = localX + 2;
			var finalY = localY + 2;
			
			if(finalX > _s.prt.getWidth() - _s.menu_do.getWidth() - 2){
				finalX = localX - _s.menu_do.getWidth() - 2;
			}
			
			if(finalY > _s.prt.getHeight() - _s.menu_do.getHeight() - 2){
				finalY = localY - _s.menu_do.getHeight() - 2;
			}
			_s.menu_do.setX(finalX);
			_s.menu_do.setY(finalY);
		};

		
		//####################################//
		/* Enable or disable */
		//####################################//
		_s.disable = function(){
			_s.isDisabled_bl = true;
		};
		
		_s.enable = function(){
			_s.isDisabled_bl = false;
		}
		
		_s.init();
	};
	
	
	FWDRAPContextMenu.prototype = null;
	window.FWDRAPContextMenu = FWDRAPContextMenu;
	
}(window));/**
 * Royal Audio Player
 * Controller.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(){
var FWDRAPController = function(
			_d,
			prt
		){
		
		'use strict';

		var _s = this;
		_s._d = _d;
		var prototype = FWDRAPController.prototype;
		
		_s.bk_img = _d.bk_img;
		_s.thumbnail_img = _d.thumbnail_img;
		_s.separator1_img = _d.separator1_img;
		_s.separator2_img = _d.separator2_img;
		_s.prevN_img = _d.prevN_img;
		_s.prevS_img = _d.prevS_img;
		_s.playN_img = _d.playN_img;
		_s.playS_img = _d.playS_img;
		_s.pauseN_img = _d.pauseN_img;
		_s.pauseS_img = _d.pauseS_img;
		_s.nextN_img = _d.nextN_img;
		_s.nextS_img = _d.nextS_img;
		_s.mainScrubberBkLeft_img = _d.mainScrubberBkLeft_img;
		_s.mainScrubberBkRight_img = _d.mainScrubberBkRight_img;
		_s.mainScrubberDragLeft_img = _d.mainScrubberDragLeft_img;
		_s.mainScrubberLine_img = _d.mainScrubberLine_img;
		_s.mainScrubberLeftProgress_img = _d.mainScrubberLeftProgress_img;
		_s.volumeScrubberBkLeft_img = _d.volumeScrubberBkLeft_img;
		_s.volumeScrubberBkRight_img = _d.volumeScrubberBkRight_img;
		_s.volumeScrubberDragLeft_img = _d.volumeScrubberDragLeft_img;
		_s.volumeScrubberLine_img = _d.volumeScrubberLine_img;
		_s.volumeN_img = _d.volumeN_img;
		_s.thumb_img = null;
		_s.titleBarLeft_img = _d.titleBarLeft_img;
		_s.titleBarRigth_img = _d.titleBarRigth_img;
		
		_s.categoriesN_img = _d.categoriesN_img;
		_s.replayN_img = _d.replayN_img;
		_s.playlistN_img = _d.playlistN_img;
		_s.shuffleN_img = _d.shuffleN_img;
		_s.downloaderN_img = _d.downloaderN_img;
		_s.shareN_img = _d.shareN_img;
		_s.popupN_img = _d.popupN_img;
		_s.controllerBk_img = _d.controllerBk_img;
		
		_s.titlebarAnimBkPath_img = _d.titlebarAnimBkPath_img;
		_s.titlebarLeftPath_img = _d.titlebarLeftPath_img;
		_s.titlebarRightPath_img = _d.titlebarRightPath_img;
		_s.soundAnimationPath_img = _d.soundAnimationPath_img;
		
		_s.buttons_ar = [];
	
		_s.controllerBkPath_str = _d.controllerBkPath_str;
		_s.thumbnailBkPath_str = _d.thumbnailBkPath_str;
		_s.mainScrubberBkMiddlePath_str = _d.mainScrubberBkMiddlePath_str;
		_s.volumeScrubberBkMiddlePath_str = _d.volumeScrubberBkMiddlePath_str;
		_s.mainScrubberDragMiddlePath_str = _d.mainScrubberDragMiddlePath_str;
		_s.volumeScrubberDragMiddlePath_str = _d.volumeScrubberDragMiddlePath_str;
		_s.timeColor_str = _d.timeColor_str;
		_s.titleColor_str = _d.titleColor_str;
		_s.progressMiddlePath_str = _d.progressMiddlePath_str;
		_s.titlebarBkMiddlePattern_str = _d.titlebarBkMiddlePattern_str;
		_s.toolTipsFntClr = _d.toolTipsFntClr;
		
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.n2BC = _d.n2BC;
		_s.sBC = _d.sBC;
		
		_s.controllerHeight = _d.controllerHeight;
		_s.minLeftWidth = 150;
		_s.thumbWidthAndHeight = _s.controllerHeight;
		_s.sW = 0;
		_s.sH = _s.controllerHeight;
		_s.scrubbersBkLeftAndRightWidth = _s.mainScrubberBkLeft_img.width;
		_s.mainScrubberWidth = 0;
		_s.totalVolumeBarWidth = 100;
		_s.minVolumeBarWidth = 60;
		_s.volumeScrubberWidth = 0;
		_s.spaceBetweenVolumeButtonAndScrubber = _d.spaceBetweenVolumeButtonAndScrubber;

		_s.mainScrubberOffsetTop = _d.mainScrubberOffsetTop;
		_s.spaceBetweenMainScrubberAndTime = _d.spaceBetweenMainScrubberAndTime;
		_s.startTimeSpace = _d.startTimeSpace;
		_s.scrubbersHeight = _s.mainScrubberBkLeft_img.height;
		_s.mainScrubberDragLeftWidth = _s.mainScrubberDragLeft_img.width;
		_s.scrubbersOffsetWidth = _d.scrubbersOffsetWidth;
		_s.scrubbersOffestTotalWidth = _d.scrubbersOffestTotalWidth;
		_s.volumeButtonAndScrubberOffsetTop = _d.volumeButtonAndScrubberOffsetTop;
		_s.volume = _d.volume;
		_s.lastVolume = _s.volume;
		_s.startSpaceBetweenButtons = _d.startSpaceBetweenButtons;
		_s.spaceBetweenButtons = _d.spaceBetweenButtons;
		_s.volumeScrubberOffestWidth = _d.volumeScrubberOffestWidth;
		_s.percentPlayed = 0;
		_s.separatorOffsetOutSpace = _d.separatorOffsetOutSpace;
		_s.separatorOffsetInSpace = _d.separatorOffsetInSpace;
		_s.titlebarHeight = _s.titlebarLeftPath_img.height;
		_s.titleBarOffsetTop = _d.titleBarOffsetTop;
		_s.animTextWidth = 0;
		_s.animationHolderWidth = 0;
		_s.lastTotalTimeLength = 0;
		_s.lastCurTimeLength = 0;
		_s.lastButtonsOffsetTop = _d.lastButtonsOffsetTop;
		_s.allButtonsOffsetTopAndBottom = _d.allButtonsOffsetTopAndBottom;
		_s.timeHeight = 0;
		_s.totalButtonsWidth = 0;
		_s.largerButtonHeight = 0;
		_s.scrubberOffsetBottom = _d.scrubberOffsetBottom;
		_s.equlizerOffsetLeft = _d.equlizerOffsetLeft;
		_s.toolTipsDl = _d.toolTipsDl;
		
		_s.showButtonsToolTips_bl = _d.showButtonsToolTips_bl;
		_s.showPlaylistsButtonAndPlaylists_bl = _d.showPlaylistsButtonAndPlaylists_bl;
		_s.loop_bl = _d.loop_bl;
		_s.shuffle_bl = _d.shuffle_bl;
		_s.allowToChangeVolume_bl = _d.allowToChangeVolume_bl;
		_s.showLoopButton_bl = _d.showLoopButton_bl;
		_s.showShuffleButton_bl = _d.showShuffleButton_bl;
		_s.showPlayListButtonAndPlaylist_bl = _d.showPlayListButtonAndPlaylist_bl;
		_s.showDownloadMp3Button_bl = _d.showDownloadMp3Button_bl;
		_s.showBuyButton_bl = _d.showBuyButton_bl;
		_s.showShareButton_bl = _d.showShareButton_bl;
		_s.showPopupButton_bl = _d.showPopupButton_bl;
		_s.animateOnIntro_bl = _d.animateOnIntro_bl;
		_s.showSoundAnimation_bl = _d.showSoundAnimation_bl;
		_s.showPlaybackRateButton_bl = _d.showPlaybackRateButton_bl;
		_s.showPlayListByDefault_bl = _d.showPlayListByDefault_bl;
		_s.showVideoFullScreenButton_bl = _d.showVideoFullScreenButton_bl;
		_s.showNextAndPrevButtons_bl = _d.showNextAndPrevButtons_bl;
		_s.disableScrubber_bl =  _d.disableScrubber_bl;
		_s.expandControllerBackground_bl = _d.expandControllerBackground_bl;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;


		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){

			_s.videoControllerHolder_do = new FWDRAPDisplayObject("div");
			_s.videoControllerBk_do = new FWDRAPDisplayObject("div");
			_s.videoControllerBk_do.getStyle().background = "url('" + _s.controllerBkPath_str + "')";
			_s.videoControllerBk_do.getStyle().width = "100%";
			_s.videoControllerBk_do.getStyle().height = "100%";
			_s.videoControllerBk_do.screen.className = 'fwdrap-video-controler-background';
			_s.videoControllerHolder_do.addChild(_s.videoControllerBk_do);
			
			_s.mainHolder_do = new FWDRAPDisplayObject("div");
			if(_s.expandControllerBackground_bl){
				_s.mainBk_do = new FWDRAPDisplayObject("img");
				_s.mainBk_do.setScreen(_s.controllerBk_img);
				_s.mainHolder_do.addChild(_s.mainBk_do);
				_s.mainBk_do.setBkColor("#000000");
			}else{
				_s.mainHolder_do.getStyle().background = "url('" + _s.controllerBkPath_str + "')";
			}

			_s.mainHolder_do.screen.className = 'fwdrap-controler';
			
			_s.addChild(_s.mainHolder_do);
			_s.setupVisualizer();
			_s.setupThumb();
			_s.setupPrevButton();	
			_s.setupPlayPauseButton();
			_s.setupNextButton();	
			_s.setupSeparators();
			_s.setupMainScrubber();
			_s.setupTitlebar();
			_s.setupTime();
			_s.setupVolumeScrubber();
			if(_s.showPlaylistsButtonAndPlaylists_bl) _s.setupCategoriesButton();
			if(_s.showPlayListButtonAndPlaylist_bl) _s.setupPlaylistButton();
			if(_s.showLoopButton_bl) _s.setupLoopButton();
			if(_s.showShuffleButton_bl) _s.setupShuffleButton();
			if(_s.showPlaybackRateButton_bl) _s.setupPlaybacRateButton();
			if(_s.showShareButton_bl) _s.setupShareButton();
			if(_s.showDownloadMp3Button_bl) _s.setupDownloadButton();
			if(_s.showBuyButton_bl) _s.setupBuyButton();
			_s.setupAtbButton();
			if(_s.showPopupButton_bl) _s.setupPopupButton();
			if(_s.showButtonsToolTips_bl) _s.setupToolTips();
			if(!_s.isMbl) _s.setupDisable();
			
			_s.mainHolder_do.setY(-500);
			_s.showAnimationIntroId_to = setTimeout(function(){
				_s.mainHolder_do.setY(-_s.sH);
				if(_s.animateOnIntro_bl){
					_s.animateOnIntro(true);
				}else{
					_s.animateOnIntro(false);
				}
			},200);
			
			_s.tmpButtons_ar = _s.buttons_ar.concat();
			
			_s.setTotalButonsW();
			if(_d.useVectorIcons){
				setTimeout(function(){
					_s.setTotalButonsW();
					_s.resizeAndPosition(true);
				}, 500);
			}
		};

		_s.setTotalButonsW = function(){
			var button;
			_s.totalButtonsWidth = 0;
			for(var i=0; i<_s.tmpButtons_ar.length; i++){
				button = _s.tmpButtons_ar[i];
				_s.totalButtonsWidth += button.w;
				if(button.h > _s.largerButtonHeight) _s.largerButtonHeight = button.h;
			}
			if(!_s.showNextAndPrevButtons_bl){
				_s.totalButtonsWidth -= (_s.nextN_img.width - _s.prevN_img.width);
			}
			_s.totalButtonsWidth += _s.volumeButton_do.w;
			_s.totalButtonsWidth +=  _s.startSpaceBetweenButtons * 2;
			if(isNaN(_s.totalButtonsWidth)){
				setTimeout(_s.setTotalButonsW, 100);
			}
		}
		
		_s.goFullScreen = function(){
			_s.mainHolder_do.addChild(_s.videoControllerHolder_do);
			if(_s.playPauseButton_do) _s.videoControllerHolder_do.addChild(_s.playPauseButton_do);
			if(_s.currentTime_do) _s.videoControllerHolder_do.addChild(_s.currentTime_do);
			_s.currentTime_do.setY(0)
			if(_s.totalTime_do) _s.videoControllerHolder_do.addChild(_s.totalTime_do);
			if(_s.mainScrubber_do) _s.videoControllerHolder_do.addChild(_s.mainScrubber_do);
			if(_s.volumeButton_do) _s.videoControllerHolder_do.addChild(_s.volumeButton_do);
			if(_s.volumeScrubber_do) _s.videoControllerHolder_do.addChild(_s.volumeScrubber_do);
			_s.isFullScreen_bl = true;
		}
		
		_s.goNormalScreen = function(){
			_s.videoControllerHolder_do.setWidth(1);
			if(_s.ttm){
				_s.ttm.setX(0);
				_s.ttm2.setX(0);
			}
		
			_s.isFullScreen_bl = false;
			_s.mainHolder_do.removeChild(_s.videoControllerHolder_do);
			if(_s.volumeButton_do){
				_s.volumeButton_do.setX(0);
				_s.volumeButton_do.setY(0);
				_s.mainVolumeHolder_do.addChild(_s.volumeButton_do);
				_s.mainVolumeHolder_do.addChild(_s.volumeScrubber_do);
			}
			
			if(_s.volumeScrubber_do){
				 _s.mainHolder_do.addChild(_s.mainScrubber_do);
				_s.volumeScrubber_do.setY(parseInt((_s.volumeButton_do.h - _s.scrubbersHeight)/2));
			}
			
			if(_s.playPauseButton_do) _s.mainHolder_do.addChild(_s.playPauseButton_do);
			if(_s.currentTime_do) _s.mainHolder_do.addChild(_s.currentTime_do);
			if(_s.totalTime_do) _s.mainHolder_do.addChild(_s.totalTime_do);
		}
		

		//###########################################//
		// Resize and position _s...
		//###########################################//
		_s.resizeAndPosition = function(overwrite){
			
			if(prt.sW == _s.sW && prt.sH == _s.sH && !overwrite) return;
			
			if(prt.isFullScreen_bl){
				var ws = FWDRAPUtils.getViewportSize();
				_s.controllerHeight = _s.playPauseButton_do.h + 20;
				_s.sW = ws.w;
				_s.sH = ws.h;
			}else{
				_s.controllerHeight = _d.controllerHeight;
				_s.sH = _s.controllerHeight;
				_s.sW = prt.sW;
			}
			
			_s.positionButtons();
			_s.resizeVisualizer();
		};
		

		//#################################//
		/* animate on intro */
		//#################################//
		_s.animateOnIntro = function(animate){
			if(animate){
				FWDAnimation.to(_s.mainHolder_do, .8, {y:0, ease:Expo.easeInOut, onComplete:function(){_s.setOverflow('visible');}});
			}else{
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				_s.mainHolder_do.setY(0);
				_s.setOverflow('visible');
			}
		};
		
		_s.hideVideoContoller = function(){
			FWDAnimation.killTweensOf(_s.videoControllerHolder_do);
			FWDAnimation.to(_s.videoControllerHolder_do, .8, {y:_s.sH, ease:Expo.easeInOut});
		}
		
		_s.showVideoContoller = function(){
			FWDAnimation.killTweensOf(_s.videoControllerHolder_do);
			FWDAnimation.to(_s.videoControllerHolder_do, .8, {y:_s.sH - _s.controllerHeight, ease:Expo.easeInOut});
		}

		
		//##############################//
		/* setup background */
		//##############################//
		_s.positionButtons = function(){
			
			var button;
			var prevItem;
			var leftWidth = 0;
			var minimizedSpaceBetweenButtons = 0;
			var totalButtons = _s.buttons_ar.length;
			
			if(prt.fullScreenButton_do){
				if(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do) != -1){
					_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do), 1);	
				}
				if(!_s.mainHolder_do.contains(_s.fullScreenButton_do)){
					if(prt.audioType_str == FWDRAP.VIDEO || prt.audioType_str == FWDRAP.YOUTUBE){
						prt.fullScreenButton_do.setX(parseInt((_s.controllerHeight - prt.fullScreenButton_do.w)/2) + 1);
						prt.fullScreenButton_do.setY(parseInt((_s.controllerHeight - prt.fullScreenButton_do.h)/2) + 1);
						if(!prt.isFullScreen_bl) prt.fullScreenButton_do.setAlpha(0);
					}else{
						prt.fullScreenButton_do.setX(-500);
					}
				}
			}
			
			if(prt.isFullScreen_bl){
				leftWidth = _s.sW;
				if(_s.sW < 500){
					_s.volumeScrubberWidth = 50;
					_s.showVolumeScrubber_bl = false;
				}else{
					_s.volumeScrubberWidth = 150;
					_s.showVolumeScrubber_bl = true;
				}
				
				var tempButtons_ar = [];
				tempButtons_ar.push(_s.playPauseButton_do);
				tempButtons_ar.push(_s.currentTime_do);
				tempButtons_ar.push(_s.mainScrubber_do);
				tempButtons_ar.push(_s.totalTime_do);
				tempButtons_ar.push(_s.volumeButton_do);
				if(_s.showVolumeScrubber_bl){
					tempButtons_ar.push(_s.volumeScrubber_do);
				}else{
					_s.volumeScrubber_do.setX(-1000);
				}
				tempButtons_ar.push(prt.fullScreenButton_do);
				totalButtons = tempButtons_ar.length;
				
				FWDAnimation.killTweensOf(_s.videoControllerHolder_do);
				_s.videoControllerHolder_do.setWidth(_s.sW);
				_s.videoControllerHolder_do.setHeight(_s.controllerHeight);
				_s.videoControllerHolder_do.setY(_s.sH - _s.controllerHeight);
				leftWidth -= _s.playPauseButton_do.w + _s.currentTime_do.w + _s.totalTime_do.w + _s.volumeButton_do.w + _s.volumeScrubberWidth + prt.fullScreenButton_do.w;
			
				leftWidth -= _s.spaceBetweenButtons * 8;
				if(!_s.showVolumeScrubber_bl){
					leftWidth += _s.volumeScrubberWidth;
					leftWidth += _s.spaceBetweenButtons;
				}
				_s.mainScrubberWidth = leftWidth;
				
				if(_s.mainScrubberWidth > 0 )_s.mainScrubber_do.setWidth(_s.mainScrubberWidth);
				_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.progressMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.updateMainScrubber(_s.percentPlayed);
					
				_s.volumeScrubber_do.setWidth(_s.volumeScrubberWidth);
				_s.volumeScrubberBkMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.volumeScrubberDragMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.updateVolume(_s.volume);
				
				for(var i=0; i<totalButtons; i++){
					button = tempButtons_ar[i];
					
					if(i == 0){
						prevItem = _s.playPauseButton_do;
						button.setX(_s.spaceBetweenButtons - 2);
						button.setY(parseInt((_s.controllerHeight - button.h)/2));
					}else{
						prevItem = tempButtons_ar[i -1];
						if(button == _s.mainScrubber_do){
							button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						}else{
							button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						}
						button.setY(parseInt((_s.controllerHeight - button.h)/2));
					}
				}
				return;
			}

			if(_d.playlist_ar[prt.id]){
				if(_d.playlist_ar[prt.id]['atb']){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.atbButton_do) == -1){
						if(_s.popupButton_do){
							_s.buttons_ar.splice(_s.buttons_ar.length - 1,0, _s.atbButton_do);
						}else{
							_s.buttons_ar.splice(_s.buttons_ar.length, 0, _s.atbButton_do);
						}
						_s.atbButton_do.setVisible(true);
					}
				}else{
					var atobButtonIndex = FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.atbButton_do);
					if(atobButtonIndex != -1){
						_s.buttons_ar.splice(atobButtonIndex, 1);
						_s.atbButton_do.setVisible(false);
					}
				}
			}
			
			if(_s.showBuyButton_bl && _d.playlist_ar[prt.id]){
				if(_d.playlist_ar[prt.id].buy && prt.isPlaylistLoaded_bl){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do) == -1){
						if(_s.showShareButton_bl && _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 2,0, _s.buyButton_do);
						}else if(_s.showShareButton_bl || _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 1,0, _s.buyButton_do);
						}else{
							_s.buttons_ar.splice(_s.buttons_ar.length,0, _s.buyButton_do);
						}
						_s.buyButton_do.setVisible(true);
					}
				}else{
					var buyButtonIndex = FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do);
					if(buyButtonIndex != -1){
						_s.buttons_ar.splice(buyButtonIndex, 1);
						_s.buyButton_do.setVisible(false);
					}
				}
			};
			
			if(_s.showDownloadMp3Button_bl && _d.playlist_ar[prt.id]){
				if(_d.playlist_ar[prt.id].downloadable && prt.isPlaylistLoaded_bl){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.downloadButton_do) == -1){
						if(_s.showBuyButton_bl && _d.playlist_ar[prt.id].buy){
							_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do),0, _s.downloadButton_do);
						}else if(_s.showShareButton_bl && _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 2,0, _s.downloadButton_do);
						}else if(_s.showShareButton_bl || _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 1,0, _s.downloadButton_do);
						}else{
							_s.buttons_ar.splice(_s.buttons_ar.length,0, _s.downloadButton_do);
						}
						
						_s.downloadButton_do.setVisible(true);
					}
				}else{
					var downloadButtonIndex = FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.downloadButton_do);
					if(downloadButtonIndex != -1){
						_s.buttons_ar.splice(downloadButtonIndex,1);
						_s.downloadButton_do.setVisible(false);
					}
				}
			};
			
			if(!_s.showNextAndPrevButtons_bl){
				if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.prevButton_do) == -1){
					_s.buttons_ar.splice(0, 0, _s.prevButton_do);
				}
				
				if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.nextButton_do) == -1){
					_s.buttons_ar.splice(2, 0, _s.nextButton_do);
				}
			}
			
			totalButtons = _s.buttons_ar.length;
			
			if(!_d.playlist_ar){
				_s.showThumbnail_bl = true;
			}else{
				if(_d.playlist_ar[prt.id] == undefined){
					_s.showThumbnail_bl = false;
				}else{
					_s.showThumbnail_bl = Boolean(_d.playlist_ar[prt.id].thumbPath);
				}
			}
				
			if(!_d.showThumbnail_bl) _s.showThumbnail_bl = false;
			if((prt.audioType_str == FWDRAP.YOUTUBE && prt.useYoutube_bl) || (prt.audioType_str == FWDRAP.VIDEO)){
				_s.showThumbnail_bl = true;
				prt.videosHolder_do.setX(0);
				if(prt.audioType_str == FWDRAP.YOUTUBE){
					if(prt.ytb_do) prt.ytb_do.setX(0);
					if(prt.videoScreen_do) prt.videoScreen_do.setX(-10000);
				}else if(prt.audioType_str == FWDRAP.VIDEO){
					if(prt.ytb_do) prt.ytb_do.setX(-100000);
					if(prt.videoScreen_do) prt.videoScreen_do.setX(0);
				}

			}else if(!_d.showThumbnail_bl){
				_s.showThumbnail_bl = false;
				if(prt.videosHolder_do) prt.videosHolder_do.setX(-100000);
			}else{
				if(prt.videosHolder_do) prt.videosHolder_do.setX(-100000);
			}
			
			if(_s.showThumbnail_bl){
				leftWidth += _s.thumbWidthAndHeight;
				_s.thumb_do.setX(0);
			}else{
				_s.thumb_do.setX(-300);
			}
			
			for(var i=0; i<totalButtons; i++){
				button = _s.buttons_ar[i];
				leftWidth += button.w + _s.spaceBetweenButtons;
			}
			
			if(totalButtons > 3){
				
				var lastButtonsTotalWidth = 0;
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					if(i > 2){
						if(i == 3){
							lastButtonsTotalWidth += button.w;
						}else{
							lastButtonsTotalWidth += _s.buttons_ar[i].w + _s.spaceBetweenButtons;
						}
					}
				}
				
				if(lastButtonsTotalWidth < _s.minVolumeBarWidth){	
					for(var i=0; i<totalButtons; i++){
						button = _s.buttons_ar[i];
						if(i > 2){
							leftWidth -= button.w + _s.spaceBetweenButtons;
						}
					}
					
					_s.totalVolumeBarWidth = _s.minVolumeBarWidth + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber;
					_s.volumeScrubberWidth = _s.minVolumeBarWidth - _s.startSpaceBetweenButtons + _s.volumeScrubberOffestWidth;
					leftWidth += _s.totalVolumeBarWidth;
					leftWidth += _s.separatorOffsetOutSpace * 2 + _s.separatorOffsetInSpace * 2;
					leftWidth += _s.startSpaceBetweenButtons;
					leftWidth += _s.firstSeparator_do.w + _s.secondSeparator_do.w;
					_s.mainVolumeHolder_do.setY(_s.volumeButtonAndScrubberOffsetTop);
				}else{
					
					leftWidth -= _s.spaceBetweenButtons * 2;
					leftWidth += _s.separatorOffsetOutSpace * 2 + _s.separatorOffsetInSpace * 2;
					leftWidth += _s.startSpaceBetweenButtons * 2;
					leftWidth += _s.firstSeparator_do.w + _s.secondSeparator_do.w;
					
					lastButtonsTotalWidth = 0;
					for(var i=0; i<totalButtons; i++){
						button = _s.buttons_ar[i];
						if(i > 2){
							if(i == 3){
								lastButtonsTotalWidth += button.w;
							}else{
								lastButtonsTotalWidth += _s.buttons_ar[i].w + _s.spaceBetweenButtons;
							}
						}
					}
					lastButtonsTotalWidth -= 7;
					_s.totalVolumeBarWidth = lastButtonsTotalWidth + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber;
					_s.volumeScrubberWidth = lastButtonsTotalWidth - _s.volumeButton_do.w - _s.spaceBetweenVolumeButtonAndScrubber + _s.volumeScrubberOffestWidth;
					_s.mainVolumeHolder_do.setY(_s.volumeButtonAndScrubberOffsetTop);
				}
			}else{
				_s.totalVolumeBarWidth = _s.minVolumeBarWidth + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber;
				_s.volumeScrubberWidth = _s.minVolumeBarWidth - _s.startSpaceBetweenButtons + _s.volumeScrubberOffestWidth;
				leftWidth += _s.totalVolumeBarWidth;
				leftWidth += _s.separatorOffsetOutSpace * 2 + _s.separatorOffsetInSpace * 2;
				leftWidth += _s.startSpaceBetweenButtons;
				leftWidth += _s.firstSeparator_do.w + _s.secondSeparator_do.w;
				_s.mainVolumeHolder_do.setY(parseInt((_s.sH - _s.mainVolumeHolder_do.h)/2));
			}
			
			leftWidth = _s.sW - leftWidth;
			
			
			if(leftWidth > _s.minLeftWidth){

				_s.hasThmbOnLeft = true;
				_s.sH = _s.controllerHeight;
				_s.secondSeparator_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace + leftWidth + _s.separatorOffsetInSpace);
				
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					if(i == 0){
						prevItem = _s.thumb_do;
						if(_s.showThumbnail_bl){
							button.setX(prevItem.x + prevItem.w + _s.startSpaceBetweenButtons);
						}else{
							button.setX(_s.startSpaceBetweenButtons);
						}
						button.setY(parseInt((_s.sH - button.h)/2));
					}else if(i == 1){
						prevItem = _s.buttons_ar[i -1];
						button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						button.setY(parseInt((_s.sH - button.h)/2));
					}else if(i == 2){
						prevItem = _s.buttons_ar[i -1];
						button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						_s.firstSeparator_do.setX(button.x + button.w + _s.separatorOffsetOutSpace);
						button.setY(parseInt((_s.sH - button.h)/2));
					}else if(i == 3){
						_s.secondSeparator_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace + leftWidth + _s.separatorOffsetInSpace);
						prevItem = _s.buttons_ar[i -1];
						button.setX(_s.secondSeparator_do.x + _s.secondSeparator_do.w + _s.separatorOffsetOutSpace);
						button.setY(_s.lastButtonsOffsetTop);
					}else{
						prevItem = _s.buttons_ar[i -1];
						button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						button.setY(_s.lastButtonsOffsetTop);
					}
				}
				
				//titlebar
				_s.mainTitlebar_do.setWidth(leftWidth);
				_s.mainTitlebar_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace);
				_s.posTitleGrad();
				_s.titleBarRight_do.setX(_s.mainTitlebar_do.w - _s.titleBarRight_do.w);
				_s.mainTitlebar_do.setY(_s.titleBarOffsetTop);
				if(!_s.totalTime_do.w && FWDRAPUtils.isIEAndLessThen9) return;
				
				//main scrubber and time
				_s.currentTime_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace);
				_s.totalTime_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace + leftWidth - _s.totalTime_do.w);
				_s.currentTime_do.setY(_s.mainScrubberOffsetTop + parseInt((_s.mainScrubber_do.h - _s.currentTime_do.h)/2));
				_s.totalTime_do.setY(_s.mainScrubberOffsetTop + parseInt((_s.mainScrubber_do.h - _s.totalTime_do.h)/2));
				
				_s.mainScrubberWidth = leftWidth + _s.scrubbersOffestTotalWidth - _s.currentTime_do.w - _s.totalTime_do.w - _s.spaceBetweenMainScrubberAndTime * 2;
				_s.mainScrubber_do.setWidth(_s.mainScrubberWidth);
				_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.mainScrubber_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace - parseInt(_s.scrubbersOffestTotalWidth/2)  + _s.currentTime_do.w + _s.spaceBetweenMainScrubberAndTime);
				_s.mainScrubber_do.setY(_s.mainScrubberOffsetTop);
				_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.progressMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.updateMainScrubber(_s.percentPlayed);
				
				//volume
				_s.mainVolumeHolder_do.setX(_s.secondSeparator_do.x + _s.secondSeparator_do.w + _s.separatorOffsetOutSpace);
				_s.mainVolumeHolder_do.setWidth(_s.totalVolumeBarWidth + _s.scrubbersOffestTotalWidth);
				_s.volumeScrubber_do.setX(_s.volumeButton_do.x + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber - parseInt(_s.scrubbersOffestTotalWidth/2));
				_s.volumeScrubber_do.setWidth(_s.volumeScrubberWidth);
				_s.volumeScrubberBkRight_do.setX(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.volumeScrubberBkMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.volumeScrubberDragMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.updateVolume(_s.volume);
				_s.setHeight(_s.controllerHeight);
			}else{

				//thumbnail
				_s.thumb_do.setX(-300);
				_s.hasThmbOnLeft = false;
				if(prt.videosHolder_do) prt.videosHolder_do.setX(-100000);
				
				//separators
				_s.firstSeparator_do.setX(-300);
				_s.secondSeparator_do.setX(-300);
				
				//titlebar
				_s.mainTitlebar_do.setWidth(_s.sW);
				_s.mainTitlebar_do.setX(0);
				_s.mainTitlebar_do.setY(0);
				_s.posTitleGrad();
				_s.titleBarRight_do.setX(_s.mainTitlebar_do.w - _s.titleBarRight_do.w);
				
				//position buttons
				var totalButtonsWidthWithCustoRAPace = 0;
				var leftWidth;
				
				var tempTotalButtonWidth = _s.totalButtonsWidth;

				if(!_s.showNextAndPrevButtons_bl){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.prevButton_do) != -1){
						_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.prevButton_do), 1);
					}
					
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.nextButton_do) != -1){
						_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.nextButton_do), 1);
					}
				}
				
				if(_s.downloadButton_do && FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.downloadButton_do) != -1){
					tempTotalButtonWidth += _s.downloadButton_do.w;
				}
				if(_s.buyButton_do && FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do) != -1){
					tempTotalButtonWidth += _s.buyButton_do.w;
				}
				
				if(_s.showVideoFullScreenButton_bl && (prt.audioType_str == FWDRAP.VIDEO || prt.audioType_str == FWDRAP.YOUTUBE) && prt.fullScreenButton_do){
					
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do) == -1){
						_s.mainHolder_do.addChild(prt.fullScreenButton_do);
						FWDAnimation.killTweensOf(prt.fullScreenButton_do);
						_s.buttons_ar.splice(0,0,prt.fullScreenButton_do);
					}
					tempTotalButtonWidth += prt.fullScreenButton_do.w;
					FWDAnimation.killTweensOf(_s.fullScreenButton_do);
					prt.fullScreenButton_do.setAlpha(1);
				}else{
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do) != -1){
						_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do), 1);
						prt.fullScreenButton_do.setX(-500);
					}
				}
				
				
				totalButtons = _s.buttons_ar.length;
				minimizedSpaceBetweenButtons = parseInt((_s.sW - tempTotalButtonWidth)/(totalButtons));
				
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					totalButtonsWidthWithCustoRAPace += button.w + minimizedSpaceBetweenButtons; 
				}
				
				totalButtonsWidthWithCustoRAPace += _s.volumeButton_do.w;
				leftWidth = parseInt((_s.sW - totalButtonsWidthWithCustoRAPace)/2)  - _s.startSpaceBetweenButtons;
				
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					
					button.setY(_s.titleBarGradLeft_do.h + _s.allButtonsOffsetTopAndBottom + parseInt((_s.largerButtonHeight - button.h)/2));
					
					if(i == 0){
						button.setX(leftWidth + _s.startSpaceBetweenButtons);
					}else{
						prevItem = _s.buttons_ar[i -1];
						button.setX(Math.round(prevItem.x + prevItem.w + minimizedSpaceBetweenButtons));
					}
				}
				
				_s.mainVolumeHolder_do.setX(button.x + button.w + minimizedSpaceBetweenButtons);
				_s.mainVolumeHolder_do.setY(_s.titleBarGradLeft_do.h + _s.allButtonsOffsetTopAndBottom + parseInt((_s.largerButtonHeight - _s.volumeButton_do.h)/2));
				if(!_s.totalTime_do.w && FWDRAPUtils.isIEAndLessThen9) return;

				//main scrubber and time
				_s.currentTime_do.setX(_s.startTimeSpace);
				_s.currentTime_do.setY(_s.playPauseButton_do.y + _s.playPauseButton_do.h + _s.allButtonsOffsetTopAndBottom);
				_s.totalTime_do.setX(_s.sW - _s.startTimeSpace - _s.totalTime_do.w);
				_s.totalTime_do.setY(_s.playPauseButton_do.y + _s.playPauseButton_do.h + _s.allButtonsOffsetTopAndBottom);
				_s.mainScrubber_do.setX(_s.currentTime_do.x +  _s.currentTime_do.w + _s.spaceBetweenMainScrubberAndTime - parseInt(_s.scrubbersOffestTotalWidth/2));
				_s.mainScrubber_do.setY(_s.currentTime_do.y + parseInt((_s.currentTime_do.h - _s.mainScrubber_do.h)/2));
				_s.mainScrubberWidth = _s.sW + _s.scrubbersOffestTotalWidth - _s.currentTime_do.w - _s.totalTime_do.w - _s.spaceBetweenMainScrubberAndTime * 2 - _s.startTimeSpace * 2;
				_s.mainScrubber_do.setWidth(_s.mainScrubberWidth);
				_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.progressMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.updateMainScrubber(_s.percentPlayed);
				
				//volume
				_s.totalVolumeBarWidth = _s.volumeButton_do.w;
				_s.mainVolumeHolder_do.setWidth(_s.totalVolumeBarWidth);
				_s.volumeScrubber_do.setX(200)
				_s.updateVolume(_s.volume);
				
				_s.sH = _s.mainTitlebar_do.h + _s.largerButtonHeight + (_s.allButtonsOffsetTopAndBottom * 2) + _s.mainScrubber_do.h + _s.scrubberOffsetBottom;
			}
		
			_s.startToCheckIfAnimTitle();
			if(_s.mainBk_do){
				_s.mainBk_do.setWidth(_s.sW);
				_s.mainBk_do.setHeight(_s.sH);
			}
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHolder_do.setWidth(_s.sW);
			_s.mainHolder_do.setHeight(_s.sH);
		};


		// Setup visuzlizer.
		_s.setupVisualizer = function(){
			if(FWDRAPUtils.isLocal) return;
			if(_d.useVis){
				FWDRAPVisualizer.setPrototype();
				_s.vis = new FWDRAPVisualizer(
					{'visPrst':_d.visPrst,
					 'visClr':_d.visClr,
					 'visCapClr':_d.visCapClr,
					 'useDumyVisualizeOnIOS':_d.useDumyVisualizeOnIOS});
				prt.main_do.addChild(_s.vis);
			}
		}

		_s.resizeVisualizer = function(){
			if(_s.vis){
				var offset = 0;
				if(FWDRAPUtils.isFirefox || FWDRAPUtils.isIE) offset = 1;
				var sW = _s.sW;
				var sH = 50;
				if(_s.vis.preset == 'bars1'){
					sH = 30;
				}else if(_s.vis.preset == 'bars2'){
					sH = 40;
				}
				var x = 0;
				var y = -sH;
				_s.vis.resize(x, y, sW, sH + offset);
			}
		}

		_s.initVisualizer = function(el){
			if(_s.vis) _s.vis.start(el);
		}

		_s.startVis = function(){
			if(_s.vis) _s.vis.play();
		}

		_s.pauseVis = function(){
			if(_s.vis) _s.vis.pause();
		}


		//###############################//
		/* setup a to b loop button */
		//##############################//
		_s.setupAtbButton = function(){
		
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.atbButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-AB'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.atbButton_do = new FWDRAPSimpleButton(
						_d.atbNPath_img,
						_d.atbSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC
				);
			}
			
			_s.atbButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.atbButtonShowTooltipHandler);
			_s.atbButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.atbButtonMouseUpHandler);
			_s.atbButton_do.setX(-5000);
			_s.atbButton_do.setY(parseInt((_s.sH - _s.atbButton_do.h)/2));
			_s.mainHolder_do.addChild(_s.atbButton_do); 
			
		};
		
		_s.atbButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.atbButton_do, _s.atbButtonToolTip_do, e.e);
		};
		
		_s.atbButtonMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHOW_ATOB);
		};

		_s.disableAtbButton = function(){
			if(_s.atbButton_do){
			
				_s.atbButton_do.disable();
			} 
		};
		
		_s.enableAtbButton = function(){
			if(_s.atbButton_do) _s.atbButton_do.enable();
		};
		

		//################################//
		/* Setup tooltips */
		//################################//		
		_s.setupToolTips = function(){

			FWDRAPToolTip.setPrototype();
			_s.prevButtonToolTip_do = new FWDRAPToolTip(_s.prevButton_do,  _d.toopTipPointerUp_str, "previous track", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.prevButtonToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.playPauseToolTip_do = new FWDRAPToolTip(_s.playPauseButton_do,  _d.toopTipPointerUp_str, "play / pause", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.playPauseToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.nextButtonToolTip_do = new FWDRAPToolTip(_s.nextButton_do,  _d.toopTipPointerUp_str, "next track", _d.toolTipsBkClr, _d.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.nextButtonToolTip_do.screen);
			
			if(_s.showPlaylistsButtonAndPlaylists_bl){
				FWDRAPToolTip.setPrototype();
				_s.playlistsButtonToolTip_do = new FWDRAPToolTip(_s.categoriesButton_do, _d.toopTipPointerUp_str, "show playlists", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.playlistsButtonToolTip_do.screen);
			}
			
			if(_s.showPlayListButtonAndPlaylist_bl){
				FWDRAPToolTip.setPrototype();
				_s.playlistButtonToolTip_do = new FWDRAPToolTip(_s.playlistButton_do, _d.toopTipPointerUp_str, "show / hide playlist", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.playlistButtonToolTip_do.screen);
			}
			
			if(_s.showLoopButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.loopButtonToolTip_do = new FWDRAPToolTip(_s.loopButton_do,  _d.toopTipPointerUp_str, "loop", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.loopButtonToolTip_do.screen);
			}
			
			if(_s.showShuffleButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.shuffleButtonToolTip_do = new FWDRAPToolTip(_s.shuffleButton_do,  _d.toopTipPointerUp_str, "shuffle", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.shuffleButtonToolTip_do.screen);
			}
			
			if(_s.showPlaybackRateButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.playbackRateButtonToolTip_do = new FWDRAPToolTip(_s.playbackRateButton_do,  _d.toopTipPointerUp_str, "playback rate / speed", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.playbackRateButtonToolTip_do.screen);
			}

			FWDRAPToolTip.setPrototype();
			_s.atbButtonToolTip_do = new FWDRAPToolTip(_s.atbButton_do,  _d.toopTipPointerUp_str, "a to b loop", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.atbButtonToolTip_do.screen);
			
			if(_s.showShareButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.shareButtonToolTip_do = new FWDRAPToolTip(_s.shareButton_do,  _d.toopTipPointerUp_str, "share", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.shareButtonToolTip_do.screen);
			}
			
			if(_s.showDownloadMp3Button_bl){
				FWDRAPToolTip.setPrototype();
				_s.downloadButtonToolTip_do = new FWDRAPToolTip(_s.downloadButton_do,  _d.toopTipPointerUp_str, "download track", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.downloadButtonToolTip_do.screen);
			}
			
			if(_s.showBuyButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.buyButtonToolTip_do = new FWDRAPToolTip(_s.buyButton_do,  _d.toopTipPointerUp_str, "buy track", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.buyButtonToolTip_do.screen);
			}
			
			if(_s.showPopupButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.populButtonToolTip_do = new FWDRAPToolTip(_s.popupButton_do,  _d.toopTipPointerUp_str, "popup", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.populButtonToolTip_do.screen);
			}
			
			FWDRAPToolTip.setPrototype();
			_s.volumeButtonToolTip_do = new FWDRAPToolTip(_s.volumeButton_do,  _d.toopTipPointerUp_str, "mute / unmute", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.volumeButtonToolTip_do.screen);
		};
		
		_s.showToolTip = function(button, toolTip, e){
			if(!_s.showButtonsToolTips_bl) return;
			var ws = FWDRAPUtils.getViewportSize();
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			
			var localX = parseInt(button.getGlobalX() + button.w/2 - toolTip.w/2);
			var localY = parseInt(button.getGlobalY() - toolTip.h - 8);
			var offseX = 0;

			if(localX < 0){
				offseX = localX;
				localX = 0;
			}else if(localX + toolTip.w > ws.w){
				offseX = (ws.w - (localX + toolTip.w)) * -1;
				localX = localX + (offseX * -1);
			}
			
			if(localY < 0){
				localY += button.h + toolTip.h + 12;
				toolTip.positionPointer(offseX, true);
			}else{
				toolTip.positionPointer(offseX, false);
			}

			toolTip.setX(localX);
			toolTip.setY(localY);
			toolTip.show();
		};
		

		//################################//
		/* Setup thumb */
		//################################//
		_s.setupThumb = function(){
			_s.thumb_do = new FWDRAPDisplayObject("div");
			_s.thumb_do.screen.className = 'fwdrap-controler-thumbnail';
			_s.thumb_do.getStyle().background = "url('" + _s.thumbnailBkPath_str + "')";
			_s.thumb_do.setWidth(_s.thumbWidthAndHeight);
			_s.thumb_do.setHeight(_s.thumbWidthAndHeight);
			_s.mainHolder_do.addChild(_s.thumb_do);
		};
		
		_s.loadThumb = function(thumbPath){
			_s.positionButtons();
			if(!_d.showThumbnail_bl) return;
		
			if(!thumbPath){
				_s.cleanThumbnails(true);
				_s.thumbPath_str = "none";
				return;
			}
			
			if(_s.thumbPath_str == thumbPath) return;
			
			_s.thumbPath_str = thumbPath;
			
			if(_s.thumb_img){
				_s.thumb_img.onload = null;
				_s.thumb_img.onerror = null;
				_s.thumb_img = null;
			}
			
			if(!_s.thumbPath_str) return;
			_s.thumb_img = new Image();
			_s.thumb_img.onload = _s.thumbImageLoadComplete;
			_s.thumb_img.onerror = _s.thumbImageLoadError;
			_s.thumb_img.src = _s.thumbPath_str;
		};
		
		_s.thumbImageLoadError = function(){
			_s.cleanThumbnails(true);
		};
		
		_s.thumbImageLoadComplete = function(){
			var thumbImage_do = new FWDRAPDisplayObject("img");
			thumbImage_do.setScreen(_s.thumb_img);
			var curW = _s.thumb_img.width;
			var curH = _s.thumb_img.height;
		
			var scaleX = _s.thumbWidthAndHeight/curW;
			var scaleY = _s.thumbWidthAndHeight/curH;
			var totalScale = 0;
			
			if(scaleX >= scaleY){
				totalScale = scaleX;
			}else if(scaleX <= scaleY){
				totalScale = scaleY;
			}
	
			thumbImage_do.setWidth(parseInt((curW * totalScale)));
			thumbImage_do.setHeight(parseInt((curH * totalScale)));
			thumbImage_do.setX(parseInt((_s.thumbWidthAndHeight - thumbImage_do.w)/2));
			thumbImage_do.setY(parseInt((_s.thumbWidthAndHeight - thumbImage_do.h)/2));
			thumbImage_do.setAlpha(0);
			
			for(var i=0; i<_s.thumb_do.getNumChildren(); i++){
				var child = _s.thumb_do.getChildAt(i);
				FWDAnimation.killTweensOf(child);
			}
			
			FWDAnimation.to(thumbImage_do, .8,{alpha:1,
				alpha:1,
				delay:.2,
				ease:Expo.easeOut,
				onComplete:_s.cleanThumbnails
			});
			_s.thumb_do.addChild(thumbImage_do);
		};
		
		
		_s.cleanThumbnails = function(removeAllChildren){
			var child;
			var startIndex = removeAllChildren? 0 : 1;
			while(_s.thumb_do.getNumChildren() > startIndex){
				child = _s.thumb_do.getChildAt(0);
				FWDAnimation.killTweensOf(child);
				_s.thumb_do.removeChild(child);
				child.destroy();
			}
		};

		
		//###############################//
		/* setup disable */
		//##############################//
		_s.setupDisable = function(){
			_s.disable_do = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.disable_do.setBkColor("#FFFFFF");
				_s.disable_do.setAlpha(0);
			}
		};

		
		//##########################################//
		/* Setup prev button */
		//#########################################//
		_s.setupPrevButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.prevButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-FF-left'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.prevButton_do = new FWDRAPSimpleButton(_s.prevN_img, _d.prevSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.nBC,
					_s.sBC);
			}
		
			_s.prevButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.prevButtonShowToolTipHandler);
			_s.prevButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.prevButtonOnMouseUpHandler);
			_s.buttons_ar.push(_s.prevButton_do);
			_s.mainHolder_do.addChild(_s.prevButton_do); 
				
			if(!_s.showNextAndPrevButtons_bl){
				_s.prevButton_do.setWidth(0);
			}
		};
		
		_s.prevButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.prevButton_do, _s.prevButtonToolTip_do, e.e);
		};
		
		_s.prevButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.PLAY_PREV);
		};

		
		//################################################//
		/* Setup play button */
		//################################################//
		_s.setupPlayPauseButton = function(){

			FWDRAPComplexButton.setPrototype();
			if(_d.useVectorIcons){
				_s.playPauseButton_do = new FWDRAPComplexButton(0, 0, 0, 0, true, 0, 0, 0,
					"<span class='fwdrap-icon fwdrap-icon-play'></span>",
					"<span class='fwdrap-icon fwdrap-icon-pause'></span>",
					"fwdrap-main-button-normal-state",
					"fwdrap-main-button-selected-state"
				);
			}else{
				_s.playPauseButton_do = new FWDRAPComplexButton(
						_s.playN_img,
						_d.playSPath_str,
						_s.pauseN_img,
						_d.pauseSPath_str,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
			
			_s.buttons_ar.push(_s.playPauseButton_do);
			_s.playPauseButton_do.addListener(FWDRAPComplexButton.SHOW_TOOLTIP, _s.playButtonShowToolTipHandler);
			_s.playPauseButton_do.addListener(FWDRAPComplexButton.MOUSE_UP, _s.playButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.playPauseButton_do);
		};
		
		
		_s.playButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.playPauseButton_do, _s.playPauseToolTip_do, e.e);
		};
		
		_s.showPlayButton = function(){
			if(!_s.playPauseButton_do) return;
			_s.playPauseButton_do.setButtonState(1);
		};
		
		_s.showPauseButton = function(){
			if(!_s.playPauseButton_do) return;
			_s.playPauseButton_do.setButtonState(0);
		};
		
		_s.playButtonMouseUpHandler = function(){
			if(_s.playPauseButton_do.currentState == 0){
				_s.dispatchEvent(FWDRAPController.PAUSE);
			}else{
				_s.dispatchEvent(FWDRAPController.PLAY);
			}
		};
		

		//##########################################//
		/* Setup next button */
		//#########################################//
		_s.setupNextButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.nextButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-FF-right'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.nextButton_do = new FWDRAPSimpleButton(_s.nextN_img, _d.nextSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.nBC,
					_s.sBC);
			}
			
			_s.nextButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.nextButtonShowToolTipHandler);
			_s.nextButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.nextButtonOnMouseUpHandler);	
			_s.nextButton_do.setY(parseInt((_s.sH - _s.nextButton_do.h)/2));
			_s.buttons_ar.push(_s.nextButton_do);
			_s.mainHolder_do.addChild(_s.nextButton_do); 
			
			if(!_s.showNextAndPrevButtons_bl){
				_s.nextButton_do.setWidth(0);
			}
		};
		
		_s.nextButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.nextButton_do, _s.nextButtonToolTip_do, e.e);
		};
		
		_s.nextButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.PLAY_NEXT);
		};

		
		//##########################################//
		/* Setup separators */
		//#########################################//
		_s.setupSeparators = function(){
			_s.firstSeparator_do = new FWDRAPDisplayObject("img");
			_s.firstSeparator_do.setScreen(_s.separator1_img);
			_s.firstSeparator_do.screen.className = 'fwdrap-controler-separator-1';
			
			_s.secondSeparator_do = new FWDRAPDisplayObject("img");
			_s.secondSeparator_do.setScreen(_s.separator2_img);
			_s.secondSeparator_do.screen.className = 'fwdrap-controler-separator-1';
			
			_s.firstSeparator_do.setX(-10);
			_s.secondSeparator_do.setX(-10);
			_s.firstSeparator_do.setY(parseInt((_s.sH - _s.firstSeparator_do.h)/2));
			_s.secondSeparator_do.setY(parseInt((_s.sH - _s.secondSeparator_do.h)/2));
			
			_s.mainHolder_do.addChild(_s.firstSeparator_do);
			_s.mainHolder_do.addChild(_s.secondSeparator_do);
		};
		

		//################################################//
		/* Setup title bar */
		//###############################################//
		_s.setupTitlebar = function(){
			_s.mainTitlebar_do = new FWDRAPDisplayObject("div");
			_s.mainTitlebar_do.getStyle().background = "url('" + _s.titlebarBkMiddlePattern_str + "')";
			_s.mainTitlebar_do.screen.className = 'fwdrap-titlebar-background-middle';
			_s.mainTitlebar_do.setHeight(_s.titlebarHeight);

			_s.titleBarLeft_do = new FWDRAPDisplayObject("img");
			_s.titleBarLeft_do.setScreen(_s.titleBarLeft_img);
			_s.titleBarLeft_do.screen.className = 'fwdrap-titlebar-background-left';

			_s.titleBarRight_do = new FWDRAPDisplayObject("img");
			var rImg = new Image();
			rImg.src = _d.titleBarRigthPath;
			_s.titleBarRight_do.setScreen(rImg);
			_s.titleBarRight_do.setWidth(_s.titleBarLeft_do.w);
			_s.titleBarRight_do.setHeight(_s.titleBarLeft_do.h);
			_s.titleBarRight_do.screen.className = 'fwdrap-titlebar-background-right';
			
			_s.simpleText_do = new FWDRAPDisplayObject("div");
			_s.simpleText_do.screen.className = 'fwdrap-controler-title';
			_s.simpleText_do.setOverflow("visible");
			_s.simpleText_do.setBackfaceVisibility();
			_s.simpleText_do.getStyle().fontFamily = "Arial";
			_s.simpleText_do.getStyle().fontSize= "12px";
			_s.simpleText_do.getStyle().whiteSpace= "nowrap";
			_s.simpleText_do.getStyle().textAlign = "left";
			_s.simpleText_do.getStyle().color = _s.titleColor_str;
			
			_s.animText1_do = new FWDRAPDisplayObject("div");
			_s.animText1_do.screen.className = 'fwdrap-controler-title';
			_s.animText1_do.setOverflow("visible");
			_s.animText1_do.setBackfaceVisibility();
			_s.animText1_do.getStyle().fontFamily = "Arial";
			_s.animText1_do.getStyle().fontSize= "12px";
			_s.animText1_do.getStyle().whiteSpace= "nowrap";
			_s.animText1_do.getStyle().textAlign = "left";
			_s.animText1_do.getStyle().color = _s.titleColor_str;

			_s.animText2_do = new FWDRAPDisplayObject("div");
			_s.animText2_do.screen.className = 'fwdrap-controler-title';
			_s.animText2_do.setOverflow("visible");
			_s.animText2_do.setBackfaceVisibility();
			_s.animText2_do.getStyle().fontFamily = "Arial";
			_s.animText2_do.getStyle().fontSize= "12px";
			_s.animText2_do.getStyle().whiteSpace= "nowrap";
			_s.animText2_do.getStyle().textAlign = "left";
			_s.animText2_do.getStyle().color = _s.titleColor_str;
			
			_s.titleBarGradLeft_do = new FWDRAPDisplayObject("img");
			_s.titleBarGradLeft_do.setScreen(_s.titlebarLeftPath_img);
			_s.titleBarGradLeft_do.setX(-50);
			
			var titlebarGradRight_img = new Image();
			titlebarGradRight_img.src = _d.titlebarRightPath_str;
			_s.titlebarGradRight_do = new FWDRAPDisplayObject("img");
			_s.titlebarGradRight_do.setScreen(titlebarGradRight_img);
			_s.titlebarGradRight_do.setWidth(_s.titleBarGradLeft_do.w);
			_s.titlebarGradRight_do.setHeight(_s.titleBarGradLeft_do.h);
			_s.titleBarGradLeft_do.screen.className = 'fwdrap-title-bar-grad-left';
			_s.titlebarGradRight_do.screen.className = 'fwdrap-title-bar-grad-right';
			
			_s.simpleText_do.setX(7);
			_s.simpleText_do.setAlpha(0);
			
			_s.positionTitleId_to = setTimeout(positionTitle, 400);
			
			function positionTitle(){
				if(_s == null) return;
				clearTimeout(_s.positionTitleId_to);
				if(_s.simpleText_do.getHeight() == 0){
					_s.positionTitleId_to = setTimeout(positionTitle, 400);
				}else{
					_s.simpleText_do.setY(parseInt((_s.mainTitlebar_do.h - _s.simpleText_do.getHeight())/2) + 1);
					_s.animText1_do.setY(parseInt((_s.mainTitlebar_do.h - _s.simpleText_do.getHeight())/2) + 1);
					_s.animText2_do.setY(parseInt((_s.mainTitlebar_do.h - _s.simpleText_do.getHeight())/2) + 1);	
					FWDAnimation.to(_s.simpleText_do, .5, {alpha:1});
				}
			}
			
			_s.mainTitlebar_do.addChild(_s.titleBarLeft_do);
			_s.mainTitlebar_do.addChild(_s.titleBarRight_do);
			_s.mainTitlebar_do.addChild(_s.simpleText_do);
			_s.mainTitlebar_do.addChild(_s.animText1_do);
			_s.mainTitlebar_do.addChild(_s.animText2_do);
			
			_s.mainTitlebar_do.addChild(_s.titleBarGradLeft_do);
			_s.mainTitlebar_do.addChild(_s.titlebarGradRight_do);
			_s.mainHolder_do.addChild(_s.mainTitlebar_do);
		};
		
		_s.setTitle = function(title){
			_s.simpleText_do.setInnerHTML(title);
			_s.animText1_do.setInnerHTML(title + "***");
			_s.animText2_do.setInnerHTML(title + "***");
			_s.animText1_do.setX(-1000);
			_s.animText2_do.setX(-1000);
			_s.startToCheckIfAnimTitle(true);
		};

		
		//############################################//
		/* Check title animation */
		//############################################//
		_s.startToCheckIfAnimTitle = function(stopCurrentAnimation){
		
			if(stopCurrentAnimation) _s.stopToAnimateText();
			clearTimeout(_s.animateTextId_to);
			clearTimeout(_s.startToAnimateTextId_to);
			_s.animateTextId_to = setTimeout(_s.checkIfAnimTitle, 10);
		};
		
		_s.checkIfAnimTitle = function(){
			_s.posTitleGrad();
		};

		_s.posTitleGrad = function(){
			var leftWidth = _s.mainTitlebar_do.w - 12;
			var tW = _s.simpleText_do.getWidth();
			leftWidth -= _s.animationHolderWidth;
		
			if(tW > leftWidth){
				if(leftWidth < 300){
					_s.titleBarGradLeft_do.setX(-20);
					_s.titlebarGradRight_do.setX(_s.mainTitlebar_do.w - _s.titlebarGradRight_do.w + 20);
				}else{
					_s.titleBarGradLeft_do.setX(0);
					_s.titlebarGradRight_do.setX(_s.mainTitlebar_do.w - _s.titlebarGradRight_do.w);
				}
				_s.titlebarGradRight_do.setY(0);
				if(_s.isTextAnimating_bl) return;
				clearTimeout(_s.startToAnimateTextId_to);
				_s.startToAnimateTextId_to = setTimeout(_s.startToAnimateText, 300);
			}else{
				_s.titleBarGradLeft_do.setX(-500);
				_s.titlebarGradRight_do.setY(-500);
				_s.stopToAnimateText();
			}
		}
		
		_s.startToAnimateText = function(){
			if(_s.isTextAnimating_bl) return;
			
			_s.isTextAnimating_bl = true;
			_s.animTextWidth = _s.animText1_do.getWidth();
			
			_s.simpleText_do.setX(-1000);
			
			_s.animText1_do.setX(_s.animationHolderWidth + 5);
			_s.animText2_do.setX(_s.animationHolderWidth + _s.animTextWidth + 10);
		
			clearInterval(_s.animateTextId_int);
			_s.animateTextId_int = setInterval(_s.animateText, 40);
		};
		
		_s.stopToAnimateText = function(){
			if(!_s.isTextAnimating_bl) return;
			_s.isTextAnimating_bl = false;
			
			_s.simpleText_do.setX(_s.animationHolderWidth + 7);
		
			_s.animText1_do.setX(-1000);
			_s.animText2_do.setX(-1000);
			
			clearInterval(_s.animateTextId_int);
		};
		
		_s.animateText = function(){
			_s.animText1_do.setX(_s.animText1_do.x - 1);
			_s.animText2_do.setX(_s.animText2_do.x - 1);
			
			if(_s.animText1_do.x < - (_s.animTextWidth - _s.animationHolderWidth))  _s.animText1_do.setX(_s.animText2_do.x  +  _s.animTextWidth + 5);
			if(_s.animText2_do.x < - (_s.animTextWidth - _s.animationHolderWidth))  _s.animText2_do.setX(_s.animText1_do.x  +  _s.animTextWidth + 5);
		};
		
	
		//################################################//
		/* Setup main scrubber */
		//################################################//
		_s.setupMainScrubber = function(){
			//setup background bar
			_s.mainScrubber_do = new FWDRAPDisplayObject("div");
			_s.mainScrubber_do.setY(parseInt((_s.sH - _s.scrubbersHeight)/2));
			_s.mainScrubber_do.setHeight(_s.scrubbersHeight);
			
			_s.mainScrubberBkLeft_do = new FWDRAPDisplayObject("img");
			_s.mainScrubberBkLeft_do.setScreen(_s.mainScrubberBkLeft_img);
			_s.mainScrubberBkLeft_do.screen.className = 'fwdrap-scrubber-bk-left';
			
			_s.mainScrubberBkRight_do = new FWDRAPDisplayObject("img");
			_s.mainScrubberBkRight_do.setScreen(_s.mainScrubberBkRight_img);
			_s.mainScrubberBkRight_do.screen.className = 'fwdrap-scrubber-bk-right';
			
			var middleImage = new Image();
			middleImage.src = _s.mainScrubberBkMiddlePath_str;
			
			_s.mainScrubberBkMiddle_do = new FWDRAPDisplayObject("div");	
			_s.mainScrubberBkMiddle_do.getStyle().background = "url('" + _s.mainScrubberBkMiddlePath_str + "')";
			_s.mainScrubberBkMiddle_do.screen.className = 'fwdrap-scrubber-bk-middle';

			_s.mainScrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			_s.mainProgress_do = new FWDRAPDisplayObject("div");
			_s.mainProgress_do.setHeight(_s.scrubbersHeight);
		
			_s.progressLeft_do = new FWDRAPDisplayObject("img");
			_s.progressLeft_do.setScreen(_s.mainScrubberLeftProgress_img);
			
			middleImage = new Image();
			middleImage.src = _s.progressMiddlePath_str;
			
			_s.progressMiddle_do = new FWDRAPDisplayObject("div");	
			_s.progressMiddle_do.screen.className = 'fwdrap-progress-middle';
			_s.progressMiddle_do.getStyle().background = "url('" + _s.progressMiddlePath_str + "')";
			
			_s.progressMiddle_do.setHeight(_s.scrubbersHeight);
			_s.progressMiddle_do.setX(_s.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			_s.mainScrubberDrag_do = new FWDRAPDisplayObject("div");
			_s.mainScrubberDrag_do.setHeight(_s.scrubbersHeight);
		
			if(_s.useHEX){
				_s.mainScrubberDragLeft_do = new FWDRAPDisplayObject("div");
				_s.mainScrubberDragLeft_do.setWidth(_s.mainScrubberDragLeft_img.width);
				_s.mainScrubberDragLeft_do.setHeight(_s.mainScrubberDragLeft_img.height);
				_s.mainScrubberDragLeft_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberDragLeft_img, _s.nBC).canvas;
				_s.mainScrubberDragLeft_do.screen.appendChild(_s.mainScrubberDragLeft_canvas);	
				
			}else{
				_s.mainScrubberDragLeft_do = new FWDRAPDisplayObject("img");
				_s.mainScrubberDragLeft_do.setScreen(_s.mainScrubberDragLeft_img);
			}
			
			_s.mainScrubberMiddleImage = new Image();
			_s.mainScrubberMiddleImage.src = _s.mainScrubberDragMiddlePath_str;
			_s.volumeScrubberDragMiddle_do = new FWDRAPDisplayObject("div");
			
			if(_s.useHEX){
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");
				_s.mainScrubberMiddleImage.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberMiddleImage, _s.nBC, true);
					_s.mainSCrubberMiddleCanvas = testCanvas.canvas;
					_s.mainSCrubberDragMiddleImageBackground = testCanvas.image;
					_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
				}
			}else{
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");	
				_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainScrubberDragMiddlePath_str + "') repeat-x";
			}
			
			_s.mainScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberDragMiddle_do.setX(_s.mainScrubberDragLeftWidth);
			_s.mainScrubberBarLine_do = new FWDRAPDisplayObject("img");
			_s.mainScrubberBarLine_do.setScreen(_s.mainScrubberLine_img);
			_s.mainScrubberBarLine_do.setAlpha(0);
			_s.mainScrubberBarLine_do.hasTransform3d_bl = false;
			_s.mainScrubberBarLine_do.hasTransform2d_bl = false;
			_s.mainScrubberBarLine_do.screen.className = 'fwdrap-scrubber-line';
			
			//add all children
			_s.mainScrubber_do.addChild(_s.mainScrubberBkLeft_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBkMiddle_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBkRight_do);
			_s.mainScrubberDrag_do.addChild(_s.mainScrubberDragLeft_do);
			_s.mainScrubberDrag_do.addChild(_s.mainScrubberDragMiddle_do);
			_s.mainProgress_do.addChild(_s.progressLeft_do);
			_s.mainProgress_do.addChild(_s.progressMiddle_do);
			_s.mainScrubber_do.addChild(_s.mainProgress_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberDrag_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBarLine_do);
			_s.mainHolder_do.addChild(_s.mainScrubber_do);
		
			if(!_s.disableScrubber_bl){
				if(_s.hasPointerEvent_bl){
					_s.mainScrubber_do.screen.addEventListener("pointerover", _s.mainScrubberOnOverHandler);
					_s.mainScrubber_do.screen.addEventListener("pointerout", _s.mainScrubberOnOutHandler);
					_s.mainScrubber_do.screen.addEventListener("pointerdown", _s.mainScrubberOnDownHandler);
				}else if(_s.screen.addEventListener){	
					if(!_s.isMbl){
						_s.mainScrubber_do.screen.addEventListener("mouseover", _s.mainScrubberOnOverHandler);
						_s.mainScrubber_do.screen.addEventListener("mousemove", _s.updateTooltipOnMove);
						_s.mainScrubber_do.screen.addEventListener("mouseout", _s.mainScrubberOnOutHandler);
						_s.mainScrubber_do.screen.addEventListener("mousedown", _s.mainScrubberOnDownHandler);
					}
					_s.mainScrubber_do.screen.addEventListener("touchstart", _s.mainScrubberOnDownHandler);
				}
			}
			
			_s.disableMainScrubber();

			if(_d.showMainScrubberToolTipLabel_bl){
				FWDRAPScrubberTooltip.setPrototype();
				_s.ttm = new FWDRAPScrubberTooltip(_s.mainScrubber_do, _d.scrubbersToolTipLabelBackgroundColor, _d.scrubbersToolTipLabelFontColor, '00:00');
				_s.addChild(_s.ttm);
			}
		};
		
		_s.updateToolTip = function(localX, percentScrubbed){
			if(!_d.showMainScrubberToolTipLabel_bl || isNaN(percentScrubbed)) return;
			_s.ttm.setLabel(FWDRAPUtils.formatTime(Math.round(prt.totalDuration * percentScrubbed)));
			_s.ttm.setX(Math.round(_s.mainScrubber_do.x + localX - _s.ttm.getWidth()/2));
			var y;
			if(_s.isFullScreen_bl){
				y = _s.videoControllerHolder_do.y + _s.mainScrubber_do.y - _s.ttm2.h - 4;
			}else{
				y = _s.mainScrubber_do.y - _s.ttm.h - 4;
			}
			_s.ttm.setY(y);
		}

		_s.updateTooltipOnMove = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;

			_s.updateToolTip(localX, percentScrubbed);
		}

		_s.mainScrubberOnOverHandler =  function(e){
			if(_s.isMainScrubberDisabled_bl) return;
			if(_d.showMainScrubberToolTipLabel_bl && prt.totalDuration != 0) _s.ttm.show();
			if(!_s.isMbl && _s.ttm){
				window.addEventListener('mousemove', _s.mainScrubberWMouseMove);
			}
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
		
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;

			_s.updateToolTip(localX, percentScrubbed);
		};

		_s.mainScrubberWMouseMove = function(e){
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.vcX = wc.screenX;
			_s.vcY = wc.screenY;
			
			if(!FWDRAPUtils.hitTest(_s.mainScrubber_do.screen, _s.vcX, _s.vcY)){
				if(!_s.isMainScrubberScrubbing_bl){
					window.removeEventListener('mousemove', _s.mainScrubberWMouseMove);
					_s.ttm.hide();
				} 
			}
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;
			_s.updateToolTip(localX, percentScrubbed);
		}
		
		_s.mainScrubberOnOutHandler =  function(e){
			if(_s.isMainScrubberDisabled_bl) return;
			if(!_s.isMainScrubberScrubbing_bl){
				if(_s.ttm) _s.ttm.hide();
			}
		};
		
		_s.mainScrubberOnDownHandler =  function(e){
			
			if(_s.isMainScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}	
			var percentScrubbed = localX/_s.mainScrubberWidth;
			var playlistItemPercentScrubb = localX/_s.mainScrubberWidth;
			
			if(_s.disable_do) _s.addChild(_s.disable_do);
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm.show();
			_s.updateMainScrubber(percentScrubbed);
			_s.updateToolTip(localX, percentScrubbed);
		
			_s.dispatchEvent(FWDRAPController.START_TO_SCRUB);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointermove", _s.mainScrubberMoveHandler);
				window.addEventListener("pointerup", _s.mainScrubberEndHandler);
			}else{
				window.addEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.addEventListener("mouseup", _s.mainScrubberEndHandler);		
				window.addEventListener("touchmove", _s.mainScrubberMoveHandler, {passive:false});
				window.addEventListener("touchend", _s.mainScrubberEndHandler);
			}
		};
		
		_s.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.vcX = wc.screenX;
			_s.vcY = wc.screenY;
			if(!FWDRAPUtils.hitTest(_s.mainScrubber_do.screen, _s.vcX, _s.vcY)){
				if(!_s.isMainScrubberScrubbing_bl){
					window.removeEventListener('mousemove', _s.mainScrubberWMouseMove);
					_s.ttm.hide();
				} 
			}

			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/_s.mainScrubberWidth;
			var playlistItemPercentScrubb = localX/_s.mainScrubberWidth;
			
			_s.updateToolTip(localX, percentScrubbed);
			_s.updateMainScrubber(percentScrubbed);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
		};
		
		_s.mainScrubberEndHandler = function(e){
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
		
			_s.isMainScrubberScrubbing_bl = false;
			if(e){
				var wp = FWDRAPUtils.getViewportMouseCoordinates(e);
				if(!FWDRAPUtils.hitTest(_s.mainScrubber_do.screen, wp.screenX, wp.screenY)){
					if(_s.ttm) _s.ttm.hide();
				}
			}
			_s.dispatchEvent(FWDRAPController.STOP_TO_SCRUB);
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointermove", _s.mainScrubberMoveHandler);
				window.removeEventListener("pointerup", _s.mainScrubberEndHandler);
			}else{
				window.removeEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.removeEventListener("mouseup", _s.mainScrubberEndHandler);		
				window.removeEventListener("touchmove", _s.mainScrubberMoveHandler);
				window.removeEventListener("touchend", _s.mainScrubberEndHandler);
			}
		};
		
		_s.disableMainScrubber = function(){
			if(!_s.mainScrubber_do) return;
			_s.isMainScrubberDisabled_bl = true;
			_s.mainScrubber_do.setButtonMode(false);
			_s.updateMainScrubber(0);
			_s.updatePreloaderBar(0);
			_s.mainScrubberEndHandler();
		};
		
		_s.enableMainScrubber = function(){
			if(!_s.mainScrubber_do) return;
			_s.isMainScrubberDisabled_bl = false;
			if(!_s.disableScrubber_bl) _s.mainScrubber_do.setButtonMode(true);
			_s.enableAtbButton();
		};
		
		_s.updateMainScrubber = function(percent){
		
			if(!_s.mainScrubber_do || isNaN(percent)) return;
			var finalWidth = parseInt(percent * _s.mainScrubberWidth); 

			_s.percentPlayed = percent;
			
			if(finalWidth < 1 && _s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 2 && !_s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.mainScrubberBarLine_do, .5, {alpha:1});
			}
			
			_s.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > _s.mainScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.mainScrubberBarLine_do, .8, {x:finalWidth, ease:Expo.easeOut});
		};
		
		_s.updatePreloaderBar = function(percent){
			
			if(!_s.mainProgress_do) return;
			var finalWidth = parseInt(percent * _s.mainScrubberWidth); 
			
			if(percent == 1){
				_s.mainProgress_do.setY(-30);
			}else if(_s.mainProgress_do.y != 0 && percent!= 1){
				_s.mainProgress_do.setY(0);
			}
			if(finalWidth > _s.mainScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			if(finalWidth < 0) finalWidth = 0;
			_s.mainProgress_do.setWidth(finalWidth);
		};

		
		//########################################//
		/* Setup time*/
		//########################################//
		_s.setupTime = function(){
			_s.currentTime_do = new FWDRAPDisplayObject("div");
			_s.currentTime_do.hasTransform3d_bl = false;
			_s.currentTime_do.hasTransform2d_bl = false;
			_s.currentTime_do.screen.className = 'fwdrap-controller-time';
			_s.currentTime_do.getStyle().fontFamily = "Arial";
			_s.currentTime_do.getStyle().fontSize= "12px";
			_s.currentTime_do.getStyle().whiteSpace= "nowrap";
			_s.currentTime_do.getStyle().textAlign = "left";
			_s.currentTime_do.getStyle().color = _s.timeColor_str;
			_s.currentTime_do.getStyle().fontSmoothing = "antialiased";
			_s.currentTime_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.currentTime_do.getStyle().textRendering = "optimizeLegibility";	
			_s.currentTime_do.setInnerHTML("00");
			_s.mainHolder_do.addChild(_s.currentTime_do);
			
			_s.totalTime_do = new FWDRAPDisplayObject("div");
			_s.totalTime_do.hasTransform3d_bl = false;
			_s.totalTime_do.hasTransform2d_bl = false;
			_s.totalTime_do.screen.className = 'fwdrap-controller-time';
			_s.totalTime_do.getStyle().fontFamily = "Arial";
			_s.totalTime_do.getStyle().fontSize= "12px";
			_s.totalTime_do.getStyle().whiteSpace= "nowrap";
			_s.totalTime_do.getStyle().textAlign = "right";
			_s.totalTime_do.getStyle().color = _s.timeColor_str;
			_s.totalTime_do.getStyle().fontSmoothing = "antialiased";
			_s.totalTime_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.totalTime_do.getStyle().textRendering = "optimizeLegibility";	
			_s.mainHolder_do.addChild(_s.totalTime_do);
			
			_s.updateTime();
			setTimeout(function(){
				if(_s == null) return;
				_s.timeHeight = _s.currentTime_do.getHeight();
				_s.currentTime_do.h = _s.timeHeight;
				_s.totalTime_do.h = _s.timeHeight;
				_s.sW = prt.sW;
				_s.positionButtons();
			}, 100);
		};
		
		_s.updateTime = function(currentTime, totalTime){
			
			if(!_s.currentTime_do || !totalTime) return;
			
			if(totalTime == "00:00") totalTime = currentTime;
			
			_s.currentTime_do.setInnerHTML(currentTime);
			_s.totalTime_do.setInnerHTML(totalTime);
			
			if(currentTime.length != _s.lastTotalTimeLength
			  || totalTime.length != _s.lastCurTimeLength){
				var currentTimeTempW = _s.currentTime_do.offsetWidth;
				var totalTimeTempW = _s.totalTime_do.offsetWidth;
				
				_s.currentTime_do.w = currentTimeTempW;
				_s.totalTime_do.w = totalTimeTempW;
				
				_s.positionButtons();
				
				setTimeout(function(){
					_s.currentTime_do.w = _s.currentTime_do.getWidth();
					_s.totalTime_do.w = _s.totalTime_do.getWidth();
					_s.positionButtons();
				}, 50);
			
				_s.lastCurTimeLength = currentTime.length;
				_s.lastTotalTimeLength = totalTime.length;
			}
		};

		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		_s.setupVolumeScrubber = function(){
			
			_s.mainVolumeHolder_do =  new FWDRAPDisplayObject("div");
			if(_s.volumeN_img) _s.mainVolumeHolder_do.setHeight(_s.volumeN_img.height);
			_s.mainHolder_do.addChild(_s.mainVolumeHolder_do);
			
			//setup volume button
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.volumeButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-sound'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
				setTimeout(function(){
					_s.mainVolumeHolder_do.setHeight(_s.volumeButton_do.h);
					_s.volumeScrubber_do.setY(parseInt((_s.volumeButton_do.h - _s.scrubbersHeight)/2));
				}, 300);
			}else{
				_s.volumeButton_do = new FWDRAPSimpleButton(_s.volumeN_img, _d.volumeSPath_str, _d.volumeDPath_str,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}
			_s.volumeButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.volumeButtonShowToolTipHandler);
			_s.volumeButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.volumeButtonOnMouseUpHandler);
			if(!_s.allowToChangeVolume_bl) _s.volumeButton_do.disable();
					
			//setup background bar
			_s.volumeScrubber_do = new FWDRAPDisplayObject("div");
			_s.volumeScrubber_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubber_do.setX(_s.volumeButton_do.w);
			_s.volumeScrubber_do.setY(parseInt((_s.volumeButton_do.h - _s.scrubbersHeight)/2));
			
			_s.volumeScrubberBkLeft_do = new FWDRAPDisplayObject("img");
			var volumeScrubberBkLeft_img = new Image();
			volumeScrubberBkLeft_img.src = _s.mainScrubberBkLeft_do.screen.src;
			_s.volumeScrubberBkLeft_do.setScreen(volumeScrubberBkLeft_img);
			_s.volumeScrubberBkLeft_do.setWidth(_s.mainScrubberBkLeft_do.w);
			_s.volumeScrubberBkLeft_do.setHeight(_s.mainScrubberBkLeft_do.h);
			_s.volumeScrubberBkLeft_do.screen.className = 'fwdrap-scrubber-bk-left';
			
			_s.volumeScrubberBkRight_do = new FWDRAPDisplayObject("img");
			var volumeScrubberBkRight_img = new Image();
			volumeScrubberBkRight_img.src = _s.mainScrubberBkRight_do.screen.src;
			_s.volumeScrubberBkRight_do.setScreen(volumeScrubberBkRight_img);
			_s.volumeScrubberBkRight_do.setWidth(_s.mainScrubberBkRight_do.w);
			_s.volumeScrubberBkRight_do.setHeight(_s.mainScrubberBkRight_do.h);
			_s.volumeScrubberBkRight_do.screen.className = 'fwdrap-scrubber-bk-right';

			var middleImage = new Image();
			middleImage.src = _s.volumeScrubberBkMiddlePath_str;
	
			_s.volumeScrubberBkMiddle_do = new FWDRAPDisplayObject("div");	
			_s.volumeScrubberBkMiddle_do.screen.className = 'fwdrap-scrubber-bk-middle';
			_s.volumeScrubberBkMiddle_do.getStyle().background = "url('" + _s.volumeScrubberBkMiddlePath_str + "')";
				
			_s.volumeScrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			_s.volumeScrubberDrag_do = new FWDRAPDisplayObject("div");
			_s.volumeScrubberDrag_do.setHeight(_s.scrubbersHeight);
		
			if(_s.useHEX){
				_s.volumeScrubberDragLeft_do = new FWDRAPDisplayObject("div");
				_s.volumeScrubberDragLeft_do.setWidth(_s.volumeScrubberDragLeft_img.width);
				_s.volumeScrubberDragLeft_do.setHeight(_s.volumeScrubberDragLeft_img.height);
				_s.volumeScrubberDragLeft_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.volumeScrubberDragLeft_img, _s.n2BC).canvas;
				_s.volumeScrubberDragLeft_do.screen.appendChild(_s.volumeScrubberDragLeft_canvas);	
			}else{
				_s.volumeScrubberDragLeft_do = new FWDRAPDisplayObject("img");
				_s.volumeScrubberDragLeft_do.setScreen(_s.volumeScrubberDragLeft_img);
			}

			if(_s.useHEX){
				_s.mainScrubberVolMiddleImage = new Image();
				_s.mainScrubberVolMiddleImage.src = _s.mainScrubberDragMiddlePath_str;
				
				_s.mainScrubberVolMiddleImage.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberVolMiddleImage, _s.nBC, true);
					_s.mainSCrubberVolMiddleCanvas = testCanvas.canvas;
					_s.mainSCrubberVolDragMiddleImageBackground = testCanvas.image;
					_s.volumeScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberVolDragMiddleImageBackground.src + "') repeat-x";
					
				}
			}else{
				_s.volumeScrubberDragMiddle_do = new FWDRAPDisplayObject("div");	
				_s.volumeScrubberDragMiddle_do.getStyle().background = "url('" + _s.volumeScrubberDragMiddlePath_str + "') repeat-x";
			}
		
			_s.volumeScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubberDragMiddle_do.setX(_s.mainScrubberDragLeftWidth);
		
			_s.volumeScrubberBarLine_do = new FWDRAPDisplayObject("img");
			var volumeScrubberBarLine_img = new Image();
			volumeScrubberBarLine_img.src = _s.mainScrubberBarLine_do.screen.src;
			_s.volumeScrubberBarLine_do.setScreen(volumeScrubberBarLine_img);
			_s.volumeScrubberBarLine_do.setWidth(_s.mainScrubberBarLine_do.w);
			_s.volumeScrubberBarLine_do.setHeight(_s.mainScrubberBarLine_do.h);
			_s.volumeScrubberBarLine_do.setAlpha(0);
			_s.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			_s.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			_s.volumeScrubberBarLine_do.screen.className = 'fwdrap-scrubber-line';
			
			//add all children
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkLeft_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkMiddle_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkRight_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBarLine_do);
			_s.volumeScrubberDrag_do.addChild(_s.volumeScrubberDragLeft_do);
			_s.volumeScrubberDrag_do.addChild(_s.volumeScrubberDragMiddle_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberDrag_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBarLine_do);
			_s.mainVolumeHolder_do.addChild(_s.volumeButton_do); 
			_s.mainVolumeHolder_do.addChild(_s.volumeScrubber_do);
	
			if(_s.allowToChangeVolume_bl){
				if(_s.isMbl){
					if(_s.hasPointerEvent_bl){
						_s.volumeScrubber_do.screen.addEventListener("pointerover", _s.volumeScrubberOnOverHandler);
						_s.volumeScrubber_do.screen.addEventListener("pointerout", _s.volumeScrubberOnOutHandler);
						_s.volumeScrubber_do.screen.addEventListener("pointerdown", _s.volumeScrubberOnDownHandler);
					}else{
						_s.volumeScrubber_do.screen.addEventListener("touchstart", _s.volumeScrubberOnDownHandler);
					}
				}else if(_s.screen.addEventListener){	
					_s.volumeScrubber_do.screen.addEventListener("mouseover", _s.volumeScrubberOnOverHandler);
					_s.volumeScrubber_do.screen.addEventListener("mouseout", _s.volumeScrubberOnOutHandler);
					_s.volumeScrubber_do.screen.addEventListener("mousedown", _s.volumeScrubberOnDownHandler);
				}
			}

			if(_d.showMainScrubberToolTipLabel_bl){
				FWDRAPScrubberTooltip.setPrototype();
				_s.ttm2 = new FWDRAPScrubberTooltip(_s.volumeScrubber_do, _d.scrubbersToolTipLabelBackgroundColor, _d.scrubbersToolTipLabelFontColor, '10');
				_s.addChild(_s.ttm2);
			}
			
			_s.enableVolumeScrubber();
			_s.updateVolumeScrubber(_s.volume);
		};

		_s.updateVolumeToolTip = function(e){
			if(!_d.showMainScrubberToolTipLabel_bl) return;
			
			_s.ttm2.setLabel(Math.round(_s.volume * 100));

			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainVolumeHolder_do.getGlobalX();
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
	
			var y;
			if(_s.isFullScreen_bl){
				y = _s.videoControllerHolder_do.y + _s.volumeScrubber_do.y - _s.ttm2.h - 4;
			}else{
				y = _s.volumeScrubber_do.getGlobalY() - _s.getGlobalY() - _s.ttm2.h - 4;
			}
			
			_s.ttm2.setX(getX());
			_s.ttm2.setY(y);
		
			clearTimeout(_s.setVolTooltipId_to);
			_s.setVolTooltipId_to = setTimeout(function(){
				_s.ttm2.setX(getX());
			},200)

			function getX(){
				if(_s.isFullScreen_bl){
					var x = _s.volumeScrubber_do.x;
				}else{
					var x = _s.mainVolumeHolder_do.x + _s.volumeScrubber_do.x;
				}
				
				x = Math.round(x + (_s.volume * _s.volumeScrubberWidth) - _s.ttm2.getWidth()/2);
				return x;
			}
		}
		
		_s.volumeButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.volumeButton_do, _s.volumeButtonToolTip_do, e);
		};
		
		_s.volumeButtonOnMouseUpHandler = function(){
			var vol = _s.lastVolume;
			
			if(_s.isMute_bl){
				vol = _s.lastVolume;
				_s.isMute_bl = false;
			}else{
				vol = 0.000001;
				_s.isMute_bl = true;
			};
			
			_s.updateVolume(vol);
		};
		
		_s.volumeScrubberOnOverHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm2.show();
			_s.updateVolumeToolTip(e);
		};
		
		_s.volumeScrubberOnOutHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(!_s.isVolumeScrubberScrubbing_bl){
				if(_s.ttm2) _s.ttm2.hide();
			}
		};
		
		_s.volumeScrubberOnDownHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.volumeScrubber_do.getGlobalX();
			_s.isVolumeScrubberScrubbing_bl = true;
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/(_s.volumeScrubberWidth - _s.scrubbersOffsetWidth);
			
			if(_s.disable_do) _s.addChild(_s.disable_do);
			_s.lastVolume = percentScrubbed;
			_s.updateVolume(percentScrubbed);
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm2.show();
			_s.updateVolumeToolTip(e);
			_s.dispatchEvent(FWDRAPController.VOLUME_START_TO_SCRUB);
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("pointermove", _s.volumeScrubberMoveHandler);
					window.addEventListener("pointerup", _s.volumeScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", _s.volumeScrubberMoveHandler);
					window.addEventListener("touchend", _s.volumeScrubberEndHandler);
				}
			}else{
				window.addEventListener("mousemove", _s.volumeScrubberMoveHandler);
				window.addEventListener("mouseup", _s.volumeScrubberEndHandler);		
			}
		};
		
		_s.volumeScrubberMoveHandler = function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/(_s.volumeScrubberWidth - _s.scrubbersOffsetWidth);
			_s.lastVolume = percentScrubbed;
			_s.updateVolume(percentScrubbed);
			_s.updateVolumeToolTip(e);
		};
		
		_s.volumeScrubberEndHandler = function(e){
			_s.dispatchEvent(FWDRAPController.VOLUME_STOP_TO_SCRUB);
			_s.isVolumeScrubberScrubbing_bl = false;
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
			if(e){
				var wp = FWDRAPUtils.getViewportMouseCoordinates(e);
				if(!FWDRAPUtils.hitTest(_s.volumeScrubber_do.screen, wp.screenX, wp.screenY)){
					if(_s.ttm2) _s.ttm2.hide();
				}
			}
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.removeEventListener("pointermove", _s.volumeScrubberMoveHandler);
					window.removeEventListener("pointerup", _s.volumeScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", _s.volumeScrubberMoveHandler);
					window.removeEventListener("touchend", _s.volumeScrubberEndHandler);
				}
			}else{
				window.removeEventListener("mousemove", _s.volumeScrubberMoveHandler);
				window.removeEventListener("mouseup", _s.volumeScrubberEndHandler);
			}
		};
		
		_s.disableVolumeScrubber = function(){
			_s.isVolumeScrubberDisabled_bl = true;
			_s.volumeScrubber_do.setButtonMode(false);
			_s.volumeScrubberEndHandler();
		};
		
		_s.enableVolumeScrubber = function(){
			_s.isVolumeScrubberDisabled_bl = false;
			_s.volumeScrubber_do.setButtonMode(true);
		};
		
		_s.updateVolumeScrubber = function(percent){
			var finalWidth = parseInt(percent * _s.volumeScrubberWidth); 
			_s.volume = percent;
			
			_s.volumeScrubberDrag_do.setWidth(finalWidth);
			
			if(finalWidth < 1 && _s.isVolumeScrubberLineVisible_bl){
				_s.isVolumeScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.volumeScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !_s.isVolumeScrubberLineVisible_bl){
				_s.isVolumeScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.volumeScrubberBarLine_do, .5, {alpha:1});
			}
			
			if(finalWidth > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.volumeScrubberBarLine_do, .8, {x:finalWidth, ease:Expo.easeOut});
		};
		
		_s.updateVolume = function(volume, preventEvent){
			_s.volume = volume;
			if(_s.volume <= 0.000001){
				_s.isMute_bl = true;
				_s.volume = 0.000001;
			}else if(_s.volume >= 0.988){
				_s.isMute_bl = false;
				_s.volume = 1;
			}else{
				_s.isMute_bl = false;
			}
		
			if(_s.volume == 0.000001){
				if(_s.volumeButton_do) _s.volumeButton_do.setDisabledState();
			}else{
				if(_s.volumeButton_do) _s.volumeButton_do.setEnabledState();
			}
			
			if(_s.volumeScrubberBarLine_do) _s.updateVolumeScrubber(_s.volume);
			if(!preventEvent)  _s.dispatchEvent(FWDRAPController.CHANGE_VOLUME, {percent:_s.volume});
		};
		
		
		//##########################################//
		/* Setup playlist button */
		//#########################################//
		_s.setupPlaylistButton = function(){
			
			var sClr = _d.nBC
			if(_s.nBC ==  _s.n2BC) sClr = _s.sBC;

			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.playlistButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-playlist'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.playlistButton_do = new FWDRAPSimpleButton(_s.playlistN_img, _d.playlistSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						sClr);
			}

			_s.playlistButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.playlistButtonShowToolTipHandler);
			_s.playlistButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.playlistButtonOnMouseUpHandler);
			_s.playlistButton_do.setY(parseInt((_s.sH - _s.playlistButton_do.h)/2));
			_s.buttons_ar.push(_s.playlistButton_do);
			_s.mainHolder_do.addChild(_s.playlistButton_do); 
			
			if(_s.showPlayListByDefault_bl){
				_s.setPlaylistButtonState("selected");
			}
		};
		
		_s.playlistButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.playlistButton_do, _s.playlistButtonToolTip_do, e.e);
		};
		
		_s.playlistButtonOnMouseUpHandler = function(){
			if(_s.playlistButton_do.isSelectedFinal_bl){
				_s.dispatchEvent(FWDRAPController.HIDE_PLAYLIST);
			}else{
				_s.dispatchEvent(FWDRAPController.SHOW_PLAYLIST);
			}
		};
		
		_s.setPlaylistButtonState = function(state){	
			if(!_s.playlistButton_do) return;
			if(state == "selected"){
				_s.playlistButton_do.setSelected();
			}else if(state == "unselected"){
				_s.playlistButton_do.setUnselected();
			}
		};
		

		//##########################################//
		/* Setup categories buttons */
		//##########################################//
		_s.setupCategoriesButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.categoriesButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-playlists'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.categoriesButton_do = new FWDRAPSimpleButton(_s.categoriesN_img, _d.categoriesSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}

			_s.categoriesButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.categoriesButtonShowTooltipHandler);
			_s.categoriesButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.categoriesButtonOnMouseUpHandler);
			_s.categoriesButton_do.setY(parseInt((_s.sH - _s.categoriesButton_do.h)/2));
			_s.buttons_ar.push(_s.categoriesButton_do);
			_s.mainHolder_do.addChild(_s.categoriesButton_do); 
		};
		
		_s.categoriesButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.categoriesButton_do, _s.playlistsButtonToolTip_do, e.e);
		};
		
		_s.categoriesButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHOW_CATEGORIES);
		};
		
		_s.setCategoriesButtonState = function(state){	
			if(!_s.categoriesButton_do) return;
			if(state == "selected"){
				_s.categoriesButton_do.setSelected();
			}else if(state == "unselected"){
				_s.categoriesButton_do.setUnselected();
			}
		};
		

		//##########################################//
		/* Setup loop button */
		//#########################################//
		_s.setupLoopButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.loopButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-loop'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.loopButton_do = new FWDRAPSimpleButton(_s.replayN_img, _d.replaySPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			
			_s.loopButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.loopButtonShowTooltipHandler);
			_s.loopButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.loopButtonOnMouseUpHandler);
			_s.loopButton_do.setY(parseInt((_s.sH - _s.loopButton_do.h)/2));
			_s.buttons_ar.push(_s.loopButton_do);
			_s.mainHolder_do.addChild(_s.loopButton_do); 
			if(_s.loop_bl) _s.setLoopStateButton("selected");
		};
		
		
		_s.loopButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.loopButton_do, _s.loopButtonToolTip_do, e.e);
		};
		
		_s.loopButtonOnMouseUpHandler = function(){
			if(_s.loopButton_do.isSelectedFinal_bl){
				_s.dispatchEvent(FWDRAPController.DISABLE_LOOP);
			}else{
				_s.dispatchEvent(FWDRAPController.ENABLE_LOOP);
			}
		};
		
		_s.setLoopStateButton = function(state){	
			if(!_s.loopButton_do) return;
			if(state == "selected"){
				_s.loopButton_do.setSelected();
			}else if(state == "unselected"){
				_s.loopButton_do.setUnselected();
			}
		};
		

		//##########################################//
		/* Setup download button */
		//#########################################//
		_s.setupDownloadButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.downloadButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-download'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.downloadButton_do = new FWDRAPSimpleButton(_s.downloaderN_img, _d.downloaderSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			
			_s.downloadButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.downloadButtonShowToolTipHandler);
			_s.downloadButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.downloadButtonOnMouseUpHandler);
			_s.downloadButton_do.setX(-300);
			_s.downloadButton_do.setY(parseInt((_s.sH - _s.downloadButton_do.h)/2));
			_s.mainHolder_do.addChild(_s.downloadButton_do); 
		};
		
		_s.downloadButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.downloadButton_do, _s.downloadButtonToolTip_do, e.e);
		};
		
		_s.downloadButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.DOWNLOAD_MP3);
		};

		
		//##########################################//
		/* Setup buy button */
		//#########################################//
		_s.setupBuyButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.buyButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-cart'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.buyButton_do = new FWDRAPSimpleButton(_d.buyN_img, _d.buySPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			_s.buyButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.buyButtonShowToolTipHandler);
			_s.buyButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.buyButtonOnMouseUpHandler);
			_s.buyButton_do.setX(-300);
			_s.buyButton_do.setY(parseInt((_s.sH - _s.buyButton_do.h)/2));
			_s.mainHolder_do.addChild(_s.buyButton_do);
		};
		
		_s.buyButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.buyButton_do, _s.buyButtonToolTip_do, e.e);
		};
		
		_s.buyButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.BUY);
		};
		
		
		//##########################################//
		/* Setup playback rate */
		//#########################################//
		_s.setupPlaybacRateButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.playbackRateButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-watch-later'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.playbackRateButton_do = new FWDRAPSimpleButton(_d.playbackRateNormal_img, _d.playbackRateSelectedPath_str, null, true,
						_d.useHEX,
						_d.n2BC,
						_d.sBC);
			}
			_s.playbackRateButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.playbacRateButtonShowToolTipHandler);
			_s.playbackRateButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.playbacRateButtonOnMouseUpHandler);
			_s.buttons_ar.push(_s.playbackRateButton_do);
			_s.mainHolder_do.addChild(_s.playbackRateButton_do); 
		};
		
		_s.playbacRateButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.playbackRateButton_do, _s.playbackRateButtonToolTip_do, e.e);
		};
		
		_s.playbacRateButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHOW_PLAYBACKRATE);
		};
		
		
		//##########################################//
		/* Setup shuffle button */
		//#########################################//
		_s.setupShuffleButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.shuffleButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-shuffle'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.shuffleButton_do = new FWDRAPSimpleButton(_s.shuffleN_img, _d.shuffleSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			
			_s.shuffleButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.shuffleButtonShowToolTipHandler);
			_s.shuffleButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.shuffleButtonOnMouseUpHandler);
			_s.shuffleButton_do.setY(parseInt((_s.sH - _s.shuffleButton_do.h)/2));
			_s.buttons_ar.push(_s.shuffleButton_do);
			_s.mainHolder_do.addChild(_s.shuffleButton_do); 
			if(!_s.loop_bl && _s.shuffle_bl) _s.setShuffleButtonState("selected");
		};
		
		_s.shuffleButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.shuffleButton_do, _s.shuffleButtonToolTip_do, e.e);
		};
		
		_s.shuffleButtonOnMouseUpHandler = function(){
			if(_s.shuffleButton_do.isSelectedFinal_bl){
				_s.dispatchEvent(FWDRAPController.DISABLE_SHUFFLE);
			}else{
				_s.dispatchEvent(FWDRAPController.ENABLE_SHUFFLE);
			}
		};
		
		_s.setShuffleButtonState = function(state){	
			if(!_s.shuffleButton_do) return;
			if(state == "selected"){
				_s.shuffleButton_do.setSelected();
			}else if(state == "unselected"){
				_s.shuffleButton_do.setUnselected();
			}
		};

	
		//##########################################//
		/* Setup share button */
		//#########################################//
		_s.setupShareButton = function(){

			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.shareButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-share'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.shareButton_do = new FWDRAPSimpleButton(_s.shareN_img, _d.shareSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}
			_s.shareButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.shareButtonShowToolTipHandler);
			_s.shareButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.faceboolButtonOnMouseUpHandler);
			_s.shareButton_do.setY(parseInt((_s.sH - _s.shareButton_do.h)/2));
			_s.buttons_ar.push(_s.shareButton_do);
			_s.mainHolder_do.addChild(_s.shareButton_do); 
		};
		
		_s.shareButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.shareButton_do, _s.shareButtonToolTip_do, e.e);
		};
		
		_s.faceboolButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHARE);
		};
		

		//##########################################//
		/* Setup popup button */
		//#########################################//
		_s.setupPopupButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.popupButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-popup'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.popupButton_do = new FWDRAPSimpleButton(_s.popupN_img, _d.popupSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}
			_s.popupButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.popupButtonShowToolTipHandler);
			_s.popupButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.popupButtonOnMouseUpHandler);
			_s.popupButton_do.setY(parseInt((_s.sH - _s.popupButton_do.h)/2));
			_s.buttons_ar.push(_s.popupButton_do);
			_s.mainHolder_do.addChild(_s.popupButton_do); 
		};
		
		_s.popupButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.popupButton_do, _s.populButtonToolTip_do, e.e);
		};
		
		_s.popupButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.POPUP);
		};

		
		//#########################################//
		/* disable all buttons except categories */
		//########################################//
		_s.disableControllerWhileLoadingPlaylist = function(){
			_s.prevButton_do.disable();
			_s.playPauseButton_do.disable();
			_s.nextButton_do.disable();
			if(_s.downloadButton_do) _s.downloadButton_do.disable();
			if(_s.buyButton_do) _s.buyButton_do.disable();
			if(_s.playlistButton_do) _s.playlistButton_do.disable(true);
			if(_s.shareButton_do) _s.shareButton_do.disable();
			_s.updateTime("...", "...");
			_s.setTitle("...");
		};
		
		_s.enableControllerWhileLoadingPlaylist = function(){
			_s.prevButton_do.enable();
			_s.playPauseButton_do.enable();
			_s.nextButton_do.enable();
			if(_s.downloadButton_do) _s.downloadButton_do.enable();
			if(_s.buyButton_do) _s.buyButton_do.enable();
			if(_s.playlistButton_do) _s.playlistButton_do.enable();
			if(_s.shareButton_do) _s.shareButton_do.enable();
		};
		
		_s.init();
	};
	

	/* set prototype */
	FWDRAPController.setPrototype = function(){
		FWDRAPController.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPController.SHOW_ATOB = 'showAToB'
	FWDRAPController.SHOW_PLAYBACKRATE ="showPlaybackRate";
	FWDRAPController.SHARE = "shareShare";
	FWDRAPController.PLAY_NEXT = "playNext";
	FWDRAPController.PLAY_PREV = "playPrev";
	FWDRAPController.PLAY = "play";
	FWDRAPController.PAUSE = "pause";
	FWDRAPController.VOLUME_START_TO_SCRUB = "volumeStartToScrub";
	FWDRAPController.VOLUME_STOP_TO_SCRUB = "volumeStopToScrub";
	FWDRAPController.START_TO_SCRUB = "startToScrub";
	FWDRAPController.SCRUB = "scrub";
	FWDRAPController.SCRUB_PLAYLIST_ITEM = "scrubPlaylistItem";
	FWDRAPController.STOP_TO_SCRUB = "stopToScrub";
	FWDRAPController.CHANGE_VOLUME = "changeVolume";
	FWDRAPController.SHOW_CATEGORIES = "showCategories";
	FWDRAPController.SHOW_PLAYLIST = "showPlaylist";
	FWDRAPController.HIDE_PLAYLIST = "hidePlaylist";
	FWDRAPController.ENABLE_LOOP = "enableLoop";
	FWDRAPController.DISABLE_LOOP = "disableLoop";
	FWDRAPController.ENABLE_SHUFFLE = "enableShuffle";
	FWDRAPController.DISABLE_SHUFFLE = "disableShuffle";
	FWDRAPController.POPUP = "popup";
	FWDRAPController.DOWNLOAD_MP3 = "downloadMp3";
	FWDRAPController.BUY = "buy";
	
	FWDRAPController.prototype = null;
	window.FWDRAPController = FWDRAPController;
	
}());/**
 * Royal Audio Player
 * Display object.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, _s applies only if the position is relative.
	 */
	var FWDRAPDisplayObject = function(type, position, overflow, display){

		'use strict';
		
		var _s = this;
		_s.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas" || "input"){
			_s.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		_s.children_ar = [];
		_s.position = position || "absolute";
		_s.overflow = overflow || "hidden";
		_s.display = display || "inline-block";
		_s.visible = true;
		_s.x = 0;
		_s.y = 0;
		_s.w = 0;
		_s.h = 0;
		_s.rect;
		_s.alpha = 1;
		_s.innerHTML = "";
		_s.opacityType = "";
		
		_s.hasTransform3d_bl =  FWDRAPUtils.hasTransform3d;
		_s.hasTransform2d_bl =  FWDRAPUtils.hasTransform2d;
		if(FWDRAPUtils.isIE || (FWDRAPUtils.isIE11 && !FWDRAPUtils.isMobile)){
			_s.hasTransform3d_bl = false;
			_s.hasTransform2d_bl = false;
		} 

		_s.hasBeenSetSelectable_bl = false;
		

		//##############################//
		/* init */
		//#############################//
		_s.init = function(){
			_s.setScreen();
		};	
		

		//######################################//
		/* check if it supports transforms. */
		//######################################//
		_s.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof _s.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		

		//######################################//
		/* set opacity type */
		//######################################//
		_s.getOpacityType = function(){
			var opacityType;
			if (typeof _s.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};

		
		//######################################//
		/* setup main screen */
		//######################################//
		_s.setScreen = function(element){
			if(_s.type == "img" && element){
				_s.screen = element;
				_s.setMainProperties();
			}else{
				_s.screen = document.createElement(_s.type);
				_s.setMainProperties();
			}
		};
		

		//########################################//
		/* set main properties */
		//########################################//
		_s.setMainProperties = function(){
			
			_s.transform = _s.getTransform();
			_s.setPosition(_s.position);
			_s.setOverflow(_s.overflow);
			_s.opacityType = _s.getOpacityType();
			
			if(_s.opacityType == "opacity") _s.isHtml5_bl = true;
			
			if(_s.opacityType == "filter") _s.screen.style.filter = "inherit";
			_s.screen.style.left = "0px";
			_s.screen.style.top = "0px";
			_s.screen.style.margin = "0px";
			_s.screen.style.padding = "0px";
			_s.screen.style.maxWidth = "none";
			_s.screen.style.maxHeight = "none";
			_s.screen.style.border = "none";
			_s.screen.style.lineHeight = "1";
			_s.screen.style.backgroundColor = "transparent";
			_s.screen.style.backfaceVisibility = "hidden";
			_s.screen.style.webkitBackfaceVisibility = "hidden";
			_s.screen.style.MozBackfaceVisibility = "hidden";	
			_s.screen.style.MozImageRendering = "optimizeSpeed";	
			_s.screen.style.WebkitImageRendering = "optimizeSpeed";
			
			if(type == "img"){
				_s.setWidth(_s.screen.width);
				_s.setHeight(_s.screen.height);
			}
		};
			
		_s.setBackfaceVisibility =  function(){
			_s.screen.style.backfaceVisibility = "visible";
			_s.screen.style.webkitBackfaceVisibility = "visible";
			_s.screen.style.MozBackfaceVisibility = "visible";		
		};
		

		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		_s.setSelectable = function(val){
			if(!val){
				_s.screen.style.userSelect = "none";
				_s.screen.style.MozUserSelect = "none";
				_s.screen.style.webkitUserSelect = "none";
				_s.screen.style.khtmlUserSelect = "none";
				_s.screen.style.oUserSelect = "none";
				_s.screen.style.msUserSelect = "none";
				_s.screen.msUserSelect = "none";
				_s.screen.ondragstart = function(e){return false;};
				_s.screen.onselectstart = function(){return false;};
				_s.screen.ontouchstart = function(){return false;};
				_s.screen.style.webkitTouchCallout='none';
				_s.hasBeenSetSelectable_bl = true;
			}
		};
		
		_s.getScreen = function(){
			return _s.screen;
		};
		
		_s.setVisible = function(val){
			_s.visible = val;
			if(_s.visible == true){
				_s.screen.style.visibility = "visible";
			}else{
				_s.screen.style.visibility = "hidden";
			}
		};
		
		_s.getVisible = function(){
			return _s.visible;
		};
			
		_s.setResizableSizeAfterParent = function(){
			_s.screen.style.width = "100%";
			_s.screen.style.height = "100%";
		};
		
		_s.getStyle = function(){
			return _s.screen.style;
		};
		
		_s.setOverflow = function(val){
			_s.overflow = val;
			_s.screen.style.overflow = _s.overflow;
		};
		
		_s.setPosition = function(val){
			_s.position = val;
			_s.screen.style.position = _s.position;
		};
		
		_s.setDisplay = function(val){
			_s.display = val;
			_s.screen.style.display = _s.display;
		};
		
		_s.setButtonMode = function(val){
			_s.buttonMode = val;
			if(_s.buttonMode ==  true){
				_s.screen.style.cursor = "pointer";
			}else{
				_s.screen.style.cursor = "default";
			}
		};
		
		_s.setBkColor = function(val){
			_s.screen.style.backgroundColor = val;
		};
		
		_s.setInnerHTML = function(val){
			_s.innerHTML = val;
			_s.screen.innerHTML = _s.innerHTML;
		};
		
		_s.getInnerHTML = function(){
			return _s.innerHTML;
		};
		
		_s.getRect = function(){
			return _s.screen.getBoundingClientRect();
		};
		
		_s.setAlpha = function(val){
			_s.alpha = val;
			if(_s.opacityType == "opacity"){
				_s.screen.style.opacity = _s.alpha;
			}else if(_s.opacityType == "filter"){
				_s.screen.style.filter = "alpha(opacity=" + _s.alpha * 100 + ")";
				_s.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(_s.alpha * 100) + ")";
			}
		};
		
		_s.getAlpha = function(){
			return _s.alpha;
		};
		
		_s.getRect = function(){
			return _s.screen.getBoundingClientRect();
		};
		
		_s.getGlobalX = function(){
			return _s.getRect().left;
		};
		
		_s.getGlobalY = function(){
			return _s.getRect().top;
		};
		
		_s.setX = function(val){
			_s.x = val;
			if(_s.hasTransform3d_bl){
				_s.screen.style[_s.transform] = 'translate3d(' + _s.x + 'px,' + _s.y + 'px,0)';
			}else if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = 'translate(' + _s.x + 'px,' + _s.y + 'px)';
			}else{
				_s.screen.style.left = _s.x + "px";
			}
		};
		
		_s.getX = function(){
			return  _s.x;
		};
		
		_s.setY = function(val){
			_s.y = val;
			if(_s.hasTransform3d_bl){
				_s.screen.style[_s.transform] = 'translate3d(' + _s.x + 'px,' + _s.y + 'px,0)';	
			}else if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = 'translate(' + _s.x + 'px,' + _s.y + 'px)';
			}else{
				_s.screen.style.top = _s.y + "px";
			}
		};
		
		_s.getY = function(){
			return  _s.y;
		};
		
		_s.setWidth = function(val){
			_s.w = val;
			if(_s.type == "img" || _s.type == "canvas"){
				_s.screen.width = _s.w;
				_s.screen.style.width = _s.w + "px";
			}else{
				_s.screen.style.width = _s.w + "px";
			}
		};
		
		_s.getWidth = function(){
			if(_s.type == "div" || _s.type == "input"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				return _s.w;
			}else if(_s.type == "img"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				if(_s.screen.width != 0) return  _s.screen.width;
				return _s._w;
			}else if( _s.type == "canvas"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				return _s.w;
			}
		};
		
		_s.setHeight = function(val){
			_s.h = val;
			if(_s.type == "img" || _s.type == "canvas"){
				_s.screen.height = _s.h;
				_s.screen.style.height = _s.h + "px";
			}else{
				_s.screen.style.height = _s.h + "px";
			}
		};
		
		_s.getHeight = function(){
			if(_s.type == "div" || _s.type == "input"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				return _s.h;
			}else if(_s.type == "img"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				if(_s.screen.height != 0) return  _s.screen.height;
				return _s.h;
			}else if(_s.type == "canvas"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				return _s.h;
			}
		};
		

		//#####################################//
		/* DOM list */
		//#####################################//
		_s.addChild = function(e){
			if(_s.contains(e)){	
				_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 1);
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}else{
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}
		};
		
		_s.removeChild = function(e){
			if(_s.contains(e)){
				_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 1);
				_s.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child does't exist, it can't be removed!");
			};
		};
		
		_s.contains = function(e){
			if(FWDRAPUtils.indexOfArray(_s.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		_s.addChildAt = function(e, index){
			if(_s.getNumChildren() == 0){
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}else if(index == 1){
				_s.screen.insertBefore(e.screen, _s.children_ar[0].screen);
				_s.screen.insertBefore(_s.children_ar[0].screen, e.screen);	
				if(_s.contains(e)){
					_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 1, e);
				}else{
					_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > _s.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				_s.screen.insertBefore(e.screen, _s.children_ar[index].screen);
				if(_s.contains(e)){
					_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 1, e);
				}else{
					_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 0, e);
				}
			}
		};
		
		_s.getChildAt = function(index){
			if(index < 0  || index > _s.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(_s.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
			return _s.children_ar[index];
		};
		
		_s.removeChildAtZero = function(){
			_s.screen.removeChild(_s.children_ar[0].screen);
			_s.children_ar.shift();
		};
		
		_s.getNumChildren = function(){
			return _s.children_ar.length;
		};
		
		
		//################################//
		/* event dispatcher */
		//#################################//
		_s.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = _s;
	        _s.listeners.events_ar.push(event);
	    };
	    
	    _s.dispatchEvent = function(type, props){
	    	if(_s.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s && _s.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		_s.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		_s.listeners.events_ar[i].listener.call(_s, _s.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    _s.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s 
	        			&& _s.listeners.events_ar[i].type === type
	        			&& _s.listeners.events_ar[i].listener ===  listener
	        	){
	        		_s.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    

	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		_s.disposeImage = function(){
			if(_s.type == "img") _s.screen.src = null;
		};
		
		
		_s.destroy = function(){
		
			if(_s.hasBeenSetSelectable_bl){
				_s.screen.ondragstart = null;
				_s.screen.onselectstart = null;
				_s.screen.ontouchstart = null;
			};
			
			_s.screen.removeAttribute("style");
			
			//destroy properties
			_s.listeners = [];
			_s.listeners = null;
			_s.children_ar = [];
			_s.children_ar = null;
			_s.style = null;
			_s.screen = null;
			_s.transform = null;
			_s.position = null;
			_s.overflow = null;
			_s.display = null;
			_s.visible = null;
			_s.buttonMode = null;
			_s.x = null;
			_s.y = null;
			_s.w = null;
			_s.h = null;
			_s.rect = null;
			_s.alpha = null;
			_s.innerHTML = null;
			_s.opacityType = null;
			_s.isHtml5_bl = null;
		
			_s.hasTransform3d_bl = null;
			_s.hasTransform2d_bl = null;
			_s = null;
		};
		
	    /* init */
		_s.init();
	};
	
	window.FWDRAPDisplayObject = FWDRAPDisplayObject;
}(window));/**
 * Royal Audio Player
 * Custom deeplinking.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
if (typeof fwdadrs == "undefined") {
    var fwdadrs = {}
}
if (typeof fwdadrs.util == "undefined") {
    fwdadrs.util = {}
}
fwdadrs.util.Browser = new function () {
    var b = navigator.userAgent.toLowerCase(),
        a = /webkit/.test(b),
        e = /opera/.test(b),
        c = /msie/.test(b) && !/opera/.test(b),
        d = /mozilla/.test(b) && !/(compatible|webkit)/.test(b),
        f = parseFloat(c ? b.substr(b.indexOf("msie") + 4) : (b.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]);
    this.toString = function () {
        return "[class Browser]"
    };
    this.getVersion = function () {
        return f
    };
    this.isMSIE = function () {
        return c
    };
    this.isSafari = function () {
        return a
    };
    this.isOpera = function () {
        return e
    };
    this.isMozilla = function () {
        return d
    }
};
fwdadrs.util.Events = new function () {
    var c = "DOMContentLoaded",
        j = "onstop",
        k = window,
        h = document,
        b = [],
        a = fwdadrs.util,
        e = a.Browser,
        d = e.isMSIE(),
        g = e.isSafari();
    this.toString = function () {
        return "[class Events]"
    };
    this.addListener = function (n, l, m) {
        b.push({
            o: n,
            t: l,
            l: m
        });
        if (!(l == c && (d || g))) {
            if (n.addEventListener) {
                n.addEventListener(l, m, false)
            } else {
                if (n.attachEvent) {
                    n.attachEvent("on" + l, m)
                }
            }
        }
    };
    this.removeListener = function (p, m, n) {
        for (var l = 0, o; o = b[l]; l++) {
            if (o.o == p && o.t == m && o.l == n) {
                b.splice(l, 1);
                break
            }
        }
        if (!(m == c && (d || g))) {
            if (p.removeEventListener) {
                p.removeEventListener(m, n, false)
            } else {
                if (p.detachEvent) {
                    p.detachEvent("on" + m, n)
                }
            }
        }
    };
    var i = function () {
        for (var m = 0, l; l = b[m]; m++) {
            if (l.t != c) {
                a.Events.removeListener(l.o, l.t, l.l)
            }
        }
    };
    var f = function () {
        if (h.readyState == "interactive") {
            function l() {
                h.detachEvent(j, l);
                i()
            }
            h.attachEvent(j, l);
            k.setTimeout(function () {
                h.detachEvent(j, l)
            }, 0)
        }
    };
    if (d || g) {
        (function () {
            try {
                if ((d && h.body) || !/loaded|complete/.test(h.readyState)) {
                    h.documentElement.doScroll("left")
                }
            } catch (m) {
                return setTimeout(arguments.callee, 0)
            }
            for (var l = 0, m; m = b[l]; l++) {
                if (m.t == c) {
                    m.l.call(null)
                }
            }
        })()
    }
    if (d) {
        if(k.attachEvent) k.attachEvent("onbeforeunload", f)
    }
    this.addListener(k, "unload", i)
};
fwdadrs.util.Functions = new function () {
    this.toString = function () {
        return "[class Functions]"
    };
    this.bind = function (f, b, e) {
        for (var c = 2, d, a = []; d = arguments[c]; c++) {
            a.push(d)
        }
        return function () {
            return f.apply(b, a)
        }
    }
};
var FWDAddressEvent = function (d) {
    this.toString = function () {
        return "[object FWDAddressEvent]"
    };
    this.type = d;
    this.target = [FWDAddress][0];
    this.value = FWDAddress.getValue();
    this.path = FWDAddress.getPath();
    this.pathNames = FWDAddress.getPathNames();
    this.parameters = {};
    var c = FWDAddress.getParameterNames();
    for (var b = 0, a = c.length; b < a; b++) {
        this.parameters[c[b]] = FWDAddress.getParameter(c[b])
    }
    this.parameterNames = c
};
FWDAddressEvent.INIT = "init";
FWDAddressEvent.CHANGE = "change";
FWDAddressEvent.INTERNAL_CHANGE = "internalChange";
FWDAddressEvent.EXTERNAL_CHANGE = "externalChange";
var FWDAddress = new function () {

        'use strict';

        var _getHash = function () {
            var index = _l.href.indexOf("#");
            return index != -1 ? _ec(_dc(_l.href.substr(index + 1))) : ""
        };

        var _getWindow = function () {
            try {
                top.document;
                return top
            } catch (e) {
                return window
            }
        };

        var _strictCheck = function (value, force) {
            if (_opts.strict) {
                value = force ? (value.substr(0, 1) != "/" ? "/" + value : value) : (value == "" ? "/" : value)
            }
            return value
        };

        var _ieLocal = function (value, direction) {
            return (_msie && _l.protocol == "file:") ? (direction ? _value.replace(/\?/, "%3F") : _value.replace(/%253F/, "?")) : value
        };

        var _searchScript = function (el) {
            if (el.childNodes) {
                for (var i = 0, l = el.childNodes.length, s; i < l; i++) {
                    if (el.childNodes[i].src) {
                        _url = String(el.childNodes[i].src)
                    }
                    if (s = _searchScript(el.childNodes[i])) {
                        return s
                    }
                }
            }
        };

        var _titleCheck = function () {
            if (_d.title != _title && _d.title.indexOf("#") != -1) {
                _d.title = _title
            }
        };

        var _listen = function () {
            if (!_silent) {
                var hash = _getHash();
                var diff = !(_value == hash);
                if (_safari && _version < 523) {
                    if (_length != _h.length) {
                        _length = _h.length;
                        if (typeof _stack[_length - 1] != UNDEFINED) {
                            _value = _stack[_length - 1]
                        }
                        _update.call(this, false)
                    }
                } else {
                    if (_msie && diff) {
                        if (_version < 7) {
                            _l.reload()
                        } else {
                            this.setValue(hash)
                        }
                    } else {
                        if (diff) {
                            _value = hash;
                            _update.call(this, false)
                        }
                    }
                } if (_msie) {
                    _titleCheck.call(this)
                }
            }
        };

        var _bodyClick = function (e) {
            if (_popup.length > 0) {
                var popup = window.open(_popup[0], _popup[1], eval(_popup[2]));
                if (typeof _popup[3] != UNDEFINED) {
                    eval(_popup[3])
                }
            }
            _popup = []
        };

        var _swfChange = function () {
            for (var i = 0, id, obj, value = FWDAddress.getValue(), setter = "setFWDAddressAddressValue"; id = _ids[i]; i++) {
                obj = document.getElementById(id);
                if (obj) {
                    if (obj.parentNode && typeof obj.parentNode.so != UNDEFINED) {
                        obj.parentNode.so.call(setter, value)
                    } else {
                        if (!(obj && typeof obj[setter] != UNDEFINED)) {
                            var objects = obj.getElementsByTagName("object");
                            var embeds = obj.getElementsByTagName("embed");
                            obj = ((objects[0] && typeof objects[0][setter] != UNDEFINED) ? objects[0] : ((embeds[0] && typeof embeds[0][setter] != UNDEFINED) ? embeds[0] : null))
                        }
                        if (obj) {
                            obj[setter](value)
                        }
                    }
                } else {
                    if (obj = document[id]) {
                        if (typeof obj[setter] != UNDEFINED) {
                            obj[setter](value)
                        }
                    }
                }
            }
        };

        var _jsDispatch = function (type) {
            this.dispatchEvent(new FWDAddressEvent(type));
            type = type.substr(0, 1).toUpperCase() + type.substr(1);
            if (typeof this["on" + type] == FUNCTION) {
                this["on" + type]()
            }
        };

        var _jsInit = function () {
            if (_util.Browser.isSafari()) {
                _d.body.addEventListener("click", _bodyClick)
            }
            _jsDispatch.call(this, "init")
        };

        var _jsChange = function () {
            _swfChange();
            _jsDispatch.call(this, "change")
        };

        var _update = function (internal) {
            _jsChange.call(this);
            if (internal) {
                _jsDispatch.call(this, "internalChange")
            } else {
                _jsDispatch.call(this, "externalChange")
            }
            _st(_functions.bind(_track, this), 10)
        };

        var _track = function () {
            var value = (_l.pathname + (/\/$/.test(_l.pathname) ? "" : "/") + this.getValue()).replace(/\/\//, "/").replace(/^\/$/, "");
            var fn = _t[_opts.tracker];
            if (typeof fn == FUNCTION) {
                fn(value)
            } else {
                if (typeof _t.pageTracker != UNDEFINED && typeof _t.pageTracker._trackPageview == FUNCTION) {
                    _t.pageTracker._trackPageview(value)
                } else {
                    if (typeof _t.urchinTracker == FUNCTION) {
                        _t.urchinTracker(value)
                    }
                }
            }
        };

        var _htmlWrite = function () {
            var doc = _frame.contentWindow.document;
            doc.open();
            doc.write("<html><head><title>" + _d.title + "</title><script>var " + ID + ' = "' + _getHash() + '";<\/script></head></html>');
            doc.close()
        };

        var _htmlLoad = function () {
            var win = _frame.contentWindow;
            var src = win.location.href;
            _value = (typeof win[ID] != UNDEFINED ? win[ID] : "");
            if (_value != _getHash()) {
                _update.call(FWDAddress, false);
                _l.hash = _ieLocal(_value, TRUE)
            }
        };

        var _load = function () {
        
            if (!_loaded) {
                _loaded = TRUE;
                if (_msie && _version < 8) {
                    var frameset = _d.getElementsByTagName("frameset")[0];
                    _frame = _d.createElement((frameset ? "" : "i") + "frame");
                    if (frameset) {
                        frameset.insertAdjacentElement("beforeEnd", _frame);
                        frameset[frameset.cols ? "cols" : "rows"] += ",0";
                        _frame.src = "javascript:false";
                        _frame.noResize = true;
                        _frame.frameBorder = _frame.frameSpacing = 0
                    } else {
                        _frame.src = "javascript:false";
                        _frame.style.display = "none";
                        _d.body.insertAdjacentElement("afterBegin", _frame)
                    }
                    _st(function () {
                        _events.addListener(_frame, "load", _htmlLoad);
                        if (typeof _frame.contentWindow[ID] == UNDEFINED) {
                            _htmlWrite()
                        }
                    }, 50)
                } else {
                    if (_safari) {
                        if (_version < 418) {
                            _d.body.innerHTML += '<form id="' + ID + '" style="position:absolute;top:-9999px;" method="get"></form>';
                            _form = _d.getElementById(ID)
                        }
                        if (typeof _l[ID] == UNDEFINED) {
                            _l[ID] = {}
                        }
                        if (typeof _l[ID][_l.pathname] != UNDEFINED) {
                            _stack = _l[ID][_l.pathname].split(",")
                        }
                    }
                }
                _st(_functions.bind(function () {
                    _jsInit.call(_s);
                    _jsChange.call(_s);
                    _track.call(_s)
                }, _s), 1);
                if (_msie && _version >= 8) {
                    _d.body.onhashchange = _functions.bind(_listen, _s);
                    _si(_functions.bind(_titleCheck, _s), 50)
                } else {
                    _si(_functions.bind(_listen, _s), 50)
                }
            }
        };

        var ID = "fwdaddress",
            FUNCTION = "function",
            UNDEFINED = "undefined",
            TRUE = true,
            FALSE = false,
            _util = fwdadrs.util,
            _browser = _util.Browser,
            _events = _util.Events,
            _functions = _util.Functions,
            _version = _browser.getVersion(),
            _msie = _browser.isMSIE(),
            _mozilla = _browser.isMozilla(),
            _opera = _browser.isOpera(),
            _safari = _browser.isSafari(),
            _supported = TRUE,
            _t = _getWindow(),
            _d = _t.document,
            _h = _t.history,
            _l = _t.location,
            _si = setInterval,
            _st = setTimeout,
            _dc = decodeURI,
            _ec = encodeURI,
            _frame, _form, _url, _title = _d.title,
            _length = _h.length,
            _silent = FALSE,
            _loaded = FALSE,
            _justset = TRUE,
            _juststart = TRUE,
            _ref = this,
            _stack = [],
            _ids = [],
            _popup = [],
            _listeners = {}, _value = _getHash(),
            _opts = {
                history: TRUE,
                strict: TRUE
            };
        if (_msie && _d.documentMode && _d.documentMode != _version) {
            _version = _d.documentMode != 8 ? 7 : 8
        }

        var _s = this;
        if (_supported) {
            if (_opera) {
                history.navigationMode = "compatible"
            }
            for (var i = 1; i < _length; i++) {
                _stack.push("")
            }
            _stack.push(_getHash());
            if (_msie && _l.hash != _getHash()) {
                _l.hash = "#" + _ieLocal(_getHash(), TRUE)
            }
            _searchScript(document);
            var _qi = _url ? _url.indexOf("?") : -1;
            if (_qi != -1) {
                var param, params = _url.substr(_qi + 1).split("&");
                for (var i = 0, p; p = params[i]; i++) {
                    param = p.split("=");
                    if (/^(history|strict)$/.test(param[0])) {
                        _opts[param[0]] = (isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : (parseInt(param[1]) != 0))
                    }
                    if (/^tracker$/.test(param[0])) {
                        _opts[param[0]] = param[1]
                    }
                }
            }
            if (_msie) {
                _titleCheck.call(this)
            }

            if(window == _t) {
                _events.addListener(document, "DOMContentLoaded", _functions.bind(_load, this))
            }
            _events.addListener(_t, "load", _functions.bind(_load, this))

            if(document.readyState == 'complete'){
                _load();
            }
        } else {
            if ((!_supported && _l.href.indexOf("#") != -1) || (_safari && _version < 418 && _l.href.indexOf("#") != -1 && _l.search != "")) {
                _d.open();
                _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + _l.href.substr(0, _l.href.indexOf("#")) + '" /></head></html>');
                _d.close()
            } else {
                _track()
            }
        }
        this.toString = function () {
            return "[class FWDAddress]"
        };
        this.back = function () {
            _h.back()
        };
        this.forward = function () {
            _h.forward()
        };
        this.up = function () {
            var path = this.getPath();
            this.setValue(path.substr(0, path.lastIndexOf("/", path.length - 2) + (path.substr(path.length - 1) == "/" ? 1 : 0)))
        };
        this.go = function (delta) {
            _h.go(delta)
        };
        this.href = function (url, target) {
            target = typeof target != UNDEFINED ? target : "_self";
            if (target == "_self") {
                self.location.href = url
            } else {
                if (target == "_top") {
                    _l.href = url
                } else {
                    if (target == "_blank") {
                        window.open(url)
                    } else {
                        _t.frames[target].location.href = url
                    }
                }
            }
        };
        this.popup = function (url, name, options, handler) {
            try {
                var popup = window.open(url, name, eval(options));
                if (typeof handler != UNDEFINED) {
                    eval(handler)
                }
            } catch (ex) {}
            _popup = arguments
        };
        this.getIds = function () {
            return _ids
        };
        this.getId = function (index) {
            return _ids[0]
        };
        this.setId = function (id) {
            _ids[0] = id
        };
        this.addId = function (id) {
            this.removeId(id);
            _ids.push(id)
        };
        this.removeId = function (id) {
            for (var i = 0; i < _ids.length; i++) {
                if (id == _ids[i]) {
                    _ids.splice(i, 1);
                    break
                }
            }
        };
        this.addEventListener = function (type, listener) {
            if (typeof _listeners[type] == UNDEFINED) {
                _listeners[type] = []
            }
            _listeners[type].push(listener)
        };
        this.removeEventListener = function (type, listener) {
            if (typeof _listeners[type] != UNDEFINED) {
                for (var i = 0, l; l = _listeners[type][i]; i++) {
                    if (l == listener) {
                        break
                    }
                }
                _listeners[type].splice(i, 1)
            }
        };
        this.dispatchEvent = function (event) {
            if (this.hasEventListener(event.type)) {
                event.target = this;
                for (var i = 0, l; l = _listeners[event.type][i]; i++) {
                    l(event)
                }
                return TRUE
            }
            return FALSE
        };
        this.hasEventListener = function (type) {
            return (typeof _listeners[type] != UNDEFINED && _listeners[type].length > 0)
        };
        this.getBaseURL = function () {
            var url = _l.href;
            if (url.indexOf("#") != -1) {
                url = url.substr(0, url.indexOf("#"))
            }
            if (url.substr(url.length - 1) == "/") {
                url = url.substr(0, url.length - 1)
            }
            return url
        };
        this.getStrict = function () {
            return _opts.strict
        };
        this.setStrict = function (strict) {
            _opts.strict = strict
        };
        this.getHistory = function () {
            return _opts.history
        };
        this.setHistory = function (history) {
            _opts.history = history
        };
        this.getTracker = function () {
            return _opts.tracker
        };
        this.setTracker = function (tracker) {
            _opts.tracker = tracker
        };
        this.getTitle = function () {
            return _d.title
        };
        this.setTitle = function (title) {
            if (!_supported) {
                return null
            }
            if (typeof title == UNDEFINED) {
                return
            }
            if (title == "null") {
                title = ""
            }
            title = _dc(title);
            _st(function () {
                _title = _d.title = title;
                if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                    _frame.contentWindow.document.title = title;
                    _juststart = FALSE
                }
                if (!_justset && _mozilla) {
                    _l.replace(_l.href.indexOf("#") != -1 ? _l.href : _l.href + "#")
                }
                _justset = FALSE
            }, 10)
        };
        this.getStatus = function () {
            return _t.status
        };
        this.setStatus = function (status) {
            if (!_supported) {
                return null
            }
            if (typeof status == UNDEFINED) {
                return
            }
            if (status == "null") {
                status = ""
            }
            status = _dc(status);
            if (!_safari) {
                status = _strictCheck((status != "null") ? status : "", TRUE);
                if (status == "/") {
                    status = ""
                }
                if (!(/http(s)?:\/\//.test(status))) {
                    var index = _l.href.indexOf("#");
                    status = (index == -1 ? _l.href : _l.href.substr(0, index)) + "#" + status
                }
                _t.status = status
            }
        };
        this.resetStatus = function () {
            _t.status = ""
        };
        this.getValue = function () {
            if (!_supported) {
                return null
            }
            return _dc(_strictCheck(_ieLocal(_value, FALSE), FALSE))
        };
        this.setValue = function (value) {
            if (!_supported) {
                return null
            }
            if (typeof value == UNDEFINED) {
                return
            }
            if (value == "null") {
                value = ""
            }
            value = _ec(_dc(_strictCheck(value, TRUE)));
            if (value == "/") {
                value = ""
            }
            if (_value == value) {
                return
            }
            _justset = TRUE;
            _value = value;
            _silent = TRUE;
            _update.call(FWDAddress, true);
            _stack[_h.length] = _value;
            
           
                if (_value != _getHash()) {
                    if (_opts.history) {
                        _l.hash = "#" + _dc(_ieLocal(_value, TRUE))
                    } else {
                        _l.replace("#" + _dc(_value))
                    }
                }
            if ((_msie && _version < 8) && _opts.history) {
                _st(_htmlWrite, 50)
            }
            if (_safari) {
                _st(function () {
                    _silent = FALSE
                }, 1)
            } else {
                _silent = FALSE
            }
        
        };
        this.getPath = function () {
            var value = this.getValue();
            if (value.indexOf("?") != -1) {
                return value.split("?")[0]
            } else {
                if (value.indexOf("#") != -1) {
                    return value.split("#")[0]
                } else {
                    return value
                }
            }
        };
        this.getPathNames = function () {
            var path = this.getPath(),
                names = path.split("/");
            if (path.substr(0, 1) == "/" || path.length == 0) {
                names.splice(0, 1)
            }
            if (path.substr(path.length - 1, 1) == "/") {
                names.splice(names.length - 1, 1)
            }
            return names
        };
        this.getQueryString = function () {
            var value = this.getValue(),
                index = value.indexOf("?");
            if (index != -1 && index < value.length) {
                return value.substr(index + 1)
            }
        };
        this.getParameter = function (param) {
            var value = this.getValue();
            var index = value.indexOf("?");
            if (index != -1) {
                value = value.substr(index + 1);
                var p, params = value.split("&"),
                    i = params.length,
                    r = [];
                while (i--) {
                    p = params[i].split("=");
                    if (p[0] == param) {
                        r.push(p[1])
                    }
                }
                if (r.length != 0) {
                    return r.length != 1 ? r : r[0]
                }
            }
        };
        this.getParameterNames = function () {
            var value = this.getValue();
            var index = value.indexOf("?");
            var names = [];
            if (index != -1) {
                value = value.substr(index + 1);
                if (value != "" && value.indexOf("=") != -1) {
                    var params = value.split("&"),
                        i = 0;
                    while (i < params.length) {
                        names.push(params[i].split("=")[0]);
                        i++
                    }
                }
            }
            return names
        };
        this.onInit = null;
        this.onChange = null;
        this.onInternalChange = null;
        this.onExternalChange = null;
        (function () {
            var _args;
            if (typeof FlashObject != UNDEFINED) {
                SWFObject = FlashObject
            }
            if (typeof SWFObject != UNDEFINED && SWFObject.prototype && SWFObject.prototype.write) {
                var _s1 = SWFObject.prototype.write;
                SWFObject.prototype.write = function () {
                    _args = arguments;
                    if (this.getAttribute("version").major < 8) {
                        this.addVariable("$fwdaddress", FWDAddress.getValue());
                        ((typeof _args[0] == "string") ? document.getElementById(_args[0]) : _args[0]).so = this
                    }
                    var success;
                    if (success = _s1.apply(this, _args)) {
                        _ref.addId(this.getAttribute("id"))
                    }
                    return success
                }
            }
            if (typeof swfobject != UNDEFINED) {
                var _s2r = swfobject.registerObject;
                swfobject.registerObject = function () {
                    _args = arguments;
                    _s2r.apply(this, _args);
                    _ref.addId(_args[0])
                };
                var _s2c = swfobject.createSWF;
                swfobject.createSWF = function () {
                    _args = arguments;
                    var swf = _s2c.apply(this, _args);
                    if (swf) {
                        _ref.addId(_args[0].id)
                    }
                    return swf
                };
                var _s2e = swfobject.embedSWF;
                swfobject.embedSWF = function () {
                    _args = arguments;
                    if (typeof _args[8] == UNDEFINED) {
                        _args[8] = {}
                    }
                    if (typeof _args[8].id == UNDEFINED) {
                        _args[8].id = _args[1]
                    }
                    _s2e.apply(this, _args);
                    _ref.addId(_args[8].id)
                }
            }
            if (typeof UFO != UNDEFINED) {
                var _u = UFO.create;
                UFO.create = function () {
                    _args = arguments;
                    _u.apply(this, _args);
                    _ref.addId(_args[0].id)
                }
            }
            if (typeof AC_FL_RunContent != UNDEFINED) {
                var _a = AC_FL_RunContent;
                AC_FL_RunContent = function () {
                    _args = arguments;
                    _a.apply(this, _args);
                    for (var i = 0, l = _args.length; i < l; i++) {
                        if (_args[i] == "id") {
                            _ref.addId(_args[i + 1])
                        }
                    }
                }
            }
        })()
    };/**
 * Royal Audio Player
 * Event disptatcher.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
	
	var FWDRAPEventDispatcher = function (){

		'use strict';
		
	    this.listeners = {events_ar:[]};
	     
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    	
	    	this.addListener = null;
		    this.dispatchEvent = null;
		    this.removeListener = null;
	    };
	    
	};	
	
	window.FWDRAPEventDispatcher = FWDRAPEventDispatcher;
}(window));/**
 * Royal Audio Player
 * Timeout hider.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
    var FWDRAPHider = function(screenToTest, screenToTest2, hideDelay){

    	'use strict';
    	
    	var _s = this;
    	var prototype = FWDRAPHider.prototype;
   
    	_s.screenToTest = screenToTest;
    	_s.screenToTest2 = screenToTest2;
    	_s.hideDelay = hideDelay;
    	_s.globalX = 0;
    	_s.globalY = 0;
    	_s.dispatchOnceShow_bl = true;
    	_s.isStopped_bl = true;
    	_s.isMbl = FWDRAPUtils.isMobile;
    	_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
    	
		_s.init = function(){};
	
		_s.start = function(){
			_s.currentTime = new Date().getTime();
			clearInterval(_s.checkIntervalId_int);
			_s.checkIntervalId_int = setInterval(_s.update, 100);
			_s.addMouseOrTouchCheck();
			_s.isStopped_bl = false;
		};
		
		_s.stop = function(){
			clearInterval(_s.checkIntervalId_int);
			_s.isStopped_bl = true;
			_s.removeMouseOrTouchCheck();
			_s.removeMouseOrTouchCheck2();
		};
		
		_s.addMouseOrTouchCheck = function(){	
			if(_s.hasInitialTestEvents_bl) return;
			_s.hasInitialTestEvents_bl = true;
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screenToTest.screen.addEventListener("pointerdown", _s.onMouseOrTouchUpdate);
					_s.screenToTest.screen.addEventListener("MSPointerMove", _s.onMouseOrTouchUpdate);
				}else{
					_s.screenToTest.screen.addEventListener("touchstart", _s.onMouseOrTouchUpdate);
				}
			}else if(window.addEventListener){
				window.addEventListener("mousemove", _s.onMouseOrTouchUpdate);
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", _s.onMouseOrTouchUpdate);
			}
		};
		
		_s.removeMouseOrTouchCheck = function(){	
			if(!_s.hasInitialTestEvents_bl) return;
			_s.hasInitialTestEvents_bl = false;
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screenToTest.screen.removeEventListener("pointerdown", _s.onMouseOrTouchUpdate);
					_s.screenToTest.screen.removeEventListener("MSPointerMove", _s.onMouseOrTouchUpdate);
				}else{
					_s.screenToTest.screen.removeEventListener("touchstart", _s.onMouseOrTouchUpdate);
				}
			}else if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.onMouseOrTouchUpdate);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.onMouseOrTouchUpdate);
			}
		};
		
		_s.addMouseOrTouchCheck2 = function(){	
			if(_s.addSecondTestEvents_bl) return;
			_s.addSecondTestEvents_bl = true;
			if(_s.screenToTest.screen.addEventListener){
				_s.screenToTest.screen.addEventListener("mousemove", _s.secondTestMoveDummy);
			}else if(_s.screenToTest.screen.attachEvent){
				_s.screenToTest.screen.attachEvent("onmousemove", _s.secondTestMoveDummy);
			}
		};
		
		_s.removeMouseOrTouchCheck2 = function(){	
			if(!_s.addSecondTestEvents_bl) return;
			_s.addSecondTestEvents_bl = false;
			if(_s.screenToTest.screen.removeEventListener){
				_s.screenToTest.screen.removeEventListener("mousemove", _s.secondTestMoveDummy);
			}else if(_s.screenToTest.screen.detachEvent){
				_s.screenToTest.screen.detachEvent("onmousemove", _s.secondTestMoveDummy);
			}
		};
		
		_s.secondTestMoveDummy = function(){
			_s.removeMouseOrTouchCheck2();
			_s.addMouseOrTouchCheck();
		};
		
		_s.onMouseOrTouchUpdate = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			
			if(_s.globalX != viewportMouseCoordinates.screenX
			   && _s.globalY != viewportMouseCoordinates.screenY){
				_s.currentTime = new Date().getTime();
			}
			
			_s.globalX = viewportMouseCoordinates.screenX;
			_s.globalY = viewportMouseCoordinates.screenY;
			
			if(!_s.isMbl){
				if(!FWDRAPUtils.hitTest(_s.screenToTest.screen, _s.globalX, _s.globalY)){
					_s.removeMouseOrTouchCheck();
					_s.addMouseOrTouchCheck2();
				}
			}
		};
	
		_s.update = function(e){
			if(new Date().getTime() > _s.currentTime + _s.hideDelay){
				if(_s.dispatchOnceShow_bl){	
					_s.dispatchOnceHide_bl = true;
					_s.dispatchOnceShow_bl = false;	
					_s.dispatchEvent(FWDRAPHider.HIDE);
					clearTimeout(_s.hideCompleteId_to);
					_s.hideCompleteId_to = setTimeout(function(){
						_s.dispatchEvent(FWDRAPHider.HIDE_COMPLETE);
					}, 1000);
				}
			}else{
				if(_s.dispatchOnceHide_bl){
					clearTimeout(_s.hideCompleteId_to);
					_s.dispatchOnceHide_bl = false;
					_s.dispatchOnceShow_bl = true;
					_s.dispatchEvent(FWDRAPHider.SHOW);
				}
			}
		};

		_s.reset = function(){
			clearTimeout(_s.hideCompleteId_to);
			_s.currentTime = new Date().getTime();
			_s.dispatchEvent(FWDRAPHider.SHOW);
		};
		
		_s.init();
     };
     
	 FWDRAPHider.HIDE = "hide";
	 FWDRAPHider.SHOW = "show";
	 FWDRAPHider.HIDE_COMPLETE = "hideComplete";
	 
	 FWDRAPHider.setPrototype = function(){
		 FWDRAPHider.prototype = new FWDRAPEventDispatcher();
	 };
	 

	 window.FWDRAPHider = FWDRAPHider;
}(window));/**
 * Royal Audio Player
 * Error info window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPInfo = function(prt, warningIconPath){
		
		'use strict';

		var _s = this;
		var prototype = FWDRAPInfo.prototype;
			
		_s.warningIconPath_str = warningIconPath;
		_s.isShowedOnce_bl = false;
		_s.allowToRemove_bl = true;
		

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			_s.setResizableSizeAfterParent();
			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.setAlpha(.6);
			_s.bk_do.setBkColor("#000000");
			_s.addChild(_s.bk_do);
			
			_s.textHolder_do = new FWDRAPDisplayObject("div");
			if(!FWDRAPUtils.isIEAndLessThen9) _s.textHolder_do.getStyle().font = "Arial";
			_s.textHolder_do.getStyle().wordWrap = "break-word";
			_s.textHolder_do.getStyle().padding = "10px";
			_s.textHolder_do.getStyle().paddingLeft = "42px";
			_s.textHolder_do.getStyle().lineHeight = "18px";
			_s.textHolder_do.getStyle().color = "#000000";
			_s.textHolder_do.setBkColor("#EEEEEE");
			
			var img_img = new Image();
			img_img.src = _s.warningIconPath_str;
			_s.img_do = new FWDRAPDisplayObject("img");
			_s.img_do.setScreen(img_img);
			_s.img_do.setWidth(28);
			_s.img_do.setHeight(28);
			
			_s.addChild(_s.textHolder_do);
			_s.addChild(_s.img_do);
		};
		
		_s.showText = function(txt){
			if(!_s.isShowedOnce_bl){
				if(_s.screen.addEventListener){
					_s.screen.addEventListener("click", _s.closeWindow);
				}else if(_s.screen.attachEvent){
					_s.screen.attachEvent("onclick", _s.closeWindow);
				}
				_s.isShowedOnce_bl = true;
			}
			
			_s.setVisible(false);
			
				_s.textHolder_do.getStyle().paddingBottom = "10px";
				_s.textHolder_do.setInnerHTML(txt);
			
			
			clearTimeout(_s.show_to);
			_s.show_to = setTimeout(_s.show, 60);
			setTimeout(function(){
				_s.positionAndResize();
			}, 10);
		};
		
		_s.show = function(){
			var finalW = Math.min(640, prt.sW - 120);
			_s.isShowed_bl = true;
		
			_s.textHolder_do.setWidth(finalW);
			setTimeout(function(){
				_s.setVisible(true);
				_s.positionAndResize();
			}, 100);
		};
		
		_s.positionAndResize = function(){
			
			var finalW = _s.textHolder_do.getWidth();
			var finalH = _s.textHolder_do.getHeight();
			var finalX = parseInt((prt.sW - finalW)/2);
			var finalY = parseInt((prt.sH - finalH)/2);
			
			_s.bk_do.setWidth(prt.sW);
			_s.bk_do.setHeight(prt.sH);
			_s.textHolder_do.setX(finalX);
			_s.textHolder_do.setY(finalY);
			
			_s.img_do.setX(finalX + 6);
			_s.img_do.setY(finalY + parseInt((_s.textHolder_do.getHeight() - _s.img_do.h)/2));
		};
		
		_s.closeWindow = function(){
			if(!_s.allowToRemove_bl) return;
			_s.isShowed_bl = false;
			clearTimeout(_s.show_to);
			try{prt.main_do.removeChild(_s);}catch(e){}
		};
		
		_s.init();
	};
	
		
	/* set prototype */
	FWDRAPInfo.setPrototype = function(){
		FWDRAPInfo.prototype = new FWDRAPDisplayObject("div", "relative");
	};
	
	FWDRAPInfo.prototype = null;
	window.FWDRAPInfo = FWDRAPInfo;
}(window));/**
 * Royal Audio Player
 * Passowrd window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPPassword = function(_d, prt, lg){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPPassword.prototype;
	
		_s.passColoseN_img = _d.passColoseN_img;
		_s.privateVideoPassword_str = _d.privateVideoPassword_str;
		
		_s.backgrondPath_str = _d.shareBkPath_str;
		
		_s.secondaryLabelsColor_str = _d.secondaryLabelsColor_str;
		_s.inputColor_str = _d.inputColor_str;
		_s.mainLabelsColor_str = _d.mainLabelsColor_str;
		_s.passButtonNPath_str = _d.passButtonNPath_str;
		_s.passButtonSPath_str = _d.passButtonSPath_str;
		_s.inputBackgroundColor_str = _d.inputBackgroundColor_str;
		_s.borderColor_str = _d.borderColor_str;
		
		_s.maxTextWidth = 0;
		_s.totalWidth = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.buttonWidth = 28;
		_s.buttonHeight = 19;
		_s.embedWindowCloseButtonMargins = _d.playbackRateButtonsMargins;

		_s.useVectorIcons_bl = _d.useVectorIcons;
		_s.isMbl = FWDRAPUtils.isMobile;
	

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			if(_s.mainHld) return;
			_s.setBackfaceVisibility();
			_s.mainHld = new FWDRAPDisplayObject("div");
			_s.mainHld.hasTransform3d_bl = false;
			_s.mainHld.hasTransform2d_bl = false;
			_s.mainHld.setBackfaceVisibility();
			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.screen.className = 'fwdrap-window-background';
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			_s.bk_do.getStyle().background = "url('" + _s.backgrondPath_str + "')";
		
			_s.passMainHolder_do =  new FWDRAPDisplayObject("div");
			
			_s.passMainHolderBk_do = new FWDRAPDisplayObject("div");
			_s.passMainHolderBk_do.screen.className = 'fwdrap-form-holder-background';
			_s.passMainHolderBk_do.getStyle().background = "url('" + _s.backgrondPath_str + "')";
			_s.passMainHolderBk_do.getStyle().borderStyle = "solid";
			_s.passMainHolderBk_do.getStyle().borderWidth = "1px";
			_s.passMainHolderBk_do.getStyle().borderColor =  _s.borderColor_str;
			
			_s.passLabel_do = new FWDRAPDisplayObject("div");
			_s.passLabel_do.screen.className = 'fwdrap-label';
			_s.passLabel_do.setBackfaceVisibility();
			_s.passLabel_do.getStyle().fontFamily = "Arial";
			_s.passLabel_do.getStyle().fontSize= "12px";
			_s.passLabel_do.getStyle().color = _s.secondaryLabelsColor_str;
			_s.passLabel_do.getStyle().whiteSpace= "nowrap";
			_s.passLabel_do.getStyle().padding = "0px";
			_s.passLabel_do.setInnerHTML("Please enter password:");
	
			if(!lg){
				_s.passInput_do = new FWDRAPDisplayObject("input");
				_s.passInput_do.setBackfaceVisibility();
				_s.passInput_do.screen.className = 'fwdrap-form-input';
				_s.passInput_do.getStyle().fontFamily = "Arial";
				_s.passInput_do.getStyle().fontSize= "12px";
				_s.passInput_do.getStyle().backgroundColor = _s.inputBackgroundColor_str;
				_s.passInput_do.getStyle().color = _s.inputColor_str;
				_s.passInput_do.getStyle().outline = 0;
				_s.passInput_do.getStyle().whiteSpace= "nowrap";
				_s.passInput_do.getStyle().padding = "4px 6px 3px";
				_s.passInput_do.screen.setAttribute("type", "password");
				_s.passInput_do.getStyle().webkitBoxShadow=  "0 0 0 1000px" + _s.inputBackgroundColor_str + " inset";
				
				FWDRAPSimpleSizeButton.setPrototype();
				_s.passBtn = new FWDRAPSimpleSizeButton(
						_s.passButtonNPath_str, 
						_s.passButtonSPath_str,
						_s.buttonWidth,
						_s.buttonHeight,
						_d.useHEX,
						_d.nBC,
						_d.sBC, 
						true);
				_s.passBtn.screen.className = 'fwdrap-pass-button';
				_s.passBtn.addListener(FWDRAPSimpleSizeButton.CLICK, _s.passClickHandler);
			
				//setup close button.
				FWDRAPSimpleButton.setPrototype();
				if(_s.useVectorIcons_bl){
					_s.clsBtn = new FWDRAPSimpleButton(
							0, 0, 0, 0, 0, 0, 0,
							"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
							"fwdrap-categories-next-and-prev-normal-state",
							"fwdrap-categories-next-and-prev-selected-state"
					);
				}else{
					_s.clsBtn = new FWDRAPSimpleButton(
						_s.passColoseN_img, 
						_d.embedWindowClosePathS_str, 
						undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC, 
						false, false, false, true);
				}
				_s.clsBtn.screen.className = 'fwdrap-close-button';
				_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
				
				_s.addChild(_s.mainHld);
				_s.mainHld.addChild(_s.bk_do);
			
				_s.passMainHolder_do.addChild(_s.passMainHolderBk_do);
				_s.passMainHolder_do.addChild(_s.passLabel_do);
				_s.passMainHolder_do.addChild(_s.passInput_do);
				_s.passMainHolder_do.addChild(_s.passBtn);
				_s.mainHld.addChild(_s.passMainHolder_do);
				_s.mainHld.addChild(_s.clsBtn); 
			}else{
				_s.addChild(_s.mainHld);
				_s.mainHld.addChild(_s.bk_do);
				_s.mainHld.addChild(_s.passLabel_do);
				_s.passLabel_do.setInnerHTML(_d.playIfLoggedInMessage);

				var clsn = 'fwdrap-loggedin-message-white';
				if(_d.isDark){
					clsn = 'fwdrap-loggedin-message-dark';
				}
				_s.passLabel_do.screen.className = clsn;

				FWDRAPSimpleButton.setPrototype();
				if(_s.useVectorIcons_bl){
					_s.clsBtn = new FWDRAPSimpleButton(
							0, 0, 0, 0, 0, 0, 0,
							"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
							"fwdrap-categories-next-and-prev-normal-state",
							"fwdrap-categories-next-and-prev-selected-state"
					);
					_s.clsBtn.screen.className = 'fwdrap-close-button';
					_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
					_s.mainHld.addChild(_s.clsBtn); 
				}else{

					var clsNImg = new Image();
					clsNImg.src = _s.passColoseN_img.src;
					clsNImg.onload = function(){

						//setup close button.
						FWDRAPSimpleButton.setPrototype();
						_s.clsBtn = new FWDRAPSimpleButton(
								clsNImg, 
								_d.embedWindowClosePathS_str, 
								undefined,
								true,
								_d.useHEX,
								_d.nBC,
								_d.sBC, 
								false, false, false, true);
						_s.clsBtn.screen.className = 'fwdrap-close-button';
						_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
						_s.mainHld.addChild(_s.clsBtn); 
						clsNImg.onload = null;
						_s.posClsBtn();
					}
				}
			}		
		};
	
		_s.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide();
		};
		
		function selectText(){
			if(window.top != window && FWDRAPUtils.isIE) return;
			var range, selection;
			if (document.body.createTextRange) {
				range = document.body.createTextRange();
			    range.moveToElementText(_s);
			    range.select();
			}else if(window.getSelection && document.createRange) {
			    selection = window.getSelection();
			    range = document.createRange();
			    range.selectNodeContents(_s);
			    selection.removeAllRanges();
			    selection.addRange(range);
			}
		};
		
		_s.positionAndResize = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			
			_s.maxTextWidth = Math.min(_s.sW - 150, 300);
			_s.totalWidth = _s.maxTextWidth + _s.buttonWidth;
			
			_s.positionFinal();
			_s.posClsBtn();
			
			_s.setY(0);
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			
		};

		_s.posClsBtn = function(){
			if(_s.clsBtn){
				_s.clsBtn.setX(_s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins);
				_s.clsBtn.setY(_s.embedWindowCloseButtonMargins);
			}
		}
		
		_s.positionFinal = function(){
			
			var totalHeight;
			var textLableHeight = _s.passLabel_do.getHeight();
			var passMainLabelHeight;
			
			if(!lg){
				_s.passLabel_do.setX(12);
				_s.passLabel_do.setY(14);
				
				_s.passInput_do.setX(10);
				_s.passInput_do.setWidth(parseInt(_s.totalWidth - 40 - _s.buttonWidth));
				_s.passInput_do.setY(_s.passLabel_do.y + textLableHeight + 5);
				_s.passBtn.setX(10 + _s.passInput_do.w + 20);
				_s.passBtn.setY(_s.passLabel_do.y + textLableHeight + 6);
				
				_s.passMainHolderBk_do.setY(_s.passLabel_do.y - 9);
				_s.passMainHolderBk_do.setWidth(_s.totalWidth - 2);
				_s.passMainHolderBk_do.setHeight(_s.passBtn.y + _s.passBtn.h + 2);
				_s.passMainHolder_do.setWidth(_s.totalWidth);
				_s.passMainHolder_do.setHeight(_s.passBtn.y + _s.passBtn.h + 14);

				_s.passMainHolder_do.setX(Math.round((_s.sW - _s.totalWidth)/2));
				totalHeight = _s.passMainHolderBk_do.getHeight();
				_s.passMainHolder_do.setY(Math.round((_s.sH - totalHeight)/2) - 6);
			}else{
				_s.passLabel_do.setX(Math.round((_s.sW - _s.passLabel_do.getWidth())/2));
				_s.passLabel_do.setY(Math.round((_s.sH - _s.passLabel_do.getHeight())/2));
			}
			
		};
		

		//##############################################//
		/* Send email */
		//##############################################//
		_s.passClickHandler = function(){
			_s.privateVideoPassword_str = _d.privateVideoPassword_str;
			if(_d.playlist_ar[prt.id]["privateVideoPassword_str"]) _s.privateVideoPassword_str = _d.playlist_ar[prt.id]["privateVideoPassword_str"];
			
			if(_s.privateVideoPassword_str != FWDRAPUtils.MD5(_s.passInput_do.screen.value)){
				if(!FWDAnimation.isTweening(_s.passInput_do.screen)) FWDAnimation.to(_s.passMainHolderBk_do.screen, .1, {css:{borderColor:'#FF0000'}, yoyo:true, repeat:3});
				return;
			}
			_s.dispatchEvent(FWDRAPPassword.CORRECT);
		};
		

		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(normalColor_str, selectedColor_str){
			_s.passBtn.updateHEXColors(normalColor_str, selectedColor_str);
			_s.clsBtn.updateHEXColors(normalColor_str, selectedColor_str);
		}
		

		/* show hide info */
		//#########################################//
		_s.showInfo = function(text, hasError){
				
			_s.infoText_do.setInnerHTML(text);
			_s.passMainHolder_do.addChild(_s.infoText_do);
			_s.infoText_do.setWidth(_s.buttonWidth);
			_s.infoText_do.setHeight(_s.buttonHeight - 4);
			_s.infoText_do.setX(_s.passBtn.x);
			_s.infoText_do.setY(_s.passBtn.y - 23);

			_s.infoText_do.setAlpha(0);
			if(hasError){
				_s.infoText_do.getStyle().color = "#FF0000";
			}else{
				_s.infoText_do.getStyle().color = _s.mainLabelsColor_str;
			}
			FWDAnimation.killTweensOf(_s.infoText_do);
			FWDAnimation.to(_s.infoText_do, .16, {alpha:1, yoyo:true, repeat:7});
		};
		

		//###########################################//
		/* show / hide */
		//###########################################//
		_s.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			
			prt.main_do.addChild(_s);
			_s.init();
			_s.positionAndResize();

			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					if(_s.clsBtn.w != 0){
						_s.positionAndResize();
						
						clearInterval(_s.checkButtonsId_to);
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);
						
						_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
						FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
					}
				
				}, 50);
			}else{
				if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(true);
				
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
				setTimeout(function(){
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
				}, 100);
			}
		};
		
		_s.showCompleteHandler = function(){};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(prt.customContextMenu_do) prt.customContextMenu_do.enable();
			_s.positionAndResize();
			
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
		};
		
		_s.hideCompleteHandler = function(){
			prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDRAPPassword.HIDE_COMPLETE);
		};
	
		if(_d.useHEX){
			_s.init();
		}
	};

		
	/* set prototype */
	FWDRAPPassword.setPrototype = function(){
		FWDRAPPassword.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPassword.ERROR = "error";
	FWDRAPPassword.CORRECT = "correct";
	FWDRAPPassword.HIDE_COMPLETE = "hideComplete";
	
	FWDRAPPassword.prototype = null;
	window.FWDRAPPassword = FWDRAPPassword;
}(window));/**
 * Royal Audio Player
 * Playback rate window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPPlaybackRateWindow = function(_d, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPPlaybackRateWindow.prototype;
				
		_s.embedColoseN_img = _d.embedColoseN_img;
		_s.bkColor = _d.scrubbersToolTipLabelBackgroundColor;
		
		_s.buttons_ar = [];
		
		_s.embedWindowBackground_str = _d.shareBkPath_str;
		_s.embedWindowCloseButtonMargins = _d.playbackRateButtonsMargins;
		_s.scrubbersHeight = _d.mainScrubberBkLeft_img.height;
		_s.scrubberBkMiddlePath_str = _d.mainScrubberBkMiddlePath_str;
		_s.scrubbersBkLeftAndRightWidth = _d.mainScrubberBkLeft_img.width;
	
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.sBC = _d.sBC;
		_s.mainScrubberDragMiddlePath_str = _d.mainScrubberDragMiddlePath_str;
		_s.scrubberDragLeftWidth = _d.mainScrubberDragLeft_img.width;
		_s.playbackRateWindowTextColor_str = _d.playbackRateWindowTextColor_str;
		_s.defaultPlaybackRate = _d.defaultPlaybackRate;
		_s.toolTipsButtonFontColor_str = _d.scrubbersToolTipLabelFontColor;
		_s.toopTipPointerUp_str = _d.toopTipPointer_str;
		_s.toopTipBk_str = _d.toopTipBk_str;
			
		_s.totalWidth = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.minMarginXSpace = 20;
		_s.hSpace = 20;
		_s.minHSpace = 10;
		_s.vSpace = 15;
		_s.minValue = 0.5;
		_s.maxValue = 3.0;
		_s.pointerWidth = 7;
		_s.pointerHeight = 4;
		_s.percent = 0;
		
		_s.toolTip_do;
		
		_s.useVectorIcons_bl = _d.useVectorIcons;
		_s.isMbl = FWDRAPUtils.isMobile;
	

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			if(_s.clsBtn) return;
			
			_s.setBackfaceVisibility();
			_s.mainHld = new FWDRAPDisplayObject("div");
			_s.mainHld.hasTransform3d_bl = false;
			_s.mainHld.hasTransform2d_bl = false;
			_s.mainHld.setBackfaceVisibility();
			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			_s.bk_do.screen.className = 'fwdrap-window-background';
			_s.bk_do.getStyle().background = "url('" + _s.embedWindowBackground_str + "')";
			
			//setup close button
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.clsBtn = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
						"fwdrap-categories-next-and-prev-normal-state",
						"fwdrap-categories-next-and-prev-selected-state"
				);
			}else{
				_s.clsBtn = new FWDRAPSimpleButton(_d.playbackRateWindowClooseN_img, _d.playbackRateClosePathS_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC, 
						false, false, false, true);
			}
			_s.clsBtn.screen.className = 'fwdrap-close-button';
			_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			
			_s.addChild(_s.mainHld);
			_s.mainHld.addChild(_s.bk_do);
			_s.mainHld.addChild(_s.clsBtn); 
			
			_s.setupScrubber();
			_s.setupTooltip();
			
		};
	
		_s.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide(true);
		};
		
		_s.positionAndResize = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			
			var buttonfinalX = _s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins;
			var buttonFinalY = _s.embedWindowCloseButtonMargins;
			var finalY = 0;
			
			_s.clsBtn.setX(buttonfinalX);
			_s.clsBtn.setY(buttonFinalY);
			_s.setY(finalY);
			
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			_s.positionScruber();
			_s.updateScrubber(_s.percent);
		};
		
		_s.setupTooltip = function(){
			
			_s.mainToolTip_do = new FWDRAPDisplayObject("div");
			_s.mainToolTip_do.setOverflow("visible");
			
			_s.pointerHolder_do = new FWDRAPDisplayObject("div");
			_s.pointerHolder_do.setOverflow('visible');
			_s.addChild(_s.pointerHolder_do);
			_s.mainToolTip_do.getStyle().backgroundColor = _s.bkColor;
			_s.mainToolTip_do.screen.className = 'fwdrap-controler-tooltip-background';
		
			_s.text_do = new FWDRAPDisplayObject("div");
			_s.text_do.hasTransform3d_bl = false;
			_s.text_do.hasTransform2d_bl = false;
			_s.text_do.screen.className = 'fwdrap-controler-tooltip-text';
			_s.text_do.setBackfaceVisibility();
			_s.text_do.setDisplay("inline");
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "12px";
			_s.text_do.getStyle().color = _s.toolTipsButtonFontColor_str;
			_s.text_do.getStyle().whiteSpace= "nowrap";
			_s.text_do.getStyle().padding = "4px 7px";

			_s.pointer_do = new FWDRAPDisplayObject("div");
			_s.pointer_do.screen.className = 'fwdrap-controler-tooltip-pointer';
			_s.pointer_do.setBkColor(_s.bkColor);
			_s.pointer_do.screen.style = "border: 4px solid transparent; border-top-color: " + _s.bkColor + ";";
			_s.pointerHolder_do.addChild(_s.pointer_do);
			
		
			_s.pointer_do.setHeight(_s.pointerHeight);
			_s.mainToolTip_do.addChild(_s.pointerHolder_do);
			_s.mainToolTip_do.addChild(_s.text_do);
			_s.mainHld.addChild(_s.mainToolTip_do);
		};
		

		//##########################################//
		/* set label */
		//##########################################//
		_s.setTooltipLabel = function(label){
		
			if(label == 1) label = "1.0";
			if(label) _s.text_do.setInnerHTML(label);
			
			if(_s.mainToolTip_do.w != 0){
				var finalX = parseInt((_s.mainToolTip_do.w - _s.pointerWidth)/2);
				var finalY = _s.mainToolTip_do.h;
			
				_s.pointer_do.setX(finalX);
				_s.pointer_do.setY(finalY); 
				return;
			}
			
			setTimeout(function(){
				_s.mainToolTip_do.setWidth(_s.text_do.getWidth());
				_s.mainToolTip_do.setHeight(_s.text_do.getHeight());
				
				var finalX = parseInt((_s.mainToolTip_do.w - _s.pointerWidth)/2);
				var finalY = _s.mainToolTip_do.h;
			
				_s.pointer_do.setX(finalX);
				_s.pointer_do.setY(finalY); 
			},50)
		};
		

		//###########################################//
		/* Setup buttons */
		//###########################################//
		_s.setupScrubber = function(){

			//setup background bar
			_s.scrubber_do = new FWDRAPDisplayObject("div");
			_s.scrubber_do.setOverflow('visible');
			_s.scrubber_do.setHeight(_s.scrubbersHeight);
			_s.scrubber_do.setButtonMode(true);
			
			_s.scrubberBkLeft_do = new FWDRAPDisplayObject("img");
			var scrubberBkLeft_img = new Image();
			scrubberBkLeft_img.src = _d.mainScrubberBkLeft_img.src;
			_s.scrubberBkLeft_do.setScreen(scrubberBkLeft_img);
			_s.scrubberBkLeft_do.setWidth(_d.mainScrubberBkLeft_img.wideth);
			_s.scrubberBkLeft_do.setHeight(_d.mainScrubberBkLeft_img.height);
			_s.scrubberBkLeft_do.screen.className = 'fwdrap-scrubber-bk-left';
			
			_s.scrubberBkRight_do = new FWDRAPDisplayObject("img");
			var scrubberBkRight_img = new Image();
			scrubberBkRight_img.src = _d.mainScrubberBkRight_img.src;
			_s.scrubberBkRight_do.setScreen(scrubberBkRight_img);
			_s.scrubberBkRight_do.setWidth(_d.mainScrubberBkRight_img.width);
			_s.scrubberBkRight_do.setHeight(_d.mainScrubberBkRight_img.height);
			_s.scrubberBkRight_do.screen.className = 'fwdrap-scrubber-bk-right';
			
			var middleImage = new Image();
			middleImage.src = _s.scrubberBkMiddlePath_str;

			_s.scrubberBkMiddle_do = new FWDRAPDisplayObject("div");	
			_s.scrubberBkMiddle_do.getStyle().background = "url('" + _s.scrubberBkMiddlePath_str + "')";
			_s.scrubberBkMiddle_do.screen.className = 'fwdrap-scrubber-bk-middle';

			_s.scrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.scrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			_s.scrubberDrag_do = new FWDRAPDisplayObject("div");
			_s.scrubberDrag_do.setHeight(_s.scrubbersHeight);
			
			if(_s.useHEX){
				_s.scrubberDragLeft_do = new FWDRAPDisplayObject("div");
				_s.scrubberDragLeft_do.setWidth(_d.mainScrubberDragLeft_img.width);
				_s.scrubberDragLeft_do.setHeight(_d.mainScrubberDragLeft_img.height);
				_s.scrubberDragLeft_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_d.mainScrubberDragLeft_img, _s.nBC).canvas;
				_s.scrubberDragLeft_do.screen.appendChild(_s.scrubberDragLeft_canvas);	
			}else{
				_s.mainScrubberDragLeft_img = new Image();
				_s.mainScrubberDragLeft_img.src = _d.mainScrubberDragLeft_img.src;
				_s.mainScrubberDragLeft_img.width = _d.mainScrubberDragLeft_img.width;
				_s.mainScrubberDragLeft_img.height = _d.mainScrubberDragLeft_img.height;
				_s.scrubberDragLeft_do = new FWDRAPDisplayObject("img");
				_s.scrubberDragLeft_do.setScreen(_s.mainScrubberDragLeft_img);
			}
			
			_s.mainScrubberMiddleImage = new Image();
			_s.mainScrubberMiddleImage.src = _d.mainScrubberDragMiddlePath_str;
			
			if(_s.useHEX){
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");
				_s.mainScrubberMiddleImage.onload = function(){
					_s.mainScrubberDragMiddle_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberMiddleImage, _s.nBC, true);
					_s.mainSCrubberMiddleCanvas = _s.mainScrubberDragMiddle_canvas.canvas;
					_s.mainSCrubberDragMiddleImageBackground = _s.mainScrubberDragMiddle_canvas.image;
					_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
				}
			}else{
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");	
				_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainScrubberDragMiddlePath_str + "') repeat-x";
			}
			
			_s.mainScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberDragMiddle_do.setX(_s.scrubberDragLeftWidth);
			
		
			_s.scrubberBarLine_do = new FWDRAPDisplayObject("img");
			var scrubberBarLine_img = new Image();
			scrubberBarLine_img.src = _d.mainScrubberLine_img.src;
			_s.scrubberBarLine_do.setScreen(scrubberBarLine_img);
			_s.scrubberBarLine_do.setWidth(_d.mainScrubberLine_img.width);
			_s.scrubberBarLine_do.setHeight(_d.mainScrubberLine_img.height);
			_s.scrubberBarLine_do.setAlpha(0);
			_s.scrubberBarLine_do.hasTransform3d_bl = false;
			_s.scrubberBarLine_do.hasTransform2d_bl = false;
			_s.scrubberBarLine_do.screen.className = 'fwdrap-scrubber-line';
			
			_s.minTime_do = new FWDRAPDisplayObject("div");
			_s.minTime_do.hasTransform3d_bl = false;
			_s.minTime_do.hasTransform2d_bl = false;
			_s.minTime_do.getStyle().fontFamily = "Arial";
			_s.minTime_do.getStyle().fontSize= "12px";
			_s.minTime_do.getStyle().whiteSpace= "nowrap";
			_s.minTime_do.getStyle().textAlign = "left";
			_s.minTime_do.getStyle().color = _s.playbackRateWindowTextColor_str;
			_s.minTime_do.screen.className = 'fwdrap-playbackrate-text';
			_s.minTime_do.setInnerHTML("0.5");
			_s.mainHld.addChild(_s.minTime_do);
			
			_s.maxTime_do = new FWDRAPDisplayObject("div");
			_s.maxTime_do.hasTransform3d_bl = false;
			_s.maxTime_do.hasTransform2d_bl = false;
			_s.maxTime_do.getStyle().fontFamily = "Arial";
			_s.maxTime_do.getStyle().fontSize= "12px";
			_s.maxTime_do.getStyle().whiteSpace= "nowrap";
			_s.maxTime_do.getStyle().textAlign = "left";
			_s.maxTime_do.getStyle().color = _s.playbackRateWindowTextColor_str;
			_s.maxTime_do.screen.className = 'fwdrap-playbackrate-text';
			_s.maxTime_do.setInnerHTML("3.0");
			_s.mainHld.addChild(_s.maxTime_do);
			
			//add all children
			_s.scrubber_do.addChild(_s.scrubberBkLeft_do);
			_s.scrubber_do.addChild(_s.scrubberBkMiddle_do);
			_s.scrubber_do.addChild(_s.scrubberBkRight_do);
			_s.scrubber_do.addChild(_s.scrubberBarLine_do);
			_s.scrubberDrag_do.addChild(_s.scrubberDragLeft_do);
			_s.scrubberDrag_do.addChild(_s.mainScrubberDragMiddle_do);
			_s.scrubber_do.addChild(_s.scrubberDrag_do);
			_s.scrubber_do.addChild(_s.scrubberBarLine_do);
			_s.mainHld.addChild(_s.scrubber_do);
			
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.scrubber_do.screen.addEventListener("pointerover", _s.mainScrubberOnOverHandler);
					_s.scrubber_do.screen.addEventListener("pointerout", _s.mainScrubberOnOutHandler);
					_s.scrubber_do.screen.addEventListener("pointerdown", _s.mainScrubberOnDownHandler);
				}else{
					_s.scrubber_do.screen.addEventListener("touchstart", _s.mainScrubberOnDownHandler);
				}
			}else if(_s.screen.addEventListener){	
				_s.scrubber_do.screen.addEventListener("mouseover", _s.mainScrubberOnOverHandler);
				_s.scrubber_do.screen.addEventListener("mouseout", _s.mainScrubberOnOutHandler);
				_s.scrubber_do.screen.addEventListener("mousedown", _s.mainScrubberOnDownHandler);
			}
		}
		
		_s.mainScrubberOnOverHandler =  function(e){};
		
		_s.mainScrubberOnOutHandler =  function(e){};
		
		_s.mainScrubberOnDownHandler =  function(e){
			
			if(e.preventDefault) e.preventDefault();
			_s.isScrubbing_bl = true;
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.scrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.scruberWidth - _s.scrubbersOffsetWidth){
				localX = _s.scruberWidth - _s.scrubbersOffsetWidth;
			}	
			var percentScrubbed = localX/_s.scruberWidth;
			var playlistItemPercentScrubb = localX/_s.scruberWidth;
			
			if(_s.disable_do) _s.addChild(_s.disable_do);
			
			_s.updateScrubber(percentScrubbed);
			
			_s.dispatchEvent(FWDRAPController.START_TO_SCRUB);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("pointermove", _s.mainScrubberMoveHandler);
					window.addEventListener("pointerup", _s.mainScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", _s.mainScrubberMoveHandler, {passive:false});
					window.addEventListener("touchend", _s.mainScrubberEndHandler);
				}
			}else{
				window.addEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.addEventListener("mouseup", _s.mainScrubberEndHandler);		
			}
		};
		
		_s.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.scrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.scruberWidth - _s.scrubbersOffsetWidth){
				localX = _s.scruberWidth - _s.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/_s.scruberWidth;
			var playlistItemPercentScrubb = localX/_s.scruberWidth;
			
			_s.updateScrubber(percentScrubbed);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
		};
		
		_s.mainScrubberEndHandler = function(e){
			_s.isScrubbing_bl = false;
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
			_s.updateScrubber();
		
			_s.dispatchEvent(FWDRAPController.STOP_TO_SCRUB);
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.removeEventListener("pointermove", _s.mainScrubberMoveHandler);
					window.removeEventListener("pointerup", _s.mainScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", _s.mainScrubberMoveHandler);
					window.removeEventListener("touchend", _s.mainScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", _s.mainScrubberMoveHandler);
					window.removeEventListener("mouseup", _s.mainScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", _s.mainScrubberMoveHandler);
					document.detachEvent("onmouseup", _s.mainScrubberEndHandler);		
				}
			}
		};
		
		_s.updateScrubber = function(percent, set){
			_s.percent = percent;
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}

			var finalWidth = parseInt(percent * _s.scruberWidth); 
			
			if(_s.isScrubbing_bl || set){
				_s.defaultPlaybackRate = Number(_s.minValue + (_s.maxValue - _s.minValue) * finalWidth / _s.scruberWidth).toFixed(1);
			}else{
				finalWidth = (_s.defaultPlaybackRate - _s.minValue) / (_s.maxValue - _s.minValue) * _s.scruberWidth;
			}
			
			if(finalWidth < 1 && _s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.scrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 2 && !_s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.scrubberBarLine_do, .5, {alpha:1});
			}
			
			_s.scrubberDrag_do.setWidth(finalWidth);
			
			_s.setTooltipLabel(_s.defaultPlaybackRate);
			_s.mainToolTip_do.setX(_s.scrubber_do.x + finalWidth - Math.round(_s.mainToolTip_do.w/2) + 1);
			_s.mainToolTip_do.setY(_s.scrubber_do.y - _s.mainToolTip_do.h - 5);
			
			if(finalWidth > _s.scruberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.scruberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.scrubberBarLine_do, .8, {x:finalWidth, ease:Expo.easeOut});
			
			_s.dispatchEvent(FWDRAPPlaybackRateWindow.SET_PLAYBACK_RATE, {rate:_s.defaultPlaybackRate});
		};
		
		
		//########################################//
		/* Position buttons */
		//########################################//
		_s.positionScruber = function(){
			_s.scruberWidth = Math.min(600, _s.sW - 100);
			_s.scrubber_do.setWidth(_s.scruberWidth);
			_s.scrubber_do.setX(Math.round((_s.sW - _s.scruberWidth)/2));
			_s.scrubber_do.setY(Math.round((_s.sH - _s.scrubbersHeight)/2));
			_s.scrubberBkMiddle_do.setWidth(_s.scruberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
			_s.scrubberBkRight_do.setX(_s.scruberWidth - _s.scrubbersBkLeftAndRightWidth);
			_s.mainScrubberDragMiddle_do.setWidth(_s.scruberWidth - _s.scrubbersBkLeftAndRightWidth);
			_s.minTime_do.setX(_s.scrubber_do.x - 26);
			_s.minTime_do.setY(_s.scrubber_do.y + 4);
			_s.maxTime_do.setX(_s.scrubber_do.x + _s.scrubber_do.w + 8);
			_s.maxTime_do.setY(_s.scrubber_do.y + 4);
		}
		

		//###########################################//
		/* show / hide */
		//###########################################//
		_s.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			prt.main_do.addChild(_s);

			_s.init();


			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(true);

			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					
					if(_s.clsBtn.w != 0){
				
						_s.positionAndResize();
						
						clearInterval(_s.checkButtonsId_to);
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);

						_s.positionScruber();
						setTimeout(function(){
							_s.updateScrubber(_s.percent);
						},200)
						
						_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
						
						FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
					
					}
				
				}, 50);
			}else{

				_s.positionAndResize();
				
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				_s.positionScruber();
				setTimeout(function(){
					_s.updateScrubber(_s.percent);
				},200)
				
				_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
				setTimeout(function(){
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
				}, 100);
			}
		};
		
		_s.showCompleteHandler = function(){};
		
		_s.hide = function(animate){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(prt.customContextMenu_do) prt.customContextMenu_do.enable();
			
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			if(animate){
				FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
			}else{
				_s.hideCompleteHandler();
			}
		};
		
		_s.hideCompleteHandler = function(){
			if(prt.main_do.contains(_s)) prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDRAPPlaybackRateWindow.HIDE_COMPLETE);
			
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(normalColor_str, selectedColor_str){
			
			if(_d.skinPath_str.indexOf("hex_white") != -1){
				_s.selectedColor_str = "#FFFFFF";
			}else{
				_s.selectedColor_str = selectedColor_str;
			}
			
			_s.clsBtn.updateHEXColors(normalColor_str, _s.selectedColor_str);
			FWDRAPUtils.changeCanvasHEXColor(_s.mainScrubberDragLeft_img, _s.scrubberDragLeft_canvas, normalColor_str);
			
			
			var newCenterImage = FWDRAPUtils.changeCanvasHEXColor(_s.mainScrubberMiddleImage, _s.mainSCrubberMiddleCanvas, normalColor_str, true);
			_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
			
		}
	
		if(_d.useHEX){
			_s.init();
		}
	};

		
	/* set prototype */
	FWDRAPPlaybackRateWindow.setPrototype = function(){
		FWDRAPPlaybackRateWindow.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPlaybackRateWindow.HIDE_COMPLETE = "hideComplete";
	FWDRAPPlaybackRateWindow.SET_PLAYBACK_RATE = "setPlaybackRate";
	
	FWDRAPPlaybackRateWindow.prototype = null;
	window.FWDRAPPlaybackRateWindow = FWDRAPPlaybackRateWindow;
}(window));/**
 * Royal Audio Player
 * Playlist.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(){
	var FWDRAPPlaylist = function(
			_d,
			prt
		){

		'use strict';
		
		var _s = this;
		_s._d = _d;
		var prototype = FWDRAPPlaylist.prototype;
		
		_s.searchBarButtons_ar;
		
		_s.playlistItemBk1_img = _d.playlistItemBk1_img;
		_s.playlistItemBk2_img = _d.playlistItemBk2_img;
		_s.playlistSeparator_img = _d.playlistSeparator_img;
		_s.playlistScrBkTop_img = _d.playlistScrBkTop_img;
		_s.playlistScrBkMiddle_img = _d.playlistScrBkMiddle_img;
		_s.playlistScrBkBottom_img = _d.playlistScrBkBottom_img;
		_s.playlistScrDragTop_img = _d.playlistScrDragTop_img;
		_s.playlistScrDragMiddle_img = _d.playlistScrDragMiddle_img;
		_s.playlistScrDragBottom_img = _d.playlistScrDragBottom_img;
		_s.playlistPlayButtonN_img = _d.playlistPlayButtonN_img;
		_s.playlistScrLines_img = _d.playlistScrLines_img;
		_s.playlistScrLinesOver_img = _d.playlistScrLinesOver_img;
		_s.playlistDownloadButtonN_img = _d.playlistDownloadButtonN_img;
		_s.playlistBuyButtonN_img = _d.playlistBuyButtonN_img;
		
		_s.playlistPlayButtonN_str = _d.playlistPlayButtonN_str;
		_s.playlistPlayButtonS_str = _d.playlistPlayButtonS_str;
		_s.playlistPauseButtonN_str = _d.playlistPauseButtonN_str;
		_s.playlistPauseButtonS_str = _d.playlistPauseButtonS_str;
		_s.controllerBkPath_str = _d.controllerBkPath_str;
		_s.playlistBackgroundColor_str = _d.playlistBackgroundColor_str;
		_s.searchInputColor_str = _d.searchInputColor_str;
		_s.toolTipsFntClr = _d.toolTipsFntClr;
		_s.toolTipsBkClr = _d.toolTipsBkClr;
		
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.n2BC = _d.n2BC;
		_s.sBC = _d.sBC;
		
		_s.inputSearchTextOffsetTop = _d.inputSearchTextOffsetTop;
		_s.inputSearchOffsetLeft = _d.inputSearchOffsetLeft;
		_s.startSpaceBetweenButtons = _d.startSpaceBetweenButtons;
		_s.spaceBetweenButtons = _d.spaceBetweenButtons;
		if(_s.spaceBetweenButtons > 15) _s.spaceBetweenButtons = 10;
		_s.countID3 = 0;
		_s.countTrack = 0;
		_s.id = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.itemsTotalHeight = 0;
		_s.scrollbarOffestWidth = _d.scrollbarOffestWidth;
		_s.scrWidth = _s.playlistScrBkTop_img.width;
		_s.trackTitleOffsetLeft = _d.trackTitleOffsetLeft;
		_s.downloadButtonOffsetRight = _d.downloadButtonOffsetRight;
		_s.itemHeight = _d.playlistItemHeight;
		_s.playPuaseIconWidth = _s.playlistPlayButtonN_img.width;
		_s.playPuaseIconHeight = _s.playlistPlayButtonN_img.height;
		_s.nrOfVisiblePlaylistItems = _d.nrOfVisiblePlaylistItems;
		_s.durationOffsetRight = _d.durationOffsetRight;
		_s.toolTipsDl = _d.toolTipsDl;
		_s.totalPlayListItems = 0;
		_s.visibleNrOfItems = 0;
		_s.yPositionOnPress = 0;
		_s.lastPresedY = 0;
		_s.lastListY = 0;
		_s.playListFinalY = 0;
		_s.scrollBarHandlerFinalY = 0;
		_s.scrollBarHandlerFinalY = 0;
		_s.vy = 0;
		_s.vy2 = 0;
		_s.friction = .9;
		_s.searchBarHeight = _d.searchBarHeight;
		_s.comboboxHeight = _d.playlistSelectorHeight;
		_s.searchBarPosition = _s._d.searchBarPosition
	
		_s.usePlaylistsSelectBox_bl = _d.usePlaylistsSelectBox_bl;
		_s.showButtonsToolTips_bl = _d.showButtonsToolTips_bl;
		_s.showSortButtons_bl =  _d.showSortButtons_bl;
		_s.isSortedNumerical_bl = true;
		_s.sortAscending_bl = _d.sortAscending_bl;
		_s.isShowNothingFound_bl = false;
		_s.expandPlaylistBackground_bl = _d.expandControllerBackground_bl;
		_s.showSearchBar_bl = _d.showSearchBar_bl;
		_s.addScrollBarMouseWheelSupport_bl = _d.addScrollBarMouseWheelSupport_bl;
		_s.showPlaylistItemDownloadButton_bl = _d.showPlaylistItemDownloadButton_bl;
		_s.showPlaylistItemBuyButton_bl = _d.showPlaylistItemBuyButton_bl;
		_s.allowToScrollAndScrollBarIsActive_bl = false;
		_s.showPlaylistItemPlayButton_bl = _d.showPlaylistItemPlayButton_bl;
		_s.isShowed_bl = _d.showPlayListByDefault_bl;
		_s.animateOnIntro_bl = _d.animateOnIntro_bl;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;


		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){

			_s.mainHolder_do = new FWDRAPDisplayObject("div");
			_s.mainHolder_do.screen.className = 'fwdrap-playlist-background fwdrap-main-holder';
			_s.mainHolder_do.setBkColor(_s.playlistBackgroundColor_str);
		
			_s.itemsHolder_do = new FWDRAPDisplayObject("div");
			_s.itemsHolder_do.setOverflow("visible");
			_s.itemsHolder_do.setY(0);
			
			_s.setupSeparator();
			_s.mainHolder_do.addChild(_s.itemsHolder_do);

			if(_s.isMbl){
				_s.setupMobileScrollbar();
				if(_s.hasPointerEvent_bl) _s.setupDisable();
			}else{
				_s.setupDisable();
				_s.setupScrollbar();
				if(_s.addScrollBarMouseWheelSupport_bl) _s.addMouseWheelSupport();
			}
			
			if(_s.usePlaylistsSelectBox_bl) _s.setupcomboBox();

			if(_s.searchBarPosition == 'top'){
				_s.dumyHolder = new FWDRAPDisplayObject("div"); 
				_s.dumyHolder.setOverflow('visible');
				_s.dumyHolder.setWidth(300);
				_s.dumyHolder.setHeight(300);
				var t = _s.searchBarHeight + _s.playlistSeparator_img.height;
				if(_s.usePlaylistsSelectBox_bl) t = _s.comboBox_do.h + _s.playlistSeparator_img.height;
				_s.dumyHolder.setY(t);
				_s.addChild(_s.dumyHolder);
				_s.dumyHolder.addChild(_s.mainHolder_do);
				
			}else{
				_s.addChild(_s.mainHolder_do);
			}

			if(_s.usePlaylistsSelectBox_bl){
				_s.addChild(_s.comboBox_do);
			}
			
			if(_s.showSearchBar_bl){
				_s.searchBar_do = new FWDRAPDisplayObject("div");
				_s.searchBar_do.screen.className = 'fwdrap-playlist-bottom-bar';
				_s.searchBar_do.setOverflow("visible");
				
				if(!_s.expandPlaylistBackground_bl){
					_s.controllerBk_do =  new FWDRAPDisplayObject("div");
					_s.controllerBk_do.getStyle().background = "url('" + _s.controllerBkPath_str +  "')";
				}else{
					_s.controllerBk_do = new FWDRAPDisplayObject("img");
					var imageBk_img = new Image();
					imageBk_img.src = _s.controllerBkPath_str;
					_s.controllerBk_do.setScreen(imageBk_img);
				}
				_s.controllerBk_do.screen.className = 'fwdrap-playlist-bottom-bar-background';
				_s.controllerBk_do.getStyle().width = "100%";
				
				_s.searchSeparator_do = new FWDRAPDisplayObject("div");
				_s.searchSeparator_do.setBackfaceVisibility();
				_s.searchSeparator_do.hasTransform3d_bl = false;
				_s.searchSeparator_do.hasTransform2d_bl = false;
				_s.searchSeparator_do.screen.className = 'fwdrap-controler-separator';
				_s.searchSeparator_do.getStyle().background = "url('" + _s.playlistSeparator_img.src + "')";
				_s.searchSeparator_do.setHeight(_s.playlistSeparator_img.height);
				
				_s.searchBar_do.setHeight(_s.searchBarHeight + _s.searchSeparator_do.h);
				_s.controllerBk_do.setHeight(_s.searchBar_do.h + 1);
				
				_s.searchBar_do.addChild(_s.controllerBk_do);
				_s.searchBar_do.addChild(_s.searchSeparator_do);
				
				_s.setupInput();
				if(_s.showSortButtons_bl){
					_s.setupButtons();
					if(_s.showButtonsToolTips_bl) _s.setupToolTips();
				}
				
				if(_s.searchBarPosition == 'top'){
					_s.dumyHolder.addChild(_s.searchBar_do);
					_s.searchSeparator_do.setY(_s.controllerBk_do.h)
				}else{
					_s.mainHolder_do.addChild(_s.searchBar_do);
				}
				
			}
			_s.addChild(_s.separator_do);
		};
		
		//###############################################//
		/* Setup combo-box */
		//###############################################//
		_s.setupcomboBox = function(){
			_s.labels_ar = [];
			for (var i=0; i<_d.cats_ar.length; i++){
				_s.labels_ar[i] = _d.cats_ar[i].playlistsName;
				var count = "";
				if(_d.showPlaylistsSelectBoxNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					_s.labels_ar[i] = count + _d.cats_ar[i].playlistsName;
				}else{
					_s.labels_ar[i] = _d.cats_ar[i].playlistsName;
				}
			}
			var settingsObj ={
				categories_ar:_s.labels_ar,
				selectorLabel:_s.labels_ar[0],
				bk1_str:_d.comboboxBk1_str,
				bk2_str:_d.comboboxBk2_str,
				selectorBackgroundNormalColor:_d.mainSelectorBackgroundSelectedColor,
				selectorTextNormalColor:_d.mainSelectorTextNormalColor,
				selectorTextSelectedColor:_d.mainSelectorTextSelectedColor,
				buttonBackgroundNormalColor:_d.mainButtonBackgroundNormalColor,
				buttonBackgroundSelectedColor:_d.mainButtonBackgroundSelectedColor,
				buttonTextNormalColor:_d.mainButtonTextNormalColor,
				buttonTextSelectedColor:_d.mainButtonTextSelectedColor,
				buttonHeight:_s.comboboxHeight,
				arrowN_str:_d.arrowN_str,
				arrowS_str:_d.arrowS_str,
				arrowW:11,
				arrowH:6
			}
			
			FWDRAPComboBox.setPrototype();
			_s.comboBox_do = new FWDRAPComboBox(_s, settingsObj);
			_s.comboBox_do.addListener(FWDRAPComboBox.BUTTON_PRESSED, _s.changePlaylistOnClick);
			_s.comboBox_do.setY(-_s.comboBox_do.h - 2);	
		}
		
		_s.changePlaylistOnClick = function(e){
			_s.dispatchEvent(FWDRAPPlaylist.CHANGE_PLAYLIST, {id:e.id});
		};
		
		
		_s.disableSearchBar = function(){
			if(_s.isSearchBarDisabled_bl) return;
			_s.isSearchBarDisabled_bl = true;
			_s.input_do.screen.value = "Loading ID3's ...";
			_s.input_do.screen.disabled = true;
				
			if(_s.sortNButton_do){
				_s.sortNButton_do.disable();
				_s.sortAButton_do.disable();
				_s.ascDscButton_do.disable();
			}
		};
		
		_s.enableSearchBar = function(){
			if(!_s.isSearchBarDisabled_bl) return;
			_s.isSearchBarDisabled_bl = false;
			_s.input_do.screen.value = "search for track";
			_s.input_do.screen.disabled = false;
			if(_s.sortNButton_do){
				_s.sortNButton_do.enable();
				_s.sortAButton_do.enable();
				_s.ascDscButton_do.enable();
			}
		};
		
	
		//###########################################//
		// Resize and position.
		//###########################################//
		_s.resizeAndPosition = function(){
			if(prt.sW == _s.sW && prt.sH == _s.sH) return;
			if(!_s.isListCreated_bl) return;
			_s.sW = prt.sW;
			
			if(_s.searchBar_do) _s.positionSearchBar();
			_s.positionList();
			if(_s.comboBox_do) _s.comboBox_do.resizeAndPosition();
			
			if(_s.scrMainHolder_do && _s.allowToScrollAndScrollBarIsActive_bl) _s.scrMainHolder_do.setX(_s.sW -  _s.scrWidth);
		};
		
		
		//##############################//
		/* position list */
		//##############################//
		_s.positionList = function(reverse){
			if(!_s.isListCreated_bl) return;
			
			var item;
			
			_s.copy_ar = [].concat(_s.items_ar);
			_s.isSearched_bl = false;
			
			if(_s.input_do){
				var inputValue = _s.input_do.screen.value;
				if(inputValue != "search for track" && !_s.isSearchBarDisabled_bl){
					inputValue = _s.input_do.screen.value.toLowerCase();
					for(var i=0; i<_s.copy_ar.length; i++){
						item = _s.copy_ar[i];
						if(item.titleText_str.toLowerCase().indexOf(inputValue.toLowerCase()) == -1){
							FWDAnimation.killTweensOf(item);
							if(item.alpha != 1) item.setAlpha(1);
							item.setX(-item.w);
							_s.copy_ar.splice(i, 1);
							i--;
						}
					}
				}
			}
			
			var count = 0;
			for(var i=0; i<_s.copy_ar.length; i++){
				item = _s.copy_ar[i];
				item.changeSource(i%2);
			}
			
			var totalItems = _s.copy_ar.length;
			_s.totalSearchedItems = totalItems;
			_s.itemsTotalHeight = (totalItems * _s.itemHeight);
		
			if(_s.visibleNrOfItems >= totalItems){
				_s.allowToScrollAndScrollBarIsActive_bl = false;
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = true;
			}
			
			for(var i=0; i<totalItems; i++){
				
				item = _s.copy_ar[i];
			
				if(_s.allowToTweenPlaylistItems_bl && item.x < 0 && !_s.isMbl){
					if(!FWDAnimation.isTweening(item)) FWDAnimation.to(item, .8, {x:0, ease:Expo.easeInOut});
				}else{
					FWDAnimation.killTweensOf(item);
					item.setX(0);	
				}
				item.setY(_s.itemHeight * i);
				
				if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
					item.resize(_s.sW - _s.scrollbarOffestWidth, _s.itemHeight);
				}else{
					item.resize(_s.sW, _s.itemHeight);
				}
				if(item.alpha != 1) item.setAlpha(1);
			}
		
			
			if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
				_s.itemsHolder_do.setWidth(_s.sW - _s.scrollbarOffestWidth);
			}else{
				_s.itemsHolder_do.setWidth(_s.sW);
			}
			
			if(_s.input_do){
				if(totalItems == 0){
					_s.showNothingFound();
				}else{
					_s.hideNothingFound();
				}
			}

			if(_s.scrHandler_do){
				_s.updateScrollBarSizeActiveAndDeactivate();
			} 
			_s.updateScrollBarHandlerAndContent(false, true);

			_s.separator_do.setWidth(_s.sW);
			_s.mainHolder_do.setWidth(_s.sW);
			_s.mainHolder_do.setHeight(_s.sH);
			_s.setWidth(_s.sW);
			if(_s.usePlaylistsSelectBox_bl){
				_s.setHeight(_s.sH + _s.comboboxHeight);
			}else{
				_s.setHeight(_s.sH);
			}
		};
		
		
		//################################//
		/* Update playlist */
		//###############################//
		_s.updatePlaylist = function(playlist){
			if(_s.isListCreated_bl) return;
			
			_s.playlist_ar = playlist;		
			var showDelay = _s.isShowedFirstTime_bl ? 50 : 600;
			_s.isShowedFirstTime_bl = true;
			_s.countTrack = 0;
			_s.isListCreated_bl = true;
			if(_s.input_do) _s.input_do.screen.value = "search for track";
			_s.allowToScrollAndScrollBarIsActive_bl = false;
			
			_s.visibleNrOfItems = _s.nrOfVisiblePlaylistItems;
			_s.totalPlayListItems = _s.playlist_ar.length;
			_s.totalSearchedItems = totalItems;
			if(_s.nrOfVisiblePlaylistItems > _s.totalPlayListItems){
				_s.visibleNrOfItems = _s.totalPlayListItems;
			}
			
			_s.sH = (_s.visibleNrOfItems * _s.itemHeight) + _s.separator_do.h;
			
			if(_s.searchBar_do) _s.sH += _s.separator_do.h + _s.searchBarHeight;
			
			_s.itemsTotalHeight = (_s.totalPlayListItems * _s.itemHeight);
			if(_s.searchBar_do){
				if(_s.searchBarPosition == 'top'){
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight - 3);
					_s.searchBar_do.setY(-_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3);
				}else{
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight);
				}
				
			}else{
				_s.mainHolder_do.setY(-_s.sH);
			}

			_s.itemsHolder_do.setY(0);
			_s.countID3 == 2001;
			
			
			if(_s.showSearchBar_bl) _s.enableSearchBar();
			_s.createPlayList();
			if(_s.sortNButton_do){
				_s.disableSortNButton();
				_s.ascDscButton_do.setButtonState(1);
			}

			if(!_s.sortAscending_bl){
				if(_s.sortNButton_do){
					_s.disableSortNButton();
					_s.ascDscButton_do.setButtonState(0);
					_s.sortList();
				}
			}
			 _s.loadId3();
			var totalItems = _s.items_ar.length;
			clearTimeout(_s.updateMobileScrollbarOnPlaylistLoadId_to);
			_s.updateMobileScrollbarOnPlaylistLoadId_to = setTimeout(_s.updateScrollBarHandlerAndContent, 900);
			
			clearTimeout(_s.showAnimationIntroId_to);
			
			_s.showAnimationIntroId_to = setTimeout(function(){
				var item;
				for(var i=0; i<totalItems; i++){
					item = _s.items_ar[i];
					item.setTextSizes();
				};
				_s.isListCreated_bl = true;
				if(_s.visibleNrOfItems >= _s.totalPlayListItems){
					_s.allowToScrollAndScrollBarIsActive_bl = false;
				}else{
					_s.allowToScrollAndScrollBarIsActive_bl = true;
				}
				
				if(_s.scrHandler_do) _s.updateScrollBarSizeActiveAndDeactivate();
				
				_s.positionList();
				prt.resizeHandler();
				
				if(_s.animateOnIntro_bl){
					if(_s.isShowed_bl) _s.show(true, true);
				}else{
					if(_s.isShowed_bl) _s.show(false, true);
				}
				if(!_s.isShowed_bl) _s.hide(false, true);
				_s.allowToTweenPlaylistItems_bl = true;
			},showDelay);

			if(_s._d.useVectorIcons){
				setTimeout(_s.positionList, 500);
			}
		};
		

		//######################################//
		/* Destroy current playlist */
		//######################################//
		_s.destroyPlaylist = function(){
			if(!_s.isListCreated_bl) return;
		
			var item;
			var totalItems = _s.items_ar.length;
			_s.isListCreated_bl = false;
			_s.allowToTweenPlaylistItems_bl = false;
			clearTimeout(_s.showAnimationIntroId_to);
			clearTimeout(_s.resetItemsAddOrderId_to);
			for(var i=0; i<totalItems; i++){
				item = _s.items_ar[i];
				_s.itemsHolder_do.removeChild(item);
				item.destroy();
				item = null;
			};
			_s.items_ar = null;
			_s.sH = 0;

			if(_s.comboBox_do){
				FWDAnimation.killTweensOf(_s.comboBox_do);
				_s.comboBox_do.setY(-_s.comboBox_do.h);
			}

			FWDAnimation.killTweensOf(_s.mainHolder_do);
			FWDAnimation.killTweensOf(prt.main_do);
			FWDAnimation.killTweensOf(prt.stageContainer);
			_s.separator_do.setY(-_s.separator_do.h - 1);
			_s.mainHolder_do.setY(-_s.h - 1);

			if(_s.searchBar_do){
				if(_s.searchBarPosition == 'top'){
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight - 3);
					_s.searchBar_do.setY(-_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3);
				}else{
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight);
				}
				
			}else{
				_s.mainHolder_do.setY(-_s.sH);
			}

			prt.main_do.setHeight(prt.controller_do.h - 1);
		
			prt.stageContainer.style.overflow = 'hidden'
			prt.stageContainer.style.height = (prt.controller_do.h - 1) + "px";
		};
		

		//#######################################//
		/* Create playlist */
		//#######################################//
		_s.createPlayList = function(){
			var item;
			var duration;
			var playlistItemProgress_img;
		
			_s.itemsHolder_do.setHeight(_s.totalPlayListItems * _s.itemHeight);
			
			_s.items_ar = [];
			
			for(var i=0; i<_s.totalPlayListItems; i++){
				duration = _s.playlist_ar[i].duration == undefined ? undefined : FWDRAPUtils.formatTotalTime(_s.playlist_ar[i].duration);
				
				var showDownloadButton_bl = _s.playlist_ar[i].downloadable;
				if(!_s.showPlaylistItemDownloadButton_bl) showDownloadButton_bl = false;
				
				var showBuyButton_bl = Boolean(_s.playlist_ar[i].buy);
				if(!_s.showPlaylistItemBuyButton_bl) showBuyButton_bl = false;
			
				FWDRAPPlaylistItem.setPrototype();
				item = new FWDRAPPlaylistItem(
					_s.playlist_ar[i].title,
					_s.playlist_ar[i].titleText,
					_s.playlistDownloadButtonN_img,
					_d.playlistDownloadButtonS_str,
					_s.playlistBuyButtonN_img,
					_d.playlistBuyButtonS_str,
					_d.playlistItemGrad1Path,
					_d.playlistItemGrad2Path,
					_d.playlistItemProgress1_img,
					_d.playlistItemProgress2_img,
					_d.playlistPlayButtonN_img,
					_d.playlistItemBk1_img.src,
					_d.playlistItemBk2_img.src,
					_s.playlistPlayButtonN_str,
					_s.playlistPlayButtonS_str,
					_s.playlistPauseButtonN_str,
					_s.playlistPauseButtonS_str,
					_d.trackTitleNormalColor_str,
					_d.trackTitleSelected_str,
					_d.trackDurationColor_str,
					i,
					_d.playPauseButtonOffsetLeftAndRight,
					_s.trackTitleOffsetLeft,
					_s.durationOffsetRight,
					_s.downloadButtonOffsetRight,
					_s.showPlaylistItemPlayButton_bl,
					showDownloadButton_bl,
					showBuyButton_bl,
					duration,
					_s.useHEX,
					_s.nBC,
					_s.n2BC,
					_s.sBC,
					_s
				);	
				
				item.addListener(FWDRAPPlaylistItem.MOUSE_UP, _s.itemOnUpHandler);
				item.addListener(FWDRAPPlaylistItem.DOWNLOAD, _s.downloadHandler);
				item.addListener(FWDRAPPlaylistItem.BUY, _s.buyHandler);
				
				_s.items_ar[i] = item;
				_s.itemsHolder_do.addChild(item);
			};
		};
		
		_s.addTrack = function(source, title, thumbPath, duration, addAtTheBegginngOfPlaylist, download, buy){
			
			_s.isSortedNumerical_bl = true;
			_s.sortAscending_bl = true;
			_s.ascDscButton_do.setButtonState(1);
			_s.disableSortNButton();
			
			_s.sortList();
			
			var title;
			var titleText;
			var count = 0;
			var id;
			var count;
			
			_s.addAtThePlaylistEnd_bl = false;
			_s.addAtThePlaylistBeggingin_bl = false;
			
			if(addAtTheBegginngOfPlaylist){
				_s.addAtThePlaylistBeggingin_bl = true;
				id = 0;
			}else{
				_s.addAtThePlaylistEnd_bl = true;
				id = _s.totalPlayListItems + 1;
			}
			
			clearTimeout(_s.resetItemsAddOrderId_to);
			_s.resetItemsAddOrderId_to = setTimeout(function(){
				_s.addAtThePlaylistEnd_bl = false;
				_s.addAtThePlaylistBeggingin_bl = false;
			}, 100);
				
			var showBuyButton_bl = Boolean(buy);
			if(!_s.showPlaylistItemBuyButton_bl) showBuyButton_bl = false;
			
			if(_d.showTracksNumbers_bl){
				if(id<9) count = "0"  + (id + 1);
				title = count + ". " + title;
			}else{
				title = title;
			}
			
			titleText = title;

			FWDRAPPlaylistItem.setPrototype();
			var item = new FWDRAPPlaylistItem(
				title,
				titleText,
				_s.playlistDownloadButtonN_img,
				_d.playlistDownloadButtonS_str,
				_s.playlistBuyButtonN_img,
				_d.playlistBuyButtonS_str,
				_d.playlistItemGrad1Path,
				_d.playlistItemGrad2Path,
				_d.playlistItemProgress1_img,
				_d.playlistItemProgress2_img,
				_d.playlistPlayButtonN_img,
				_d.playlistItemBk1_img.src,
				_d.playlistItemBk2_img.src,
				_s.playlistPlayButtonN_str,
				_s.playlistPlayButtonS_str,
				_s.playlistPauseButtonN_str,
				_s.playlistPauseButtonS_str,
				_d.trackTitleNormalColor_str,
				_d.trackTitleSelected_str,
				_d.trackDurationColor_str,
				id,
				_d.playPauseButtonOffsetLeftAndRight,
				_s.trackTitleOffsetLeft,
				_s.durationOffsetRight,
				_s.downloadButtonOffsetRight,
				_s.showPlaylistItemPlayButton_bl,
				download,
				showBuyButton_bl,
				duration,
				_s.useHEX,
				_s.nBC,
				_s.n2BC,
				_s.sBC,
				_s
			);
			
			var obj = {};
			obj.title = title;
			obj.titleText = title;
			obj.source = source;
			obj.duration = duration;
			obj.thumbPath = thumbPath;
			obj.downloadable = download;
			obj.buy = buy;
			if(showBuyButton_bl) obj.buy = buy;
			
			_s.playlist_ar.splice(id, 0, obj);
			_s.totalPlayListItems = _s.playlist_ar.length;
			_s.items_ar.splice(id, 0, item);
			_s.itemsHolder_do.addChild(item);
			prt.totalAudio = _s.totalPlayListItems;
			
			for(var i=0; i<_s.totalPlayListItems; i++){
				var changedItem = _s.items_ar[i];
				changedItem.id = changedItem.sortId = i;
				var title = _s.playlist_ar[i].title;
				title = title.substr(title.indexOf(".") + 1);
				
				if(_d.showTracksNumbers_bl){
					if(i<9){
						count = "0"  + (i + 1);
					}else{
						count = i + 1;
					}
					title = count + ". " + title;
				}else{
					title = title;
				}
				
				changedItem.title_str =  title;
				changedItem.updateTitle();
				changedItem.setTextSizes(true);
			}
			
		
			setTimeout(function(){
				if(!item) return;
				item.setTextSizes(true);
				
				if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
					item.resize(_s.sW - _s.scrollbarOffestWidth, _s.itemHeight);
				}else{
					item.resize(_s.sW, _s.itemHeight);
				}
				FWDAnimation.to(item, .1, {alpha:1, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:.5, delay:.1, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:1, delay:.2, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:.5, delay:.3, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:1, delay:.4, ease:Expo.easeOut,overwrite:false});
			}, 50);
			
			item.addListener(FWDRAPPlaylistItem.MOUSE_UP, _s.itemOnUpHandler);
			item.addListener(FWDRAPPlaylistItem.DOWNLOAD, _s.downloadHandler);
			item.addListener(FWDRAPPlaylistItem.BUY, _s.buyHandler);
			
			_s.positionList();
			_s.updateScrollBarHandlerAndContent(true, true);
			item.setAlpha(0);
		};
		
		
		_s.itemOnUpHandler = function(e){
			_s.dispatchEvent(FWDRAPPlaylistItem.MOUSE_UP, {id:e.id});
		};
		
		_s.downloadHandler = function(e){
			_s.dispatchEvent(FWDRAPPlaylistItem.DOWNLOAD, {id:e.id});
		};
		
		_s.buyHandler = function(e){
			_s.dispatchEvent(FWDRAPPlaylistItem.BUY, {id:e.id});
		};
		

		//###############################//
		/* load id3 metadata */
		//###############################//
		_s.loadId3 = function(){
			if(!_d.useID3ForFolderPlaylist) return;
			var item;
			clearTimeout(_s.populateNextItemId_to);
			for(var i=0; i<_s.totalPlayListItems; i++){
				if(_s.playlist_ar[i].title != "..."){
					 _s.countID3 = 2001;
					return;
				}
			}
			if(_s.showSearchBar_bl) _s.disableSearchBar();
			_s.countID3 = 0;
			_s.loadID3AndPopulate();
		};
		
		_s.loadID3AndPopulate = function(){
			
			if(!_s.playlist_ar[_s.countID3]){
				if(_s.showSearchBar_bl) _s.enableSearchBar();
				return;
			}
			var count = "";
			var item = _s.items_ar[_s.countID3];
			var source = _s.playlist_ar[_s.countID3].source;
			var url = source + "?rand=" + parseInt(Math.random() * 99999999);
			var obj = _s.playlist_ar[_s.countID3];
			
			var jsmediatags = window.jsmediatags;

			// From remote host
			jsmediatags.read(url, {
			  onSuccess: function(tag) {
			  
			    if(_s.countID3 > _s.playlist_ar.length ||  _s.countID3 == 2001){
					clearTimeout(_s.populateNextItemId_to);
					return;
				}
					
				var tags = tag.tags;
				
				if(tags.artist){
					obj.titleText_str = tags.artist + " - " +  tags.title;
					obj.titleText = obj.titleText_str;
					item.titleText_str = obj.titleText;
					if(_d.showTracksNumbers_bl){
						if(_s.countTrack < 9) count = "0";
						count = count + (_s.countTrack + 1) + ". ";
						obj.title = count + obj.titleText_str;
					}else{
						obj.title = obj.titleText_str;
					}
					_s.countTrack ++;
				}else{
					obj.title = decodeURIComponent(source.substr(source.lastIndexOf("/") + 1));
				}
				
				item.title_str = '<span class="fwdrap-title">' + obj.title + "</span>";
				
				_s.playlist_ar[_s.countID3].titleText = obj.title;
			
				if(_s.countID3 == _s.id) _s.dispatchEvent(FWDRAPPlaylist.UPDATE_TRACK_TITLE_if_FOLDER, {title:item.title_str});
				
				item.updateTitle();
				setTimeout(function(){
					if(!item) return;
					item.setTextSizes(true);
					
					if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
						item.resize(_s.sW - _s.scrollbarOffestWidth, _s.itemHeight);
					}else{
						item.resize(_s.sW, _s.itemHeight);
					}
				}, 50);
				
				
			    _s.countID3 ++;
			 
			    _s.populateNextItemId_to = setTimeout(_s.loadID3AndPopulate, 50);

			  },
			  onError: function(error) {
			    console.log(error);
			  }
			});
		};
		
		//##############################//
		/* activate items */
		//##############################//
		_s.activateItems = function(id, itemClicked){
			var item;
			_s.id = id;
			
			if(!_s.items_ar) return;

			for(var i=0; i<_s.totalPlayListItems; i++){
				item = _s.items_ar[i];
				if(item.id == _s.id){
					_s.sortId = item.sortId;
					break;
				}			
			}
		
			_s.curItem_do = _s.items_ar[_s.sortId];
			_s.id = _s.curItem_do.id;
			
			for(var i=0; i<_s.totalPlayListItems; i++){
				item = _s.items_ar[i];
				if(i == _s.sortId){
					item.setActive();
				}else{
					item.setInActive();
				}
			}
			
			_s.updateScrollBarHandlerAndContent(true)
		};

		
		//#############################//
		/* set cur item play/pause */
		//#############################//
		_s.setCurItemPlayState = function(){
			if(!_s.curItem_do) return;
			_s.curItem_do.showPlayButton();
		};
		
		_s.setCurItemPauseState = function(){
			if(!_s.curItem_do) return;
			_s.curItem_do.showPauseButton();
		};
		
		_s.updateCurItemProgress = function(percent){
			if(!_s.curItem_do) return;
			_s.curItem_do.updateProgressPercent(percent);
		};
		

		//################################################//
		/* Setup buttons */
		//################################################//
		_s.setupButtons = function(){
			_s.searchBarButtons_ar = [];
			
			var sClr = _d.nBC
			if(_s.nBC ==  _s.n2BC) sClr = _s.sBC;

			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.sortNButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-sort-numbers'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.sortNButton_do = new FWDRAPSimpleButton(_d.sortNN_img, _d.sortNSPath_str, null, true,
						_d.useHEX,
						_d.n2BC,
						sClr);
			}
			_s.searchBarButtons_ar.push(_s.sortNButton_do);
			_s.sortNButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.sortNButtonShowTooltipHandler);
			_s.sortNButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.sortNButtonOnMouseUpHandler);
			_s.searchBar_do.addChild(_s.sortNButton_do);
			_s.sortNButton_do.setX(410);
			
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.sortAButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-sort-letters'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.sortAButton_do = new FWDRAPSimpleButton(_d.sortAN_img, _d.sortASPath_str, null, true,
					_d.useHEX,
					_d.n2BC,
					sClr);
			}
			_s.searchBarButtons_ar.push(_s.sortAButton_do);
			_s.sortAButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.sortAButtonShowTooltipHandler);
			_s.sortAButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.sortAButtonOnMouseUpHandler);
			_s.searchBar_do.addChild(_s.sortAButton_do);
			_s.sortAButton_do.setX(450);
			
			FWDRAPComplexButton.setPrototype();
			if(_d.useVectorIcons){
				_s.ascDscButton_do = new FWDRAPComplexButton(0, 0, 0, 0, true, 0, 0, 0,
					"<span class='fwdrap-icon fwdrap-icon-scroll-down'></span>",
					"<span class='fwdrap-icon fwdrap-icon-scrool-up'></span>",
					"fwdrap-main-button-normal-state",
					"fwdrap-main-button-selected-state"
				);
			}else{
				_s.ascDscButton_do = new FWDRAPComplexButton(
					_d.ascendingN_img,
					_d.ascendingSpath_str,
					_d.decendingN_img,
					_d.decendingSpath_str,
					true,
					_d.useHEX,
					_d.n2BC,
					sClr);
			}

			_s.ascDscButton_do.setX(500);
			_s.searchBarButtons_ar.push(_s.ascDscButton_do);
			_s.ascDscButton_do.addListener(FWDRAPComplexButton.SHOW_TOOLTIP, _s.ascDscShowToolTipHandler);
			_s.ascDscButton_do.addListener(FWDRAPComplexButton.MOUSE_UP, _s.ascDscMouseUpHandler);
			_s.searchBar_do.addChild(_s.ascDscButton_do);
			
			if(_s.isSortedNumerical_bl){
				_s.disableSortNButton();
			}else{
				_s.disableSortAButton();
			}
		};
		
		_s.ascDscShowToolTipHandler = function(e){
			_s.showToolTip(_s.ascDscButton_do, _s.ascDscButtonToolTip_do, e.e);
		};
		
		_s.ascDscMouseUpHandler = function(){
			if(_s.sortAscending_bl){
				_s.ascDscButton_do.setButtonState(0);
				_s.sortAscending_bl = false;
			}else{
				_s.ascDscButton_do.setButtonState(1);
				_s.sortAscending_bl = true;
			}
			_s.sortList();
		};
		
		_s.sortAButtonShowTooltipHandler = function(e){
			_s.showToolTip( _s.sortAButton_do, _s.sortAButtonToolTip_do, e.e);
		};
		
		_s.sortAButtonOnMouseUpHandler = function(){
			_s.disableSortAButton();
			_s.sortList();
		};
		
		_s.sortNButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.sortNButton_do, _s.sortNButtonToolTip_do, e.e);
		};
		
		_s.sortNButtonOnMouseUpHandler = function(){
			_s.disableSortNButton();
			_s.sortList();
		};
		
		_s.disableSortAButton = function(){
			_s.sortAButton_do.disableForGood();
			_s.sortAButton_do.setSelectedState(true);
			
			_s.sortNButton_do.enableForGood();
			_s.sortNButton_do.setNormalState(true);
			_s.isSortedNumerical_bl =  false;
		};
		
		_s.disableSortNButton = function(){
			_s.sortNButton_do.disableForGood();
			_s.sortNButton_do.setSelectedState(true);
			
			_s.sortAButton_do.enableForGood();
			_s.sortAButton_do.setNormalState(true);
			_s.isSortedNumerical_bl =  true;
		};
		
		_s.sortList = function(){
			if(_s.isSortedNumerical_bl){
				_s.items_ar.sort(function(a,b){
				  if (a.id < b.id)  
				     return -1;
				  if (a.id > b.id)
				    return 1;
				  return 0;
				});
			}else{
				_s.items_ar.sort(function(a,b){
				  if (a.titleText_str < b.titleText_str)  
				     return -1;
				  if (a.titleText_str > b.titleText_str)
				    return 1;
				  return 0;
				});
			}
			
			if(!_s.sortAscending_bl) _s.items_ar.reverse();
			
			for(var i=0; i<_s.items_ar.length; i++){
				_s.items_ar[i].sortId = i;
			};
			
			_s.positionList();
			_s.updateScrollBarHandlerAndContent(false);
		};
		

		//################################################//
		/* setup input */
		//################################################//
		_s.setupInput = function(){
			
			_s.titlebarHeight = _d.titlebarLeftPath_img.height;
			_s.mainSearchInput_do = new FWDRAPDisplayObject("div");
			_s.mainSearchInput_do.screen.className = 'fwdrap-titlebar-background-middle';
			_s.mainSearchInput_do.getStyle().background = "url('" + _d.titlebarBkMiddlePattern_str + "')";
			_s.mainSearchInput_do.setHeight(_s.titlebarHeight);
			
			var titleBarLeft_img = new Image();
			titleBarLeft_img.src = _d.titleBarLeft_img.src;
			_s.titleBarLeft_do = new FWDRAPDisplayObject("img");
			_s.titleBarLeft_do.setScreen(titleBarLeft_img);
			_s.titleBarLeft_do.screen.className = 'fwdrap-titlebar-background-left';
			_s.titleBarLeft_do.setWidth(_d.titleBarLeft_img.width);
			_s.titleBarLeft_do.setHeight(_d.titleBarLeft_img.height);
		
			var titleBarRight_img = new Image();
			titleBarRight_img.src = _d.titleBarRigthPath;
			_s.titleBarRight_do = new FWDRAPDisplayObject("img");
			_s.titleBarRight_do.setScreen(titleBarRight_img);
			_s.titleBarRight_do.screen.className = 'fwdrap-titlebar-right-right';
			_s.titleBarRight_do.setWidth(_d.titleBarLeft_img.width);
			_s.titleBarRight_do.setHeight(_d.titleBarLeft_img.height);	

			_s.input_do = new FWDRAPDisplayObject("input");
			_s.input_do.screen.maxLength = 20;
			_s.input_do.screen.className = 'fwdrap-search-input';
			_s.input_do.getStyle().textAlign = "left";
			_s.input_do.getStyle().outline = "none";
			_s.input_do.getStyle().boxShadow  = "none";
			_s.input_do.getStyle().fontFamily = "Arial";
			_s.input_do.getStyle().fontSize= "12px";
			_s.input_do.getStyle().padding = "6px";
			_s.input_do.getStyle().paddingLeft = "7px";
			if(!FWDRAPUtils.isIEAndLessThen9) _s.input_do.getStyle().paddingRight = "-6px";
			_s.input_do.getStyle().paddingTop = "2px";
			_s.input_do.getStyle().paddingBottom = "3px";
			_s.input_do.getStyle().color = _s.searchInputColor_str;
			_s.input_do.getStyle().webkitBoxShadow=  "0 0 0 1000px transparent inset";
			_s.input_do.screen.value = "search for track";
			
			_s.noSearchFound_do = new FWDRAPDisplayObject("div");
			_s.noSearchFound_do.setX(0);
			_s.noSearchFound_do.getStyle().textAlign = "center";
			_s.noSearchFound_do.getStyle().width = "100%";
			_s.noSearchFound_do.getStyle().fontFamily = "Arial";
			_s.noSearchFound_do.getStyle().fontSize= "12px";
			_s.noSearchFound_do.getStyle().color = _s.searchInputColor_str;
			_s.noSearchFound_do.setInnerHTML("NOTHING FOUND!");
			_s.noSearchFound_do.setVisible(false);
			_s.mainHolder_do.addChild(_s.noSearchFound_do);
			
			_s.input_do.screen.addEventListener("focus", _s.inputFocusInHandler);
			_s.input_do.screen.addEventListener("blur", _s.inputFocusOutHandler);
			_s.input_do.screen.addEventListener("keyup", _s.keyUpHandler);
			
			_s.inputArrow_img = new Image();
			_s.inputArrow_img.src = _d.inputArrowPath_str;	
			
			_s.inputArrow_do = new FWDRAPDisplayObject("img"); 
			_s.inputArrow_do.setScreen(_s.inputArrow_img);
			_s.inputArrow_do.screen.className = 'fwdrap-playlist-search-icon';
			_s.inputArrow_do.setWidth(12);
			_s.inputArrow_do.setHeight(12);

			setTimeout(function(){
				var offsetY = 1;
				_s.input_do.setY(parseInt((_s.titlebarHeight - _s.input_do.getHeight())/2) + _s.inputSearchTextOffsetTop);
			}, 50);
			_s.mainSearchInput_do.addChild(_s.titleBarLeft_do);
			_s.mainSearchInput_do.addChild(_s.titleBarRight_do);
			_s.mainSearchInput_do.addChild(_s.input_do);
			_s.searchBar_do.addChild(_s.mainSearchInput_do);
			_s.searchBar_do.addChild(_s.inputArrow_do);
			
		};
		
		_s.inputFocusInHandler = function(){
			if(_s.hasInputFocus_bl) return;
			_s.hasInputFocus_bl = true;
			
			if(_s.isSearchBarDisabled_bl){
				_s.input_do.screen.value == "Loading ID3's ...";
			}else if(_s.input_do.screen.value == "search for track"){
				_s.input_do.screen.value = "";
			}
		};
		
		_s.inputFocusOutHandler = function(e){
			if(!_s.hasInputFocus_bl) return;
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(!FWDRAPUtils.hitTest(_s.input_do.screen, vc.screenX, vc.screenY)){
				_s.hasInputFocus_bl = false;
				if(_s.input_do.screen.value == ""){
					_s.input_do.screen.value = "search for track";
				}
				return;
			}
		};
		
		_s.keyUpHandler = function(e){
			if(e.stopPropagation) e.stopPropagation();
			if(_s.prevInputValue_str != _s.input_do.screen.value){
				_s.positionList();
			}
			
			_s.prevInputValue_str = _s.input_do.screen.value;
			
			if(_s.scrHandler_do){
				_s.updateScrollBarSizeActiveAndDeactivate();
				_s.updateScrollBarHandlerAndContent(false);
			}
		};
		
		_s.showNothingFound = function(){
			if(_s.isShowNothingFound_bl) return;
			_s.isShowNothingFound_bl = true;
			
			_s.noSearchFound_do.setVisible(true);
			_s.noSearchFound_do.setY(parseInt((_s.sH - _s.noSearchFound_do.getHeight() -  _s.searchBarHeight)/2));
			_s.noSearchFound_do.setAlpha(0);
			FWDAnimation.to(_s.noSearchFound_do, .1, {alpha:1, yoyo:true, repeat:4});
		};
		
		_s.hideNothingFound = function(){
			if(!_s.isShowNothingFound_bl) return;
			_s.isShowNothingFound_bl = false;
			
			FWDAnimation.killTweensOf(_s.noSearchFound_do);
			_s.noSearchFound_do.setVisible(false);
		};

		
		//###########################################//
		/* position Search bar */
		//###########################################//
		_s.positionSearchBar = function(){
			var buttonsW = 0;
			var button;
			
			var inputWidth = _s.sW - (_s.startSpaceBetweenButtons * 2) - _s.inputArrow_do.w - 12;
			if(inputWidth > 430) inputWidth = 430;
			
			if(_s.showSortButtons_bl){
				for(var i=_s.searchBarButtons_ar.length-1; i>=0; i--){
					button = _s.searchBarButtons_ar[i];
					if(i == _s.searchBarButtons_ar.length-1){
						button.setX(_s.sW - button.w - _s.startSpaceBetweenButtons);
					}else{
						button.setX(_s.searchBarButtons_ar[i + 1].x - button.w - _s.spaceBetweenButtons);
					}
					button.setY(_s.searchSeparator_do.h + parseInt((_s.searchBar_do.h - _s.searchSeparator_do.h - button.h)/2));
					buttonsW += button.w + _s.spaceBetweenButtons;
				}
			}
			
			buttonsW += _s.startSpaceBetweenButtons;
		
			inputWidth -= buttonsW + 50;
			inputWidth = Math.max(160, inputWidth);
			
			_s.mainSearchInput_do.setWidth(inputWidth);
			_s.input_do.setWidth(inputWidth);
			
			_s.mainSearchInput_do.setX(_s.startSpaceBetweenButtons + _s.inputSearchOffsetLeft);
			_s.mainSearchInput_do.setY(parseInt(_s.searchSeparator_do.h + parseInt((_s.searchBar_do.h - _s.searchSeparator_do.h - _s.mainSearchInput_do.h)/2)));
			_s.titleBarRight_do.setX(_s.mainSearchInput_do.w - _s.titleBarRight_do.w);
			_s.inputArrow_do.setX(parseInt(_s.mainSearchInput_do.x + inputWidth) - 18);
			_s.inputArrow_do.setY(_s.searchSeparator_do.h + parseInt((_s.searchBar_do.h - _s.searchSeparator_do.h - _s.inputArrow_do.h)/2));
			_s.searchSeparator_do.setWidth(_s.sW);
			_s.searchBar_do.setWidth(_s.sW);
			
			
			if(_s.searchBarPosition != 'top'){
				_s.searchBar_do.setY(_s.sH - _s.searchSeparator_do.h - _s.searchBar_do.h);
			}
		};

		
		//################################//
		/* Setup tooltips */
		//################################//		
		_s.setupToolTips = function(){
			
			FWDRAPToolTip.setPrototype();
			_s.sortNButtonToolTip_do = new FWDRAPToolTip(_s.sortNButton_do, _d.toopTipPointerUp_str, "numeric sort", _s.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.sortNButtonToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.sortAButtonToolTip_do = new FWDRAPToolTip(_s.sortAButton_do, _d.toopTipPointerUp_str, "alphabetic sort", _s.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.sortAButtonToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.ascDscButtonToolTip_do = new FWDRAPToolTip(_s.ascDscButton_do, _d.toopTipPointerUp_str, "ascending / decending sort",_s.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.ascDscButtonToolTip_do.screen);
		};

		
		_s.showToolTip = function(button, toolTip, e){
			if(!_s.showButtonsToolTips_bl) return;
			var ws = FWDRAPUtils.getViewportSize();
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			
			var localX = parseInt(button.getGlobalX() + button.w/2 - toolTip.w/2);
			var localY = parseInt(button.getGlobalY() - toolTip.h - 8);
			var offseX = 0;
		
			if(localX < 0){
				offseX = localX;
				localX = 0;
			}else if(localX + toolTip.w > ws.w){
				offseX = (ws.w - (localX + toolTip.w)) * -1;
				localX = localX + (offseX * -1);
			}
			
			if(localY < 0){
				localY += button.h + toolTip.h + 12;
				toolTip.positionPointer(offseX, true);
			}else{
				toolTip.positionPointer(offseX, false);
			}

			toolTip.setX(localX);
			toolTip.setY(localY);
			toolTip.show();
		};

		
		//###############################//
		/* setup disable */
		//##############################//
		_s.setupDisable = function(){
			_s.disable_do = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.disable_do.setBkColor("#FFFFFF");
				_s.disable_do.setAlpha(0);
			}
			_s.addChild(_s.disable_do);
		};
		
		_s.showDisable = function(){
			if(!_s.disable_do || _s.disable_do.w != 0) return;
			if(_s.scrMainHolder_do){
				_s.disable_do.setWidth(_s.sW - _s.scrollbarOffestWidth);
				_s.disable_do.setHeight(_s.sH);
			}else{
				_s.disable_do.setWidth(_s.sW);
				_s.disable_do.setHeight(_s.sH);
			}
		};
		
		_s.hideDisable = function(){
			if(!_s.disable_do || _s.disable_do.w == 0) return;
			_s.disable_do.setWidth(0);
			_s.disable_do.setHeight(0);
		};

		
		//###############################//
		/* setup separator */
		//###############################//
		_s.setupSeparator = function(){
			_s.separator_do = new FWDRAPDisplayObject("div");
			_s.separator_do.setBackfaceVisibility();
			_s.separator_do.hasTransform3d_bl = false;
			_s.separator_do.hasTransform2d_bl = false;
			_s.separator_do.screen.className = 'fwdrap-controler-separator';
			_s.separator_do.getStyle().background = "url('" + _s.playlistSeparator_img.src + "')";
			_s.separator_do.setHeight(_s.playlistSeparator_img.height);
			_s.separator_do.setY(-_s.separator_do.h);
		};
		
		
		//#################################//
		/* setup mouse scrollbar */
		//#################################//
		_s.setupScrollbar = function(){
			_s.scrMainHolder_do = new FWDRAPDisplayObject("div");
			_s.scrMainHolder_do.setWidth(_s.scrWidth);
			
			//track
			_s.scrTrack_do = new FWDRAPDisplayObject("div");
			_s.scrTrack_do.setWidth(_s.scrWidth);

			_s.scrTrackTop_do = new FWDRAPDisplayObject("img");
			_s.scrTrackTop_do.setScreen(_s.playlistScrBkTop_img);
			_s.scrTrackTop_do.screen.className = 'fwdrap-scrollbar-top-background';

			_s.scrTrackMiddle_do = new FWDRAPDisplayObject("div");
			_s.scrTrackMiddle_do.screen.className = 'fwdrap-scrollbar-middle-background';
			_s.scrTrackMiddle_do.getStyle().background = "url('" + _d.scrBkMiddlePath_str + "')";
			_s.scrTrackMiddle_do.setWidth(_s.scrWidth);
			_s.scrTrackMiddle_do.setY(_s.scrTrackTop_do.h);
			var scrTrackBottomImage_img = new Image();
			scrTrackBottomImage_img.src = _d.scrBkBottomPath_str;

			_s.scrTrackBottom_do = new FWDRAPDisplayObject("img");
			_s.scrTrackBottom_do.setScreen(scrTrackBottomImage_img);
			_s.scrTrackBottom_do.screen.className = 'fwdrap-scrollbar-bottom-background';
			_s.scrTrackBottom_do.setWidth(_s.scrTrackTop_do.w);
			_s.scrTrackBottom_do.setHeight(_s.scrTrackTop_do.h);
			
			//handler
			_s.scrHandler_do = new FWDRAPDisplayObject("div");
			_s.scrHandler_do.setWidth(_s.scrWidth);
	
			_s.scrHandlerTop_do = new FWDRAPDisplayObject("img");
			if(_s.useHEX){
				_s.scrHandlerTop_do = new FWDRAPDisplayObject("div");
				_s.scrHandlerTop_do.setWidth(_s.playlistScrDragTop_img.width);
				_s.scrHandlerTop_do.setHeight(_s.playlistScrDragTop_img.height);
				_s.mainScrubberDragTop_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.playlistScrDragTop_img, _s.nBC).canvas;
				_s.scrHandlerTop_do.screen.appendChild(_s.mainScrubberDragTop_canvas);	
			}else{
				_s.scrHandlerTop_do = new FWDRAPDisplayObject("img");
				_s.scrHandlerTop_do.setScreen(_s.playlistScrDragTop_img);
			}

		
			_s.scrHandlerMiddle_do = new FWDRAPDisplayObject("div");
			_s.middleImage = new Image();
			_s.middleImage.src = _d.scrDragMiddlePath_str;
			if(_s.useHEX){
				_s.middleImage.onload = function(){
					_s.scrubberDragMiddle_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.middleImage, _s.nBC, true);
					_s.scrubberDragImage_img = _s.scrubberDragMiddle_canvas.image;
					_s.scrHandlerMiddle_do.getStyle().background = "url('" + _s.scrubberDragImage_img.src + "') repeat-y";
				}
			}else{
				_s.scrHandlerMiddle_do.getStyle().background = "url('" + _d.scrDragMiddlePath_str + "')";
			}
			_s.scrHandlerMiddle_do.setWidth(_s.scrWidth);
			_s.scrHandlerMiddle_do.setY(_s.scrHandlerTop_do.h);
			
			_s.scrHandlerBottom_do = new FWDRAPDisplayObject("div");
			_s.scrHandlerBottom_img = new Image();
			_s.scrHandlerBottom_img.src = _d.scrDragBottomPath_str;
			if(_s.useHEX){
				_s.scrHandlerBottom_img.onload = function(){
					_s.scrubberDragBottom_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.scrHandlerBottom_img, _s.nBC, true);
					_s.scrubberDragBottomImage_img = _s.scrubberDragBottom_canvas.image;
					_s.scrHandlerBottom_do.getStyle().background = "url('" + _s.scrubberDragBottomImage_img.src + "') repeat-y";
					
				}
			}else{
				_s.scrHandlerBottom_do.getStyle().background = "url('" + _d.scrDragBottomPath_str + "')";
			}
			_s.scrHandlerBottom_do.setWidth(_s.scrWidth);
		
			_s.scrHandlerBottom_do.setWidth(_s.scrHandlerTop_do.w);
			_s.scrHandlerBottom_do.setHeight(_s.scrHandlerTop_do.h);
			_s.scrHandler_do.setButtonMode(true);
			
			_s.scrHandlerLinesN_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesN_do.setScreen(_s.playlistScrLines_img);
			_s.scrHandlerLinesN_do.screen.className = 'fwdrap-handler-lines-1';

			_s.scrHandlerLinesS_img = new Image();
			_s.scrHandlerLinesS_img.src = _d.scrLinesSPath_str;
			
			_s.scrHandlerLinesS_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesS_do.setScreen(_s.scrHandlerLinesS_img);
			_s.scrHandlerLinesS_do.screen.className = 'fwdrap-handler-lines-2';
			_s.scrHandlerLinesS_do.setWidth(_s.scrHandlerLinesN_do.w);
			_s.scrHandlerLinesS_do.setHeight(_s.scrHandlerLinesN_do.h);
			
			_s.scrHandlerLinesS_do.setAlpha(0);
			
			_s.scrHandlerLines_do = new FWDRAPDisplayObject("div");
			_s.scrHandlerLines_do.hasTransform3d_bl = false;
			_s.scrHandlerLines_do.hasTransform2d_bl = false;
			_s.scrHandlerLines_do.setBackfaceVisibility();
			_s.scrHandlerLines_do.setWidth(_s.scrHandlerLinesN_do.w);
			_s.scrHandlerLines_do.setHeight(_s.scrHandlerLinesN_do.h);
			_s.scrHandlerLines_do.setButtonMode(true);
				
			_s.scrTrack_do.addChild(_s.scrTrackTop_do);
			_s.scrTrack_do.addChild(_s.scrTrackMiddle_do);
			_s.scrTrack_do.addChild(_s.scrTrackBottom_do);
			_s.scrHandler_do.addChild(_s.scrHandlerTop_do);
			_s.scrHandler_do.addChild(_s.scrHandlerMiddle_do);
			_s.scrHandler_do.addChild(_s.scrHandlerBottom_do);
			_s.scrHandlerLines_do.addChild(_s.scrHandlerLinesN_do);
			_s.scrHandlerLines_do.addChild(_s.scrHandlerLinesS_do);
			_s.scrMainHolder_do.addChild(_s.scrTrack_do);
			_s.scrMainHolder_do.addChild(_s.scrHandler_do);
			_s.scrMainHolder_do.addChild(_s.scrHandlerLines_do);
			_s.mainHolder_do.addChild(_s.scrMainHolder_do);
			
			_s.scrHandler_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandler_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandler_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			_s.scrHandlerLines_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandlerLines_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandlerLines_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			
		};
		
		_s.scrollBarHandlerOnMouseOver = function(e){
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseOut = function(e){
			if(_s.isDragging_bl) return;
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseDown = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl) return;
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			
			_s.yPositionOnPress = _s.scrHandler_do.y;
			_s.lastPresedY = viewportMouseCoordinates.screenY;
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			_s.showDisable();
			
			if(window.addEventListener){
				window.addEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.addEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.attachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
			_s.prevSortId = -1;
		};
		
		_s.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
	
			_s.scrollBarHandlerFinalY = Math.round(_s.yPositionOnPress + viewportMouseCoordinates.screenY - _s.lastPresedY);
			if(_s.scrollBarHandlerFinalY >= _s.scrTrack_do.h - _s.scrHandler_do.h - 1){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h -  _s.scrHandler_do.h - 1;
			}else if(_s.scrollBarHandlerFinalY <= 0){
				_s.scrollBarHandlerFinalY = 0;
			}
			
			_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2), ease:Quart.easeOut});
			_s.updateScrollBarHandlerAndContent(true, true);
		};
		
		_s.scrollBarHandlerEndHandler = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			_s.isDragging_bl = false;
			
			if(!FWDRAPUtils.hitTest(_s.scrHandler_do.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
				FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
			}
			
			_s.scrollBarHandlerFinalY = parseInt((_s.scrTrack_do.h - _s.scrHandler_do.h) * (_s.playListFinalY/((_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * _s.itemHeight))) * -1;
			
			if(_s.scrollBarHandlerFinalY.y < 0){
				_s.scrollBarHandlerFinalY = 0;
			}else if(_s.scrollBarHandlerFinalY > _s.scrTrack_do.h - _s.scrHandler_do.h - 1){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h - _s.scrHandler_do.h - 1;
			}
			
			_s.hideDisable();
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
		};
		
		_s.updateScrollBarSizeActiveAndDeactivate = function(){
			
			if(_s.allowToScrollAndScrollBarIsActive_bl){
				var offsetH = 0;
				_s.allowToScrollAndScrollBarIsActive_bl = true;
				
				if(_s.searchBar_do){
					offsetH = _s.searchBar_do.h;
				}
				
				_s.scrMainHolder_do.setHeight(_s.sH - _s.separator_do.h - offsetH);
				_s.scrTrack_do.setHeight(_s.sH - _s.separator_do.h - offsetH);
				_s.scrTrackMiddle_do.setHeight(_s.scrTrack_do.h - (_s.scrTrackTop_do.h * 2));
				_s.scrTrackBottom_do.setY(_s.scrTrackMiddle_do.y + _s.scrTrackMiddle_do.h);
				
				_s.scrHandler_do.setHeight(Math.min((_s.sH - _s.separator_do.h - offsetH) , Math.round(((_s.sH - _s.separator_do.h - offsetH)/_s.itemsTotalHeight) * _s.sH)));
				_s.scrHandlerMiddle_do.setHeight(_s.scrHandler_do.h - (_s.scrHandlerTop_do.h * 2));
				_s.scrHandlerTop_do.setY(_s.scrHandlerMiddle_do.y + _s.scrHandlerMiddle_do.h);
				_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2));
				_s.scrMainHolder_do.setX(_s.sW -  _s.scrWidth);
				_s.updateScrollBarHandlerAndContent();
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = false;
				_s.scrMainHolder_do.setX(-500);
				_s.scrHandler_do.setY(0);
			}
		};
		
		_s.updateScrollBarHandlerAndContent = function(animate, overwrite){
			if((!_s.curItem_do || !_s.allowToScrollAndScrollBarIsActive_bl) && !overwrite) return;
			if(_s.curItem_do) _s.sortId = _s.curItem_do.sortId;	
			if(_s.prevSortId == _s.sortId && !overwrite) return;
			
			var percentScrolled = 0;
			var leftId = 0;
			
			if(_s.addAtThePlaylistEnd_bl){
				_s.sortId = _s.totalPlayListItems - 1;
			}else if(_s.addAtThePlaylistBeggingin_bl){
				_s.sortId = 0;
			}
			_s.prevSortId = _s.sortId;
			
			if(_s.isDragging_bl && !_s.isMbl){
				percentScrolled = (_s.scrHandler_do.y/(_s.scrMainHolder_do.h - _s.scrHandler_do.h));
				if(percentScrolled == "Infinity"){
					percentScrolled = 0;
				}else if(percentScrolled >= 1){
					scrollPercent = 1;
				}
				_s.playListFinalY = Math.round(percentScrolled * (_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems)) * _s.itemHeight * - 1;
			}else{
				if(_s.totalSearchedItems != _s.totalPlayListItems){
					leftId = 0;
				}else{
					leftId = parseInt(_s.sortId/_s.nrOfVisiblePlaylistItems) * _s.nrOfVisiblePlaylistItems;
				}
				
				if(leftId + _s.nrOfVisiblePlaylistItems >= _s.totalPlayListItems){
					leftId = _s.totalPlayListItems - _s.nrOfVisiblePlaylistItems;
				}
				
				if(leftId < 0) leftId = 0;
				
				_s.playListFinalY = parseInt(leftId * _s.itemHeight * -1);
				if(isNaN(_s.playListFinalY)) _s.playListFinalY = 0;
				
				if(_s.scrMainHolder_do){
					_s.scrollBarHandlerFinalY = Math.round((_s.scrMainHolder_do.h - _s.scrHandler_do.h) * (_s.playListFinalY/((_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * _s.itemHeight))) * -1;
					if(_s.scrollBarHandlerFinalY < 0){
						_s.scrollBarHandlerFinalY = 0;
					}else if(_s.scrollBarHandlerFinalY > _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1){
						_s.scrollBarHandlerFinalY = _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1;
					}
					
					FWDAnimation.killTweensOf(_s.scrHandler_do);
					FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
					if(animate){
						FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
						FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2), ease:Quart.easeOut});
					}else{
						_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
						_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2));
					}
				}
			}
		
			if(_s.prevPlaylistY == _s.playListFinalY && !overwrite) return;
			_s.prevPlaylistY = _s.playListFinalY;
			
			if(isNaN(_s.playListFinalY)) return;

			if(_s.lastListY != _s.playListFinalY){
				FWDAnimation.killTweensOf(_s.itemsHolder_do);
				if(animate){
					FWDAnimation.to(_s.itemsHolder_do, .5, {y:_s.playListFinalY, ease:Quart.easeOut});
				}else{
					_s.itemsHolder_do.setY(_s.playListFinalY);
				}
			}
			_s.lastListY = _s.playListFinalY;
		};

		
		//###############################################//
		/* Add mouse wheel support */
		//##############################################//
		_s.addMouseWheelSupport = function(){
			if(window.addEventListener){
				_s.screen.addEventListener ("mousewheel", _s.mouseWheelHandler);
				_s.screen.addEventListener('DOMMouseScroll', _s.mouseWheelHandler);
			}else if(document.attachEvent){
				_s.screen.attachEvent ("onmousewheel", _s.mouseWheelHandler);
			}
		};
		
		_s.mouseWheelHandler = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl || _s.isDragging_bl) return;
			if(_s.comboBox_do && _s.comboBox_do.isShowed_bl) return;
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(FWDRAPUtils.isOpera) dir *= -1;
		
			if(dir > 0){
				_s.playListFinalY -= _s.itemHeight;
			}else{
				_s.playListFinalY += _s.itemHeight;
			}
			
			var leftId = parseInt(_s.playListFinalY/_s.itemHeight);
			
			if(leftId >= 0){
				leftId = 0;
			}else if(Math.abs(leftId) + _s.nrOfVisiblePlaylistItems >= _s.totalSearchedItems){
				leftId = (_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * -1;
			}
			
			_s.prevSortId = -1;
			_s.prevPlaylistY = -100;
			
			_s.playListFinalY = leftId * _s.itemHeight;
			
			if(_s.lastListY == _s.playListFinalY) return;
			
			_s.scrollBarHandlerFinalY = Math.round((_s.scrMainHolder_do.h - _s.scrHandler_do.h) * (_s.playListFinalY/((_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * _s.itemHeight))) * -1;
			
			if(_s.scrollBarHandlerFinalY < 0){
				_s.scrollBarHandlerFinalY = 0;
			}else if(_s.scrollBarHandlerFinalY > _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1){
				_s.scrollBarHandlerFinalY = _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1;
			}
			
			FWDAnimation.killTweensOf(_s.itemsHolder_do);
			FWDAnimation.to(_s.itemsHolder_do, .5, {y:_s.playListFinalY, ease:Expo.easeOut});
			
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2), ease:Quart.easeOut});
			_s.lastListY = _s.playListFinalY;
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}	
			return;
		};

		
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		_s.setupMobileScrollbar = function(){
			if(_s.hasPointerEvent_bl){
				_s.itemsHolder_do.screen.addEventListener("pointerdown", _s.scrollBarTouchStartHandler);
			}else{
				_s.itemsHolder_do.screen.addEventListener("touchstart", _s.scrollBarTouchStartHandler, {passive: false});
			}
			_s.updateMobileScrollBarId_int = setInterval(_s.updateMobileScrollBar, 16);
		};
		
		_s.scrollBarTouchStartHandler = function(e){
			if(_s.sH > _s.itemsTotalHeight) return;
			if(_s.comboBox_do && _s.comboBox_do.isShowed_bl) return;
			if(e.preventDefault) e.preventDefault();
			FWDAnimation.killTweensOf(_s.itemsHolder_do);
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			_s.isScrollingOnMove_bl = false;
			_s.lastPresedY = viewportMouseCoordinates.screenY;
			_s.checkLastPresedY = viewportMouseCoordinates.screenY;
	
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.addEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", _s.scrollBarTouchMoveHandler, {passive: false});
			}
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			_s.updateMoveMobileScrollbarId_int = setInterval(_s.updateMoveMobileScrollbar, 20);
		};
		
		_s.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			_s.showDisable();
			
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(viewportMouseCoordinates.screenY >= _s.checkLastPresedY + 6 || viewportMouseCoordinates.screenY <= _s.checkLastPresedY - 6) _s.isScrollingOnMove_bl = true;
			var toAdd = viewportMouseCoordinates.screenY - _s.lastPresedY;
			
			_s.playListFinalY += toAdd;
			_s.playListFinalY = Math.round(_s.playListFinalY);
			
			_s.lastPresedY = viewportMouseCoordinates.screenY;
			_s.vy = toAdd  * 2;
		};
		
		_s.scrollBarTouchEndHandler = function(e){
			_s.isDragging_bl = false;
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			clearTimeout(_s.disableOnMoveId_to);
			_s.disableOnMoveId_to = setTimeout(function(){
				_s.hideDisable();
			},50);
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.removeEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", _s.scrollBarTouchMoveHandler);
			}
		};
		
		_s.updateMoveMobileScrollbar = function(){
			_s.itemsHolder_do.setY(_s.playListFinalY);
		};
		
		_s.updateMobileScrollBar = function(animate){
			if(!_s.isDragging_bl && !FWDAnimation.isTweening(_s.itemsHolder_do)){
				
				_s.vy *= _s.friction;
				_s.playListFinalY += _s.vy;	
			
				if(_s.playListFinalY > 0){
					_s.vy2 = (0 - _s.playListFinalY) * .3;
					_s.vy *= _s.friction;
					_s.playListFinalY += _s.vy2;
				}else if(_s.playListFinalY < _s.sH - _s.separator_do.h - _s.itemsTotalHeight - _s.searchBar_do.h){
					_s.vy2 = (_s.sH - _s.separator_do.h - _s.itemsTotalHeight - _s.searchBar_do.h - _s.playListFinalY) * .3;
					_s.vy *= _s.friction;
					_s.playListFinalY += _s.vy2;
				}
				
				if(_s.sH > _s.itemsTotalHeight) _s.playListFinalY = 0;
				
				_s.itemsHolder_do.setY(Math.round(_s.playListFinalY));
			}
		};
	

		//##############################//
		/* hide / show */
		//##############################//
		_s.hide = function(animate, overwrite){
			if(!_s.isShowed_bl && !overwrite || prt.openInPopup_bl) return;
			_s.isShowed_bl = false;

			if(animate){
				if(_s.comboBox_do) FWDAnimation.to(_s.comboBox_do, .8, {y:- _s.comboBox_do.h - 1, ease:Expo.easeInOut});
				var t = 0;
				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					t = -_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3;
					FWDAnimation.to(_s.searchBar_do, .8, {y:t, ease:Expo.easeInOut});
				}
				FWDAnimation.to(_s.separator_do, .8, {y:-_s.separator_do.h - 1, ease:Expo.easeInOut});
				FWDAnimation.to(_s.mainHolder_do, .8, {y:-_s.h - 1 + t, ease:Expo.easeInOut});
				FWDAnimation.to(prt.main_do, .8, {height:prt.controller_do.h, ease:Expo.easeInOut});
				
				FWDAnimation.to(prt.stageContainer, .8, {css:{height:prt.controller_do.h}, ease:Expo.easeInOut});
			}else{
				if(_s.comboBox_do) FWDAnimation.killTweensOf(_s.comboBox_do);
				FWDAnimation.killTweensOf(_s.separator_do);
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				FWDAnimation.killTweensOf(prt.main_do);
				FWDAnimation.killTweensOf(prt.stageContainer);
				var t = 0;
				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					t = -_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3;
					_s.searchBar_do.setY(t);
				}
				_s.comboBox_do.setY(-_s.comboBox_do.h);
				_s.separator_do.setY(-_s.separator_do.h - 1);
				_s.mainHolder_do.setY(-_s.h - 1 + t);
				prt.main_do.setHeight(prt.controller_do.h);
				
				prt.stageContainer.style.height = prt.controller_do.h + "px";
				_s.hideComplete();
				
			}
		};

		_s.hideComplete = function(){
			prt.resizeHandler();
			_s.setX(-10000);
		}
		
		_s.show = function(animate, overwrite){
			if(_s.isShowed_bl && !overwrite) return;
			_s.isShowed_bl = true;
			_s.setX(0);
			var offset = 0;
			if(_s.usePlaylistsSelectBox_bl) offset = _s.comboboxHeight;
			var mainHldY = _s.separator_do.h + offset

			_s.mainHolder_do.getStyle().display = 'block';
			prt.stageContainer.style.overflow = 'visible';
			
			if(animate){
				if(_s.comboBox_do) FWDAnimation.to(_s.comboBox_do, .8, {y:0, ease:Expo.easeInOut});
				FWDAnimation.to(_s.separator_do, .8, {y:0, ease:Expo.easeInOut});
				
				if(!prt.openInPopup_bl) FWDAnimation.to(prt.main_do, .8, {h:prt.controller_do.h + _s.sH, ease:Expo.easeInOut});
				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					var t = -_s.searchBar_do.h;
					if(_s.usePlaylistsSelectBox_bl) t = -_s.separator_do.h;
					FWDAnimation.to(_s.searchBar_do, .8, {y:t, ease:Expo.easeInOut});
					mainHldY = _s.searchBar_do.h;
					if(!_s.comboBox_do) mainHldY = _s.separator_do.h;
				}
				FWDAnimation.to(_s.mainHolder_do, .8, {y:mainHldY, ease:Expo.easeInOut});
				FWDAnimation.to(prt.stageContainer, .8, {css:{height:prt.controller_do.h + _s.sH + offset}, ease:Expo.easeInOut});
			}else{
				if(_s.comboBox_do) FWDAnimation.killTweensOf(_s.comboBox_do);
				FWDAnimation.killTweensOf(_s.separator_do);
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				FWDAnimation.killTweensOf(prt.main_do);
				FWDAnimation.killTweensOf(prt.stageContainer);

				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					FWDAnimation.killTweensOf(prt.searchBar_do);
					var t = -_s.searchBar_do.h;
					if(_s.usePlaylistsSelectBox_bl) t = -_s.separator_do.h;
					mainHldY = _s.searchBar_do.h;
					if(!_s.comboBox_do) mainHldY = _s.separator_do.h;
					_s.searchBar_do.setY(t);
				}
				_s.comboBox_do.setY(0);
				_s.separator_do.setY(0);
				_s.mainHolder_do.setY(mainHldY);
				if(!prt.openInPopup_bl) prt.main_do.setHeight(prt.controller_do.h + _s.sH);
				prt.stageContainer.style.height = (prt.controller_do.h + _s.sH + offset) + "px";
				
			}	
		};
		

		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(normalColor_str, selectedColor_str){
			
			_s.normalColor_str = normalColor_str;
			_s.selectedColor_str = selectedColor_str;
		
			if(_s.sortNButton_do) _s.sortNButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(_s.sortAButton_do) _s.sortAButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(_s.ascDscButton_do) _s.ascDscButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			FWDRAPUtils.changeCanvasHEXColor(_s.inputArrow_img, _s.mainScrubberDragLeft_canvas, normalColor_str);
			
			
			for(var i=0; i<_s.items_ar.length; i++){
				_s.items_ar[i].updateHEXColors(normalColor_str, selectedColor_str);
			}
		}
	
		_s.init();
	};
	

	/* set prototype */
	FWDRAPPlaylist.setPrototype = function(){
		FWDRAPPlaylist.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPlaylist.CHANGE_PLAYLIST = "changePlaylist";
	FWDRAPPlaylist.PLAY = "play";
	FWDRAPPlaylist.PAUSE = "pause";
	FWDRAPPlaylist.UPDATE_TRACK_TITLE_if_FOLDER = "pause";
	FWDRAPPlaylist.PLAY_PREV_VIDEO = "playNextVideo";
	FWDRAPPlaylist.PLAY_NEXT_VIDEO = "playPrevVideo";

	
	FWDRAPPlaylist.prototype = null;
	window.FWDRAPPlaylist = FWDRAPPlaylist;
	
}());/**
 * Royal Audio Player
 * Playlist item.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(){
var FWDRAPPlaylistItem = function(
			title_str,
			titleText_str,
			playlistDownloadButtonN_img,
			playlistDownloadButtonS_str,
			playlistBuyButtonN_img,
			playlistBuyButtonS_str,
			playlistItemGrad1Path,
			playlistItemGrad2Path,
			playlistItemProgress1,
			playlistItemProgress2,
			playlistPlayButtonN_img,
			playlistItemBk1Path_str,
			playlistItemBk2Path_str,
			playlistPlayButtonN_str,
			playlistPlayButtonS_str,
			playlistPauseButtonN_str,
			playlistPauseButtonS_str,
			titleNormalColor_str,
			trackTitleSelected_str,
			durationColor_str,
			id,
			playPauseButtonOffsetLeftAndRight,
			trackTitleOffsetLeft,
			durationOffsetRight,
			downloadButtonOffsetRight,
			showPlayPauseButton,
			showDownloadButton,
			showBuyButton,
			showDuration,
			useHEX,
			nBC,
			n2BC,
			sBC,
			prt
		){
		
		'use strict';

		var _s = this;
		var prototype = FWDRAPPlaylistItem.prototype;
		_s.playlistItemGrad1Path = playlistItemGrad1Path;
		_s.playlistItemGrad2Path = playlistItemGrad2Path;
		_s.playlistItemProgress1 = playlistItemProgress1;
		_s.playlistItemProgress2 = playlistItemProgress2;
		_s.playlistPlayButtonN_img = playlistPlayButtonN_img;
		_s.playlistDownloadButtonN_img = playlistDownloadButtonN_img;
		_s.playlistDownloadButtonS_str = playlistDownloadButtonS_str;
		_s.playlistBuyButtonN_img = playlistBuyButtonN_img;
		_s.playlistBuyButtonS_str = playlistBuyButtonS_str;
	
		_s.title_str = title_str;
		_s.titleText_str = titleText_str;
		
		_s.useHEX = useHEX; 
		_s.nBC = nBC;
		_s.n2BC = n2BC;
		_s.sBC = sBC;
		
		_s.playlistItemBk1Path_str = playlistItemBk1Path_str;
		_s.playlistItemBk2Path_str = playlistItemBk2Path_str;
		_s.playlistPlayButtonN_str = playlistPlayButtonN_str;
		_s.playlistPlayButtonS_str = playlistPlayButtonS_str;
		_s.playlistPauseButtonN_str = playlistPauseButtonN_str;
		_s.playlistPauseButtonS_str = playlistPauseButtonS_str;
		_s.titleNormalColor_str = titleNormalColor_str;
		_s.trackTitleSelected_str = trackTitleSelected_str;
		_s.durationColor_str = durationColor_str;
	
		_s.itemHeight = prt._d.playlistItemHeight;
		_s.id = id;
		_s.sortId = id;
		_s.playPauseButtonOffsetLeftAndRight = playPauseButtonOffsetLeftAndRight;
		_s.trackTitleOffsetLeft = trackTitleOffsetLeft;
		_s.duration = showDuration;
		_s.durationOffsetRight = durationOffsetRight;
		_s.textHeight;
		_s.durationWidth = 0;
		_s.titleWidth = 0;
		_s.playPauseButtonWidth = _s.playlistPlayButtonN_img.width;
		_s.playPauseButtonHeight = _s.playlistPlayButtonN_img.height;
		_s.progressPercent = 0;
		_s.sW = 0;
		_s.downloadButtonOffsetRight = downloadButtonOffsetRight;
		_s.type = -1;
		
		_s.showDownloadButton_bl = showDownloadButton;

		_s.showBuyButton_bl = showBuyButton;
		_s.showPlayPauseButton_bl = showPlayPauseButton;
		_s.showDuration_bl = showDuration;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		

		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			if(window['isWhite']){
				_s.n2BC = '#888888';
			}
			
			_s.setupProgress();
			
			_s.setupTitle();
			if(_s.showPlayPauseButton_bl) _s.setupPlayPauseButton();
			_s.setupGrad();
			if(_s.showDuration_bl) _s.setupDuration();
			_s.setNormalState(false, true);
			_s.setupDumy();
			if(_s.showDownloadButton_bl) _s.setupDownloadButton();
			if(_s.showBuyButton_bl) _s.setupBuyButton();
			
			if(_s.id % 2 == 0){
				_s.getStyle().background = "url('" + _s.playlistItemBk1Path_str + "')";
				_s.screen.className = 'fwdrap-playlist-item-bacground-even';
				_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad1Path + "')";
				_s.grad_do.screen.className = 'fwdrap-playlist-item-gradient-even';
				_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress1 + "') repeat-x";
				_s.progress_do.screen.className = 'fwdrap-playlist-item-progress-even';
				_s.type = 1;
			}else{
				_s.getStyle().background = "url('" + _s.playlistItemBk2Path_str + "')";
				_s.screen.className = 'fwdrap-playlist-item-bacground-odd';
				_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad2Path + "')";
				_s.grad_do.screen.className = 'fwdrap-playlist-item-gradient-odd';
				_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress2 + "') repeat-x";
				_s.progress_do.screen.className = 'fwdrap-playlist-item-progress-odd';
				_s.type = 2;
			}
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.dumy_do.screen.addEventListener("pointerup", _s.onMouseUp);
					_s.dumy_do.screen.addEventListener("pointerover", _s.onMouseOver);
					_s.dumy_do.screen.addEventListener("pointerout", _s.onMouseOut);
				}else{
					_s.dumy_do.screen.addEventListener("touchend", _s.onMouseUp);
				}
			}else{	
				_s.dumy_do.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.dumy_do.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.dumy_do.screen.addEventListener("mouseup", _s.onMouseUp);
			}
		};
		
		_s.onMouseOver = function(e, animate){
			if(_s.isActive_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				_s.setSelectedState(true);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isActive_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				_s.setNormalState(true);
			}
		};
		
		_s.onMouseUp = function(e){
			if(prt.isScrollingOnMove_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPPlaylistItem.MOUSE_UP, {id:_s.id});
		};
		

		//#################################//
		/* Change images source */
		//#################################//
		_s.changeSource = function(c){
			
			if(c == 0){
				if(_s.type != 1){
					_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad1Path + "')";
					_s.getStyle().background = "url('" + _s.playlistItemBk1Path_str + "')";
					_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress1 + "')";
					_s.type = 1;
				}
			}else{
				if(_s.type != 2){
					_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad2Path + "')";
					_s.getStyle().background = "url('" + _s.playlistItemBk2Path_str + "')";
					_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress2 + "')";
					_s.type = 2;		
				}
			}
		};
		

		//###########################################//
		// Resize and position _s...
		//###########################################//
		_s.resize = function(width, height){
			if(FWDRAPUtils.isIEAndLessThen9 && !_s.textHeight || _s == null) return;
			_s.sW = width;
			_s.sH = height;
			var offsetW = 0;
			
			var yPos = parseInt((height - _s.textHeight)/2) + 1;
			var duratY = parseInt((height - _s.duratH)/2) + 1; 

			if(_s.playPause_do){
				_s.titleText_do.setX(_s.playPauseButtonOffsetLeftAndRight * 2 + _s.playPause_do.w + _s.trackTitleOffsetLeft - 2);
				_s.playPause_do.setY(parseInt((height - _s.playPause_do.h)/2));
			}else{
				_s.titleText_do.setX(_s.trackTitleOffsetLeft);
			}
				
			_s.titleText_do.setY(yPos);
			
			if(_s.buyButton_do && _s.downloadButton_do){
				if(_s.durat_do){
					_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
					_s.durat_do.setY(duratY);
					offsetW = _s.durat_do.x;
				}else{
					offsetW = width;
				}
				
				_s.downloadButton_do.setX(offsetW - _s.downloadButton_do.w - _s.downloadButtonOffsetRight + 3);
				_s.downloadButton_do.setY(parseInt((height - _s.downloadButton_do.h)/2));
				
				var oY = 4;
				if(prt._d.useVectorIcons) oY = 10;
				_s.buyButton_do.setX(_s.downloadButton_do.x - _s.buyButton_do.w - oY);
				_s.buyButton_do.setY(parseInt((height - _s.buyButton_do.h)/2));
			
				if(_s.titleText_do.x + _s.titleWidth + _s.downloadButton_do.w + _s.buyButton_do.w + _s.downloadButtonOffsetRight + 4> offsetW){
					_s.grad_do.setX(_s.buyButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.downloadButton_do){
				if(_s.durat_do){
					_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
					_s.durat_do.setY(duratY);
					offsetW = _s.durat_do.x;
				}else{
					offsetW = width;
				}
				
				_s.downloadButton_do.setX(offsetW - _s.downloadButton_do.w - _s.downloadButtonOffsetRight + 3);
				_s.downloadButton_do.setY(parseInt((height - _s.downloadButton_do.h)/2));
			
				if(_s.titleText_do.x + _s.titleWidth + _s.downloadButton_do.w + _s.downloadButtonOffsetRight > offsetW){
					_s.grad_do.setX(_s.downloadButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.buyButton_do){
				
				if(_s.durat_do){
					_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
					_s.durat_do.setY(duratY);
					offsetW = _s.durat_do.x;
				}else{
					offsetW = width;
				}
				
				_s.buyButton_do.setX(offsetW - _s.buyButton_do.w - _s.downloadButtonOffsetRight + 3);
				_s.buyButton_do.setY(parseInt((height - _s.buyButton_do.h)/2));
			
				if(_s.titleText_do.x + _s.titleWidth + _s.buyButton_do.w + _s.downloadButtonOffsetRight > offsetW){
					_s.grad_do.setX(_s.buyButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.durat_do){
				_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
				_s.durat_do.setY(duratY);
				if(_s.titleText_do.x + _s.titleWidth > _s.durat_do.x){
					_s.grad_do.setX(_s.durat_do.x - _s.durationOffsetRight - 3);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.downloadButton_do){
				_s.downloadButton_do.setX(width - _s.downloadButton_do.w - _s.downloadButtonOffsetRight + 2);
				if(_s.titleText_do.x + _s.titleWidth > _s.downloadButton_do.x){
					_s.grad_do.setX(_s.downloadButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
				_s.downloadButton_do.setY(parseInt((height - _s.downloadButton_do.h)/2));
			}else{
				if(_s.titleText_do.x + _s.titleWidth >  width - 10){
					_s.grad_do.setX(width - 15);
				}else{
					_s.grad_do.setX(-300);
				}
			}
			
			_s.dumy_do.setWidth(width);
			_s.dumy_do.setHeight(height);
			_s.setWidth(width);
			_s.setHeight(height);
		};
		

		//###########################################//
		/* setup download button */
		//###########################################//
		_s.setupDownloadButton = function(){
			if(prt._d.useVectorIcons){
				FWDRAPSimpleButton.setPrototype();
				_s.downloadButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon-small fwdrap-icon fwdrap-icon-download'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				FWDRAPSimpleSizeButton.setPrototype();
				_s.downloadButton_do = new FWDRAPSimpleSizeButton(
						_s.playlistDownloadButtonS_str,
						_s.playlistDownloadButtonN_img.src,
						_s.playlistDownloadButtonN_img.width,
						_s.playlistDownloadButtonN_img.height,
						_s.useHEX,
						_s.n2BC,
						_s.sBC
					);
			}
			
			_s.downloadButton_do.getStyle().position = "absolute";
			_s.downloadButton_do.addListener(FWDRAPSimpleSizeButton.CLICK, _s.dwButtonClickHandler);
			_s.addChild(_s.downloadButton_do);
		};
		
		_s.dwButtonClickHandler = function(){
			_s.dispatchEvent(FWDRAPPlaylistItem.DOWNLOAD, {id:_s.id});
		};
		
		//###########################################//
		/* setup buy button */
		//###########################################//
		_s.setupBuyButton = function(){
			
			if(prt._d.useVectorIcons){
				FWDRAPSimpleButton.setPrototype();
				_s.buyButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon-small fwdrap-icon fwdrap-icon-cart'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				FWDRAPSimpleSizeButton.setPrototype();
				_s.buyButton_do = new FWDRAPSimpleSizeButton(
						_s.playlistBuyButtonS_str,
						_s.playlistBuyButtonN_img.src,
						_s.playlistBuyButtonN_img.width,
						_s.playlistBuyButtonN_img.height,
						_s.useHEX,
						_s.n2BC,
						_s.sBC
					);
			}
			
			_s.buyButton_do.getStyle().position = "absolute";
			_s.buyButton_do.addListener(FWDRAPSimpleSizeButton.CLICK, _s.buyButtonClickHandler);
			_s.addChild(_s.buyButton_do);
		};
		
		_s.buyButtonClickHandler = function(){
			_s.dispatchEvent(FWDRAPPlaylistItem.BUY, {id:_s.id});
		};

		
		//###########################################//
		/* setup progress */
		//###########################################//
		_s.setupProgress = function(){
			_s.progress_do = new FWDRAPDisplayObject("div");
			_s.progress_do.setBackfaceVisibility();
			_s.progress_do.getStyle().height = '100%';
			_s.addChild(_s.progress_do);
		};
		
		_s.updateProgressPercent = function(percent){
			if(_s == null) return;
			if(_s.progressPercent == percent) return;
			_s.progressPercent = percent;
			_s.progress_do.setWidth(parseInt(_s.sW * percent));	
		};
		

		//###########################################//
		/* setup play/pause button */
		//###########################################//
		_s.setupPlayPauseButton = function(){
			_s.playPause_do = new FWDRAPDisplayObject("div");
			_s.playPause_do.setWidth(_s.playPauseButtonWidth);
			_s.playPause_do.setHeight(_s.playPauseButtonHeight);
			
			_s.playN_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.playNImage_img = new Image();
				_s.playNImage_img.src = _s.playlistPlayButtonN_str;
				_s.playNImage_img.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.playNImage_img, _s.n2BC, true);
					_s.playNImageCanvas = testCanvas.canvas;
					_s.playNImageBackground = testCanvas.image;
					_s.playN_do.getStyle().background = "url('" + _s.playNImageBackground.src + "')";
				}
			}else{
				_s.playN_do.getStyle().background = "url('" + _s.playlistPlayButtonN_str + "') no-repeat";
			}
			_s.playN_do.setWidth(_s.playPauseButtonWidth);
			_s.playN_do.setHeight(_s.playPauseButtonHeight);
			
			_s.playS_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.playSImage_img = new Image();
				_s.playSImage_img.src = _s.playlistPlayButtonS_str;
				_s.playSImage_img.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.playSImage_img, _s.nBC, true);
					_s.playSImageCanvas = testCanvas.canvas;
					_s.playSImageBackground = testCanvas.image;
					_s.playS_do.getStyle().background = "url('" + _s.playSImageBackground.src + "')";
				}
			}else{
				_s.playS_do.getStyle().background = "url('" + _s.playlistPlayButtonS_str + "') no-repeat";
			}
			_s.playS_do.setWidth(_s.playPauseButtonWidth);
			_s.playS_do.setHeight(_s.playPauseButtonHeight);
			_s.playS_do.setAlpha(0);
			
			
			_s.pauseN_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.pauseNImage_img = new Image();
				_s.pauseNImage_img.src = _s.playlistPauseButtonN_str;
				_s.pauseNImage_img.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.pauseNImage_img, _s.n2BC, true);
					_s.pauseNImageCanvas = testCanvas.canvas;
					_s.pauseNImageBackground = testCanvas.image;
					_s.pauseN_do.getStyle().background = "url('" + _s.pauseNImageBackground.src + "')";
				}
			}else{
				_s.pauseN_do.getStyle().background = "url('" + _s.playlistPauseButtonN_str + "') no-repeat";
			}
			
			_s.pauseN_do.setWidth(_s.playPauseButtonWidth);
			_s.pauseN_do.setHeight(_s.playPauseButtonHeight);
			
			
			_s.pauseS_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.pauseSImage_img = new Image();
				_s.pauseSImage_img.src = _s.playlistPauseButtonS_str;
				_s.pauseSImage_img.onload = function(){
					if(!_s) return;
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.pauseSImage_img, _s.nBC, true);
					_s.pauseSImageCanvas = testCanvas.canvas;
					_s.pauseSImageBackground = testCanvas.image;
					_s.pauseS_do.getStyle().background = "url('" + _s.pauseSImageBackground.src + "')";
				}
			}else{
				_s.pauseS_do.getStyle().background = "url('" + _s.playlistPauseButtonS_str + "') no-repeat";
			}
			_s.pauseS_do.setWidth(_s.playPauseButtonWidth);
			_s.pauseS_do.setHeight(_s.playPauseButtonHeight);
			_s.pauseN_do.setX(-300);
			_s.pauseS_do.setX(-300);
			_s.pauseS_do.setAlpha(0);
			
			_s.playPause_do.setX(_s.playPauseButtonOffsetLeftAndRight);
			
			_s.playPause_do.addChild(_s.playN_do);
			_s.playPause_do.addChild(_s.playS_do);
			_s.playPause_do.addChild(_s.pauseN_do);
			_s.playPause_do.addChild(_s.pauseS_do);
			_s.addChild(_s.playPause_do);
		};
		

		//###########################################//
		/* setup title */
		//###########################################//
		_s.setupTitle = function(){
			_s.titleText_do = new FWDRAPDisplayObject("div");
			
			var cls = 'fwdrap-playlist-item-white-text';
			if(prt._d.isDark){
				cls = 'fwdrap-playlist-item-dark-text';
			}
			_s.titleText_do.screen.className = cls;
			_s.slTitle = _s.titleText_do.screen.className;
		
			_s.titleText_do.setOverflow("visible");
			_s.titleText_do.setBackfaceVisibility();
			_s.titleText_do.getStyle().fontFamily = "Arial";
			_s.titleText_do.getStyle().fontSize= "12px";
			_s.titleText_do.getStyle().whiteSpace= "nowrap";
			_s.titleText_do.getStyle().textAlign = "left";
			_s.titleText_do.setInnerHTML(_s.title_str);
			_s.addChild(_s.titleText_do);
		};
		
		_s.updateTitle = function(){
			if(_s == null) return;
			_s.titleText_do.setInnerHTML(_s.title_str);
		};
		
		_s.setTextSizes = function(overwrite){
			if(_s == null) return;
			if(_s.textHeight && !overwrite) return;
			
			_s.titleWidth = _s.titleText_do.screen.offsetWidth;
			_s.textHeight = _s.titleText_do.screen.offsetHeight;
			if(_s.durat_do) _s.duratH = _s.durat_do.screen.offsetHeight;
		
			if(_s.durat_do){
				_s.durationWidth = _s.durat_do.screen.offsetWidth;
			}
			_s.grad_do.setWidth(150);
		};
		

		//##########################################//
		/* Setup grad */
		//##########################################//
		_s.setupGrad = function(){
			_s.grad_do = new FWDRAPDisplayObject("div");
			_s.grad_do.setOverflow("visible");
			if(FWDRAPUtils.isApple){
				_s.grad_do.hasTransform3d_bl = false;
				_s.grad_do.hasTransform2d_bl = false;
			}
			_s.grad_do.setBackfaceVisibility();
			_s.grad_do.setHeight(_s.itemHeight - 1);
			_s.addChild(_s.grad_do);
		};
		

		//###########################################//
		/* setup duration */
		//###########################################//
		_s.setupDuration = function(){
			_s.durat_do = new FWDRAPDisplayObject("div");

			var cls = 'fwdrap-playlist-item-white-duration';
			if(prt._d.isDark){
				cls = 'fwdrap-playlist-item-dark-duration';
			}
			_s.durat_do.setOverflow("visible");
			_s.durat_do.setBackfaceVisibility();
			_s.durat_do.screen.className = cls;
			_s.durCls = _s.durat_do.screen.className;
			_s.durat_do.getStyle().fontFamily = "Arial";
			_s.durat_do.getStyle().fontSize= "12px";
			_s.durat_do.getStyle().whiteSpace= "nowrap";
			_s.durat_do.getStyle().textAlign = "left";
			_s.durat_do.setInnerHTML(_s.duration);
			_s.addChild(_s.durat_do);
		};
		

		//###########################################//
		/* setup dummy */
		//###########################################//
		_s.setupDumy = function(){
			_s.dumy_do = new FWDRAPDisplayObject("div");
			_s.dumy_do.setButtonMode(true);
			if(FWDRAPUtils.isIE){
				_s.dumy_do.setBkColor("#FFFFFF");
				_s.dumy_do.setAlpha(.001);
			}
			_s.addChild(_s.dumy_do);
		};

		
		//##############################//
		/* set normal/selected state*/
		//##############################//
		_s.setNormalState = function(animate, overwrite){
			if(!_s.isSelected_bl && !overwrite) return;
			_s.isSelected_bl = false;
			_s.removeTitleSlectedClass();
			
			if(animate){
				FWDAnimation.to(_s.titleText_do.screen, .8, {css:{color:_s.titleNormalColor_str}, ease:Expo.easeOut});
				if(_s.durat_do){
					FWDAnimation.to(_s.durat_do.screen, .8, {css:{color:_s.durationColor_str}, ease:Expo.easeOut});
				}
				if(_s.playPause_do){
					FWDAnimation.to(_s.pauseS_do, .8, {alpha:0, ease:Expo.easeOut});
					FWDAnimation.to(_s.playS_do, .8, {alpha:0, ease:Expo.easeOut});
				}
			}else{
				FWDAnimation.killTweensOf(_s.titleText_do);
				_s.titleText_do.getStyle().color = _s.titleNormalColor_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.durationColor_str;
				if(_s.playPause_do){
					FWDAnimation.killTweensOf(_s.pauseS_do);
					FWDAnimation.killTweensOf(_s.playS_do);
					_s.pauseS_do.setAlpha(0);
					_s.playS_do.setAlpha(0);
				}
			}
		};
		
		_s.setSelectedState = function(animate){
			if(_s.isSelected_bl) return;
			_s.isSelected_bl = true;
			_s.setTitleSelectedClass();
		
			if(animate){
				FWDAnimation.to(_s.titleText_do.screen, .8, {css:{color:_s.trackTitleSelected_str}, ease:Expo.easeOut});
				if(_s.durat_do){
					FWDAnimation.to(_s.durat_do.screen, .8, {css:{color:_s.trackTitleSelected_str}, ease:Expo.easeOut});
				}
				if(_s.playPause_do){
					FWDAnimation.to(_s.pauseS_do, .8, {alpha:1, ease:Expo.easeOut});
					FWDAnimation.to(_s.playS_do, .8, {alpha:1, ease:Expo.easeOut});
				}
			}else{
				FWDAnimation.killTweensOf(_s.titleText_do);
				_s.titleText_do.getStyle().color = _s.trackTitleSelected_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.trackTitleSelected_str;
				
				if(_s.playPause_do){
					FWDAnimation.killTweensOf(_s.pauseS_do);
					FWDAnimation.killTweensOf(_s.playS_do);
					_s.pauseS_do.setAlpha(1);
					_s.playS_do.setAlpha(1);
				}
			}
		};

		_s.setTitleSelectedClass = function(){
			if(_s.slTitle){
				_s.titleText_do.screen.className = _s.slTitle  + ' active';
			}
			if(_s.durat_do){
				_s.durat_do.screen.className = _s.durCls  + ' active';
			}
		}

		_s.removeTitleSlectedClass = function(){
			if(_s.slTitle && !_s.isActive_bl){
				_s.titleText_do.screen.className = _s.slTitle ;
			}
			if(_s.durat_do){
				_s.durat_do.screen.className = _s.durCls;
			}
		}
		

		//##############################//
		/* set active/deactive states */
		//##############################//
		_s.setActive = function(){
			if(_s.isActive_bl) return;
			_s.isActive_bl = true;
			_s.setSelectedState(true);
			_s.setTitleSelectedClass();
		};
		
		_s.setInActive = function(){
			if(!_s.isActive_bl) return;
			_s.isActive_bl = false;
			_s.setNormalState(true);
			_s.updateProgressPercent(0);
			_s.showPlayButton();

			_s.removeTitleSlectedClass();

		};
		

		//##############################//
		/* show pause / play button */
		//##############################//
		_s.showPlayButton = function(){
			if(!_s) return;
			if(!_s.playN_do) return;
			_s.playN_do.setX(0);
			_s.playS_do.setX(0);
			_s.pauseN_do.setX(-300);
			_s.pauseS_do.setX(-300);
		};
		
		_s.showPauseButton = function(){
			if(!_s.playN_do) return;
			_s.playN_do.setX(-300);
			_s.playS_do.setX(-300);
			_s.pauseN_do.setX(0);
			_s.pauseS_do.setX(0);
		};
		

		//##############################//
		/* destroy */
		//##############################//
		_s.destroy = function(){
			if(_s.playNImage_img){
				_s.playNImage_img.onload = '';
				_s.playNImage_img = null;
				_s.playSImage_img.onload = '';
				_s.playSImage_img = null;
				_s.pauseNImage_img.onload = '';
				_s.pauseNImage_img = null;
				_s.pauseSImage_img.onload = '';
				_s.pauseSImage_img = null;
			}

			_s.playlistItemGrad1Path = null;
			_s.playlistItemProgress1 = null;
			_s.playlistPlayButtonN_img = null;
			_s.playlistDownloadButtonN_img = null;
			_s.playlistDownloadButtonS_str = null;
			_s.playlistBuyButtonN_img = null;
			_s.playlistBuyButtonS_str = null;
		
			_s.progress_do = null;
			_s.playPause_do = null;
			_s.playN_do = null;
			_s.playS_do = null;
			_s.pauseN_do = null;
			_s.pauseS_do = null;
			_s.titleText_do = null;
			_s.grad_do = null;
			_s.durat_do = null;
			_s.dumy_do = null;
			
			_s.title_str = null;
			_s.playlistItemBk1Path_str = null;
			_s.playlistItemBk2Path_str = null;
			_s.playlistPlayButtonN_str = null;
			_s.playlistPlayButtonS_str = null;
			_s.playlistPauseButtonN_str = null;
			_s.playlistPauseButtonS_str = null;
			_s.titleNormalColor_str = null;
			_s.trackTitleSelected_str = null;
			_s.durationColor_str = durationColor_str;
			
			_s.setInnerHTML("");
			_s = null;
			prototype = null;
			FWDRAPPlaylistItem.prototype = null;
		};
		
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, n2BC, sBC){
			
			_s.nBC = nBC;
			_s.n2BC = n2BC
			_s.sBC = sBC;
		
			_s.titleNormalColor_str = _s.nBC;
			_s.trackTitleSelected_str = _s.n2BC;
			var btnNclr = '#666666';
			if(window['isWhite']){
				btnNclr = '#888888';
			} 

			if(_s.isSelected_bl) {
				_s.titleText_do.getStyle().color = _s.trackTitleSelected_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.trackTitleSelected_str;
			}else{
				_s.titleText_do.getStyle().color = _s.titleNormalColor_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.titleNormalColor_str;
			}
		
			if(_s.buyButton_do) _s.buyButton_do.updateHEXColors(btnNclr, _s.n2BC);
			if(_s.downloadButton_do) _s.downloadButton_do.updateHEXColors(btnNclr, _s.n2BC);
			
			if(_s.playNImage_img){
				var playNImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.playNImage_img, _s.playNImageCanvas, btnNclr, true);
				var playSImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.playSImage_img, _s.playSImageCanvas, n2BC, true);
				_s.playN_do.getStyle().background = "url('" + playNImage_img.src + "')";
				_s.playS_do.getStyle().background = "url('" + playSImage_img.src + "')";
				
				var pauseNImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.pauseNImage_img, _s.pauseNImageCanvas, btnNclr, true);
				var pauseSImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.pauseSImage_img, _s.pauseSImageCanvas, n2BC, true);
				_s.pauseN_do.getStyle().background = "url('" + pauseNImage_img.src + "')";
				_s.pauseS_do.getStyle().background = "url('" + pauseSImage_img.src + "')";
			}	
		}
	
		_s.init();
	};
	
	/* set prototype */
	FWDRAPPlaylistItem.setPrototype = function(){
		FWDRAPPlaylistItem.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPlaylistItem.PLAY = "play";
	FWDRAPPlaylistItem.PAUSE = "pause";
	FWDRAPPlaylistItem.MOUSE_UP = "mouseUp";
	FWDRAPPlaylistItem.DOWNLOAD = "download";
	FWDRAPPlaylistItem.BUY = "buy";

	
	FWDRAPPlaylistItem.prototype = null;
	window.FWDRAPPlaylistItem = FWDRAPPlaylistItem;
	
}());/**
 * Royal Audio Player
 * Visualizer preloader.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPPreloader = function(_d, sW, sH){

		'use strict';
		
		var _s  = this;
		var prototype = FWDRAPPreloader.prototype;
	
		_s.sW = sW;
		_s.sH = sH;
		_s.isShowed_bl = false;
	
		
		//###################################//
		/* init */
		//###################################//
		_s.init = function(){
			_s.getStyle().zIndex = 1;
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.getStyle().pointerEvents = 'none';
			
			FWDRAPVisualizer.setPrototype();
			_s.vis = new FWDRAPVisualizer(
				{'visPrst':'bars1',
				 'visClr':_d.visClr,
				 'visCapClr':_d.visCapClr,
				 'useDumyVisualizeOnIOS':false});
			_s.vis.resize(0, 0, _s.sW, _s.sH)
			_s.addChild(_s.vis);
			
			_s.hide(false);
		};
		

		//###################################//
		/* start / stop preloader animation */
		//###################################//
		_s.start = function(){
			if(_s == null) return;
			_s.vis.start();
		};
		
		_s.stop = function(){
			_s.vis.stop();
		};
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		_s.show = function(){
			_s.setVisible(true);
			_s.start();
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, 1, {alpha:1});
			_s.isShowed_bl = true;
		};
		
		_s.hide = function(animate){
			if(!_s.isShowed_bl) return;
			FWDAnimation.killTweensOf(_s);
			if(animate){
				FWDAnimation.to(_s, 1, {alpha:0, onComplete:_s.onHideComplete});
			}else{
				_s.setVisible(false);
				_s.setAlpha(0);
			}
			_s.isShowed_bl = false;
		};
		
		_s.onHideComplete = function(){
			_s.stop();
			_s.setVisible(false);
			_s.dispatchEvent(FWDRAPPreloader.HIDE_COMPLETE);
		};

		_s.init();
	};
	
	
	/* set prototype */
    FWDRAPPreloader.setPrototype = function(){
    	FWDRAPPreloader.prototype = new FWDRAPDisplayObject("div");
    };
    
    FWDRAPPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDRAPPreloader.prototype = null;
	window.FWDRAPPreloader = FWDRAPPreloader;
}(window));/**
 * Royal Audio Player
 * Scrubber tooltip.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDRAPScrubberTooltip = function(
			buttonRef_do,
			bkColor,
			fontColor_str,
			toolTipLabel_str,
			toolTipsButtonsHideDelay
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPScrubberTooltip.prototype;
		
		_s.buttonRef_do = buttonRef_do;
		
		_s.bkColor = bkColor;
	
		_s.fontColor_str = fontColor_str;
		_s.toolTipLabel_str = toolTipLabel_str;
		
		_s.toolTipsButtonsHideDelay = toolTipsButtonsHideDelay * 1000;
		_s.pointerWidth = 7;
		_s.pointerHeight = 4;
		
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.isShowed_bl = true;
	

		//##########################################//
		/* initialize */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			_s.setupMainContainers();
			_s.setLabel(toolTipLabel_str);
			_s.hide();
			_s.setVisible(false);
			_s.getStyle().backgroundColor = _s.bkColor;
			_s.screen.className = 'fwdrap-controler-tooltip-background';
			_s.getStyle().zIndex = 9999999999999;
			_s.getStyle().pointerEvents = "none";
		};
		

		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			_s.pointerHolder_do = new FWDRAPDisplayObject("div");
			_s.pointerHolder_do.setOverflow('visible');
			_s.addChild(_s.pointerHolder_do);

			_s.text_do = new FWDRAPDisplayObject("div");
			_s.text_do.hasTransform3d_bl = false;
			_s.text_do.hasTransform2d_bl = false;
			_s.text_do.screen.className = 'fwdrap-controler-tooltip-text';
			_s.text_do.setBackfaceVisibility();
			_s.text_do.setDisplay("inline-block");
			_s.text_do.getStyle().textAlign = 'center';
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "12px";
			_s.text_do.getStyle().color = _s.fontColor_str;
			_s.text_do.getStyle().whiteSpace= "nowrap";
			_s.text_do.getStyle().padding = "4px 7px";
			_s.addChild(_s.text_do);
			
			_s.pointer_do = new FWDRAPDisplayObject("div");
			_s.pointer_do.screen.className = 'fwdrap-controler-tooltip-pointer';
			_s.pointer_do.setBkColor(_s.bkColor);
			_s.pointer_do.screen.style = "border: 4px solid transparent; border-top-color: " + _s.bkColor + ";";
			_s.pointerHolder_do.addChild(_s.pointer_do);
		
		}
		

		//##########################################//
		/* set label */
		//##########################################//
		_s.setLabel = function(label){
			
			if(label === undefined ) return;
			_s.text_do.setInnerHTML(label);
			setTimeout(function(){
				if(_s == null) return;
					_s.setWidth(_s.text_do.getWidth());
					_s.setHeight(_s.text_do.getHeight());
					_s.positionPointer();
				},20);
		};
		
		_s.positionPointer = function(offsetX){
			var finalX;
			var finalY;
			
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((_s.w - 8)/2) + offsetX;
			finalY = _s.h;
			_s.pointerHolder_do.setX(finalX);
			_s.pointerHolder_do.setY(finalY);
			
		};
		

		//##########################################//
		/* show / hide*/
		//##########################################//
		_s.show = function(){

			//if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			clearTimeout(_s.hideWithDelayId_to);

			FWDAnimation.killTweensOf(_s);
			clearTimeout(_s.showWithDelayId_to);
			_s.showWithDelayId_to = setTimeout(_s.showFinal, _s.toolTipsButtonsHideDelay);
		};
		
		_s.showFinal = function(){
			_s.setVisible(true);
			FWDAnimation.to(_s, .4, {alpha:1, onComplete:function(){_s.setVisible(true);}, ease:Quart.easeOut});
		};
		
		_s.hide = function(){
			
			if(!_s.isShowed_bl) return;
			clearTimeout(_s.showWithDelayId_to);
			clearTimeout(_s.hideWithDelayId_to);

			_s.hideWithDelayId_to = setTimeout(function(){
				
				FWDAnimation.killTweensOf(_s);
				_s.setVisible(false);
				_s.isShowed_bl = false;	
				_s.setAlpha(0);
			}, 100);
			
		};
		

		_s.init();
	};

	
	/* set prototype */
	FWDRAPScrubberTooltip.setPrototype = function(){
		FWDRAPScrubberTooltip.prototype = null;
		FWDRAPScrubberTooltip.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPScrubberTooltip.CLICK = "onClick";
	FWDRAPScrubberTooltip.MOUSE_DOWN = "onMouseDown";
	
	FWDRAPScrubberTooltip.prototype = null;
	window.FWDRAPScrubberTooltip = FWDRAPScrubberTooltip;
}(window));/**
 * Royal Audio Player
 * Share window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPShareWindow = function(_d, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPShareWindow.prototype;
				
		_s.embedColoseN_img = _d.embedColoseN_img;
	
		_s.buttons_ar = [];
		
		_s.embedWindowBackground_str = _d.shareBkPath_str;
		_s.embedWindowCloseButtonMargins = _d.playbackRateButtonsMargins;
			
		_s.totalWidth = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.minMarginXSpace = 20;
		_s.hSpace = 20;
		_s.minHSpace = 10;
		_s.vSpace = 15;
		
		_s.useVectorIcons_bl = _d.useVectorIcons;
		_s.isMbl = FWDRAPUtils.isMobile;
	

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			if(_s.clsBtn) return;
			if(_d.skinPath_str.indexOf("hex_white") != -1){
				_s.sBC = "#FFFFFF";
			}else{
				_s.sBC = _d.sBC;
			}
			
			_s.setBackfaceVisibility();
			_s.mainHld = new FWDRAPDisplayObject("div");
			_s.mainHld.hasTransform3d_bl = false;
			_s.mainHld.hasTransform2d_bl = false;
			_s.mainHld.setBackfaceVisibility();

			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.screen.className = 'fwdrap-window-background';
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			_s.bk_do.getStyle().background = "url('" + _s.embedWindowBackground_str + "')";
			
			//setup close button
			FWDRAPSimpleButton.setPrototype();
			
			if(_s.useVectorIcons_bl){
				_s.clsBtn = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
						"fwdrap-categories-next-and-prev-normal-state",
						"fwdrap-categories-next-and-prev-selected-state"
				);
			}else{
				_s.clsBtn = new FWDRAPSimpleButton(_d.shareClooseN_img, _d.embedWindowClosePathS_str, undefined,
					true,
					_d.useHEX,
					_d.nBC,
					_s.sBC,
					false, false, false, true);
			}
			
			_s.clsBtn.screen.className = 'fwdrap-close-button';
			_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			
			_s.addChild(_s.mainHld);
			_s.mainHld.addChild(_s.bk_do);
			_s.mainHld.addChild(_s.clsBtn); 
			
			_s.setupButtons();
		};
	
		_s.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide();
		};
		
		_s.positionAndResize = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			
			_s.clsBtn.setX(_s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins);
			_s.clsBtn.setY(_s.embedWindowCloseButtonMargins);
			
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			_s.positionButtons();
		};
		
	
		//###########################################//
		/* Setup buttons */
		//###########################################//
		_s.setupButtons = function(){
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.facebookButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-facebook'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.facebookButton_do = new FWDRAPSimpleButton(_d.facebookN_img, _d.facebookSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.facebookButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.facebookOnMouseUpHandler);
			_s.buttons_ar.push(_s.facebookButton_do);
			
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.googleButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-google-plus'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.googleButton_do = new FWDRAPSimpleButton(_d.googleN_img, _d.googleSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.googleButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.googleOnMouseUpHandler);
			_s.buttons_ar.push(_s.googleButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.twitterButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-twitter'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.twitterButton_do = new FWDRAPSimpleButton(_d.twitterN_img, _d.twitterSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.twitterButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.twitterOnMouseUpHandler);
			_s.buttons_ar.push(_s.twitterButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.likedinButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-linkedin'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.likedinButton_do = new FWDRAPSimpleButton(_d.likedInkN_img, _d.likedInSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.likedinButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.likedinOnMouseUpHandler);
			_s.buttons_ar.push(_s.likedinButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.bufferButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-buffer'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.bufferButton_do = new FWDRAPSimpleButton(_d.bufferkN_img, _d.bufferSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.bufferButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.bufferOnMouseUpHandler);
			_s.buttons_ar.push(_s.bufferButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.diggButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-digg'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.diggButton_do = new FWDRAPSimpleButton(_d.diggN_img, _d.diggSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.diggButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.diggOnMouseUpHandler);
			_s.buttons_ar.push(_s.diggButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.redditButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-reddit'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.redditButton_do = new FWDRAPSimpleButton(_d.redditN_img, _d.redditSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.redditButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.redditOnMouseUpHandler);
			_s.buttons_ar.push(_s.redditButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.thumbrlButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-tumblr'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.thumbrlButton_do = new FWDRAPSimpleButton(_d.thumbrlN_img, _d.thumbrlSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.thumbrlButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.thumbrlOnMouseUpHandler);
			_s.buttons_ar.push(_s.thumbrlButton_do);
			
			_s.mainHld.addChild(_s.facebookButton_do);
			_s.mainHld.addChild(_s.googleButton_do);
			_s.mainHld.addChild(_s.twitterButton_do);
			_s.mainHld.addChild(_s.likedinButton_do);
			_s.mainHld.addChild(_s.bufferButton_do);
			_s.mainHld.addChild(_s.diggButton_do);
			_s.mainHld.addChild(_s.redditButton_do);
			_s.mainHld.addChild(_s.thumbrlButton_do);
		}
		
		
		_s.facebookOnMouseUpHandler = function(){
			var url = "http://www.facebook.com/share.php?u=" + encodeURIComponent(location.href);
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.googleOnMouseUpHandler = function(){
			var url = "https://plus.google.com/share?url=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.twitterOnMouseUpHandler = function(){
			var url = "http://twitter.com/home?status=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.likedinOnMouseUpHandler = function(){
			var url = "https://www.linkedin.com/cws/share?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.bufferOnMouseUpHandler = function(){
			var url = "https://buffer.com/add?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.diggOnMouseUpHandler = function(){
			var url = "http://digg.com/submit?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.redditOnMouseUpHandler = function(){
			var url = "https://www.reddit.com/?submit=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.thumbrlOnMouseUpHandler = function(){
			var url = "http://www.tumblr.com/share/link?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
	
		
		//########################################//
		/* Position buttons */
		//########################################//
		_s.positionButtons = function(){
			var button;
			var prevButton;
			var rowsAr = [];
			var rowsWidthAr = [];
			var rowsThumbsWidthAr = [];
			var tempX;
			var tempY = 0;
			var maxY = 0;
			var totalRowWidth = 0;
			var rowsNr = 0;
			
			rowsAr[rowsNr] = [0];
			rowsWidthAr[rowsNr] = _s.buttons_ar[0].totalWidth;
			rowsThumbsWidthAr[rowsNr] = _s.buttons_ar[0].totalWidth;
			_s.totalButtons = _s.buttons_ar.length;
			
			for (var i=1; i<_s.totalButtons; i++){
				button = _s.buttons_ar[i];
				
				if (rowsWidthAr[rowsNr] + button.totalWidth + _s.minHSpace > _s.sW - _s.minMarginXSpace){	
					rowsNr++;
					rowsAr[rowsNr] = [];
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] = button.totalWidth;
					rowsThumbsWidthAr[rowsNr] = button.totalWidth;
				}else{
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] += button.totalWidth + _s.minHSpace;
					rowsThumbsWidthAr[rowsNr] += button.totalWidth;
				}
			}
		
			tempY = parseInt((_s.sH - ((rowsNr + 1) * (button.totalHeight + _s.vSpace) - _s.vSpace))/2);
			
			for (var i=0; i<rowsNr + 1; i++){
				var rowMarginXSpace = 0;
				
				var rowHSpace;
				
				if (rowsAr[i].length > 1){
					rowHSpace = Math.min((_s.sW - _s.minMarginXSpace - rowsThumbsWidthAr[i]) / (rowsAr[i].length - 1), _s.hSpace);
					
					var rowWidth = rowsThumbsWidthAr[i] + rowHSpace * (rowsAr[i].length - 1);
					
					rowMarginXSpace = parseInt((_s.sW - rowWidth)/2);
				}else{
					rowMarginXSpace = parseInt((_s.sW - rowsWidthAr[i])/2);
				}
				
				if (i > 0) tempY += button.h + _s.vSpace;
				
				for (var j=0; j<rowsAr[i].length; j++){
					button = _s.buttons_ar[rowsAr[i][j]];
				
					if (j == 0){
						tempX = rowMarginXSpace;
					}else{
						prevButton = _s.buttons_ar[rowsAr[i][j] - 1];
						tempX = prevButton.finalX + prevButton.totalWidth + rowHSpace;
					}
					

					button.finalX = tempX;
					button.finalY = tempY;
						
					if (maxY < button.finalY) maxY = button.finalY;
					
					_s.buttonsBarTotalHeight = maxY + button.totalHeight + _s.startY ;
					button.setX(button.finalX);
					button.setY(button.finalY);
				}
			}
		}
		
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			prt.main_do.addChild(_s);
			_s.init();
		
			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					
					if(_s.clsBtn.w != 0){
				
						_s.positionAndResize();
						
						clearInterval(_s.checkButtonsId_to);
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);
						
						_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
						
						FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
					
					}
				
				}, 50);
			}else{
				_s.positionAndResize();
			
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
				setTimeout(function(){
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
				}, 100);
			}
		};
		
		_s.showCompleteHandler = function(){};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(prt.customContextMenu_do) prt.customContextMenu_do.enable();
		
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
		};
		
		_s.hideCompleteHandler = function(){
			prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDRAPShareWindow.HIDE_COMPLETE);
		};
	
		if(_d.useHEX){
			_s.init();
		}
	};
	
		
	/* set prototype */
	FWDRAPShareWindow.setPrototype = function(){
		FWDRAPShareWindow.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPShareWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDRAPShareWindow.prototype = null;
	window.FWDRAPShareWindow = FWDRAPShareWindow;
}(window));﻿/**
 * Royal Audio Player
 * Simple button.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDRAPSimpleButton = function(nImg, 
								  sPath, 
								  dPath, 
								  alwaysShowSelectedPath, 
								  useHEX,
								  nBC,
								  sBC,
								  iconCSSString, 
								  normalCalssName,
								  selectedCalssName,
								  showOver){
		'use strict';
		
		var _s = this;
		var prototype = FWDRAPSimpleButton.prototype;
	
		_s.useHEX = useHEX;
		_s.showOver = showOver;
		if(!useHEX){
			_s.showOver = false;
		}
		_s.iconCSSString = iconCSSString;
		_s.nImg = nImg;
		_s.sPath_str = sPath;
		_s.dPath_str = dPath;
	
		if(_s.nImg){
			_s.totalWidth = _s.nImg.width;
			_s.totalHeight = _s.nImg.height;
		}
	
		_s.nBC = nBC;
		_s.sBC = sBC;
		
		_s.normalCalssName = normalCalssName;
		_s.selectedCalssName = selectedCalssName;
		_s.isShowed_bl = true;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.allowToCreateSecondButton_bl = !_s.isMbl || _s.hasPointerEvent_bl || alwaysShowSelectedPath;
		_s.useFontAwesome_bl = Boolean(_s.iconCSSString);
	
	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setupMainContainers();
			_s.setNormalState();
		};
		

		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			if(_s.useFontAwesome_bl){
				_s.setOverflow('visible');
				_s.n_do = new FWDRAPTransformDisplayObject("div");	
				_s.n_do.setInnerHTML(_s.iconCSSString);
				_s.addChild(_s.n_do);
				_s.setFinalSize();
			}else{
				if(_s.useHEX && !_s.showOver){
					_s.n_do = new FWDRAPTransformDisplayObject("div");
					_s.n_do.setWidth(_s.totalWidth);
					_s.n_do.setHeight(_s.totalHeight);
					_s.n_do_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.nImg, _s.nBC).canvas;

					_s.n_do.screen.appendChild(_s.n_do_canvas);
					_s.addChild(_s.n_do);
				}else{
					_s.n_do = new FWDRAPTransformDisplayObject("img");	
					_s.n_do.setScreen(_s.nImg);
					_s.addChild(_s.n_do);
				}
				
				if(_s.allowToCreateSecondButton_bl){
					
					_s.img1 = new Image();
					_s.img1.src = _s.sPath_str;
					var img2 = new Image();
					_s.sImg = img2;
					
					if(_s.useHEX){
						_s.s_sdo = new FWDRAPTransformDisplayObject("div");
						_s.s_sdo.setWidth(_s.totalWidth);
						_s.s_sdo.setHeight(_s.totalHeight);
						var clr = _s.sBC;
						if(_s.showOver){
							clr = _s.nBC
						}

						_s.img1.onload = function(){
							_s.s_sdo_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.img1, clr).canvas;
							_s.s_sdo.screen.appendChild(_s.s_sdo_canvas);
						}

						if(!_s.showOver){
							_s.s_sdo.setAlpha(0);
						}
						_s.addChild(_s.s_sdo);
					}else{
						_s.s_sdo = new FWDRAPDisplayObject("img");
						_s.s_sdo.setScreen(_s.img1);
						_s.s_sdo.setWidth(_s.totalWidth);
						_s.s_sdo.setHeight(_s.totalHeight);
						if(!_s.useHEX){
							_s.s_sdo.setAlpha(0);
						}
						_s.addChild(_s.s_sdo);
					}
					
					if(_s.dPath_str){
						img2.src = _s.dPath_str;
						_s.d_sdo = new FWDRAPDisplayObject("img");
						_s.d_sdo.setScreen(img2);
						_s.d_sdo.setWidth(_s.totalWidth);
						_s.d_sdo.setHeight(_s.totalHeight);
						_s.d_sdo.setX(-100);
						_s.addChild(_s.d_sdo);
					};
				}
				
				_s.setWidth(_s.totalWidth);
				_s.setHeight(_s.totalHeight);

			}
			_s.setButtonMode(true);
			_s.screen.style.yellowOverlayPointerEvents = "none";
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screen.addEventListener("pointerup", _s.onMouseUp);
					_s.screen.addEventListener("pointerover", _s.onMouseOver);
					_s.screen.addEventListener("pointerout", _s.onMouseOut);
				}else{
					_s.screen.addEventListener("touchend", _s.onMouseUp);
				}
			}else if(_s.screen.addEventListener){	
				_s.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.screen.addEventListener("mouseup", _s.onMouseUp);
			}
		};
		
		_s.onMouseOver = function(e){
			_s.dispatchEvent(FWDRAPSimpleButton.SHOW_TOOLTIP, {e:e});
			if(_s.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(_s.isDisabled_bl || _s.isSelectedFinal_bl) return;
				_s.dispatchEvent(FWDRAPSimpleButton.MOUSE_OVER, {e:e});
				_s.setSelectedState(true);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(_s.isDisabled_bl || _s.isSelectedFinal_bl) return;
				_s.dispatchEvent(FWDRAPSimpleButton.MOUSE_OUT, {e:e});
				_s.setNormalState(true);
			}
		};
		
		_s.onMouseUp = function(e){
			if(_s.isDisabledForGood_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(_s.isDisabled_bl || e.button == 2) return;
			_s.dispatchEvent(FWDRAPSimpleButton.MOUSE_UP, {e:e});
			_s.dispatchEvent(FWDRAPSimpleButton.CLICK, {e:e});
		};

		// Set final size.
		_s.checkCount = 0;
		_s.setFinalSize = function(reset){
			if(reset){
				_s.checkCount = 0;
			}
			
			clearInterval(_s.checkId_int);
			if(_s.checkCount > 6) return;
			_s.lastWidth = _s.n_do.screen.firstChild.offsetWidth;
			_s.checkCount +=1;
		
			_s.checkId_int = setInterval(function(){
				_s.setFinalSize();
			},100);
			
			if(_s.prevWidth == _s.lastWidth || _s.lastWidth == 0) return;
			_s.setWidth(_s.n_do.screen.firstChild.offsetWidth);
			_s.setHeight(_s.n_do.screen.firstChild.offsetHeight);
			
			_s.n_do.setWidth(_s.w);
			_s.n_do.setHeight(_s.h);
			_s.buttonWidth = _s.w;
			_s.buttonHeight = _s.h;
			_s.totalWidth = _s.w;
			_s.totalHeight = _s.h;
		
			if(_s.hd_do){
				_s.hd_do.setX(_s.w - _s.hd_do.w + 2);
				_s.hd_do.setY( -2);	
			}
			
			_s.prevWidth = _s.lastWidth;
		}
		

		//##############################//
		// set select / deselect final.
		//##############################//
		_s.setSelected = function(){
			_s.isSelectedFinal_bl = true;

			if(_s.useFontAwesome_bl){
				_s.setSelectedState(true);
			}

			
			if(!_s.s_sdo) return;
			FWDAnimation.killTweensOf(_s.s_sdo);
			FWDAnimation.to(_s.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		_s.setUnselected = function(){
			_s.isSelectedFinal_bl = false;
			if(_s.useFontAwesome_bl){
				_s.setNormalState(true);
			}
			if(!_s.s_sdo) return;
			FWDAnimation.to(_s.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
		};
		

		//####################################//
		/* Set normal / selected state */
		//####################################//
		_s.setNormalState = function(animate){
			if(_s.doNotallowToSetNormal) return;
			if(_s.useFontAwesome_bl){
				FWDAnimation.killTweensOf(_s.n_do.screen);
				if(animate){
					FWDAnimation.to(_s.n_do.screen, .6, {className:_s.normalCalssName, ease:Quart.easeOut});	
				}else{
					FWDAnimation.to(_s.n_do.screen, .001, {className:_s.normalCalssName, ease:Quart.easeOut});
				}
			}else{
				if(_s.showOver){
					FWDAnimation.killTweensOf(_s.s_sdo);
					FWDAnimation.to(_s.s_sdo, .6, {alpha:1, ease:Quart.easeOut});	
				}else{
					FWDAnimation.killTweensOf(_s.s_sdo);
					FWDAnimation.to(_s.s_sdo, .6, {alpha:0, ease:Quart.easeOut});	
				}
			}
		};
		
		_s.setSelectedState = function(animate){
			if(_s.useFontAwesome_bl){
				FWDAnimation.killTweensOf(_s.n_do.screen);
				if(animate){
					FWDAnimation.to(_s.n_do.screen, .6, {className:_s.selectedCalssName, ease:Quart.easeOut});	
				}else{
					FWDAnimation.to(_s.n_do.screen, .001, {className:_s.selectedCalssName, ease:Quart.easeOut});	
				}
			}else{
				if(_s.showOver){
					FWDAnimation.killTweensOf(_s.s_sdo);
					FWDAnimation.to(_s.s_sdo, .6, {alpha:0, ease:Quart.easeOut});	
				}else{
					FWDAnimation.killTweensOf(_s.s_sdo);
					FWDAnimation.to(_s.s_sdo, .6, {alpha:1, delay:.1, ease:Quart.easeOut});
				}
			}
		};
		

		//####################################//
		/* Disable / enable */
		//####################################//
		_s.setDisabledState = function(){
			if(_s.isSetToDisabledState_bl) return;
			_s.isSetToDisabledState_bl = true;
			if(_s.d_sdo) _s.d_sdo.setX(0);
			if(_s.hd_do) _s.hd_do.setX(_s.w - _s.hd_do.w);
		};
		
		_s.setEnabledState = function(){
			if(!_s.isSetToDisabledState_bl) return;
			_s.isSetToDisabledState_bl = false;
			if(_s.d_sdo) _s.d_sdo.setX(-100);
			if(_s.hd_do) _s.hd_do.setX(-100000);
		};
		
		_s.disable = function(){
			if(_s.isDisabledForGood_bl  || _s.isDisabled_bl) return;
			_s.isDisabled_bl = true;
			_s.setButtonMode(false);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, .6, {alpha:.4});
			_s.setNormalState(true);
		};
		
		_s.enable = function(){
			if(_s.isDisabledForGood_bl || !_s.isDisabled_bl) return;
			_s.isDisabled_bl = false;
			_s.setButtonMode(true);
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, .6, {alpha:1});
		};
		
		_s.disableForGood = function(){
			_s.isDisabledForGood_bl = true;
			_s.setButtonMode(false);
		};
		
		_s.enableForGood = function(){
			_s.isDisabledForGood_bl = false;
			_s.setButtonMode(true);
		};
		
		_s.showDisabledState = function(){
			if(_s.d_sdo) if(_s.d_sdo.x != 0) _s.d_sdo.setX(0);
			if(_s.hd_do) _s.hd_do.setX(_s.w - _s.hd_do.w + 2);
		};
		
		_s.hideDisabledState = function(){
			if(_s.d_sdo) if(_s.d_sdo.x != -100) _s.d_sdo.setX(-100);
			if(_s.hd_do) _s.hd_do.setX(-10000);
		};
		

		//#####################################//
		/* show / hide */
		//#####################################//
		_s.show = function(){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			
			FWDAnimation.killTweensOf(_s);
			if(!FWDRAPUtils.isIEAndLessThen9){
				if(FWDRAPUtils.isIEWebKit){
					FWDAnimation.killTweensOf(_s.n_do);
					_s.n_do.setScale2(0);
					FWDAnimation.to(_s.n_do, .8, {scale:1, delay:.4, onStart:function(){_s.setVisible(true);}, ease:Elastic.easeOut});
				}else{
					_s.setScale2(0);
					FWDAnimation.to(_s, .8, {scale:1, delay:.4, onStart:function(){_s.setVisible(true);}, ease:Elastic.easeOut});
				}
			}else if(FWDRAPUtils.isIEAndLessThen9){
				_s.setVisible(true);
			}else{
				_s.setAlpha(0);
				FWDAnimation.to(_s, .4, {alpha:1, delay:.4});
				_s.setVisible(true);
			}
		};	
			
		_s.hide = function(animate){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.killTweensOf(_s.n_do);
			_s.setVisible(false);
		};
		

		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			if(_s.n_do_canvas){
				FWDRAPUtils.changeCanvasHEXColor(_s.nImg, _s.n_do_canvas, nBC);
			}
			
			if(_s.s_sdo_canvas){
				FWDRAPUtils.changeCanvasHEXColor(_s.img1, _s.s_sdo_canvas, sBC);
			}
		}
		
		_s.init();
	};
	
	
	/* set prototype */
	FWDRAPSimpleButton.setPrototype = function(){
		FWDRAPSimpleButton.prototype = null;
		FWDRAPSimpleButton.prototype = new FWDRAPTransformDisplayObject("div");
	};
	
	FWDRAPSimpleButton.CLICK = "onClick";
	FWDRAPSimpleButton.MOUSE_OVER = "onMouseOver";
	FWDRAPSimpleButton.SHOW_TOOLTIP = "showTooltip";
	FWDRAPSimpleButton.MOUSE_OUT = "onMouseOut";
	FWDRAPSimpleButton.MOUSE_UP = "onMouseDown";
	
	FWDRAPSimpleButton.prototype = null;
	window.FWDRAPSimpleButton = FWDRAPSimpleButton;
}(window));/**
 * Royal Audio Player
 * Simple size button.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDRAPSimpleSizeButton = function(
		nImgPath, 
		sImgPath,
		buttonWidth,
		buttonHeight, 
	    useHEX,
	    nBC,
	    sBC,
	    showOver){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPSimpleSizeButton.prototype;
	
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = sBC;
		
		_s.nImgPath_str = nImgPath;
		_s.sImgPath_str = sImgPath;
		
		_s.buttonWidth = buttonWidth;
		_s.buttonHeight = buttonHeight;

		_s.showOver = showOver;
		if(!useHEX){
			_s.showOver = false;
		}

		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isDisabled_bl = false;
		
		
		//##########################################//
		/* initialize */
		//##########################################//
		_s.init = function(){
			_s.setupMainContainers();
			_s.setWidth(_s.buttonWidth);
			_s.setHeight(_s.buttonHeight);
			_s.setButtonMode(true);
			_s.setNormalState();
		};

		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			
			_s.nImg = new Image();
			_s.nImg.src = _s.nImgPath_str;
			
			if(_s.useHEX && !_s.showOver){
				_s.n_do = new FWDRAPTransformDisplayObject("div");
				_s.n_do.setWidth(_s.buttonWidth);
				_s.n_do.setHeight(_s.buttonHeight);
				_s.nImg.onload = function(){	
					_s.n_do_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.nImg, _s.nBC).canvas;
					_s.n_do.screen.appendChild(_s.n_do_canvas);
				}
				_s.addChild(_s.n_do);
			}else{
				_s.n_do = new FWDRAPDisplayObject("img");
				_s.n_do.setScreen(_s.nImg);
				_s.n_do.setWidth(_s.buttonWidth);
				_s.n_do.setHeight(_s.buttonHeight);
				_s.addChild(_s.n_do);
			}
			
			_s.sImg = new Image();
			_s.sImg.src = _s.sImgPath_str;
			
			if(_s.useHEX){
				_s.s_do = new FWDRAPTransformDisplayObject("div");
				_s.s_do.setWidth(_s.buttonWidth);
				_s.s_do.setHeight(_s.buttonHeight);
				var clr = _s.sBC;
				if(_s.showOver){
					clr = _s.nBC
				}

				_s.sImg.onload = function(){
					_s.s_do_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.sImg, clr).canvas;
					_s.s_do.screen.appendChild(_s.s_do_canvas);
				}
				if(!_s.showOver){
					_s.s_do.setAlpha(0);
				}else{
					_s.s_do.setAlpha(1);
				}
				_s.addChild(_s.s_do);
			}else{
				_s.s_do = new FWDRAPDisplayObject("img");
				_s.s_do.setScreen(_s.sImg);
				_s.s_do.setWidth(_s.buttonWidth);
				_s.s_do.setHeight(_s.buttonHeight);
				_s.addChild(_s.s_do);
				_s.s_do.setAlpha(1);
			}
			
			if(_s.showOver){
				_s.addChild(_s.s_do);
			}
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.screen.addEventListener("pointerover", _s.setSelectedState);
				_s.screen.addEventListener("pointerout", _s.setNormalState);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMbl){
					_s.screen.addEventListener("mouseover", _s.setSelectedState);
					_s.screen.addEventListener("mouseout", _s.setNormalState);
					_s.screen.addEventListener("mouseup", _s.onMouseUp);
				}
				_s.screen.addEventListener("touchend", _s.onMouseUp);
			}
		};

		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		_s.setNormalState = function(e){
			FWDAnimation.killTweensOf(_s.s_do);
			if(_s.showOver || !_s.useHEX){
				FWDAnimation.to(_s.s_do, .6, {alpha:1, ease:Quart.easeOut});
			}else{
				FWDAnimation.to(_s.s_do, .6, {alpha:0, ease:Quart.easeOut});
			}
		};
		
		_s.setSelectedState = function(e){
			FWDAnimation.killTweensOf(_s.s_do);
			if(_s.showOver  || !_s.useHEX){
				FWDAnimation.to(_s.s_do, .6, {alpha:0, ease:Quart.easeOut});
			}else{
				FWDAnimation.to(_s.s_do, .6, {alpha:1, ease:Quart.easeOut});
			}
		};
		
		_s.onMouseUp = function(e){
			_s.dispatchEvent(FWDRAPSimpleSizeButton.MOUSE_UP);
			_s.dispatchEvent(FWDRAPSimpleSizeButton.CLICK);
		};

		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			if(_s.n_do_canvas){
				FWDRAPUtils.changeCanvasHEXColor(_s.nImg, _s.n_do_canvas, nBC);
			}
			var clr = sBC;
			if(_s.showOver){
				clr = nBC;
			}
			FWDRAPUtils.changeCanvasHEXColor(_s.sImg, _s.s_do_canvas, clr);
		}
			
		_s.init();
	};
	
	
	/* set prototype */
	FWDRAPSimpleSizeButton.setPrototype = function(){
		FWDRAPSimpleSizeButton.prototype = null;
		FWDRAPSimpleSizeButton.prototype = new FWDRAPTransformDisplayObject("div", "relative");
	};
	
	FWDRAPSimpleSizeButton.MOUSE_UP = "onClick";
	FWDRAPSimpleSizeButton.CLICK = "onClick";
	
	FWDRAPSimpleSizeButton.prototype = null;
	window.FWDRAPSimpleSizeButton = FWDRAPSimpleSizeButton;
}(window));/**
 * Royal Audio Player
 * Button tooltip.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDRAPToolTip = function(
			buttonRef_do,
			toopTipPointerUp_str,
			toolTipLabel_str,
			bkColor,
			fontColor_str,
			toolTipsButtonsHideDelay
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPToolTip.prototype;
		
		_s.buttonRef_do = buttonRef_do;
		
		_s.fontColor_str = fontColor_str;
		_s.toolTipLabel_str = toolTipLabel_str;
		_s.toopTipPointerUp_str = toopTipPointerUp_str;
		
		_s.toolTipsButtonsHideDelay = toolTipsButtonsHideDelay * 1000;
		_s.pointerWidth = 8;
		_s.pointerHeight = 4;
		
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.isShowed_bl = true;

	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			
			_s.setupMainContainers();
			_s.setLabel(_s.toolTipLabel_str);
			_s.hide();
			_s.getStyle().backgroundColor = bkColor;
			_s.screen.className = 'fwdrap-controler-tooltip-background';
			_s.getStyle().zIndex = 9999999999;
		};

		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			_s.pointerHolder_do = new FWDRAPDisplayObject("div");
			_s.pointerHolder_do.setOverflow('visible');
			_s.addChild(_s.pointerHolder_do);

			_s.text_do = new FWDRAPDisplayObject("div");
			_s.text_do.hasTransform3d_bl = false;
			_s.text_do.hasTransform2d_bl = false;
			_s.text_do.setBackfaceVisibility();
			_s.text_do.screen.className = 'fwdrap-controler-tooltip-text';
			_s.text_do.setDisplay("inline");
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "12px";
			_s.text_do.getStyle().color = _s.fontColor_str;
			_s.text_do.getStyle().whiteSpace= "nowrap";
			_s.text_do.getStyle().padding = "4px 7px";
			_s.setLabel();
			_s.addChild(_s.text_do);

			_s.pointer_do = new FWDRAPDisplayObject("div");
			_s.pointer_do.screen.className = 'fwdrap-controler-tooltip-pointer';
			_s.pointer_do.setBkColor(_s.bkColor);
			_s.pointer_do.screen.style = "border: 4px solid transparent; border-top-color: " + bkColor + ";";
			_s.pointerHolder_do.addChild(_s.pointer_do);
		};

		
		//##########################################//
		/* set label */
		//##########################################//
		_s.setLabel = function(label){
			_s.text_do.setInnerHTML(toolTipLabel_str);
			setTimeout(function(){
				if(_s == null) return;
					_s.setWidth(_s.text_do.getWidth());
					_s.setHeight(_s.text_do.getHeight());
					_s.positionPointer();
				},50);
		};
		
		_s.positionPointer = function(offsetX, showPointerUp){
			
			var finalX;
			var finalY;
			
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((_s.w - _s.pointerWidth)/2) + offsetX;
			
			if(showPointerUp){
				finalY =-3;
				_s.pointerHolder_do.setX(finalX);
				_s.pointerHolder_do.setY(finalY);
			}else{
				finalY = _s.h;
				_s.pointerHolder_do.setX(finalX);
				_s.pointerHolder_do.setY(finalY);
			}
		};

		
		//##########################################//
		/* show / hide*/
		//##########################################//
		_s.tt = 0;
		_s.show = function(){
			_s.isShowed_bl = true;
			FWDAnimation.killTweensOf(_s);
			clearTimeout(_s.showWithDelayId_to);
			_s.showWithDelayId_to = setTimeout(_s.showFinal, _s.toolTipsButtonsHideDelay);
			window.addEventListener("mousemove", _s.moveHandler);
		};
		
		_s.showFinal = function(){
			_s.setVisible(true);
			_s.setAlpha(0);
			FWDAnimation.to(_s, .4, {alpha:1, onComplete:function(){_s.setVisible(true);}, ease:Quart.easeOut});
		};
		
		_s.moveHandler = function(e){
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.tt ++;
			if(_s.tt < 4) return;
	
			if(!FWDRAPUtils.hitTest(_s.buttonRef_do.screen, wc.screenX, wc.screenY)) _s.hide();
		};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			
			_s.tt = 0;
			clearTimeout(_s.showWithDelayId_to);
			if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.moveHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.moveHandler);
			}
			FWDAnimation.killTweensOf(_s);
			_s.setVisible(false);
			_s.isShowed_bl = false;
		};
		
	
		_s.init();
	};
	
	
	/* set prototype */
	FWDRAPToolTip.setPrototype = function(){
		FWDRAPToolTip.prototype = null;
		FWDRAPToolTip.prototype = new FWDRAPDisplayObject("div", "fixed");
	};
	
	FWDRAPToolTip.CLICK = "onClick";
	FWDRAPToolTip.MOUSE_DOWN = "onMouseDown";
	
	FWDRAPToolTip.prototype = null;
	window.FWDRAPToolTip = FWDRAPToolTip;
}(window));﻿/**
 * Royal Audio Player
 * Transform display object.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, _s applies only if the position is relative.
	 */
	var FWDRAPTransformDisplayObject = function(type, position, overflow, display){

		'use strict';
		
		var _s = this;
		_s.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas"){
			_s.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		_s.children_ar = [];
		_s.position = position || "absolute";
		_s.overflow = overflow || "hidden";
		_s.display = display || "block";
		_s.visible = true;
		_s.buttonMode;
		_s.x = 0;
		_s.y = 0;	
		_s.scale = 1;
		_s.rotation = 0;
		_s.w = 0;
		_s.h = 0;
		_s.rect;
		_s.alpha = 1;
		_s.innerHTML = "";
		_s.opacityType = "";		
		_s.hasTransform2d_bl = FWDRAPUtils.hasTransform2d;
		

		//##############################//
		/* init */
		//#############################//
		_s.init = function(){
			_s.setScreen();
		};	
		

		//######################################//
		/* check if it supports transforms. */
		//######################################//
		_s.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof _s.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		

		//######################################//
		/* set opacity type */
		//######################################//
		_s.getOpacityType = function(){
			var opacityType;
			if (typeof _s.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		

		//######################################//
		/* setup main screen */
		//######################################//
		_s.setScreen = function(element){
			if(_s.type == "img" && element){
				_s.screen = element;
				_s.setMainProperties();
			}else{
				_s.screen = document.createElement(_s.type);
				_s.setMainProperties();
			}
		};
		

		//########################################//
		/* set main properties */
		//########################################//
		_s.setMainProperties = function(){
			
			_s.transform = _s.getTransform();
			_s.setPosition(_s.position);
			_s.setOverflow(_s.overflow);
			_s.opacityType = _s.getOpacityType();
			
			if(_s.opacityType == "opacity") _s.isHtml5_bl = true;
			
			if(_s.opacityType == "filter") _s.screen.style.filter = "inherit";
			
			_s.screen.style.left = "0px";
			_s.screen.style.top = "0px";
			_s.screen.style.margin = "0px";
			_s.screen.style.padding = "0px";
			_s.screen.style.maxWidth = "none";
			_s.screen.style.maxHeight = "none";
			_s.screen.style.border = "none";
			_s.screen.style.lineHeight = "1";
			_s.screen.style.backfaceVisibility = "hidden";
			_s.screen.style.webkitBackfaceVisibility = "hidden";
			_s.screen.style.MozBackfaceVisibility = "hidden";
			_s.screen.style.MozImageRendering = "optimizeSpeed";	
			_s.screen.style.WebkitImageRendering = "optimizeSpeed";
			
			if(type == "img"){
				_s.setWidth(_s.screen.width);
				_s.setHeight(_s.screen.height);
				_s.screen.onmousedown = function(e){return false;};
			}
		};
		
		_s.setBackfaceVisibility =  function(){
			_s.screen.style.backfaceVisibility = "visible";
			_s.screen.style.webkitBackfaceVisibility = "visible";
			_s.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		_s.removeBackfaceVisibility =  function(){
			_s.screen.style.backfaceVisibility = "hidden";
			_s.screen.style.webkitBackfaceVisibility = "hidden";
			_s.screen.style.MozBackfaceVisibility = "hidden";		
		};

		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		_s.setSelectable = function(val){
			if(!val){
				try{_s.screen.style.userSelect = "none";}catch(e){};
				try{_s.screen.style.MozUserSelect = "none";}catch(e){};
				try{_s.screen.style.webkitUserSelect = "none";}catch(e){};
				try{_s.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{_s.screen.style.oUserSelect = "none";}catch(e){};
				try{_s.screen.style.msUserSelect = "none";}catch(e){};
				try{_s.screen.msUserSelect = "none";}catch(e){};
				_s.screen.ondragstart = function(e){return  false;};
				_s.screen.onselectstart = function(){return false;};
				_s.screen.style.webkitTouchCallout='none';
			}
		};
		
		_s.getScreen = function(){
			return _s.screen;
		};
		
		_s.setVisible = function(val){
			_s.visible = val;
			if(_s.visible == true){
				_s.screen.style.visibility = "visible";
			}else{
				_s.screen.style.visibility = "hidden";
			}
		};
		
		_s.getVisible = function(){
			return _s.visible;
		};
			
		_s.setResizableSizeAfterParent = function(){
			_s.screen.style.width = "100%";
			_s.screen.style.height = "100%";
		};
		
		_s.getStyle = function(){
			return _s.screen.style;
		};
		
		_s.setOverflow = function(val){
			_s.overflow = val;
			_s.screen.style.overflow = _s.overflow;
		};
		
		_s.setPosition = function(val){
			_s.position = val;
			_s.screen.style.position = _s.position;
		};
		
		_s.setDisplay = function(val){
			_s.display = val;
			_s.screen.style.display = _s.display;
		};
		
		_s.setButtonMode = function(val){
			_s.buttonMode = val;
			if(_s.buttonMode ==  true){
				_s.screen.style.cursor = "pointer";
			}else{
				_s.screen.style.cursor = "default";
			}
		};
		
		_s.setBkColor = function(val){
			_s.screen.style.backgroundColor = val;
		};
		
		_s.setInnerHTML = function(val){
			_s.innerHTML = val;
			_s.screen.innerHTML = _s.innerHTML;
		};
		
		_s.getInnerHTML = function(){
			return _s.innerHTML;
		};
		
		_s.getRect = function(){
			return _s.screen.getBoundingClientRect();
		};
		
		_s.setAlpha = function(val){
			_s.alpha = val;
			if(_s.opacityType == "opacity"){
				_s.screen.style.opacity = _s.alpha;
			}else if(_s.opacityType == "filter"){
				_s.screen.style.filter = "alpha(opacity=" + _s.alpha * 100 + ")";
				_s.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(_s.alpha * 100) + ")";
			}
		};
		
		_s.getAlpha = function(){
			return _s.alpha;
		};
		
		_s.getRect = function(){
			return _s.screen.getBoundingClientRect();
		};
		
		_s.getGlobalX = function(){
			return _s.getRect().left;
		};
		
		_s.getGlobalY = function(){
			return _s.getRect().top;
		};
		
		_s.setX = function(val){
			_s.x = val;
			if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = "translate(" + _s.x + "px," + _s.y + "px) scale(" + _s.scale + " , " + _s.scale + ") rotate(" + _s.rotation + "deg)";
			}else{
				_s.screen.style.left = _s.x + "px";
			}
		};
		
		_s.getX = function(){
			return  _s.x;
		};
		
		_s.setY = function(val){
			_s.y = val;
			if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = "translate(" + _s.x + "px," + _s.y + "px) scale(" + _s.scale + " , " + _s.scale + ") rotate(" + _s.rotation + "deg)";
			}else{
				_s.screen.style.top = _s.y + "px";
			}
		};
		
		_s.getY = function(){
			return  _s.y;
		};
		
		_s.setScale2 = function(val){
			_s.scale = val;
			if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = "translate(" + _s.x + "px," + _s.y + "px) scale(" + _s.scale + " , " + _s.scale + ") rotate(" + _s.rotation + "deg)";
			}
		};
		
		_s.getScale = function(){
			return  _s.scale;
		};
		
		_s.setRotation = function(val){
			_s.rotation = val;
			if(_s.hasTransform2d_bl){
				_s.screen.style[_s.transform] = "translate(" + _s.x + "px," + _s.y + "px) scale(" + _s.scale + " , " + _s.scale + ") rotate(" + _s.rotation + "deg)";
			}
		};
		
		_s.setWidth = function(val){
			_s.w = val;
			if(_s.type == "img"){
				_s.screen.width = _s.w;
				_s.screen.style.width = _s.w + "px";
			}else{
				_s.screen.style.width = _s.w + "px";
			}
		};
		
		_s.getWidth = function(){
			if(_s.type == "div"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				return _s.w;
			}else if(_s.type == "img"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				if(_s.screen.width != 0) return  _s.screen.width;
				return _s._w;
			}else if( _s.type == "canvas"){
				if(_s.screen.offsetWidth != 0) return  _s.screen.offsetWidth;
				return _s.w;
			}
		};
		
		_s.setHeight = function(val){
			_s.h = val;
			if(_s.type == "img"){
				_s.screen.height = _s.h;
				_s.screen.style.height = _s.h + "px";
			}else{
				_s.screen.style.height = _s.h + "px";
			}
		};
		
		_s.getHeight = function(){
			if(_s.type == "div"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				return _s.h;
			}else if(_s.type == "img"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				if(_s.screen.height != 0) return  _s.screen.height;
				return _s.h;
			}else if(_s.type == "canvas"){
				if(_s.screen.offsetHeight != 0) return  _s.screen.offsetHeight;
				return _s.h;
			}
		};
		
		_s.getNumChildren = function(){
			return _s.children_ar.length;
		};
		

		//#####################################//
		/* DOM list */
		//#####################################//
		_s.addChild = function(e){
			if(_s.contains(e)){	
				_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 1);
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}else{
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}
		};
		
		_s.removeChild = function(e){
			if(_s.contains(e)){
				_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 1);
				_s.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		_s.contains = function(e){
			if(FWDRAPUtils.indexOfArray(_s.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		_s.addChildAtZero = function(e){
			if(_s.numChildren == 0){
				_s.children_ar.push(e);
				_s.screen.appendChild(e.screen);
			}else{
				_s.screen.insertBefore(e.screen, _s.children_ar[0].screen);
				if(_s.contains(e)){_s.children_ar.splice(FWDRAPUtils.indexOfArray(_s.children_ar, e), 1);}	
				_s.children_ar.unshift(e);
			}
		};
		
		_s.getChildAt = function(index){
			if(index < 0  || index > _s.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(_s.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return _s.children_ar[index];
		};
		
		_s.removeChildAtZero = function(){
			_s.screen.removeChild(_s.children_ar[0].screen);
			_s.children_ar.shift();
		};
		

		//################################//
		/* Event dispatcher */
		//#################################//
		_s.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = _s;
	        _s.listeners.events_ar.push(event);
	    };
	    
	    _s.dispatchEvent = function(type, props){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s && _s.listeners.events_ar[i].type === type){
	        		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		_s.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		_s.listeners.events_ar[i].listener.call(_s, _s.listeners.events_ar[i]);
	        		break;
	        	}
	        }
	    };
	    
	   _s.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s 
	        			&& _s.listeners.events_ar[i].type === type
	        			&& _s.listeners.events_ar[i].listener ===  listener
	        	){
	        		_s.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		_s.disposeImage = function(){
			if(_s.type == "img") _s.screen.src = null;
		};
		
		
		_s.destroy = function(){
			
			try{_s.screen.parentNode.removeChild(_s.screen);}catch(e){};
			
			_s.screen.onselectstart = null;
			_s.screen.ondragstart = null;
			_s.screen.ontouchstart = null;
			_s.screen.ontouchmove = null;
			_s.screen.ontouchend = null;
			_s.screen.onmouseover = null;
			_s.screen.onmouseout = null;
			_s.screen.onmouseup = null;
			_s.screen.onmousedown = null;
			_s.screen.onmousemove = null;
			_s.screen.onclick = null;
			
			delete _s.screen;
			delete _s.style;
			delete _s.rect;
			delete _s.selectable;
			delete _s.buttonMode;
			delete _s.position;
			delete _s.overflow;
			delete _s.visible;
			delete _s.innerHTML;
			delete _s.numChildren;
			delete _s.x;
			delete _s.y;
			delete _s.w;
			delete _s.h;
			delete _s.opacityType;
			delete _s.isHtml5_bl;
			delete _s.hasTransform2d_bl;

			_s.children_ar = null;
			_s.style = null;
			_s.screen = null;
			_s.numChildren = null;
			_s.transform = null;
			_s.position = null;
			_s.overflow = null;
			_s.display= null;
			_s.visible= null;
			_s.buttonMode = null;
			_s.globalX = null;
			_s.globalY = null;
			_s.x = null;
			_s.y = null;
			_s.w = null;;
			_s.h = null;;
			_s.rect = null;
			_s.alpha = null;
			_s.innerHTML = null;
			_s.opacityType = null;
			_s.isHtml5_bl = null;
			_s.hasTransform3d_bl = null;
			_s.hasTransform2d_bl = null;
			_s = null;
		};
		
	    /* init */
		_s.init();
	};
	
	window.FWDRAPTransformDisplayObject = FWDRAPTransformDisplayObject;
}(window));/**
 * Royal Audio Player
 * Utils.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPUtils = function(){
		'use strict';
	};
	
	FWDRAPUtils.dumy = document.createElement("div");
	

	//###################################//
	/* String */
	//###################################//
	FWDRAPUtils.trim = function(str){
		return str.replace(/\s/gi, "");
	};
	
	FWDRAPUtils.splitAndTrim = function(str, trim_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDRAPUtils.trim(array[i]);
		};
		return array;
	};
	
	FWDRAPUtils.checkTime = function(time){
		var timeRegExp = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
		if(!timeRegExp.test(time)) return false;
		return true;
	};
	

	FWDRAPUtils.formatTime = function(secs, pushHours){
		secs = Math.round(secs);
		var hours = Math.floor(secs / (60 * 60));
		
		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);

		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);
		
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		
		if(isNaN(seconds)) return "00:00";
		if(hours || pushHours){
			 return "0" + hours + ":" + minutes + ":" + seconds;
		}else{
			 return minutes + ":" + seconds;
		}
	};

	FWDRAPUtils.formatTotalTime = function(secs){
		
		if(typeof secs == "string" && secs.indexOf(":") != -1){
			return secs;
		} 
		
		secs = secs/1000;
		
		return FWDRAPUtils.formatTime(secs);
	};

	
	FWDRAPUtils.MD5 = function (string) {

		function RotateLeft(lValue, iShiftBits) {
			return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		}

		function AddUnsigned(lX,lY) {
			var lX4,lY4,lX8,lY8,lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}

		function F(x,y,z) { return (x & y) | ((~x) & z); }
		function G(x,y,z) { return (x & z) | (y & (~z)); }
		function H(x,y,z) { return (x ^ y ^ z); }
		function I(x,y,z) { return (y ^ (x | (~z))); }

		function FF(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function GG(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function HH(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function II(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1=lMessageLength + 8;
			var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			var lWordArray=Array(lNumberOfWords-1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while ( lByteCount < lMessageLength ) {
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			return lWordArray;
		};

		function WordToHex(lValue) {
			var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
			for (lCount = 0;lCount<=3;lCount++) {
				lByte = (lValue>>>(lCount*8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
			}
			return WordToHexValue;
		};

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		};

		var x=Array();
		var k,AA,BB,CC,DD,a,b,c,d;
		var S11=7, S12=12, S13=17, S14=22;
		var S21=5, S22=9 , S23=14, S24=20;
		var S31=4, S32=11, S33=16, S34=23;
		var S41=6, S42=10, S43=15, S44=21;

		string = Utf8Encode(string);

		x = ConvertToWordArray(string);

		a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

		for (k=0;k<x.length;k+=16) {
			AA=a; BB=b; CC=c; DD=d;
			a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
			b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
			b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
			a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
			d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
			d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
			c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
			b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
			a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
			c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			d=GG(d,a,b,c,x[k+10],S22,0x2441453);
			c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
			c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
			a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			a=II(a,b,c,d,x[k+0], S41,0xF4292244);
			d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
			c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
			a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
			d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
			a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			c=II(c,d,a,b,x[k+6], S43,0xA3014314);
			b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
			d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
			a=AddUnsigned(a,AA);
			b=AddUnsigned(b,BB);
			c=AddUnsigned(c,CC);
			d=AddUnsigned(d,DD);
		}

		var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

		return temp.toLowerCase();
	}
	

	//#############################################//
	//Array //
	//#############################################//
	FWDRAPUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};

	
	FWDRAPUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	
	FWDRAPUtils.getCookie = function(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	FWDRAPUtils.getCanvasWithModifiedColor = function(img, hexColor, returnImage){
		if(!img) return;
		var newImage;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		var originalPixels = null;
		var currentPixels = null;
		var long = parseInt(hexColor.replace(/^#/, ""), 16);
		var hexColorRGB = {
			R: (long >>> 16) & 0xff,
			G: (long >>> 8) & 0xff,
			B: long & 0xff
		};
		
		canvas.style.position = "absolute";
		canvas.style.left = "0px";
		canvas.style.top = "0px";
		canvas.style.margin = "0px";
		canvas.style.padding = "0px";
		canvas.style.maxWidth = "none";
		canvas.style.maxHeight = "none";
		canvas.style.border = "none";
		canvas.style.lineHeight = "1";
		canvas.style.backgroundColor = "transparent";
		canvas.style.backfaceVisibility = "hidden";
		canvas.style.webkitBackfaceVisibility = "hidden";
		canvas.style.MozBackfaceVisibility = "hidden";	
		canvas.style.MozImageRendering = "optimizeSpeed";	
		canvas.style.WebkitImageRendering = "optimizeSpeed";
		canvas.width = img.width;
		canvas.height = img.height;
		
		ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
		originalPixels = ctx.getImageData(0, 0, img.width, img.height);
		currentPixels = ctx.getImageData(0, 0, img.width, img.height);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4){
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * hexColorRGB.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * hexColorRGB.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * hexColorRGB.B;
            }
        }
		
		ctx.globalAlpha = .5;
        ctx.putImageData(currentPixels, 0, 0);
		ctx.drawImage(canvas, 0, 0);
        
		if(returnImage){
			newImage = new Image();
			newImage.src = canvas.toDataURL();
		}
		return {canvas:canvas, image:newImage};
	};
	
	FWDRAPUtils.changeCanvasHEXColor = function(img, canvas, hexColor, returnNewImage){
		if(!img) return;
		var canvas = canvas;
		var ctx = canvas.getContext("2d");
		var originalPixels = null;
		var currentPixels = null;
		var long = parseInt(hexColor.replace(/^#/, ""), 16);
		var hexColorRGB = {
			R: (long >>> 16) & 0xff,
			G: (long >>> 8) & 0xff,
			B: long & 0xff
		};
		
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
		originalPixels = ctx.getImageData(0, 0, img.width, img.height);
		currentPixels = ctx.getImageData(0, 0, img.width, img.height);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4){
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * hexColorRGB.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * hexColorRGB.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * hexColorRGB.B;
            }
        }
		
		ctx.globalAlpha = .5;
        ctx.putImageData(currentPixels, 0, 0);
		ctx.drawImage(canvas, 0, 0);
		
		if(returnNewImage){
			var newImage = new Image();
			newImage.src = canvas.toDataURL();
			return newImage;
		}
    }

	FWDRAPUtils.getSecondsFromString = function(str){
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var duration = 0;
		
		if(!str) return undefined;
		
		str = str.split(":");
		
		hours = str[0];
		if(hours[0] == "0" && hours[1] != "0"){
			hours = parseInt(hours[1]);
		}
		if(hours == "00") hours = 0;
		
		minutes = str[1];
		if(minutes[0] == "0" && minutes[1] != "0"){
			minutes = parseInt(minutes[1]);
		}
		if(minutes == "00") minutes = 0;
		
		secs = parseInt(str[2].replace(/,.*/ig, ""));
		if(secs[0] == "0" && secs[1] != "0"){
			secs = parseInt(secs[1]);
		}
		if(secs == 60) secs = 59;
		if(secs == "00") secs = 0;
		
		if(hours != 0){
			duration += (hours * 60 * 60)
		}
		
		if(minutes != 0){
			duration += (minutes * 60)
		}
		
		duration += secs;
		
		return duration;
	 };

	FWDRAPUtils.isURLEncoded = function(url){
		try{
			var decodedURL = decodeURIComponent(url);
			if(decodedURL != url && url.indexOf('%') != -1) return true;
		}catch(e){}
		return false;
	}

	FWDRAPUtils.getValidSource =  function(source){
		if(!source) return;
		
		var path1 = (location.origin == 'null') ? '' : location.origin;
		var path2 = location.pathname;
		
		if(path2.indexOf(".") != -1){
			path2 = path2.substr(0, path2.lastIndexOf("/") + 1);
		}

		var hasHTTPorHTTPS_bl = !(source.indexOf("http:") == -1 && source.indexOf("https:") == -1 && !FWDRAPUtils.isLocal);
		
		if(!hasHTTPorHTTPS_bl){
			source = path1 + path2 + source;
		}
		

		var firstUrlPath = encodeURI(source.substr(0,source.lastIndexOf("/") + 1));
		var secondUrlPath = source.substr(source.lastIndexOf("/") + 1);
		
		if(source.match(/\.mp3|\.mp4|\.m3u8|\.txt|\.srt|\.vtt|\.jpg|\.jpeg|\.png/ig)
			&& !source.match(/\.s3|\drive.|dropbox|\?/ig)){
			if(FWDRAPUtils.isURLEncoded(secondUrlPath)){
				secondUrlPath = source.substr(source.lastIndexOf("/") + 1);
			}else{
				secondUrlPath = encodeURI(source.substr(source.lastIndexOf("/") + 1));
			}
		}else{
			secondUrlPath = source.substr(source.lastIndexOf("/") + 1);
		}
	
		source = firstUrlPath + secondUrlPath;	
		return source;
	}

	FWDRAPUtils.isLocal = (function(){
		if(document.location.protocol == "file:"){
			return true;
		}else{
			return false;
		}
	}());

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDRAPUtils.prt = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDRAPUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDRAPUtils.getChildAt = function (e, n){
		var kids = FWDRAPUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDRAPUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDRAPUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDRAPUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDRAPUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDRAPUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDRAPUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDRAPUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDRAPUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDRAPUtils.getAttributeValue = function(e, attr){
		if(!FWDRAPUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDRAPUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.getAttribute(attr);
			return  test ? true : false;
		}
	};
	
	FWDRAPUtils.insertNodeAt = function(prt, child, n){
		var children = FWDRAPUtils.children(prt);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			prt.insertBefore(child, children[n]);
		};
	};
	
	FWDRAPUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	

	//###################################//
	/* DOM geometry */
	//##################################//
	FWDRAPUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.left +(rect.right - rect.left) && y >= rect.top && y <= rect.top + (rect.bottom - rect.top)) return true;
		return false;
	};
	
	FWDRAPUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDRAPUtils.getViewportSize = function(){
		if(FWDRAPUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1){
			return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
		}
		
		if(FWDRAPUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDRAPUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDRAPUtils.getScrollOffsets();
		
		if(e.touches){
			return{
				screenX:e.touches[0] == undefined ? e.touches.pageX - offsets.x :e.touches[0].pageX - offsets.x,
				screenY:e.touches[0] == undefined ? e.touches.pageY - offsets.y :e.touches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDRAPUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled) || Boolean(window.navigator.pointerEnabled);
	}());
	
	FWDRAPUtils.isMobile = (function (){
		if((FWDRAPUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) || (FWDRAPUtils.hasPointerEvent && navigator.maxTouchPoints > 1)) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kfsowi'];
	    for(i in agents) {
	    	 if(navigator.userAgent.toLowerCase().indexOf(agents[i].toLowerCase()) != -1) {
	            return true;
	        }
	    }
	    if(navigator.platform.toLowerCase() === 'macintel' && navigator.maxTouchPoints > 1 && !window.MSStream) return true;
	    return false;
	}());

	FWDRAPUtils.isLocal = (function(){
		if(document.location.protocol == "file:"){
			return true;
		}else{
			return false;
		}
	}());

	FWDRAPUtils.isIOS = (function(){
		if(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true;
		return Boolean(navigator.userAgent.match(/(iPad|iPhone|iPod)/ig));
	}());
	
	FWDRAPUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDRAPUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDRAPUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDRAPUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opera') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDRAPUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDRAPUtils.isIE = (function(){
		var isIE = Boolean(navigator.userAgent.toLowerCase().indexOf('msie') != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf('edge') != -1);
		return isIE || Boolean(!FWDRAPUtils.isIE && document.documentElement.msRequestFullscreen);
	}());
	
	FWDRAPUtils.isIE11 = (function(){
		return Boolean(!FWDRAPUtils.isIE && document.documentElement.msRequestFullscreen);
	}());
	
	FWDRAPUtils.isIEAndLessThen9 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1;
	}());
	
	FWDRAPUtils.isIEAndLessThen10 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 
		|| navigator.userAgent.toLowerCase().indexOf("msie 8") != -1
		|| navigator.userAgent.toLowerCase().indexOf("msie 9") != -1;
	}());
	
	FWDRAPUtils.isIE7 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1;
	}());
	
	FWDRAPUtils.isApple = (function(){
		return navigator.appVersion.toLowerCase().indexOf('mac') != -1;
	}());
	
	FWDRAPUtils.hasFullScreen = (function(){
		return FWDRAPUtils.dumy.requestFullScreen || FWDRAPUtils.dumy.mozRequestFullScreen || FWDRAPUtils.dumy.webkitRequestFullScreen || FWDRAPUtils.dumy.msieRequestFullScreen;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDRAPUtils.dumy.style[p] !== 'undefined') {
	    	   FWDRAPUtils.dumy.style.position = "absolute";
	    	   position = FWDRAPUtils.dumy.getBoundingClientRect().left;
	    	   FWDRAPUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDRAPUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDRAPUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDRAPUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDRAPUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDRAPUtils.dumy);}catch(e){}
	    return false;
	};	

	
	//###############################################//
	/* various utils */
	//###############################################//
	FWDRAPUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			document.addEventListener( "DOMContentLoaded", function(){
				FWDRAPUtils.checkIfHasTransofrms();
				callbalk();
			});
		}else{
			document.onreadystatechange = function () {
				FWDRAPUtils.checkIfHasTransofrms();
				if (document.readyState == "complete") callbalk();
			};
		 }
	};
	
	FWDRAPUtils.checkIfHasTransofrms = function(){
		document.documentElement.appendChild(FWDRAPUtils.dumy);
		FWDRAPUtils.hasTransform3d = get3d();
		FWDRAPUtils.hasTransform2d = get2d();
		FWDRAPUtils.isReadyMethodCalled_bl = true;
	};
	
	FWDRAPUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDRAPUtils.getUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("?") + 1) || location.search.substring(1);
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	
	FWDRAPUtils.isReadyMethodCalled_bl = false;
	
	window.FWDRAPUtils = FWDRAPUtils;
}(window));


/*
 * Version: 1.0
 * Date: 04.05.2020
 * Audio Visualizer.
 * Nothing to modify or see here!
 **/
(function (window){
	
	var FWDRAPVisualizer = function(props_obj){

        'use strict';

		var _s = this;

		_s.preset = props_obj.visPrst;
		_s.themeClr = props_obj.visClr.reverse();
		_s.useDumyVisualizeOnIOS = props_obj.useDumyVisualizeOnIOS;
		_s.data_d_ar = [];
	
		// Bars spectrum settings.
		_s.capYPos_ar = [];
		_s.capClr = props_obj.visCapClr;
		_s.gap = 1;
		_s.capHeight = 2;
		_s.meterW = 10;

		// Init.
		_s.init = function(){
			_s.createCanvas();
           
            for(var i=0; i<511; i++){
                _s.data_d_ar.push(0);
            } 
	   }


		// Create canvas.
		_s.createCanvas = function(){
			_s.setOverflow('hidden');
			_s.cnv = new FWDRAPDisplayObject('canvas');
			_s.ctx = _s.cnv.screen.getContext("2d");
            _s.ctx.globalCompositeOperation = 'multiply';
			_s.addChild(_s.cnv)
		}


		// Resize canvas.
		_s.resize = function(x, y, sW, sH){
		
			x = x | 0;
			y = y | 0;

			_s.sW = sW;
			_s.sH = sH;
			
			_s.cnv.setWidth(sW);
			_s.cnv.setHeight(sH);
			
			_s.setX(x);
			_s.setY(y);
			_s.setWidth(sW);
			_s.setHeight(sH);
		}


		// Interaction (start, stop, pause, play).
        _s.start = function(el, analyser){
        	_s.allowOnIOS = true;
        	
        	if(_s.useDumyVisualizeOnIOS === undefined) return;

        	if(_s.useDumyVisualizeOnIOS && FWDRAPUtils.isIOS){
        		_s.allowOnIOS = false;
        	}


            if(el && !_s.analyserCtx && window['AudioContext'] && !analyser && _s.allowOnIOS){
                _s.analyserCtx = new AudioContext();
                _s.analyser = _s.analyserCtx.createAnalyser();
                _s.analyserSrc = _s.analyserCtx.createMediaElementSource(el);
                _s.analyserSrc.connect(_s.analyser);
                _s.analyser.connect(_s.analyserCtx.destination);
            }else if(analyser && _s.allowOnIOS){ 
                _s.analyser = analyser;
            }
            cancelAnimationFrame(_s.raf);
            _s.draw();
            _s.play();
        }

		_s.stop = function(){
			cancelAnimationFrame(_s.raf);
			if(_s.analyserCtx){
				_s.analyserCtx.close();
				_s.analyserCtx = null;
			}
			_s.pause();
			_s.capYPos_ar = [];
		}

		_s.play = function(){
			_s.isPlaying = true;
		}

		_s.pause =  function(){
			_s.isPlaying = false;
		}

        _s.updateColor = function(ar){
            _s.themeClr = ar;
        }


		// Draw visualizer.
		_s.draw = function(){
		       
            _s.raf = window.requestAnimationFrame(_s.draw);

            try{
                _s.data_ar = new Uint8Array(_s.analyser.frequencyBinCount); 
                _s.analyser.getByteFrequencyData(_s.data_ar);
            }catch(ac){
                _s.data_ar = [];
                for (var i = 0; i < 511; i++){
                    _s.isPlaying ? _s.data_ar.push(Math.floor(254 / (i / 100 + 1) * Math.random() + 1)) : _s.data_ar.push(0);
                    _s.data_d_ar[i] += (_s.data_ar[i] - _s.data_d_ar[i]) / 9;
                } 
                _s.data_ar = _s.data_d_ar;
            }

            if(!_s.allowOnIOS){
            	_s.data_ar = [];
                for (var i = 0; i < 511; i++){
                    _s.isPlaying ? _s.data_ar.push(Math.floor(254 / (i / 100 + 1) * Math.random() + 1)) : _s.data_ar.push(0);
                    _s.data_d_ar[i] += (_s.data_ar[i] - _s.data_d_ar[i]) / 9;
                } 
                _s.data_ar = _s.data_d_ar;
            }

            if(_s.preset == "wave1" || _s.preset == 'wave2'){
                _s.data_ar[0] = 0;
            }
           	
            switch(_s.preset) {
                 case "wave1":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
                    _s.ctx.lineCap = "round";
                    _s.ctx.lineWidth = 0;
                    _s.drawWave(1, 0, true, "#FFFFFF");
                    _s.drawWave(3, .5, true, _s.themeClr[0]);
                    _s.drawWave(4, .55, true, _s.themeClr[1]);
                    _s.drawWave(5, .6, true, _s.themeClr[2]);
                    _s.drawWave(6, .65, true, _s.themeClr[3]);
                    _s.drawWave(7, .8, true, _s.themeClr[4]);
                    break;
                 case "wave2":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
                    _s.ctx.lineWidth = 2;
                    _s.ctx.lineCap = "round";
                    _s.drawWave(1, 0, false, "#FFFFFF");
                    _s.drawWave(3, .5, false, _s.themeClr[0]);
                    _s.drawWave(4, .55, false, _s.themeClr[1]);
                    _s.drawWave(5, .6, false, _s.themeClr[2]);
                    _s.drawWave(6, .65, false, _s.themeClr[3]);
                    _s.drawWave(7, .8, false, _s.themeClr[4]);
                    break;
                case "wave3":
                   _s.drawWave2();
                    break;
                case "bars1":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
                    _s.gap = 1;
                    _s.capHeight = 1;
                    _s.meterW = 2;
                    _s.ctx.lineCap = 'butt';
                    _s.drawBars();
                    break;
                 case "bars2":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);       
                    _s.ctx.lineWidth = 2;
                     _s.ctx.lineCap = 'butt';
                    _s.drawBars2();
                    break;
                default:
                    _s.defaultSpectrum()
            }
        }


        // Default spectrum.
        _s.defaultSpectrum =  function(d){
	    	var fr = 6;
        	if(_s.sW > 1000){
        		fr = 2.5;
        	}else if(_s.sW < 200){
        		fr = 14;
        	}else if(_s.sW < 400){
        		fr = 10;
        	}

	        _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
	        _s.ctx.lineWidth = 2;
	        _s.ctx.miterLimit = 2;

	        _s.ctx.beginPath();
            _s.ctx.moveTo(-1, _s.sH);
            for(var i = 0; i<_s.data_ar.length/2; i++){
            	_s.ctx.lineTo(i * _s.sW/_s.data_ar.length * fr, _s.sH - _s.data_ar[i] * _s.sH/300 + 1);
            } 
	      
	        _s.ctx.strokeStyle = "rgba(" + _s.getHexClr(_s.themeClr).r + ", " + _s.getHexClr(_s.themeClr).g + ", " + _s.getHexClr(_s.themeClr).b + ", 1.0)";
	        _s.ctx.stroke();
	        _s.ctx.closePath();
	    }


	    // Draw bars.
	    _s.drawBars = function(){
    		var step = Math.round(_s.data_ar.length/_s.meterNum);
         	_s.meterNum = Math.floor(Math.min(511,((_s.sW)/(_s.meterW))));  
            _s.meterNum *= .6;
        
            var grd = _s.ctx.createLinearGradient(0, _s.sH, 0, 0);
            grd.addColorStop(0, _s.themeClr[4]);
            grd.addColorStop("0.25", _s.themeClr[3]);
            grd.addColorStop("0.5", _s.themeClr[2]);
            grd.addColorStop("0.75", _s.themeClr[1]);
            grd.addColorStop("1", _s.themeClr[0]);

	        for (var i = 0; i < _s.meterNum; i++) {
	            var value = _s.data_ar[i * step] * _s.sH / 300;

	            if(_s.capYPos_ar.length < Math.round(_s.meterNum)){
	                _s.capYPos_ar.push(value);
	            }

	            _s.ctx.fillStyle = _s.capClr;
	            if(value < _s.capYPos_ar[i]) {
	                _s.ctx.fillRect(i * (_s.meterW + _s.gap), _s.sH - (--_s.capYPos_ar[i]), _s.meterW, _s.capHeight);
	            }else {
	                _s.ctx.fillRect(i *  (_s.meterW + _s.gap), _s.sH - value, _s.meterW, _s.capHeight);
	                _s.capYPos_ar[i] = value;
	            };

	            _s.ctx.fillStyle = grd; 
	            _s.ctx.fillRect(i * (_s.meterW + _s.gap), _s.sH - value + _s.capHeight, _s.meterW, _s.sH);
             };
	    }


	    _s.drawBars2 = function(s){
	    	
	    	var fr = 2;
	    	if(_s.preset == 'bars4'){
            	if(_s.sW > 1000){
            		fr = 6;
            	}else if(_s.sW < 200){
            		fr = 32;
            	}else if(_s.sW < 400){
            		fr = 16;
            	}
        	}

            for (var i=0; i<_s.sW; i+=2){
                var g = Math.round(_s.data_ar.length/fr * i/_s.sW * 2);
                _s.ctx.beginPath();
                _s.ctx.moveTo(i, _s.sH);
                _s.ctx.lineTo(i, _s.sH - _s.data_ar[g] * _s.sH/255 + 8);
                
                var grd = _s.ctx.createLinearGradient(0, _s.sH, 0, 0);
                grd.addColorStop(0, _s.themeClr[4]);
                grd.addColorStop("0.25", _s.themeClr[3]);
                grd.addColorStop("0.5", _s.themeClr[2]);
                grd.addColorStop("0.75", _s.themeClr[1]);
                grd.addColorStop("1", _s.themeClr[0]);

                _s.ctx.strokeStyle = grd;
                _s.ctx.stroke();
                _s.ctx.closePath();
            }
	    }


        // Draw waves.
       _s.drawWave = function(incr,  opacity, fill, clr){
	    	var fr = 300;
	     	var u = [];
            for (var i=0; i<_s.sW + 20; i+=20) {
                var e = Math.round(_s.data_ar.length/3 * i/_s.sW * 1);
                u.push(i);
                u.push(_s.sH - _s.data_ar[e * incr] * _s.sH/fr + 1);
            }

            var c = .5;
            var d = 16;
            var h = true;
            var data_final_ar = [];
            var data_calc_ar = u.slice();
            data_calc_ar.unshift(u[1]);
            data_calc_ar.unshift(u[0]);
            data_calc_ar.push(u[u.length - 2]);
            data_calc_ar.push(u[u.length - 1]);

            for (var i = 2; i < data_calc_ar.length - 2; i += 2){
                for (var j = 0; j <= d; j++) {
                    var a = (data_calc_ar[i + 2] - data_calc_ar[i - 2]) * c;
                    var z = (data_calc_ar[i + 4] - data_calc_ar[i]) * c;
                    var n = (data_calc_ar[i + 3] - data_calc_ar[i - 1]) * c;
                    var k = (data_calc_ar[i + 5] - data_calc_ar[i + 1]) * c;

                    var m = j / d;
                    var p = 2 * (m * m * m) - 3 * (m * m) + 1;
                    var q = -(2 * (m * m * m)) + 3 * (m * m);
                    var r = (m * m * m) - 2 * (m * m) + m;
                    m = (m * m * m) - (m * m);

                    var startP = p * data_calc_ar[i] + q * data_calc_ar[i + 2] + r * a + m * z;
                    var endP = p * data_calc_ar[i + 1] + q * data_calc_ar[i + 3] + r * n + m * k;

                    data_final_ar.push(startP);
                    data_final_ar.push(endP)
                }
            }
           
            _s.ctx.beginPath();
            _s.ctx.moveTo(data_final_ar[0], data_final_ar[1]);
            for (i=2; i<data_final_ar.length - 1; i += 2){
            	_s.ctx.lineTo(data_final_ar[i], data_final_ar[i + 1]);
            }

            if(fill){
	            _s.ctx.lineTo(_s.sW, _s.sH);
                _s.ctx.lineTo(0, _s.sH)
                _s.ctx.fillStyle = "rgba(" + _s.getHexClr(clr).r + ", " + _s.getHexClr(clr).g + ", " + _s.getHexClr(clr).b + ", " + opacity + ")";
                _s.ctx.fill();
                _s.ctx.closePath();
            }else{
            	_s.ctx.strokeStyle = "rgba(" + _s.getHexClr(clr).r + ", " + _s.getHexClr(clr).g + ", " + _s.getHexClr(clr).b + ", " + opacity + ")";
                _s.ctx.stroke();
                _s.ctx.closePath();
            }
        }

        _s.drawWave2 = function(){
        	var fr = 4;
        	if(_s.sW > 1000){
        		fr = 4;
        	}else if(_s.sW < 200){
        		fr = 15;
        	}else if(_s.sW < 400){
        		fr = 8;
        	}
            _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
            _s.ctx.lineWidth = 1;
            _s.ctx.miterLimit = 1;
            _s.ctx.beginPath();
           
            _s.ctx.moveTo(0, _s.sH);
            for (var i=0; i<_s.data_ar.length; i++){
            	_s.ctx.lineTo(i * _s.sW/_s.data_ar.length * fr, _s.sH - _s.data_ar[i] * _s.sH/255 + 1);
            } 
            _s.ctx.lineTo(_s.sW, _s.sH);
            _s.ctx.lineTo(0, _s.sH) 
            _s.ctx.fillStyle = "rgba(" + _s.getHexClr(_s.themeClr).r + ", " + _s.getHexClr(_s.themeClr).g + ", " + _s.getHexClr(_s.themeClr).b + ", 1.0)";
            _s.ctx.fill();
            _s.ctx.closePath();
        }


        // Get integers colors from hex.
        _s.getHexClr = function(a){
            return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? {
                r: parseInt(a[1], 16),
                g: parseInt(a[2], 16),
                b: parseInt(a[3], 16)
            } : null
        }

		_s.init();
	}


	/* set prototype */
	FWDRAPVisualizer.setPrototype = function(){
		FWDRAPVisualizer.prototype = new FWDRAPDisplayObject("div");
	};

	window.FWDRAPVisualizer = FWDRAPVisualizer;
}(window));/**
 * Royal Audio Player
 * Video screen.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(window){
	
	var FWDRAPVideoScreen = function(prt, volume){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPVideoScreen.prototype;

		_s.controllerHeight = prt._d.controllerHeight;
		_s.sW = 0;
		_s.sH = 0;
		_s.lastPercentPlayed = 0;
		_s.volume = volume;
		_s.curDuration = 0;
		_s.countNormalMp3Errors = 0;
		_s.countShoutCastErrors = 0;
		_s.maxShoutCastCountErrors = 5;
		_s.maxNormalCountErrors = 1;
	
		_s.hasError_bl = true;
		_s.isStopped_bl = true;
		_s.hasPlayedOnce_bl = false;
		_s.isStartEventDispatched_bl = false;
		_s.isSafeToBeControlled_bl = false;
		_s.isMbl = FWDRAPUtils.isMobile;

		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.getStyle().width = "100%";
			_s.getStyle().height = "100%";
			_s.setBkColor(prt.videoBackgroundColor_str);
			_s.setupVideo();
		};

	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		_s.setupVideo = function(){
			if(_s.video_el == null){
				_s.video_el = document.createElement("video");
				
				_s.video_el.controls = false;
				_s.video_el.volume = _s.volume;
				_s.video_el.WebKitPlaysInline = true;
				_s.video_el.playsinline = true;
				_s.video_el.setAttribute("playsinline", "");
				_s.video_el.setAttribute("webkit-playsinline", "");
				_s.video_el.style.position = "relative";
				_s.video_el.style.left = "0px";
				_s.video_el.style.top = "0px";
				_s.video_el.style.width = "100%";
				_s.video_el.style.height = "100%";
				_s.video_el.style.margin = "0px";
				_s.video_el.style.padding = "0px";
				_s.video_el.style.maxWidth = "none";
				_s.video_el.style.maxHeight = "none";
				_s.video_el.style.border = "none";
				_s.video_el.style.lineHeight = "0";
				_s.video_el.style.msTouchAction = "none";
				_s.screen.appendChild(_s.video_el);
			}
			
			_s.video_el.addEventListener("error", _s.errorHandler);
			_s.video_el.addEventListener("canplay", _s.safeToBeControlled);
			_s.video_el.addEventListener("canplaythrough", _s.safeToBeControlled);
			_s.video_el.addEventListener("progress", _s.updateProgress);
			_s.video_el.addEventListener("timeupdate", _s.updateVideo);
			_s.video_el.addEventListener("pause", _s.pauseHandler);
			_s.video_el.addEventListener("play", _s.playHandler);
			if(!FWDRAPUtils.isIE){
				_s.video_el.addEventListener("waiting", _s.startToBuffer);
			}
			_s.video_el.addEventListener("playing", _s.stopToBuffer);
			_s.video_el.addEventListener("ended", _s.endedHandler);
			_s.resizeAndPosition();
		};	
		
		
		_s.destroyVideo = function(){
			clearTimeout(_s.showErrorWithDelayId_to);
			if(_s.video_el){
				_s.video_el.removeEventListener("error", _s.errorHandler);
				_s.video_el.removeEventListener("canplay", _s.safeToBeControlled);
				_s.video_el.removeEventListener("canplaythrough", _s.safeToBeControlled);
				_s.video_el.removeEventListener("progress", _s.updateProgress);
				_s.video_el.removeEventListener("timeupdate", _s.updateVideo);
				_s.video_el.removeEventListener("pause", _s.pauseHandler);
				_s.video_el.removeEventListener("play", _s.playHandler);
				if(!FWDRAPUtils.isIE){
					_s.video_el.removeEventListener("waiting", _s.startToBuffer);
				}
				_s.video_el.removeEventListener("playing", _s.stopToBuffer);
				_s.video_el.removeEventListener("ended", _s.endedHandler);
				if(_s.isMbl){	
					_s.screen.removeChild(_s.video_el);
					_s.video_el = null;
				}else{
					_s.video_el.style.visibility = "hidden";
					_s.video_el.src = "";
					_s.video_el.load();
				}
			}
		};
		
		_s.startToBuffer = function(overwrite){
			_s.dispatchEvent(FWDRAPVideoScreen.START_TO_BUFFER);
		};
		
		_s.stopToBuffer = function(){
			_s.dispatchEvent(FWDRAPVideoScreen.STOP_TO_BUFFER);
		};

		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		_s.errorHandler = function(e){
			
			var error_str;
			_s.hasError_bl = true;
			
			if(_s.video_el.networkState == 0){
				error_str = "error '_s.video_el.networkState = 0'";
			}else if(_s.video_el.networkState == 1){
				error_str = "error '_s.video_el.networkState = 1'";
			}else if(_s.video_el.networkState == 2){
				error_str = "'_s.video_el.networkState = 2'";
			}else if(_s.video_el.networkState == 3){
				error_str = "source not found <font color='#ff0000'>" + _s.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(_s.video_el.networkState);
			
			clearTimeout(_s.showErrorWithDelayId_to);
			_s.showErrorWithDelayId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPVideoScreen.ERROR, {text:error_str });
			}, 200);
		};

		
		//##############################################//
		/* Resize and position */
		//##############################################//
		_s.resizeAndPosition = function(width, height, x, y){};
		

		//##############################################//
		/* Set path */
		//##############################################//
		_s.setSource = function(sourcePath){
			_s.sourcePath_str = sourcePath;
			if(prt.is360 && _s.video_el){
				_s.video_el.style.visibility = "hidden";
			}
			if(_s.video_el) _s.stop();
			if(_s.video_el && FWDRAPUtils.isIphone) _s.video_el.src = sourcePath;
		};
	

		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite){
		
			clearTimeout(_s.playWithDelayId_to);
			FWDRAP.curInstance = prt;
			if(_s.isStopped_bl){
				_s.initVideo();
				_s.setVolume();
				_s.video_el.src = _s.sourcePath_str;
				if(_s.isMbl){
					_s.play();
				}else{
					_s.playWithDelayId_to = setTimeout(_s.play, 1000);
				}	
				_s.hastStaredToPlayHLS_bl = true;
				_s.startToBuffer(true);
				_s.isPlaying_bl = true;
			}else if(!_s.video_el.ended || overwrite){
				
				try{
					_s.hastStaredToPlayHLS_bl = true;
					_s.isPlaying_bl = true;
					_s.hasPlayedOnce_bl = true;
					_s.video_el.play();
					_s.safeToBeControlled();
					if(FWDRAPUtils.isIE) _s.dispatchEvent(FWDRAPVideoScreen.PLAY);
				}catch(e){};
			}
			if(prt.is360) _s.add360Vid();
		};
		
		_s.initVideo = function(){
			
			_s.isPlaying_bl = false;
			_s.hasError_bl = false;
			_s.allowScrubing_bl = false;
			_s.isStopped_bl = false;
			_s.setupVideo();
			_s.setVolume();
			_s.video_el.src = _s.sourcePath_str;
		}

		_s.pause = function(){
			if(_s == null || _s.isStopped_bl || _s.hasError_bl) return;
			if(!_s.video_el.ended){
				try{
					_s.video_el.pause();
					_s.isPlaying_bl = false;
					if(FWDRAPUtils.isIE) _s.dispatchEvent(FWDRAPVideoScreen.PAUSE);
				}catch(e){};
			}
		};
		
		_s.togglePlayPause = function(){
			if(_s == null) return;
			if(!_s.isSafeToBeControlled_bl) return;
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};
		
		_s.resume = function(){
			if(_s.isStopped_bl) return;
			_s.play();
		};
		
		_s.pauseHandler = function(){
			if(_s.allowScrubing_bl) return;
			_s.dispatchEvent(FWDRAPVideoScreen.PAUSE);
		};
		
		_s.playHandler = function(){
			if(_s.allowScrubing_bl) return;
			if(!_s.isStartEventDispatched_bl){
				_s.dispatchEvent(FWDRAPVideoScreen.START);
				_s.isStartEventDispatched_bl = true;
			}
			if(prt.is360) _s.start360Render();
			
			_s.dispatchEvent(FWDRAPVideoScreen.PLAY);
		};
		
		_s.endedHandler = function(){
			_s.dispatchEvent(FWDRAPVideoScreen.PLAY_COMPLETE);
		};
		
		_s.stop = function(overwrite){
			if((_s == null || _s.video_el == null || _s.isStopped_bl) && !overwrite) return;
			
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.hasPlayedOnce_bl = true;
			_s.hastStaredToPlayHLS_bl = false;
			_s.isSafeToBeControlled_bl = false;
			_s.isStartEventDispatched_bl = false;
			clearTimeout(_s.playWithDelayId_to);
			_s.stop360Render();
			_s.destroyVideo();
			_s.dispatchEvent(FWDRAPVideoScreen.LOAD_PROGRESS, {percent:0});
			_s.dispatchEvent(FWDRAPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			_s.dispatchEvent(FWDRAPVideoScreen.STOP);
			_s.stopToBuffer();
		};


		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		_s.safeToBeControlled = function(){
			if(prt.videoType_str == FWDRAP.HLS_JS && !_s.hastStaredToPlayHLS_bl) return;
			_s.stopToScrub();
			if(!_s.isSafeToBeControlled_bl){
		
				_s.hasHours_bl = Math.floor(_s.video_el.duration / (60 * 60)) > 0;
				_s.isPlaying_bl = true;
				_s.isSafeToBeControlled_bl = true;
				if(!prt.is360) _s.video_el.style.visibility = "visible";
				setTimeout(function(){
					if(_s.renderer) _s.renderer.domElement.style.left = "0px";
				},1000);
				_s.dispatchEvent(FWDRAPVideoScreen.SAFE_TO_SCRUBB);
			}
			
		};

	
		//###########################################//
		/* Update progress */
		//##########################################//
		_s.updateProgress = function(){
			if(prt.videoType_str == FWDRAP.HLS_JS && !_s.hastStaredToPlayHLS_bl) return;
			var buffered;
			var percentLoaded = 0;
			
			if(_s.video_el.buffered.length > 0){
				buffered = _s.video_el.buffered.end(_s.video_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/_s.video_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) _s.video_el.removeEventListener("progress", _s.updateProgress);
			
			_s.dispatchEvent(FWDRAPVideoScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		

		//##############################################//
		/* Update audio */
		//#############################################//
		_s.updateVideo = function(){
			var percentPlayed; 
			if (!_s.allowScrubing_bl) {
				percentPlayed = _s.video_el.currentTime /_s.video_el.duration;
				_s.dispatchEvent(FWDRAPVideoScreen.UPDATE, {percent:percentPlayed});
			}
	
			var totalTime = FWDRAPUtils.formatTime(_s.video_el.duration);
			var curTime = FWDRAPUtils.formatTime(_s.video_el.currentTime);
			
			if(!isNaN(_s.video_el.duration)){
				_s.dispatchEvent(FWDRAPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:parseInt(_s.video_el.currentTime), totalTimeInSeconds:_s.video_el.duration, totalTimeInSeconds:_s.video_el.duration});
			}else{
				_s.dispatchEvent(FWDRAPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0, totalTimeInSeconds:0, totalTimeInSeconds:0});
			}
			
			_s.lastPercentPlayed = percentPlayed;
			_s.curDuration = curTime;
		};

		
		//###############################################//
		/* Scrub */
		//###############################################//
		_s.startToScrub = function(){
			_s.allowScrubing_bl = true;
		};
		
		_s.stopToScrub = function(){
			_s.allowScrubing_bl = false;
		};
		
		_s.scrubbAtTime = function(duration){
			_s.video_el.currentTime = duration;
			var totalTime = FWDRAPUtils.formatTime(_s.video_el.duration);
			var curTime = FWDRAPUtils.formatTime(_s.video_el.currentTime);
			_s.dispatchEvent(FWDRAPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
		}
		
		_s.scrub = function(percent, e){
			if(e) _s.startToScrub();
			try{
				_s.video_el.currentTime = _s.video_el.duration * percent;
				var totalTime = FWDRAPUtils.formatTime(_s.video_el.duration);
				var curTime = FWDRAPUtils.formatTime(_s.video_el.currentTime);
				_s.dispatchEvent(FWDRAPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};

		
		//###############################################//
		/* replay */
		//###############################################//
		_s.replay = function(){
			_s.scrub(0);
			_s.play();
		};
		

		//###############################################//
		/* Volume */
		//###############################################//
		_s.setVolume = function(vol){
			if(vol != undefined) _s.volume = vol;
			if(_s.video_el) _s.video_el.volume = _s.volume;
		};
		
		_s.setPlaybackRate = function(rate){
			if(!_s.video_el) return;
			_s.video_el.defaultPlaybackRate = rate;
			_s.video_el.playbackRate = rate;
		}
		

		//###############################################//
		/* Setup 360 vid */
		//###############################################//
		_s.add360Vid = function(){
			
			if(_s.renderer){
				_s.screen.appendChild(_s.renderer.domElement);
				return;
			}
			if(window['THREE'] == undefined) return;
			_s.renderer = new THREE.WebGLRenderer({ antialias: true });
			_s.renderer.setSize(_s.sW, _s.sH);
			_s.renderer.domElement.style.position = "absolute";
			_s.renderer.domElement.style.left = "0px";
			_s.renderer.domElement.style.top = "0px";
			_s.renderer.domElement.style.margin = "0px";
			_s.renderer.domElement.style.padding = "0px";
			_s.renderer.domElement.style.maxWidth = "none";
			_s.renderer.domElement.style.maxHeight = "none";
			_s.renderer.domElement.style.border = "none";
			_s.renderer.domElement.style.lineHeight = "1";
			_s.renderer.domElement.style.backgroundColor = "transparent";
			_s.renderer.domElement.style.backfaceVisibility = "hidden";
			_s.renderer.domElement.style.webkitBackfaceVisibility = "hidden";
			_s.renderer.domElement.style.MozBackfaceVisibility = "hidden";	
			_s.renderer.domElement.style.MozImageRendering = "optimizeSpeed";	
			_s.renderer.domElement.style.WebkitImageRendering = "optimizeSpeed";
			_s.screen.appendChild(_s.renderer.domElement);
			
			_s.scene = new THREE.Scene();
			
			_s.video_el.setAttribute('crossorigin', 'anonymous');
			
			_s.canvas = document.createElement('canvas');
			_s.context = _s.canvas.getContext('2d');
		
			if(FWDRAPUtils.isFirefox){
				_s.videoTexture = new THREE.Texture(_s.video_el);
			}else{
				_s.videoTexture = new THREE.Texture(_s.canvas);
			}
			
			_s.videoTexture.minFilter = THREE.LinearFilter;
			_s.videoTexture.magFilter = THREE.LinearFilter;
			_s.videoTexture.format = THREE.RGBFormat;

			_s.cubeGeometry = new THREE.SphereGeometry(500, 60, 40);
			_s.sphereMat = new THREE.MeshBasicMaterial({map: _s.videoTexture});
			_s.sphereMat.side = THREE.BackSide;
			_s.cube = new THREE.Mesh(_s.cubeGeometry, _s.sphereMat);
			_s.scene.add(_s.cube);

			_s.camera = new THREE.PerspectiveCamera(45, _s.sW / _s.sH, 0.1, 10000);
			_s.camera.position.y = 0;
			_s.camera.position.z = 500;
			_s.camera.position.x = 0;

			_s.scene.add(_s.camera);
			
			_s.controls = new THREE.OrbitControls(_s.camera, prt.dumyClick_do.screen);
			_s.controls.enableDamping = true;
			_s.controls.enableZoom = false; 
			_s.controls.dampingFactor = 0.25;
			_s.controls.maxDistance = 500;
			_s.controls.minDistance = 500;
			_s.controls.rotateLeft(90 * Math.PI/180);
			
			_s.controls.enabled=true;
			_s.render();
		}
		
		_s.start360Render = function(){
			_s.is360Rendering_bl = true;
			cancelAnimationFrame(_s.requestId);
			_s.requestId = requestAnimationFrame(_s.render);
		}
		
		_s.stop360Render = function(){
			_s.is360Rendering_bl = false;
			if(!_s.camera) return;
			_s.camera.position.y = 0;
			_s.camera.position.z = 500;
			_s.camera.position.x = 0;
			_s.renderer.domElement.style.left = "-10000px";
			cancelAnimationFrame(_s.requestId);
			try{
				_s.screen.removeChild(_s.renderer.domElement);
			}catch(e){};
		}
		
		_s.render = function(){
			if(!_s.is360Rendering_bl || !_s.camera || !prt.is360){
				cancelAnimationFrame(_s.requestId);
				return;
			}
			
			if( _s.video_el.readyState === _s.video_el.HAVE_ENOUGH_DATA ){
				_s.videoTexture.needsUpdate = true;
			}
			
			if(!FWDRAPUtils.isFirefox && _s.context && !_s.isStopped_bl){
				if(_s.video_el.videoWidth != 0){
					_s.canvas.width = _s.video_el.videoWidth;
					_s.canvas.height = _s.video_el.videoHeight;
				}
				_s.context.save();
				_s.context.scale(-1,1);
				_s.context.drawImage(_s.video_el, 0,0,_s.canvas.width * -1,_s.canvas.height);
				_s.context.restore();
			}
			
			_s.controls.update();
			_s.renderer.render(_s.scene, _s.camera);
			_s.requestId = requestAnimationFrame(_s.render);
		}
		
		_s.getDuration = function(){
			return FWDRAPUtils.formatTime(_s.video_el.duration);
		}
		
		_s.getCurrentTime = function(){
			return FWDRAPUtils.formatTime(_s.video_el.currentTime);
		}
	
		_s.init();
	};
	

	/* set prototype */
	FWDRAPVideoScreen.setPrototype = function(){
		FWDRAPVideoScreen.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPVideoScreen.ERROR = "error";
	FWDRAPVideoScreen.UPDATE = "update";
	FWDRAPVideoScreen.UPDATE_TIME = "updateTime";
	FWDRAPVideoScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDRAPVideoScreen.LOAD_PROGRESS = "loadProgress";
	FWDRAPVideoScreen.START = "start";
	FWDRAPVideoScreen.PLAY = "play";
	FWDRAPVideoScreen.PAUSE = "pause";
	FWDRAPVideoScreen.STOP = "stop";
	FWDRAPVideoScreen.PLAY_COMPLETE = "playComplete";
	FWDRAPVideoScreen.START_TO_BUFFER = "startToBuffer";
	FWDRAPVideoScreen.STOP_TO_BUFFER = "stopToBuffer";


	window.FWDRAPVideoScreen = FWDRAPVideoScreen;

}(window));/**
 * Royal Audio Player
 * Youtube screen.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(window){
	
	var FWDRAPYoutubeScreen = function(prt, volume){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPYoutubeScreen.prototype;
		
		_s.ytb = null;
		
		_s.lastQuality_str = "auto";
		
		_s.volume = volume;
		
		_s.controllerHeight = prt._d.controllerHeight;
		_s.isStopped_bl = true;
		_s.isPausedInEvent_bl = true;
		_s.isShowed_bl = true;
		_s.isMbl = FWDRAPUtils.isMobile;

		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.getStyle().width = "100%";
			_s.getStyle().height = "100%";
			_s.hasTransform3d_bl = false;
			_s.hasTransform2d_bl = false;
			_s.setBkColor("#000000");
			_s.setBackfaceVisibility();
			_s.id = "youtubePlayer";

			prt.main_do.addChild(_s);
			_s.resizeAndPosition();
			_s.setupVideo();
		};
	

		//###############################################//
		/* Setup youtube video */
		//##############################################//
		_s.setupVideo = function(){
			if(_s.ytb) return;
			
			_s.videoHolder_do = new FWDRAPDisplayObject("div");
			_s.videoHolder_do.hasTransform3d_bl = false;
			_s.videoHolder_do.hasTransform2d_bl = false;
			_s.videoHolder_do.screen.setAttribute("id", prt.instanceName_str + "youtube");
			_s.videoHolder_do.getStyle().width = "100%";
			_s.videoHolder_do.getStyle().height = "100%";
			_s.videoHolder_do.setBackfaceVisibility();
			_s.addChild(_s.videoHolder_do);
			
			
			_s.ytb = new YT.Player(prt.instanceName_str + "youtube", {
				width:"100%",
				height:"100%",
				playerVars:{
					controls:0,
					disablekb:0,
					loop:0,
					autoplay:0,
					wmode:"opaque",
					showinfo:0,
					rel:0,
					modestbranding:1,
					iv_load_policy:3,
					cc_load_policy :0,
					fs:0,
					html5:0
			  	},
			  	events: {
			  		"onReady":_s.playerReadyHandler,
			  		"onError":_s.playerErrorHandler,
			  		"onStateChange":_s.stateChangeHandler,
			  		"onPlaybackQualityChange":_s.qualityChangeHandler
			  	}
		    });
		    _s.ytbIframe = document.getElementById(prt.instanceName_str + "youtube");
		};
		
		_s.playerReadyHandler = function(){
			_s.isReady_bl = true;

			_s.resizeAndPosition();
			_s.dispatchEvent(FWDRAPYoutubeScreen.READY);
			_s.hasBeenCreatedOnce_bl = true;
		};
		
		_s.stateChangeHandler = function(e){
			if(e.data == -1 && _s.isCued_bl && _s.isMbl){
				_s.isStopped_bl = false;
				FWDRAP.stopAllAudio(prt);
			}
			
			if(e.data == YT.PlayerState.PLAYING){
				if(!_s.isSafeToBeControlled_bl){
					_s.isStopped_bl = false;
					_s.isSafeToBeControlled_bl = true;
					_s.isPlaying_bl = true;
					_s.hasHours_bl = Math.floor(_s.ytb.getDuration() / (60 * 60)) > 0;
					_s.setVolume(_s.volume);
					_s.startToUpdate();
					_s.startToPreload();
					_s.scrub(0.00001);
					if(!_s.isMbl) _s.setQuality(_s.lastQuality_str);
					
					if(_s.ytb.getAvailableQualityLevels() && _s.ytb.getAvailableQualityLevels().length != 0){
						_s.dispatchEvent(FWDRAPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:_s.ytb.getPlaybackQuality(), levels:_s.ytb.getAvailableQualityLevels()});
					}
					_s.setPlaybackRate();
				    _s.dispatchEvent(FWDRAPYoutubeScreen.SAFE_TO_SCRUBB);
				}
				if(_s.isPausedInEvent_bl) _s.dispatchEvent(FWDRAPYoutubeScreen.PLAY);
				if(!_s.isStartEventDispatched_bl){
					_s.dispatchEvent(FWDRAPAudioScreen.START);
					_s.isStartEventDispatched_bl = true;
				}
				_s.isPausedInEvent_bl = false;
				_s.hasError_bl = false;
				
			}else if(e.data == YT.PlayerState.PAUSED){
				if(!_s.isSafeToBeControlled_bl) return;
				_s.isStopped_bl = false;
				if(!_s.isPausedInEvent_bl) _s.dispatchEvent(FWDRAPYoutubeScreen.PAUSE);
				_s.isPausedInEvent_bl = true;
			}else if(e.data == YT.PlayerState.ENDED){
				if(_s.ytb.getCurrentTime() && _s.ytb.getCurrentTime() > 0){
					_s.isStopped_bl = false;
					setTimeout(function(){_s.dispatchEvent(FWDRAPYoutubeScreen.PLAY_COMPLETE);}, 100);
				}
			}else if(e.data == YT.PlayerState.CUED){
				if(!_s.isStopped_bl){
					_s.dispatchEvent(FWDRAPYoutubeScreen.CUED);
				}

				if(!_s.stopp){
					if(prt._d.autoPlay_bl || prt.isPlaylistItemClicked_bl){
				
						if(prt.isPlaylistItemClicked_bl) prt.play();

						if(prt._d.autoPlay_bl){
							prt.play();
						}
					}else{
						
					}
				}
				_s.isCued_bl = true;
				_s.resizeAndPosition();
			}
		};
		
		_s.qualityChangeHandler = function(e){
			if(_s.ytb.getAvailableQualityLevels() && _s.ytb.getAvailableQualityLevels().length != 0){
				_s.dispatchEvent(FWDRAPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:_s.ytb.getPlaybackQuality()});
			}
		};
		
		_s.playerErrorHandler = function(e){
			_s.isPausedInEvent_bl = true;
			
			if(_s.isStopped_bl || _s.hasError_bl || !_s.isReady_bl) return;
			var error_str = "";
			_s.hasError_bl = true;
			if(e.data == 2){
				error_str = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks.";
			}else if(e.data == 5){
				error_str = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
			}else if(e.data == 100){
				error_str = "The youtube video request was not found, probably the video ID is incorrect.";
			}else if(e.data == 101 || e.data == 150){
				error_str = "The owner of the requested video does not allow it to be played in embedded players.";
			}
			_s.dispatchEvent(FWDRAPYoutubeScreen.ERROR, {text:error_str});
		};

		
		//##############################################//
		/* Resize and position */
		//##############################################//
		_s.resizeAndPosition = function(){
			_s.setWidth(prt.videosHolder_do.w);
			_s.setHeight(prt.videosHolder_do.h);

			if(prt.audioType_str == 'youtube'){
				if(!_s.width < 380){
					_s.ytbIframe.style.height = (prt.videosHolder_do.h + 300) + 'px';
					_s.ytbIframe.style.top = -150 + 'px';
				}else{
					_s.ytbIframe.style.height = (1.776 * prt.videosHolder_do.h) + 'px';
					_s.ytbIframe.style.top = ((prt.videosHolder_do.h - (1.776 * prt.videosHolder_do.h))/2) + 'px';
				}
			}
		};
		

		//##############################################//
		/* Set path */
		//##############################################//
		_s.setSource = function(sourcePath){
			if(sourcePath) _s.sourcePath_str = sourcePath;
		
			clearInterval(_s.setSourceId_int);
			_s.setSourceId_int = setInterval(function(){
				if(_s.ytb.cueVideoById && _s.ytb.setPlaybackRate){
					_s.ytb.cueVideoById(_s.sourcePath_str);
					clearInterval(_s.setSourceId_int);
				}
			},50);

			_s.stopp = false;
		};
	

		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite){
			
			FWDRAP.curInstance = prt;
			_s.isPlaying_bl = true;
			_s.hasError_bl = false;
			try{
				_s.ytb.playVideo();
				_s.startToUpdate();
			}catch(e){}
			_s.isStopped_bl = false;
		};

		_s.pause = function(){
			if(_s.isStopped_bl || _s.hasError_bl) return;
			_s.isPlaying_bl = false;
			try{
				_s.ytb.pauseVideo();
			}catch(e){}
			_s.stopToUpdate();
		};
		
		_s.togglePlayPause = function(){
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};
		
		_s.resume = function(){
			if(_s.isStopped_bl) return;
			_s.play();
		};
		
		_s.togglePlayPause = function(){
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};
		

		//###########################################//
		/* Updates. */
		//###########################################//
		_s.startToUpdate = function(){
			clearInterval(_s.updateVideoId_int);
			_s.updateVideoId_int = setInterval(_s.updateVideo, 500);
		};
		
		_s.stopToUpdate = function(){
			clearInterval(_s.updateVideoId_int);
		};
		
		_s.updateVideo = function(){
			var percentPlayed; 
			if(!_s.ytb){
				stopToUpdate();
				return;
			}
			if (!_s.allowScrubing_bl) {
				percentPlayed = _s.ytb.getCurrentTime() /_s.ytb.getDuration();
				_s.dispatchEvent(FWDRAPYoutubeScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = FWDRAPUtils.formatTime(_s.ytb.getDuration());
			var curTime = FWDRAPUtils.formatTime(_s.ytb.getCurrentTime());
			
			_s.dispatchEvent(FWDRAPYoutubeScreen.UPDATE_TIME, {curTime:curTime , totalTime:totalTime, seconds:Math.round(_s.ytb.getCurrentTime()), totalTimeInSeconds:_s.ytb.getDuration()});
		};
		
		_s.getDuration = function(){
			return FWDRAPUtils.formatTime(_s.ytb.getDuration());
		}
		
		_s.getCurrentTime = function(){
			return FWDRAPUtils.formatTime(_s.ytb.getCurrentTime());
		}
		
		_s.startToPreload = function(){
			clearInterval(_s.preloadVideoId_int);
			_s.updatePreloadId_int = setInterval(_s.updateProgress, 500);
		};
		
		_s.stopToPreload = function(){
			clearInterval(_s.updatePreloadId_int);
		};
		
		_s.updateProgress = function(){
			if(!_s.ytb){
				stopToPreload();
				return;
			}
			var buffered;
			var percentLoaded = _s.ytb.getVideoLoadedFraction();
			
			_s.dispatchEvent(FWDRAPYoutubeScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		

		//###########################################//
		/* Event handlers */
		//###########################################//	
		_s.stop = function(){
			if(_s.isStopped_bl) return;
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.isCued_bl = false;
			_s.allowScrubing_bl = false;
			_s.isSafeToBeControlled_bl = false;
			_s.isQualityArrayDisapatched_bl = false;
			_s.isPausedInEvent_bl = true;
			_s.isStartEventDispatched_bl = false;
			clearInterval(_s.setSourceId_int);
			_s.stopToUpdate();
			_s.stopToPreload();
			_s.stopVideo();
			_s.dispatchEvent(FWDRAPYoutubeScreen.STOP);
			_s.dispatchEvent(FWDRAPYoutubeScreen.LOAD_PROGRESS, {percent:0});
			_s.dispatchEvent(FWDRAPYoutubeScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
		};
		
		_s.destroyYoutube = function(){
			if(_s.videoHolder_do){
				_s.videoHolder_do.screen.removeAttribute("id", prt.instanceName_str + "youtube");
				_s.videoHolder_do.destroy();
				_s.videoHolder_do = null;
			}
			if(_s.ytb) _s.ytb.destroy();
			_s.ytb = null;
		};
		
		_s.stopVideo = function(){
			_s.ytb.cueVideoById(_s.sourcePath_str);
			_s.stopp = true;
		};


		//###############################################//
		/* Scrub */
		//###############################################//
		_s.startToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = true;
		};
		
		_s.stopToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = false;
		};
		
		_s.scrubbAtTime = function(duration){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.ytb.seekTo(duration);
		}
		
		
		_s.scrub = function(percent){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.ytb.seekTo(percent * _s.ytb.getDuration());
		};

	
		//###############################################//
		/* Volume */
		//###############################################//
		_s.setVolume = function(vol){
			
			if(!_s.ytb) return;
			if(vol != undefined) _s.volume = vol;
			if(_s.ytb) _s.ytb.setVolume(vol * 100);
		};

		
		//###############################################//
		/* set quality */
		//###############################################//
		_s.setQuality = function(quality){
			_s.lastQuality_str = quality;
			_s.ytb.setPlaybackQuality(quality);
		};
		
		_s.setPlaybackRate = function(rate){
			if(!_s.ytb || _s.isMbl) return;
			if(rate) _s.rate = rate;
			_s.ytb.setPlaybackRate(_s.rate);
		};
		
	
		_s.init();
	};


	/* set prototype */
	FWDRAPYoutubeScreen.setPrototype = function(){
		FWDRAPYoutubeScreen.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPYoutubeScreen.READY = "ready";
	FWDRAPYoutubeScreen.ERROR = "error";
	FWDRAPYoutubeScreen.UPDATE = "update";
	FWDRAPYoutubeScreen.UPDATE_TIME = "updateTime";
	FWDRAPYoutubeScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDRAPYoutubeScreen.LOAD_PROGRESS = "loadProgress";
	FWDRAPYoutubeScreen.PLAY = "play";
	FWDRAPYoutubeScreen.PAUSE = "pause";
	FWDRAPYoutubeScreen.STOP = "stop";
	FWDRAPYoutubeScreen.PLAY_COMPLETE = "playComplete";
	FWDRAPYoutubeScreen.CUED = "cued";
	FWDRAPYoutubeScreen.QUALITY_CHANGE = "qualityChange";


	window.FWDRAPYoutubeScreen = FWDRAPYoutubeScreen;

}(window));// FWDAnimation classs for tweening not allowed to modify or use outside this plugin!
var _fwd_fwdScope;window.FWDAnimation||(((_fwd_fwdScope="undefined"!=typeof fwd_module&&fwd_module.exports&&"undefined"!=typeof fwd_global?fwd_global:this||window)._fwd_fwdQueue||(_fwd_fwdScope._fwd_fwdQueue=[])).push(function(){"use strict";function y(t,e,i,r){i===r&&(i=r-(r-e)/1e6),t===e&&(e=t+(i-t)/1e6),this.a=t,this.b=e,this.c=i,this.d=r,this.da=r-t,this.ca=i-t,this.ba=e-t}function w(t,e,i,r){var s={a:t},n={},a={},o={c:r},l=(t+e)/2,h=(e+i)/2,f=(i+r)/2,u=(l+h)/2,p=(h+f)/2,_=(p-u)/8;return s.b=l+(t-l)/4,n.b=u+_,s.c=n.a=(s.b+n.b)/2,n.c=a.a=(u+p)/2,a.b=p-_,o.b=f+(r-f)/4,a.c=o.a=(a.b+o.b)/2,[s,n,a,o]}function _(t,e,i,r,s,n){var a,o,l,h,f,u,p,_,c={},d=[],m=n||t[0];for(o in s="string"==typeof s?","+s+",":",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",null==e&&(e=1),t[0])d.push(o);if(1<t.length){for(_=t[t.length-1],p=!0,a=d.length;-1<--a;)if(o=d[a],.05<Math.abs(m[o]-_[o])){p=!1;break}p&&(t=t.concat(),n&&t.unshift(n),t.push(t[1]),n=t[t.length-3])}for(T.length=P.length=O.length=0,a=d.length;-1<--a;)o=d[a],g[o]=-1!==s.indexOf(","+o+","),c[o]=function(t,e,i,r){var s,n,a,o,l,h,f=[];if(r)for(n=(t=[r].concat(t)).length;-1<--n;)"string"==typeof(h=t[n][e])&&"="===h.charAt(1)&&(t[n][e]=r[e]+Number(h.charAt(0)+h.substr(2)));if((s=t.length-2)<0)return f[0]=new y(t[0][e],0,0,t[s<-1?0:1][e]),f;for(n=0;n<s;n++)a=t[n][e],o=t[n+1][e],f[n]=new y(a,0,0,o),i&&(l=t[n+2][e],T[n]=(T[n]||0)+(o-a)*(o-a),P[n]=(P[n]||0)+(l-o)*(l-o));return f[n]=new y(t[n][e],0,0,t[n+1][e]),f}(t,o,g[o],n);for(a=T.length;-1<--a;)T[a]=Math.sqrt(T[a]),P[a]=Math.sqrt(P[a]);if(!r){for(a=d.length;-1<--a;)if(g[o])for(u=(l=c[d[a]]).length-1,h=0;h<u;h++)f=l[h+1].da/P[h]+l[h].da/T[h]||0,O[h]=(O[h]||0)+f*f;for(a=O.length;-1<--a;)O[a]=Math.sqrt(O[a])}for(a=d.length,h=i?4:1;-1<--a;)(function(t,e,i,r,s){for(var n,a,o,l,h,f,u,p,_,c,d,m,g=t.length-1,y=0,v=t[0].a,x=0;x<g;x++)n=(l=t[y]).a,a=l.d,o=t[y+1].d,u=s?(c=T[x],m=((d=P[x])+c)*e*.25/(!r&&O[x]||.5),a-((h=a-(a-n)*(r?.5*e:0!==c?m/c:0))+(((f=a+(o-a)*(r?.5*e:0!==d?m/d:0))-h)*(3*c/(c+d)+.5)/4||0))):a-((h=a-(a-n)*e*.5)+(f=a+(o-a)*e*.5))/2,h+=u,f+=u,l.c=p=h,l.b=0!==x?v:v=l.a+.6*(l.c-l.a),l.da=a-n,l.ca=p-n,l.ba=v-n,i?(_=w(n,v,p,a),t.splice(y,1,_[0],_[1],_[2],_[3]),y+=4):y++,v=f;(l=t[y]).b=v,l.c=v+.4*(l.d-v),l.da=l.d-l.a,l.ca=l.c-l.a,l.ba=v-l.a,i&&(_=w(l.a,v,l.c,l.d),t.splice(y,1,_[0],_[1],_[2],_[3]))})(l=c[o=d[a]],e,i,r,g[o]),p&&(l.splice(0,h),l.splice(l.length-h,h));return c}var b,T,P,O,g,i,m,t;_fwd_fwdScope.FWDFWD_fwdDefine("FWDAnimation",["core.FWDAnimation","core.FWDSimpleTimeline","FWDTweenLite"],function(m,f,g){function y(t){for(var e=[],i=t.length,r=0;r!==i;e.push(t[r++]));return e}function v(t,e,i){var r,s,n=t.cycle;for(r in n)s=n[r],t[r]="function"==typeof s?s(i,e[i]):s[i%s.length];delete t.cycle}var m=function(t,e,i){g.call(this,t,e,i),this._cycle=0,this._yoyo=!0===this.vars.yoyo,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=m.prototype.render},x=1e-10,w=g._internals,T=w.isSelector,b=w.isArray,t=m.prototype=g.to({},.1,{}),P=[];m.version="1.19.0",t.constructor=m,t.kill()._gc=!1,m.killTweensOf=m.killDelayedCallsTo=g.killTweensOf,m.getTweensOf=g.getTweensOf,m.lagSmoothing=g.lagSmoothing,m.ticker=g.ticker,m.render=g.render,t.invalidate=function(){return this._yoyo=!0===this.vars.yoyo,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),g.prototype.invalidate.call(this)},t.updateTo=function(t,e){var i,r=this.ratio,s=this.vars.immediateRender||t.immediateRender;for(i in e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay)),t)this.vars[i]=t[i];if(this._initted||s)if(e)this._initted=!1,s&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&g._onPluginEvent("_onDisable",this),.998<this._time/this._duration){var n=this._totalTime;this.render(0,!0,!1),this._initted=!1,this.render(n,!0,!1)}else if(this._initted=!1,this._init(),0<this._time||s)for(var a,o=1/(1-r),l=this._firstPT;l;)a=l.s+l.c,l.c*=o,l.s=a-l.c,l=l._next;return this},t.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var r,s,n,a,o,l,h,f,u,p=this._dirty?this.totalDuration():this._totalDuration,_=this._time,c=this._totalTime,d=this._cycle,m=this._duration,g=this._rawPrevTime;if(p-1e-7<=t?(this._totalTime=p,this._cycle=this._repeat,this._yoyo&&0!=(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=m,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(r=!0,s="onComplete",i=i||this._timeline.autoRemoveChildren),0===m&&(!this._initted&&this.vars.lazy&&!i||(this._startTime===this._timeline._duration&&(t=0),(g<0||t<=0&&-1e-7<=t||g===x&&"isPause"!==this.data)&&g!==t&&(i=!0,x<g&&(s="onReverseComplete")),this._rawPrevTime=f=!e||t||g===t?t:x))):t<1e-7?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==c||0===m&&0<g)&&(s="onReverseComplete",r=this._reversed),t<0&&(this._active=!1,0===m&&(!this._initted&&this.vars.lazy&&!i||(0<=g&&(i=!0),this._rawPrevTime=f=!e||t||g===t?t:x))),this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(a=m+this._repeatDelay,this._cycle=this._totalTime/a>>0,0!==this._cycle&&this._cycle===this._totalTime/a&&c<=t&&this._cycle--,this._time=this._totalTime-this._cycle*a,this._yoyo&&0!=(1&this._cycle)&&(this._time=m-this._time),this._time>m?this._time=m:this._time<0&&(this._time=0)),this._easeType?(o=this._time/m,(1===(l=this._easeType)||3===l&&.5<=o)&&(o=1-o),3===l&&(o*=2),1===(h=this._easePower)?o*=o:2===h?o*=o*o:3===h?o*=o*o*o:4===h&&(o*=o*o*o*o),1===l?this.ratio=1-o:2===l?this.ratio=o:this._time/m<.5?this.ratio=o/2:this.ratio=1-o/2):this.ratio=this._ease.getRatio(this._time/m)),_!==this._time||i||d!==this._cycle){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration))return this._time=_,this._totalTime=c,this._rawPrevTime=g,this._cycle=d,w.lazyTweens.push(this),void(this._lazy=[t,e]);this._time&&!r?this.ratio=this._ease.getRatio(this._time/m):r&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(!1!==this._lazy&&(this._lazy=!1),this._active||!this._paused&&this._time!==_&&0<=t&&(this._active=!0),0===c&&(2===this._initted&&0<t&&this._init(),this._startAt&&(0<=t?this._startAt.render(t,e,i):s=s||"_dummyGS"),this.vars.onStart&&(0===this._totalTime&&0!==m||e||this._callback("onStart"))),n=this._firstPT;n;){n.f?n.t[n.p](n.c*this.ratio+n.s):(u=n.c*this.ratio+n.s,"x"==n.p?n.t.setX(u):"y"==n.p?n.t.setY(u):"z"==n.p?n.t.setZ(u):"angleX"==n.p?n.t.setAngleX(u):"angleY"==n.p?n.t.setAngleY(u):"angleZ"==n.p?n.t.setAngleZ(u):"w"==n.p?n.t.setWidth(u):"h"==n.p?n.t.setHeight(u):"alpha"==n.p?n.t.setAlpha(u):"scale"==n.p?n.t.setScale2(u):n.t[n.p]=u),n=n._next}this._onUpdate&&(t<0&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||this._totalTime===c&&!s||this._callback("onUpdate")),this._cycle!==d&&(e||this._gc||this.vars.onRepeat&&this._callback("onRepeat")),s&&(this._gc&&!i||(t<0&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),r&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[s]&&this._callback(s),0===m&&this._rawPrevTime===x&&f!==x&&(this._rawPrevTime=0)))}else c!==this._totalTime&&this._onUpdate&&(e||this._callback("onUpdate"))},m.to=function(t,e,i){return new m(t,e,i)},m.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new m(t,e,i)},m.fromTo=function(t,e,i,r){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,new m(t,e,r)},m.staggerTo=m.allTo=function(t,e,i,r,s,n,a){r=r||0;function o(){i.onComplete&&i.onComplete.apply(i.onCompleteScope||this,arguments),s.apply(a||i.callbackScope||this,n||P)}var l,h,f,u,p=0,_=[],c=i.cycle,d=i.startAt&&i.startAt.cycle;for(b(t)||("string"==typeof t&&(t=g.selector(t)||t),T(t)&&(t=y(t))),t=t||[],r<0&&((t=y(t)).reverse(),r*=-1),l=t.length-1,f=0;f<=l;f++){for(u in h={},i)h[u]=i[u];if(c&&(v(h,t,f),null!=h.duration&&(e=h.duration,delete h.duration)),d){for(u in d=h.startAt={},i.startAt)d[u]=i.startAt[u];v(h.startAt,t,f)}h.delay=p+(h.delay||0),f===l&&s&&(h.onComplete=o),_[f]=new m(t[f],e,h),p+=r}return _},m.staggerFrom=m.allFrom=function(t,e,i,r,s,n,a){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,m.staggerTo(t,e,i,r,s,n,a)},m.staggerFromTo=m.allFromTo=function(t,e,i,r,s,n,a,o){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,m.staggerTo(t,e,r,s,n,a,o)},m.delayedCall=function(t,e,i,r,s){return new m(e,0,{delay:t,onComplete:e,onCompleteParams:i,callbackScope:r,onReverseComplete:e,onReverseCompleteParams:i,immediateRender:!1,useFrames:s,overwrite:0})},m.set=function(t,e){return new m(t,0,e)},m.isTweening=function(t){return 0<g.getTweensOf(t,!0).length};var n=function(t,e){for(var i=[],r=0,s=t._first;s;)s instanceof g?i[r++]=s:(e&&(i[r++]=s),r=(i=i.concat(n(s,e))).length),s=s._next;return i},u=m.getAllTweens=function(t){return n(m._rootTimeline,t).concat(n(m._rootFramesTimeline,t))};m.killAll=function(t,e,i,r){null==e&&(e=!0),null==i&&(i=!0);for(var s,n,a=u(0!=r),o=a.length,l=e&&i&&r,h=0;h<o;h++)n=a[h],(l||n instanceof f||(s=n.target===n.vars.onComplete)&&i||e&&!s)&&(t?n.totalTime(n._reversed?0:n.totalDuration()):n._enabled(!1,!1))},m.killChildTweensOf=function(t,e){if(null!=t){var i,r,s,n,a,o=w.tweenLookup;if("string"==typeof t&&(t=g.selector(t)||t),T(t)&&(t=y(t)),b(t))for(n=t.length;-1<--n;)m.killChildTweensOf(t[n],e);else{for(s in i=[],o)for(r=o[s].target.parentNode;r;)r===t&&(i=i.concat(o[s].tweens)),r=r.parentNode;for(a=i.length,n=0;n<a;n++)e&&i[n].totalTime(i[n].totalDuration()),i[n]._enabled(!1,!1)}}};function r(t,e,i,r){e=!1!==e,i=!1!==i;for(var s,n,a=u(r=!1!==r),o=e&&i&&r,l=a.length;-1<--l;)n=a[l],(o||n instanceof f||(s=n.target===n.vars.onComplete)&&i||e&&!s)&&n.paused(t)}return m.pauseAll=function(t,e,i){r(!0,t,e,i)},m.resumeAll=function(t,e,i){r(!1,t,e,i)},m.globalTimeScale=function(t){var e=m._rootTimeline,i=g.ticker.time;return arguments.length?(t=t||x,e._startTime=i-(i-e._startTime)*e._timeScale/t,e=m._rootFramesTimeline,i=g.ticker.frame,e._startTime=i-(i-e._startTime)*e._timeScale/t,e._timeScale=m._rootTimeline._timeScale=t):e._timeScale},t.progress=function(t,e){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!=(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),e):this._time/this.duration()},t.totalProgress=function(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this._totalTime/this.totalDuration()},t.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!=(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},t.duration=function(t){return arguments.length?m.prototype.duration.call(this,t):this._duration},t.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},t.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},t.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},t.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},m},!0),b=180/Math.PI,T=[],P=[],O=[],g={},i=_fwd_fwdScope.FWDFWD_fwdDefine.globals,m=_fwd_fwdScope.FWDFWD_fwdDefine.plugin({propName:"bezier",priority:-1,version:"1.3.7",API:2,fwd_global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._mod={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var r,s,n,a,o,l,h=e.values||[],f={},u=h[0],p=e.autoRotate||i.vars.orientToBezier;for(r in this._autoRotate=p?p instanceof Array?p:[["x","y","rotation",!0!==p&&Number(p)||0]]:null,u)this._props.push(r);for(n=this._props.length;-1<--n;)r=this._props[n],this._overwriteProps.push(r),s=this._func[r]="function"==typeof t[r],f[r]=s?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]():parseFloat(t[r]),o||f[r]!==h[0][r]&&(o=f);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?_(h,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,o):function(t,e,i){var r,s,n,a,o,l,h,f,u,p,_,c={},d="cubic"===(e=e||"soft")?3:2,m="soft"===e,g=[];if(m&&i&&(t=[i].concat(t)),null==t||t.length<1+d)throw"invalid Bezier data";for(u in t[0])g.push(u);for(l=g.length;-1<--l;){for(c[u=g[l]]=o=[],p=0,f=t.length,h=0;h<f;h++)r=null==i?t[h][u]:"string"==typeof(_=t[h][u])&&"="===_.charAt(1)?i[u]+Number(_.charAt(0)+_.substr(2)):Number(_),m&&1<h&&h<f-1&&(o[p++]=(r+o[p-2])/2),o[p++]=r;for(f=p-d+1,h=p=0;h<f;h+=d)r=o[h],s=o[h+1],n=o[h+2],a=2==d?0:o[h+3],o[p++]=_=3==d?new y(r,s,n,a):new y(r,(2*s+r)/3,(2*s+n)/3,n);o.length=p}return c}(h,e.type,f),this._segCount=this._beziers[r].length,this._timeRes&&(l=function(t,e){var i,r,s,n,a=[],o=[],l=0,h=0,f=(e=e>>0||6)-1,u=[],p=[];for(i in t)!function(t,e,i){for(var r,s,n,a,o,l,h,f,u,p,_,c=1/i,d=t.length;-1<--d;)for(n=(p=t[d]).a,a=p.d-n,o=p.c-n,l=p.b-n,r=s=0,f=1;f<=i;f++)r=s-(s=((h=c*f)*h*a+3*(u=1-h)*(h*o+u*l))*h),e[_=d*i+f-1]=(e[_]||0)+r*r}(t[i],a,e);for(s=a.length,r=0;r<s;r++)l+=Math.sqrt(a[r]),p[n=r%e]=l,n===f&&(h+=l,u[n=r/e>>0]=p,o[n]=h,l=0,p=[]);return{length:h,lengths:o,segments:u}}(this._beziers,this._timeRes),this._length=l.length,this._lengths=l.lengths,this._segments=l.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length),p=this._autoRotate)for(this._initialRotations=[],p[0]instanceof Array||(this._autoRotate=p=[p]),n=p.length;-1<--n;){for(a=0;a<3;a++)r=p[n][a],this._func[r]="function"==typeof t[r]&&t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)];r=p[n][2],this._initialRotations[n]=(this._func[r]?this._func[r].call(this._target):this._target[r])||0,this._overwriteProps.push(r)}return this._startRatio=i.vars.runBackwards?1:0,!0},set:function(t){var e,i,r,s,n,a,o,l,h,f=this._segCount,u=this._func,p=this._target,_=t!==this._startRatio;if(this._timeRes){if(l=this._lengths,h=this._curSeg,t*=this._length,T=this._li,t>this._l2&&T<f-1){for(o=f-1;T<o&&(this._l2=l[++T])<=t;);this._l1=l[T-1],this._li=T,this._curSeg=h=this._segments[T],this._s2=h[this._s1=this._si=0]}else if(t<this._l1&&0<T){for(;0<T&&(this._l1=l[--T])>=t;);0===T&&t<this._l1?this._l1=0:T++,this._l2=l[T],this._li=T,this._curSeg=h=this._segments[T],this._s1=h[(this._si=h.length-1)-1]||0,this._s2=h[this._si]}if(e=T,t-=this._l1,T=this._si,t>this._s2&&T<h.length-1){for(o=h.length-1;T<o&&(this._s2=h[++T])<=t;);this._s1=h[T-1],this._si=T}else if(t<this._s1&&0<T){for(;0<T&&(this._s1=h[--T])>=t;);0===T&&t<this._s1?this._s1=0:T++,this._s2=h[T],this._si=T}n=(T+(t-this._s1)/(this._s2-this._s1))*this._prec||0}else n=(t-(e=t<0?0:1<=t?f-1:f*t>>0)*(1/f))*f;for(i=1-n,T=this._props.length;-1<--T;)r=this._props[T],a=(n*n*(s=this._beziers[r][e]).da+3*i*(n*s.ca+i*s.ba))*n+s.a,this._mod[r]&&(a=this._mod[r](a,p)),u[r]?p[r](a):"x"==r?p.setX(a):"y"==r?p.setY(a):"z"==r?p.setZ(a):"angleX"==r?p.setAngleX(a):"angleY"==r?p.setAngleY(a):"angleZ"==r?p.setAngleZ(a):"w"==r?p.setWidth(a):"h"==r?p.setHeight(a):"alpha"==r?p.setAlpha(a):"scale"==r?p.setScale2(a):p[r]=a;if(this._autoRotate)for(var c,d,m,g,y,v,x,w=this._autoRotate,T=w.length;-1<--T;)r=w[T][2],v=w[T][3]||0,x=!0===w[T][4]?1:b,s=this._beziers[w[T][0]],c=this._beziers[w[T][1]],s&&c&&(s=s[e],c=c[e],d=s.a+(s.b-s.a)*n,d+=((g=s.b+(s.c-s.b)*n)-d)*n,g+=(s.c+(s.d-s.c)*n-g)*n,m=c.a+(c.b-c.a)*n,m+=((y=c.b+(c.c-c.b)*n)-m)*n,y+=(c.c+(c.d-c.c)*n-y)*n,a=_?Math.atan2(y-m,g-d)*x+v:this._initialRotations[T],this._mod[r]&&(a=this._mod[r](a,p)),u[r]?p[r](a):p[r]=a)}}),t=m.prototype,m.bezierThrough=_,m.cubicToQuadratic=w,m._autoCSS=!0,m.quadraticToCubic=function(t,e,i){return new y(t,(2*e+t)/3,(2*e+i)/3,i)},m._cssRegister=function(){var t,_,c,d,e=i.CSSPlugin;e&&(t=e._internals,_=t._parseToProxy,c=t._setPluginRatio,d=t.CSSPropTween,t._registerComplexSpecialProp("bezier",{parser:function(t,e,i,r,s,n){e instanceof Array&&(e={values:e}),n=new m;var a,o,l,h=e.values,f=h.length-1,u=[],p={};if(f<0)return s;for(a=0;a<=f;a++)l=_(t,h[a],r,s,n,f!==a),u[a]=l.end;for(o in e)p[o]=e[o];return p.values=u,(s=new d(t,"bezier",0,0,l.pt,2)).data=l,s.plugin=n,s.setRatio=c,0===p.autoRotate&&(p.autoRotate=!0),!p.autoRotate||p.autoRotate instanceof Array||(a=!0===p.autoRotate?0:Number(p.autoRotate),p.autoRotate=null!=l.end.left?[["left","top","rotation",a,!1]]:null!=l.end.x&&[["x","y","rotation",a,!1]]),p.autoRotate&&(r._transform||r._enableTransforms(!1),l.autoRotate=r._target._fwdTransform,l.proxy.rotation=l.autoRotate.rotation||0,r._overwriteProps.push("rotation")),n._onInitTween(l.proxy,p,r._tween),s}}))},t._mod=function(t){for(var e,i=this._overwriteProps,r=i.length;-1<--r;)(e=t[i[r]])&&"function"==typeof e&&(this._mod[i[r]]=e)},t._kill=function(t){var e,i,r=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=r.length;-1<--i;)r[i]===e&&r.splice(i,1);if(r=this._autoRotate)for(i=r.length;-1<--i;)t[r[i][2]]&&r.splice(i,1);return this._super._kill.call(this,t)},_fwd_fwdScope.FWDFWD_fwdDefine("plugins.CSSPlugin",["plugins.TweenPlugin","FWDTweenLite"],function(n,B){var c,P,O,d,W=function(){n.call(this,"css"),this._overwriteProps.length=0,this.setRatio=W.prototype.setRatio},h=_fwd_fwdScope.FWDFWD_fwdDefine.globals,m={},t=W.prototype=new n("css");(t.constructor=W).version="1.19.0",W.API=2,W.defaultTransformPerspective=0,W.defaultSkewType="compensated",W.defaultSmoothOrigin=!0,t="px",W.suffixMap={top:t,right:t,bottom:t,left:t,width:t,height:t,fontSize:t,padding:t,margin:t,perspective:t,lineHeight:""};function a(t,e){return e.toUpperCase()}function e(t){return K.createElementNS?K.createElementNS("http://www.w3.org/1999/xhtml",t):K.createElement(t)}function o(t){return N.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1}function g(t){window.console&&console.log(t)}function k(t,e){var i,r,s=(e=e||J).style;if(void 0!==s[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],r=5;-1<--r&&void 0===s[i[r]+t];);return 0<=r?(st="-"+(nt=3===r?"ms":i[r]).toLowerCase()+"-",nt+t):null}function y(t,e){var i,r,s,n={};if(e=e||at(t,null))if(i=e.length)for(;-1<--i;)-1!==(s=e[i]).indexOf("-transform")&&It!==s||(n[s.replace(p,a)]=e.getPropertyValue(s));else for(i in e)-1!==i.indexOf("Transform")&&Xt!==i||(n[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===n[i]&&(n[i.replace(p,a)]=e[i]);return rt||(n.opacity=o(t)),r=Zt(t,e,!1),n.rotation=r.rotation,n.skewX=r.skewX,n.scaleX=r.scaleX,n.scaleY=r.scaleY,n.x=r.x,n.y=r.y,Yt&&(n.z=r.z,n.rotationX=r.rotationX,n.rotationY=r.rotationY,n.scaleZ=r.scaleZ),n.filters&&delete n.filters,n}function v(t,e,i,r,s){var n,a,o,l={},h=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||s&&s[a])&&-1===a.indexOf("Origin")&&("number"!=typeof n&&"string"!=typeof n||(l[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(f,"")?n:0:ht(t,a),void 0!==h[a]&&(o=new vt(h,a,h[a],o))));if(r)for(a in r)"className"!==a&&(l[a]=r[a]);return{difs:l,firstMPT:o}}function R(t,e){return"function"==typeof t&&(t=t(D,F)),"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)||0}function S(t,e){return"function"==typeof t&&(t=t(D,F)),null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)||0}function A(t,e,i,r){var s,n,a,o,l;return"function"==typeof t&&(t=t(D,F)),(o=null==t?e:"number"==typeof t?t:(s=360,n=t.split("_"),a=((l="="===t.charAt(1))?parseInt(t.charAt(0)+"1",10)*parseFloat(n[0].substr(2)):parseFloat(n[0]))*(-1===t.indexOf("rad")?1:G)-(l?0:e),n.length&&(r&&(r[i]=e+a),-1!==t.indexOf("short")&&(a%=s)!==a%180&&(a=a<0?a+s:a-s),-1!==t.indexOf("_cw")&&a<0?a=(a+3599999999640)%s-(a/s|0)*s:-1!==t.indexOf("ccw")&&0<a&&(a=(a-3599999999640)%s-(a/s|0)*s)),e+a))<1e-6&&-1e-6<o&&(o=0),o}function _(t,e,i){return 255*(6*(t=t<0?t+1:1<t?t-1:t)<1?e+(i-e)*t*6:t<.5?i:3*t<2?e+(i-e)*(2/3-t)*6:e)+.5|0}function r(t,e){for(var i,r,s=t.match(dt)||[],n=0,a=s.length?"":t,o=0;o<s.length;o++)i=s[o],n+=(r=t.substr(n,t.indexOf(i,n)-n)).length+i.length,3===(i=ct(i,e)).length&&i.push(1),a+=r+(e?"hsla("+i[0]+","+i[1]+"%,"+i[2]+"%,"+i[3]:"rgba("+i.join(","))+")";return a+t.substr(n)}var M,x,w,Y,T,C,F,D,i,s,z=/(?:\-|\.|\b)(\d|\.|e\-)+/g,X=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,b=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,f=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,I=/(?:\d|\-|\+|=|#|\.)*/g,N=/opacity *= *([^)]*)/i,E=/opacity:([^;]*)/i,l=/alpha\(opacity *=.+?\)/i,L=/^(rgb|hsl)/,u=/([A-Z])/g,p=/-([a-z])/gi,j=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,V=/(?:Left|Right|Width)/i,q=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,Z=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,U=/,(?=[^\)]*(?:\(|$))/gi,$=/[\s,\(]/i,Q=Math.PI/180,G=180/Math.PI,H={},K=document,J=e("div"),tt=e("img"),et=W._internals={_specialProps:m},it=navigator.userAgent,rt=(i=it.indexOf("Android"),s=e("a"),w=-1!==it.indexOf("Safari")&&-1===it.indexOf("Chrome")&&(-1===i||3<Number(it.substr(i+8,1))),T=w&&Number(it.substr(it.indexOf("Version/")+8,1))<6,Y=-1!==it.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(it)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(it))&&(C=parseFloat(RegExp.$1)),!!s&&(s.style.cssText="top:1px;opacity:.55;",/^0.55/.test(s.style.opacity))),st="",nt="",at=K.defaultView?K.defaultView.getComputedStyle:function(){},ot=W.getStyle=function(t,e,i,r,s){var n;return rt||"opacity"!==e?(!r&&t.style[e]?n=t.style[e]:(i=i||at(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(u,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==s||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:s):o(t)},lt=et.convertToPixels=function(t,e,i,r,s){if("px"===r||!r)return i;if("auto"===r||!i)return 0;var n,a,o,l=V.test(e),h=t,f=J.style,u=i<0,p=1===i;if(u&&(i=-i),p&&(i*=100),"%"===r&&-1!==e.indexOf("border"))n=i/100*(l?t.clientWidth:t.clientHeight);else{if(f.cssText="border:0 solid red;position:"+ot(t,"position")+";line-height:0;","%"!==r&&h.appendChild&&"v"!==r.charAt(0)&&"rem"!==r)f[l?"borderLeftWidth":"borderTopWidth"]=i+r;else{if(a=(h=t.parentNode||K.body)._fwdCache,o=B.ticker.frame,a&&l&&a.time===o)return a.width*i/100;f[l?"width":"height"]=i+r}h.appendChild(J),n=parseFloat(J[l?"offsetWidth":"offsetHeight"]),h.removeChild(J),l&&"%"===r&&!1!==W.cacheWidths&&((a=h._fwdCache=h._fwdCache||{}).time=o,a.width=n/i*100),0!==n||s||(n=lt(t,e,i,r,!0))}return p&&(n/=100),u?-n:n},ht=et.calculateOffset=function(t,e,i){if("absolute"!==ot(t,"position",i))return 0;var r="left"===e?"Left":"Top",s=ot(t,"margin"+r,i);return t["offset"+r]-(lt(t,e,parseFloat(s),s.replace(I,""))||0)},ft={width:["Left","Right"],height:["Top","Bottom"]},ut=["marginLeft","marginRight","marginTop","marginBottom"],pt=function(t,e){if("contain"===t||"auto"===t||"auto auto"===t)return t+" ";null!=t&&""!==t||(t="0 0");var i,r=t.split(" "),s=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":r[0],n=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":r[1];if(3<r.length&&!e){for(r=t.split(", ").join(",").split(","),t=[],i=0;i<r.length;i++)t.push(pt(r[i]));return t.join(",")}return null==n?n="center"===s?"50%":"0":"center"===n&&(n="50%"),("center"===s||isNaN(parseFloat(s))&&-1===(s+"").indexOf("="))&&(s="50%"),t=s+" "+n+(2<r.length?" "+r[2]:""),e&&(e.oxp=-1!==s.indexOf("%"),e.oyp=-1!==n.indexOf("%"),e.oxr="="===s.charAt(1),e.oyr="="===n.charAt(1),e.ox=parseFloat(s.replace(f,"")),e.oy=parseFloat(n.replace(f,"")),e.v=t),e||t},_t={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ct=W.parseColor=function(t,e){var i,r,s,n,a,o,l,h,f,u,p;if(t)if("number"==typeof t)i=[t>>16,t>>8&255,255&t];else{if(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),_t[t])i=_t[t];else if("#"===t.charAt(0))4===t.length&&(t="#"+(r=t.charAt(1))+r+(s=t.charAt(2))+s+(n=t.charAt(3))+n),i=[(t=parseInt(t.substr(1),16))>>16,t>>8&255,255&t];else if("hsl"===t.substr(0,3))if(i=p=t.match(z),e){if(-1!==t.indexOf("="))return t.match(X)}else a=Number(i[0])%360/360,o=Number(i[1])/100,r=2*(l=Number(i[2])/100)-(s=l<=.5?l*(o+1):l+o-l*o),3<i.length&&(i[3]=Number(t[3])),i[0]=_(a+1/3,r,s),i[1]=_(a,r,s),i[2]=_(a-1/3,r,s);else i=t.match(z)||_t.transparent;i[0]=Number(i[0]),i[1]=Number(i[1]),i[2]=Number(i[2]),3<i.length&&(i[3]=Number(i[3]))}else i=_t.black;return e&&!p&&(r=i[0]/255,s=i[1]/255,n=i[2]/255,l=((h=Math.max(r,s,n))+(f=Math.min(r,s,n)))/2,h===f?a=o=0:(u=h-f,o=.5<l?u/(2-h-f):u/(h+f),a=h===r?(s-n)/u+(s<n?6:0):h===s?(n-r)/u+2:(r-s)/u+4,a*=60),i[0]=a+.5|0,i[1]=100*o+.5|0,i[2]=100*l+.5|0),i},dt="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(t in _t)dt+="|"+t+"\\b";dt=new RegExp(dt+")","gi"),W.colorStringFilter=function(t){var e,i=t[0]+t[1];dt.test(i)&&(e=-1!==i.indexOf("hsl(")||-1!==i.indexOf("hsla("),t[0]=r(t[0],e),t[1]=r(t[1],e)),dt.lastIndex=0},B.defaultStringFilter||(B.defaultStringFilter=W.colorStringFilter);function mt(t,e,n,a){if(null==t)return function(t){return t};var o,l=e?(t.match(dt)||[""])[0]:"",h=t.split(l).join("").match(b)||[],f=t.substr(0,t.indexOf(h[0])),u=")"===t.charAt(t.length-1)?")":"",p=-1!==t.indexOf(" ")?" ":",",_=h.length,c=0<_?h[0].replace(z,""):"";return _?o=e?function(t){var e,i,r,s;if("number"==typeof t)t+=c;else if(a&&U.test(t)){for(s=t.replace(U,"|").split("|"),r=0;r<s.length;r++)s[r]=o(s[r]);return s.join(",")}if(e=(t.match(dt)||[l])[0],r=(i=t.split(e).join("").match(b)||[]).length,_>r--)for(;++r<_;)i[r]=n?i[(r-1)/2|0]:h[r];return f+i.join(p)+p+e+u+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,i,r;if("number"==typeof t)t+=c;else if(a&&U.test(t)){for(i=t.replace(U,"|").split("|"),r=0;r<i.length;r++)i[r]=o(i[r]);return i.join(",")}if(r=(e=t.match(b)||[]).length,_>r--)for(;++r<_;)e[r]=n?e[(r-1)/2|0]:h[r];return f+e.join(p)+u}:function(t){return t}}function gt(h){return h=h.split(","),function(t,e,i,r,s,n,a){var o,l=(e+"").split(" ");for(a={},o=0;o<4;o++)a[h[o]]=l[o]=l[o]||l[(o-1)/2>>0];return r.parse(t,a,s,n)}}et._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,r,s,n,a=this.data,o=a.proxy,l=a.firstMPT;l;)e=o[l.v],l.r?e=Math.round(e):e<1e-6&&-1e-6<e&&(e=0),l.t[l.p]=e,l=l._next;if(a.autoRotate&&(a.autoRotate.rotation=a.mod?a.mod(o.rotation,this.t):o.rotation),1===t||0===t)for(l=a.firstMPT,n=1===t?"e":"b";l;){if((i=l.t).type){if(1===i.type){for(s=i.xs0+i.s+i.xs1,r=1;r<i.l;r++)s+=i["xn"+r]+i["xs"+(r+1)];i[n]=s}}else i[n]=i.s+i.xs0;l=l._next}};function yt(t,e,i,r,s,n){var a=new xt(t,e,i,r-i,s,-1,n);return a.b=i,a.e=a.xs0=r,a}var vt=function(t,e,i,r,s){this.t=t,this.p=e,this.v=i,this.r=s,r&&((r._prev=this)._next=r)},xt=(et._parseToProxy=function(t,e,i,r,s,n){var a,o,l,h,f,u=r,p={},_={},c=i._transform,d=H;for(i._transform=null,H=e,r=f=i.parse(t,e,r,s),H=d,n&&(i._transform=c,u&&(u._prev=null,u._prev&&(u._prev._next=null)));r&&r!==u;){if(r.type<=1&&(_[o=r.p]=r.s+r.c,p[o]=r.s,n||(h=new vt(r,"s",o,h,r.r),r.c=0),1===r.type))for(a=r.l;0<--a;)l="xn"+a,_[o=r.p+"_"+l]=r.data[l],p[o]=r[l],n||(h=new vt(r,l,o,h,r.rxp[l]));r=r._next}return{proxy:p,end:_,firstMPT:h,pt:f}},et.CSSPropTween=function(t,e,i,r,s,n,a,o,l,h,f){this.t=t,this.p=e,this.s=i,this.c=r,this.n=a||e,t instanceof xt||d.push(this.n),this.r=o,this.type=n||0,l&&(this.pr=l,c=!0),this.b=void 0===h?i:h,this.e=void 0===f?i+r:f,s&&((this._next=s)._prev=this)}),wt=W.parseComplex=function(t,e,i,r,s,n,a,o,l,h){i=i||n||"","function"==typeof r&&(r=r(D,F)),a=new xt(t,e,0,0,a,h?2:1,null,!1,o,i,r),r+="",s&&dt.test(r+i)&&(r=[i,r],W.colorStringFilter(r),i=r[0],r=r[1]);var f,u,p,_,c,d,m,g,y,v,x,w,T,b=i.split(", ").join(",").split(" "),P=r.split(", ").join(",").split(" "),O=b.length,k=!1!==M;for(-1===r.indexOf(",")&&-1===i.indexOf(",")||(b=b.join(" ").replace(U,", ").split(" "),P=P.join(" ").replace(U,", ").split(" "),O=b.length),O!==P.length&&(O=(b=(n||"").split(" ")).length),a.plugin=l,a.setRatio=h,f=dt.lastIndex=0;f<O;f++)if(_=b[f],c=P[f],(g=parseFloat(_))||0===g)a.appendXtra("",g,R(c,g),c.replace(X,""),k&&-1!==c.indexOf("px"),!0);else if(s&&dt.test(_))w=")"+((w=c.indexOf(")")+1)?c.substr(w):""),T=-1!==c.indexOf("hsl")&&rt,_=ct(_,T),c=ct(c,T),(y=6<_.length+c.length)&&!rt&&0===c[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(P[f]).join("transparent")):(rt||(y=!1),T?a.appendXtra(y?"hsla(":"hsl(",_[0],R(c[0],_[0]),",",!1,!0).appendXtra("",_[1],R(c[1],_[1]),"%,",!1).appendXtra("",_[2],R(c[2],_[2]),y?"%,":"%"+w,!1):a.appendXtra(y?"rgba(":"rgb(",_[0],c[0]-_[0],",",!0,!0).appendXtra("",_[1],c[1]-_[1],",",!0).appendXtra("",_[2],c[2]-_[2],y?",":w,!0),y&&(_=_.length<4?1:_[3],a.appendXtra("",_,(c.length<4?1:c[3])-_,w,!1))),dt.lastIndex=0;else if(d=_.match(z)){if(!(m=c.match(X))||m.length!==d.length)return a;for(u=p=0;u<d.length;u++)x=d[u],v=_.indexOf(x,p),a.appendXtra(_.substr(p,v-p),Number(x),R(m[u],x),"",k&&"px"===_.substr(v+x.length,2),0===u),p=v+x.length;a["xs"+a.l]+=_.substr(p)}else a["xs"+a.l]+=a.l||a["xs"+a.l]?" "+c:c;if(-1!==r.indexOf("=")&&a.data){for(w=a.xs0+a.data.s,f=1;f<a.l;f++)w+=a["xs"+f]+a.data["xn"+f];a.e=w+a["xs"+f]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},Tt=9;for((t=xt.prototype).l=t.pr=0;0<--Tt;)t["xn"+Tt]=0,t["xs"+Tt]="";t.xs0="",t._next=t._prev=t.xfirst=t.data=t.plugin=t.setRatio=t.rxp=null,t.appendXtra=function(t,e,i,r,s,n){var a=this,o=a.l;return a["xs"+o]+=n&&(o||a["xs"+o])?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=r||"",0<o?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=s,a["xn"+o]=e,a.plugin||(a.xfirst=new xt(a,"xn"+o,e,i,a.xfirst||a,0,a.n,s,a.pr),a.xfirst.xs0=0)):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=s),a):(a["xs"+o]+=e+(r||""),a)};function bt(t,e){e=e||{},this.p=e.prefix&&k(t)||t,(m[t]=m[this.p]=this).format=e.formatter||mt(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0}var Pt=et._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var r,s=t.split(","),n=e.defaultValue;for(i=i||[n],r=0;r<s.length;r++)e.prefix=0===r&&e.prefix,e.defaultValue=i[r]||n,new bt(s[r],e)},Ot=et._registerPluginProp=function(t){var l;m[t]||(l=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin",Pt(t,{parser:function(t,e,i,r,s,n,a){var o=h.com.fwd.plugins[l];return o?(o._cssRegister(),m[i].parse(t,e,i,r,s,n,a)):(g("Error: "+l+" js file not loaded."),s)}}))};(t=bt.prototype).parseComplex=function(t,e,i,r,s,n){var a,o,l,h,f,u,p=this.keyword;if(this.multi&&(U.test(i)||U.test(e)?(o=e.replace(U,"|").split("|"),l=i.replace(U,"|").split("|")):p&&(o=[e],l=[i])),l){for(h=l.length>o.length?l.length:o.length,a=0;a<h;a++)e=o[a]=o[a]||this.dflt,i=l[a]=l[a]||this.dflt,p&&(f=e.indexOf(p))!==(u=i.indexOf(p))&&(-1===u?o[a]=o[a].split(p).join(""):-1===f&&(o[a]+=" "+p));e=o.join(", "),i=l.join(", ")}return wt(t,this.p,e,i,this.clrs,this.dflt,r,this.pr,s,n)},t.parse=function(t,e,i,r,s,n,a){return this.parseComplex(t.style,this.format(ot(t,this.p,O,!1,this.dflt)),this.format(e),s,n)},W.registerSpecialProp=function(t,l,h){Pt(t,{parser:function(t,e,i,r,s,n,a){var o=new xt(t,i,0,0,s,2,i,!1,h);return o.plugin=n,o.setRatio=l(t,e,r._tween,i),o},priority:h})},W.useSVGTransformAttr=w||Y;function kt(t,e,i){var r,s=K.createElementNS("http://www.w3.org/2000/svg",t),n=/([a-z])([A-Z])/g;for(r in i)s.setAttributeNS(null,r.replace(n,"$1-$2").toLowerCase(),i[r]);return e.appendChild(s),s}function Rt(t,e,i,r,s,n){var a,o,l,h,f,u,p,_,c,d,m,g,y,v,x=t._fwdTransform,w=qt(t,!0);x&&(y=x.xOrigin,v=x.yOrigin),(!r||(a=r.split(" ")).length<2)&&(p=t.getBBox(),a=[(-1!==(e=pt(e).split(" "))[0].indexOf("%")?parseFloat(e[0])/100*p.width:parseFloat(e[0]))+p.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*p.height:parseFloat(e[1]))+p.y]),i.xOrigin=h=parseFloat(a[0]),i.yOrigin=f=parseFloat(a[1]),r&&w!==Vt&&(u=w[0],p=w[1],_=w[2],c=w[3],d=w[4],o=h*(c/(g=u*c-p*_))+f*(-_/g)+(_*(m=w[5])-c*d)/g,l=h*(-p/g)+f*(u/g)-(u*m-p*d)/g,h=i.xOrigin=a[0]=o,f=i.yOrigin=a[1]=l),x&&(n&&(i.xOffset=x.xOffset,i.yOffset=x.yOffset,x=i),s||!1!==s&&!1!==W.defaultSmoothOrigin?(o=h-y,l=f-v,x.xOffset+=o*w[0]+l*w[2]-o,x.yOffset+=o*w[1]+l*w[3]-l):x.xOffset=x.yOffset=0),n||t.setAttribute("data-svg-origin",a.join(" "))}function St(t){var e,i,r=this.data,s=-r.rotation*Q,n=s+r.skewX*Q,a=1e5,o=(Math.cos(s)*r.scaleX*a|0)/a,l=(Math.sin(s)*r.scaleX*a|0)/a,h=(Math.sin(n)*-r.scaleY*a|0)/a,f=(Math.cos(n)*r.scaleY*a|0)/a,u=this.t.style,p=this.t.currentStyle;if(p){i=l,l=-h,h=-i,e=p.filter,u.filter="";var _=this.t.offsetWidth,c=this.t.offsetHeight,d="absolute"!==p.position,m="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+l+", M21="+h+", M22="+f,g=r.x+_*r.xPercent/100,y=r.y+c*r.yPercent/100;if(null!=r.ox&&(g+=(b=(r.oxp?_*r.ox*.01:r.ox)-_/2)-(b*o+(P=(r.oyp?c*r.oy*.01:r.oy)-c/2)*l),y+=P-(b*h+P*f)),m+=d?", Dx="+((b=_/2)-(b*o+(P=c/2)*l)+g)+", Dy="+(P-(b*h+P*f)+y)+")":", sizingMethod='auto expand')",-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?u.filter=e.replace(Z,m):u.filter=m+" "+e,0!==t&&1!==t||1==o&&0===l&&0===h&&1==f&&(d&&-1===m.indexOf("Dx=0, Dy=0")||N.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf(e.indexOf("Alpha"))&&u.removeAttribute("filter")),!d){var v,x,w,T=C<8?1:-1,b=r.ieOffsetX||0,P=r.ieOffsetY||0;for(r.ieOffsetX=Math.round((_-((o<0?-o:o)*_+(l<0?-l:l)*c))/2+g),r.ieOffsetY=Math.round((c-((f<0?-f:f)*c+(h<0?-h:h)*_))/2+y),Tt=0;Tt<4;Tt++)w=(i=-1!==(v=p[x=ut[Tt]]).indexOf("px")?parseFloat(v):lt(this.t,x,parseFloat(v),v.replace(I,""))||0)!==r[x]?Tt<2?-r.ieOffsetX:-r.ieOffsetY:Tt<2?b-r.ieOffsetX:P-r.ieOffsetY,u[x]=(r[x]=Math.round(i-w*(0===Tt||2===Tt?1:T)))+"px"}}}var At,Mt,Ct,Ft,Dt,zt="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Xt=k("transform"),It=st+"transform",Nt=k("transformOrigin"),Yt=null!==k("perspective"),Et=et.Transform=function(){this.perspective=parseFloat(W.defaultTransformPerspective)||0,this.force3D=!(!1===W.defaultForce3D||!Yt)&&(W.defaultForce3D||"auto")},Bt=window.SVGElement,Wt=K.documentElement,Lt=(Dt=C||/Android/i.test(it)&&!window.chrome,K.createElementNS&&!Dt&&(Mt=kt("svg",Wt),Ft=(Ct=kt("rect",Mt,{width:100,height:50,x:100})).getBoundingClientRect().width,Ct.style[Nt]="50% 50%",Ct.style[Xt]="scaleX(0.5)",Dt=Ft===Ct.getBoundingClientRect().width&&!(Y&&Yt),Wt.removeChild(Mt)),Dt),jt=function(t){return!!(Bt&&t.getBBox&&t.getCTM&&function(t){try{return t.getBBox()}catch(t){}}(t)&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM))},Vt=[1,0,0,1,0,0],qt=function(t,e){var i,r,s,n,a,o,l=t._fwdTransform||new Et,h=t.style;if(Xt?r=ot(t,It,null,!0):t.currentStyle&&(r=(r=t.currentStyle.filter.match(q))&&4===r.length?[r[0].substr(4),Number(r[2].substr(4)),Number(r[1].substr(4)),r[3].substr(4),l.x||0,l.y||0].join(","):""),(i=!r||"none"===r||"matrix(1, 0, 0, 1, 0, 0)"===r)&&Xt&&((o="none"===at(t).display)||!t.parentNode)&&(o&&(n=h.display,h.display="block"),t.parentNode||(a=1,Wt.appendChild(t)),i=!(r=ot(t,It,null,!0))||"none"===r||"matrix(1, 0, 0, 1, 0, 0)"===r,n?h.display=n:o&&Gt(h,"display"),a&&Wt.removeChild(t)),(l.svg||t.getBBox&&jt(t))&&(i&&-1!==(h[Xt]+"").indexOf("matrix")&&(r=h[Xt],i=0),s=t.getAttribute("transform"),i&&s&&(-1!==s.indexOf("matrix")?(r=s,i=0):-1!==s.indexOf("translate")&&(r="matrix(1,0,0,1,"+s.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")",i=0))),i)return Vt;for(s=(r||"").match(z)||[],Tt=s.length;-1<--Tt;)n=Number(s[Tt]),s[Tt]=(a=n-(n|=0))?(1e5*a+(a<0?-.5:.5)|0)/1e5+n:n;return e&&6<s.length?[s[0],s[1],s[4],s[5],s[12],s[13]]:s},Zt=et.getTransform=function(t,e,i,r){if(t._fwdTransform&&i&&!r)return t._fwdTransform;var s,n,a,o,l,h,f,u,p,_,c,d,m,g,y,v,x,w,T,b,P,O,k,R,S,A,M,C,F,D,z,X,I=i&&t._fwdTransform||new Et,N=I.scaleX<0,Y=Yt&&(parseFloat(ot(t,Nt,e,!1,"0 0 0").split(" ")[2])||I.zOrigin)||0,E=parseFloat(W.defaultTransformPerspective)||0;if(I.svg=!(!t.getBBox||!jt(t)),I.svg&&(Rt(t,ot(t,Nt,e,!1,"50% 50%")+"",I,t.getAttribute("data-svg-origin")),At=W.useSVGTransformAttr||Lt),(s=qt(t))!==Vt)for(n in 16===s.length?(f=s[0],u=s[1],p=s[2],_=s[3],c=s[4],d=s[5],m=s[6],g=s[7],y=s[8],v=s[9],x=s[10],w=s[12],T=s[13],b=s[14],P=s[11],O=Math.atan2(m,x),I.zOrigin&&(w=y*(b=-I.zOrigin)-s[12],T=v*b-s[13],b=x*b+I.zOrigin-s[14]),I.rotationX=O*G,O&&(k=c*(A=Math.cos(-O))+y*(M=Math.sin(-O)),R=d*A+v*M,S=m*A+x*M,y=c*-M+y*A,v=d*-M+v*A,x=m*-M+x*A,P=g*-M+P*A,c=k,d=R,m=S),O=Math.atan2(-p,x),I.rotationY=O*G,O&&(R=u*(A=Math.cos(-O))-v*(M=Math.sin(-O)),S=p*A-x*M,v=u*M+v*A,x=p*M+x*A,P=_*M+P*A,f=k=f*A-y*M,u=R,p=S),O=Math.atan2(u,f),I.rotation=O*G,O&&(f=f*(A=Math.cos(-O))+c*(M=Math.sin(-O)),R=u*A+d*M,d=u*-M+d*A,m=p*-M+m*A,u=R),I.rotationX&&359.9<Math.abs(I.rotationX)+Math.abs(I.rotation)&&(I.rotationX=I.rotation=0,I.rotationY=180-I.rotationY),I.scaleX=(1e5*Math.sqrt(f*f+u*u)+.5|0)/1e5,I.scaleY=(1e5*Math.sqrt(d*d+v*v)+.5|0)/1e5,I.scaleZ=(1e5*Math.sqrt(m*m+x*x)+.5|0)/1e5,I.rotationX||I.rotationY?I.skewX=0:(I.skewX=c||d?Math.atan2(c,d)*G+I.rotation:I.skewX||0,90<Math.abs(I.skewX)&&Math.abs(I.skewX)<270&&(N?(I.scaleX*=-1,I.skewX+=I.rotation<=0?180:-180,I.rotation+=I.rotation<=0?180:-180):(I.scaleY*=-1,I.skewX+=I.skewX<=0?180:-180))),I.perspective=P?1/(P<0?-P:P):0,I.x=w,I.y=T,I.z=b,I.svg&&(I.x-=I.xOrigin-(I.xOrigin*f-I.yOrigin*c),I.y-=I.yOrigin-(I.yOrigin*u-I.xOrigin*d))):Yt&&!r&&s.length&&I.x===s[4]&&I.y===s[5]&&(I.rotationX||I.rotationY)||(F=(C=6<=s.length)?s[0]:1,D=s[1]||0,z=s[2]||0,X=C?s[3]:1,I.x=s[4]||0,I.y=s[5]||0,a=Math.sqrt(F*F+D*D),o=Math.sqrt(X*X+z*z),l=F||D?Math.atan2(D,F)*G:I.rotation||0,h=z||X?Math.atan2(z,X)*G+l:I.skewX||0,90<Math.abs(h)&&Math.abs(h)<270&&(N?(a*=-1,h+=l<=0?180:-180,l+=l<=0?180:-180):(o*=-1,h+=h<=0?180:-180)),I.scaleX=a,I.scaleY=o,I.rotation=l,I.skewX=h,Yt&&(I.rotationX=I.rotationY=I.z=0,I.perspective=E,I.scaleZ=1),I.svg&&(I.x-=I.xOrigin-(I.xOrigin*F+I.yOrigin*z),I.y-=I.yOrigin-(I.xOrigin*D+I.yOrigin*X))),I.zOrigin=Y,I)I[n]<2e-5&&-2e-5<I[n]&&(I[n]=0);return i&&(t._fwdTransform=I).svg&&(At&&t.style[Xt]?B.delayedCall(.001,function(){Gt(t.style,Xt)}):!At&&t.getAttribute("transform")&&B.delayedCall(.001,function(){t.removeAttribute("transform")})),I},Ut=et.set3DTransformRatio=et.setTransformRatio=function(t){var e,i,r,s,n,a,o,l,h,f,u,p,_,c,d,m,g,y,v,x,w,T,b,P=this.data,O=this.t.style,k=P.rotation,R=P.rotationX,S=P.rotationY,A=P.scaleX,M=P.scaleY,C=P.scaleZ,F=P.x,D=P.y,z=P.z,X=P.svg,I=P.perspective,N=P.force3D;if(!((1!==t&&0!==t||"auto"!==N||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&N||z||I||S||R||1!==C)||At&&X||!Yt)k||P.skewX||X?(k*=Q,T=P.skewX*Q,b=1e5,e=Math.cos(k)*A,s=Math.sin(k)*A,i=Math.sin(k-T)*-M,n=Math.cos(k-T)*M,T&&"simple"===P.skewType&&(g=Math.tan(T-P.skewY*Q),i*=g=Math.sqrt(1+g*g),n*=g,P.skewY&&(g=Math.tan(P.skewY*Q),e*=g=Math.sqrt(1+g*g),s*=g)),X&&(F+=P.xOrigin-(P.xOrigin*e+P.yOrigin*i)+P.xOffset,D+=P.yOrigin-(P.xOrigin*s+P.yOrigin*n)+P.yOffset,At&&(P.xPercent||P.yPercent)&&(c=this.t.getBBox(),F+=.01*P.xPercent*c.width,D+=.01*P.yPercent*c.height),F<(c=1e-6)&&-c<F&&(F=0),D<c&&-c<D&&(D=0)),v=(e*b|0)/b+","+(s*b|0)/b+","+(i*b|0)/b+","+(n*b|0)/b+","+F+","+D+")",X&&At?this.t.setAttribute("transform","matrix("+v):O[Xt]=(P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) matrix(":"matrix(")+v):O[Xt]=(P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) matrix(":"matrix(")+A+",0,0,"+M+","+F+","+D+")";else{if(Y&&(A<(c=1e-4)&&-c<A&&(A=C=2e-5),M<c&&-c<M&&(M=C=2e-5),!I||P.z||P.rotationX||P.rotationY||(I=0)),k||P.skewX)k*=Q,d=e=Math.cos(k),m=s=Math.sin(k),P.skewX&&(k-=P.skewX*Q,d=Math.cos(k),m=Math.sin(k),"simple"===P.skewType&&(g=Math.tan((P.skewX-P.skewY)*Q),d*=g=Math.sqrt(1+g*g),m*=g,P.skewY&&(g=Math.tan(P.skewY*Q),e*=g=Math.sqrt(1+g*g),s*=g))),i=-m,n=d;else{if(!(S||R||1!==C||I||X))return void(O[Xt]=(P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) translate3d(":"translate3d(")+F+"px,"+D+"px,"+z+"px)"+(1!==A||1!==M?" scale("+A+","+M+")":""));e=n=1,i=s=0}h=1,r=a=o=l=f=u=0,p=I?-1/I:0,_=P.zOrigin,c=1e-6,x=",",w="0",(k=S*Q)&&(d=Math.cos(k),f=p*(o=-(m=Math.sin(k))),r=e*m,a=s*m,p*=h=d,e*=d,s*=d),(k=R*Q)&&(g=i*(d=Math.cos(k))+r*(m=Math.sin(k)),y=n*d+a*m,l=h*m,u=p*m,r=i*-m+r*d,a=n*-m+a*d,h*=d,p*=d,i=g,n=y),1!==C&&(r*=C,a*=C,h*=C,p*=C),1!==M&&(i*=M,n*=M,l*=M,u*=M),1!==A&&(e*=A,s*=A,o*=A,f*=A),(_||X)&&(_&&(F+=r*-_,D+=a*-_,z+=h*-_+_),X&&(F+=P.xOrigin-(P.xOrigin*e+P.yOrigin*i)+P.xOffset,D+=P.yOrigin-(P.xOrigin*s+P.yOrigin*n)+P.yOffset),F<c&&-c<F&&(F=w),D<c&&-c<D&&(D=w),z<c&&-c<z&&(z=0)),v=P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) matrix3d(":"matrix3d(",v+=(e<c&&-c<e?w:e)+x+(s<c&&-c<s?w:s)+x+(o<c&&-c<o?w:o),v+=x+(f<c&&-c<f?w:f)+x+(i<c&&-c<i?w:i)+x+(n<c&&-c<n?w:n),R||S||1!==C?(v+=x+(l<c&&-c<l?w:l)+x+(u<c&&-c<u?w:u)+x+(r<c&&-c<r?w:r),v+=x+(a<c&&-c<a?w:a)+x+(h<c&&-c<h?w:h)+x+(p<c&&-c<p?w:p)+x):v+=",0,0,0,0,1,0,",v+=F+x+D+x+z+x+(I?1+-z/I:1)+")",O[Xt]=v}};(t=Et.prototype).x=t.y=t.z=t.skewX=t.skewY=t.rotation=t.rotationX=t.rotationY=t.zOrigin=t.xPercent=t.yPercent=t.xOffset=t.yOffset=0,t.scaleX=t.scaleY=t.scaleZ=1,Pt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(t,e,i,r,s,n,a){if(r._lastParsedTransform===a)return s;var o;"function"==typeof(r._lastParsedTransform=a)[i]&&(o=a[i],a[i]=e);var l,h,f,u,p,_,c,d,m,g=t._fwdTransform,y=t.style,v=zt.length,x=a,w={},T="transformOrigin",b=Zt(t,O,!0,x.parseTransform),P=x.transform&&("function"==typeof x.transform?x.transform(D,F):x.transform);if(r._transform=b,P&&"string"==typeof P&&Xt)(h=J.style)[Xt]=P,h.display="block",h.position="absolute",K.body.appendChild(J),l=Zt(J,null,!1),b.svg&&(_=b.xOrigin,c=b.yOrigin,l.x-=b.xOffset,l.y-=b.yOffset,(x.transformOrigin||x.svgOrigin)&&(P={},Rt(t,pt(x.transformOrigin),P,x.svgOrigin,x.smoothOrigin,!0),_=P.xOrigin,c=P.yOrigin,l.x-=P.xOffset-b.xOffset,l.y-=P.yOffset-b.yOffset),(_||c)&&(d=qt(J,!0),l.x-=_-(_*d[0]+c*d[2]),l.y-=c-(_*d[1]+c*d[3]))),K.body.removeChild(J),l.perspective||(l.perspective=b.perspective),null!=x.xPercent&&(l.xPercent=S(x.xPercent,b.xPercent)),null!=x.yPercent&&(l.yPercent=S(x.yPercent,b.yPercent));else if("object"==typeof x){if(l={scaleX:S(null!=x.scaleX?x.scaleX:x.scale,b.scaleX),scaleY:S(null!=x.scaleY?x.scaleY:x.scale,b.scaleY),scaleZ:S(x.scaleZ,b.scaleZ),x:S(x.x,b.x),y:S(x.y,b.y),z:S(x.z,b.z),xPercent:S(x.xPercent,b.xPercent),yPercent:S(x.yPercent,b.yPercent),perspective:S(x.transformPerspective,b.perspective)},null!=(p=x.directionalRotation))if("object"==typeof p)for(h in p)x[h]=p[h];else x.rotation=p;"string"==typeof x.x&&-1!==x.x.indexOf("%")&&(l.x=0,l.xPercent=S(x.x,b.xPercent)),"string"==typeof x.y&&-1!==x.y.indexOf("%")&&(l.y=0,l.yPercent=S(x.y,b.yPercent)),l.rotation=A("rotation"in x?x.rotation:"shortRotation"in x?x.shortRotation+"_short":"rotationZ"in x?x.rotationZ:b.rotation-b.skewY,b.rotation-b.skewY,"rotation",w),Yt&&(l.rotationX=A("rotationX"in x?x.rotationX:"shortRotationX"in x?x.shortRotationX+"_short":b.rotationX||0,b.rotationX,"rotationX",w),l.rotationY=A("rotationY"in x?x.rotationY:"shortRotationY"in x?x.shortRotationY+"_short":b.rotationY||0,b.rotationY,"rotationY",w)),l.skewX=A(x.skewX,b.skewX-b.skewY),(l.skewY=A(x.skewY,b.skewY))&&(l.skewX+=l.skewY,l.rotation+=l.skewY)}for(Yt&&null!=x.force3D&&(b.force3D=x.force3D,u=!0),b.skewType=x.skewType||b.skewType||W.defaultSkewType,(f=b.force3D||b.z||b.rotationX||b.rotationY||l.z||l.rotationX||l.rotationY||l.perspective)||null==x.scale||(l.scaleZ=1);-1<--v;)(1e-6<(P=l[m=zt[v]]-b[m])||P<-1e-6||null!=x[m]||null!=H[m])&&(u=!0,s=new xt(b,m,b[m],P,s),m in w&&(s.e=w[m]),s.xs0=0,s.plugin=n,r._overwriteProps.push(s.n));return P=x.transformOrigin,b.svg&&(P||x.svgOrigin)&&(_=b.xOffset,c=b.yOffset,Rt(t,pt(P),l,x.svgOrigin,x.smoothOrigin),s=yt(b,"xOrigin",(g?b:l).xOrigin,l.xOrigin,s,T),s=yt(b,"yOrigin",(g?b:l).yOrigin,l.yOrigin,s,T),_===b.xOffset&&c===b.yOffset||(s=yt(b,"xOffset",g?_:b.xOffset,b.xOffset,s,T),s=yt(b,"yOffset",g?c:b.yOffset,b.yOffset,s,T)),P=At?null:"0px 0px"),(P||Yt&&f&&b.zOrigin)&&(Xt?(u=!0,m=Nt,P=(P||ot(t,m,O,!1,"50% 50%"))+"",(s=new xt(y,m,0,0,s,-1,T)).b=y[m],s.plugin=n,Yt?(h=b.zOrigin,P=P.split(" "),b.zOrigin=(2<P.length&&(0===h||"0px"!==P[2])?parseFloat(P[2]):h)||0,s.xs0=s.e=P[0]+" "+(P[1]||"50%")+" 0px",(s=new xt(b,"zOrigin",0,0,s,-1,s.n)).b=h,s.xs0=s.e=b.zOrigin):s.xs0=s.e=P):pt(P+"",b)),u&&(r._transformType=b.svg&&At||!f&&3!==this._transformType?2:3),o&&(a[i]=o),s},prefix:!0}),Pt("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),Pt("borderRadius",{defaultValue:"0px",parser:function(t,e,i,r,s,n){e=this.format(e);for(var a,o,l,h,f,u,p,_,c,d,m,g,y=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],v=t.style,x=parseFloat(t.offsetWidth),w=parseFloat(t.offsetHeight),T=e.split(" "),b=0;b<y.length;b++)this.p.indexOf("border")&&(y[b]=k(y[b])),-1!==(l=o=ot(t,y[b],O,!1,"0px")).indexOf(" ")&&(l=(o=l.split(" "))[0],o=o[1]),h=a=T[b],f=parseFloat(l),_=l.substr((f+"").length),""===(p=(c="="===h.charAt(1))?(u=parseInt(h.charAt(0)+"1",10),h=h.substr(2),u*=parseFloat(h),h.substr((u+"").length-(u<0?1:0))||""):(u=parseFloat(h),h.substr((u+"").length)))&&(p=P[i]||_),p!==_&&(d=lt(t,"borderLeft",f,_),m=lt(t,"borderTop",f,_),o="%"===p?(l=d/x*100+"%",m/w*100+"%"):"em"===p?(l=d/(g=lt(t,"borderLeft",1,"em"))+"em",m/g+"em"):(l=d+"px",m+"px"),c&&(h=parseFloat(l)+u+p,a=parseFloat(o)+u+p)),s=wt(v,y[b],l+" "+o,h+" "+a,!1,"0px",s);return s},prefix:!0,formatter:mt("0px 0px 0px 0px",!1,!0)}),Pt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",{defaultValue:"0px",parser:function(t,e,i,r,s,n){return wt(t.style,i,this.format(ot(t,i,O,!1,"0px 0px")),this.format(e),!1,"0px",s)},prefix:!0,formatter:mt("0px 0px",!1,!0)}),Pt("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,r,s,n){var a,o,l,h,f,u,p="background-position",_=O||at(t,null),c=this.format((_?C?_.getPropertyValue(p+"-x")+" "+_.getPropertyValue(p+"-y"):_.getPropertyValue(p):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),d=this.format(e);if(-1!==c.indexOf("%")!=(-1!==d.indexOf("%"))&&d.split(",").length<2&&(u=ot(t,"backgroundImage").replace(j,""))&&"none"!==u){for(a=c.split(" "),o=d.split(" "),tt.setAttribute("src",u),l=2;-1<--l;)(h=-1!==(c=a[l]).indexOf("%"))!=(-1!==o[l].indexOf("%"))&&(f=0===l?t.offsetWidth-tt.width:t.offsetHeight-tt.height,a[l]=h?parseFloat(c)/100*f+"px":parseFloat(c)/f*100+"%");c=a.join(" ")}return this.parseComplex(t.style,c,d,s,n)},formatter:pt}),Pt("backgroundSize",{defaultValue:"0 0",formatter:function(t){return pt(-1===(t+="").indexOf(" ")?t+" "+t:t)}}),Pt("perspective",{defaultValue:"0px",prefix:!0}),Pt("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),Pt("transformStyle",{prefix:!0}),Pt("backfaceVisibility",{prefix:!0}),Pt("userSelect",{prefix:!0}),Pt("margin",{parser:gt("marginTop,marginRight,marginBottom,marginLeft")}),Pt("padding",{parser:gt("paddingTop,paddingRight,paddingBottom,paddingLeft")}),Pt("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,r,s,n){var a,o,l;return e=C<9?(o=t.currentStyle,l=C<8?" ":",",a="rect("+o.clipTop+l+o.clipRight+l+o.clipBottom+l+o.clipLeft+")",this.format(e).split(",").join(l)):(a=this.format(ot(t,this.p,O,!1,this.dflt)),this.format(e)),this.parseComplex(t.style,a,e,s,n)}}),Pt("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),Pt("autoRound,strictUnits",{parser:function(t,e,i,r,s){return s}}),Pt("border",{defaultValue:"0px solid #000",parser:function(t,e,i,r,s,n){var a=ot(t,"borderTopWidth",O,!1,"0px"),o=this.format(e).split(" "),l=o[0].replace(I,"");return"px"!==l&&(a=parseFloat(a)/lt(t,"borderTopWidth",1,l)+l),this.parseComplex(t.style,this.format(a+" "+ot(t,"borderTopStyle",O,!1,"solid")+" "+ot(t,"borderTopColor",O,!1,"#000")),o.join(" "),s,n)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(dt)||["#000"])[0]}}),Pt("borderWidth",{parser:gt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),Pt("float,cssFloat,styleFloat",{parser:function(t,e,i,r,s,n){var a=t.style,o="cssFloat"in a?"cssFloat":"styleFloat";return new xt(a,o,0,0,s,-1,i,!1,0,a[o],e)}});function $t(t){var e,i=this.t,r=i.filter||ot(this.data,"filter")||"",s=this.s+this.c*t|0;100==s&&(e=-1===r.indexOf("atrix(")&&-1===r.indexOf("radient(")&&-1===r.indexOf("oader(")?(i.removeAttribute("filter"),!ot(this.data,"filter")):(i.filter=r.replace(l,""),!0)),e||(this.xn1&&(i.filter=r=r||"alpha(opacity="+s+")"),-1===r.indexOf("pacity")?0==s&&this.xn1||(i.filter=r+" alpha(opacity="+s+")"):i.filter=r.replace(N,"opacity="+s))}Pt("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,r,s,n){var a=parseFloat(ot(t,"opacity",O,!1,"1")),o=t.style,l="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+a),l&&1===a&&"hidden"===ot(t,"visibility",O)&&0!==e&&(a=0),rt?s=new xt(o,"opacity",a,e-a,s):((s=new xt(o,"opacity",100*a,100*(e-a),s)).xn1=l?1:0,o.zoom=1,s.type=2,s.b="alpha(opacity="+s.s+")",s.e="alpha(opacity="+(s.s+s.c)+")",s.data=t,s.plugin=n,s.setRatio=$t),l&&((s=new xt(o,"visibility",0,0,s,-1,null,!1,0,0!==a?"inherit":"hidden",0===e?"hidden":"inherit")).xs0="inherit",r._overwriteProps.push(s.n),r._overwriteProps.push(i)),s}});function Qt(t){if(this.t._fwdClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Gt(i,e.p),e=e._next;1===t&&this.t._fwdClassPT===this&&(this.t._fwdClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)}var Gt=function(t,e){e&&(t.removeProperty?("ms"!==e.substr(0,2)&&"webkit"!==e.substr(0,6)||(e="-"+e),t.removeProperty(e.replace(u,"-$1").toLowerCase())):t.removeAttribute(e))};Pt("className",{parser:function(t,e,i,r,s,n,a){var o,l,h,f,u,p=t.getAttribute("class")||"",_=t.style.cssText;if((s=r._classNamePT=new xt(t,i,0,0,s,2)).setRatio=Qt,s.pr=-11,c=!0,s.b=p,l=y(t,O),h=t._fwdClassPT){for(f={},u=h.data;u;)f[u.p]=1,u=u._next;h.setRatio(1)}return(t._fwdClassPT=s).e="="!==e.charAt(1)?e:p.replace(new RegExp("(?:\\s|^)"+e.substr(2)+"(?![\\w-])"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),t.setAttribute("class",s.e),o=v(t,l,y(t),a,f),t.setAttribute("class",p),s.data=o.firstMPT,t.style.cssText=_,s=s.xfirst=r.parse(t,o.difs,s,n)}});function Ht(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,r,s,n,a=this.t.style,o=m.transform.parse;if("all"===this.e)s=!(a.cssText="");else for(r=(e=this.e.split(" ").join("").split(",")).length;-1<--r;)i=e[r],m[i]&&(m[i].parse===o?s=!0:i="transformOrigin"===i?Nt:m[i].p),Gt(a,i);s&&(Gt(a,Xt),(n=this.t._fwdTransform)&&(n.svg&&(this.t.removeAttribute("data-svg-origin"),this.t.removeAttribute("transform")),delete this.t._fwdTransform))}}for(Pt("clearProps",{parser:function(t,e,i,r,s){return(s=new xt(t,i,0,0,s,2)).setRatio=Ht,s.e=e,s.pr=-10,s.data=r._tween,c=!0,s}}),t="bezier,throwProps,physicsProps,physics2D".split(","),Tt=t.length;Tt--;)Ot(t[Tt]);(t=W.prototype)._firstPT=t._lastParsedTransform=t._transform=null,t._onInitTween=function(t,e,i,r){if(!t.nodeType)return!1;this._target=F=t,this._tween=i,this._vars=e,D=r,M=e.autoRound,c=!1,P=e.suffixMap||W.suffixMap,O=at(t,""),d=this._overwriteProps;var s,n,a,o,l,h,f,u,p,_=t.style;if(x&&""===_.zIndex&&("auto"!==(s=ot(t,"zIndex",O))&&""!==s||this._addLazySet(_,"zIndex",0)),"string"==typeof e&&(o=_.cssText,s=y(t,O),_.cssText=o+";"+e,s=v(t,s,y(t)).difs,!rt&&E.test(e)&&(s.opacity=parseFloat(RegExp.$1)),e=s,_.cssText=o),e.className?this._firstPT=n=m.className.parse(t,e.className,"className",this,null,null,e):this._firstPT=n=this.parse(t,e,null),this._transformType){for(p=3===this._transformType,Xt?w&&(x=!0,""===_.zIndex&&("auto"!==(f=ot(t,"zIndex",O))&&""!==f||this._addLazySet(_,"zIndex",0)),T&&this._addLazySet(_,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(p?"visible":"hidden"))):_.zoom=1,a=n;a&&a._next;)a=a._next;u=new xt(t,"transform",0,0,null,2),this._linkCSSP(u,null,a),u.setRatio=Xt?Ut:St,u.data=this._transform||Zt(t,O,!0),u.tween=i,u.pr=-1,d.pop()}if(c){for(;n;){for(h=n._next,a=o;a&&a.pr>n.pr;)a=a._next;(n._prev=a?a._prev:l)?n._prev._next=n:o=n,(n._next=a)?a._prev=n:l=n,n=h}this._firstPT=o}return!0},t.parse=function(t,e,i,r){var s,n,a,o,l,h,f,u,p,_,c=t.style;for(s in e)"function"==typeof(h=e[s])&&(h=h(D,F)),(n=m[s])?i=n.parse(t,h,s,this,i,r,e):(l=ot(t,s,O)+"",p="string"==typeof h,"color"===s||"fill"===s||"stroke"===s||-1!==s.indexOf("Color")||p&&L.test(h)?(p||(h=(3<(h=ct(h)).length?"rgba(":"rgb(")+h.join(",")+")"),i=wt(c,s,l,h,!0,"transparent",i,0,r)):p&&$.test(h)?i=wt(c,s,l,h,!0,null,i,0,r):(f=(a=parseFloat(l))||0===a?l.substr((a+"").length):"",""!==l&&"auto"!==l||(f="width"===s||"height"===s?(a=function(t,e,i){if("svg"===(t.nodeName+"").toLowerCase())return(i||at(t))[e]||0;if(t.getBBox&&jt(t))return t.getBBox()[e]||0;var r=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),s=ft[e],n=s.length;for(i=i||at(t,null);-1<--n;)r-=parseFloat(ot(t,"padding"+s[n],i,!0))||0,r-=parseFloat(ot(t,"border"+s[n]+"Width",i,!0))||0;return r}(t,s,O),"px"):"left"===s||"top"===s?(a=ht(t,s,O),"px"):(a="opacity"!==s?0:1,"")),""===(u=(_=p&&"="===h.charAt(1))?(o=parseInt(h.charAt(0)+"1",10),h=h.substr(2),o*=parseFloat(h),h.replace(I,"")):(o=parseFloat(h),p?h.replace(I,""):""))&&(u=s in P?P[s]:f),h=o||0===o?(_?o+a:o)+u:e[s],f!==u&&""!==u&&(o||0===o)&&a&&(a=lt(t,s,a,f),"%"===u?(a/=lt(t,s,100,"%")/100,!0!==e.strictUnits&&(l=a+"%")):"em"===u||"rem"===u||"vw"===u||"vh"===u?a/=lt(t,s,1,u):"px"!==u&&(o=lt(t,s,o,u),u="px"),_&&(!o&&0!==o||(h=o+a+u))),_&&(o+=a),!a&&0!==a||!o&&0!==o?void 0!==c[s]&&(h||h+""!="NaN"&&null!=h)?(i=new xt(c,s,o||a||0,0,i,-1,s,!1,0,l,h)).xs0="none"!==h||"display"!==s&&-1===s.indexOf("Style")?h:l:g("invalid "+s+" tween value: "+e[s]):(i=new xt(c,s,a,o-a,i,0,s,!1!==M&&("px"===u||"zIndex"===s),0,l,h)).xs0=u)),r&&i&&!i.plugin&&(i.plugin=r);return i},t.setRatio=function(t){var e,i,r,s=this._firstPT;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||-1e-6===this._tween._rawPrevTime)for(;s;){if(e=s.c*t+s.s,s.r?e=Math.round(e):e<1e-6&&-1e-6<e&&(e=0),s.type)if(1===s.type)if(2===(r=s.l))s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2;else if(3===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3;else if(4===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4;else if(5===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4+s.xn4+s.xs5;else{for(i=s.xs0+e+s.xs1,r=1;r<s.l;r++)i+=s["xn"+r]+s["xs"+(r+1)];s.t[s.p]=i}else-1===s.type?s.t[s.p]=s.xs0:s.setRatio&&s.setRatio(t);else s.t[s.p]=e+s.xs0;s=s._next}else for(;s;)2!==s.type?s.t[s.p]=s.b:s.setRatio(t),s=s._next;else for(;s;){if(2!==s.type)if(s.r&&-1!==s.type)if(e=Math.round(s.s+s.c),s.type){if(1===s.type){for(r=s.l,i=s.xs0+e+s.xs1,r=1;r<s.l;r++)i+=s["xn"+r]+s["xs"+(r+1)];s.t[s.p]=i}}else s.t[s.p]=e+s.xs0;else s.t[s.p]=s.e;else s.setRatio(t);s=s._next}},t._enableTransforms=function(t){this._transform=this._transform||Zt(this._target,O,!0),this._transformType=this._transform.svg&&At||!t&&3!==this._transformType?2:3};function Kt(t){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)}t._addLazySet=function(t,e,i){var r=this._firstPT=new xt(t,e,0,0,this._firstPT,2);r.e=i,r.setRatio=Kt,r.data=this},t._linkCSSP=function(t,e,i,r){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,r=!0),i?i._next=t:r||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},t._mod=function(t){for(var e=this._firstPT;e;)"function"==typeof t[e.p]&&t[e.p]===Math.round&&(e.r=1),e=e._next},t._kill=function(t){var e,i,r,s=t;if(t.autoAlpha||t.alpha){for(i in s={},t)s[i]=t[i];s.opacity=1,s.autoAlpha&&(s.visibility=1)}for(t.className&&(e=this._classNamePT)&&((r=e.xfirst)&&r._prev?this._linkCSSP(r._prev,e._next,r._prev._prev):r===this._firstPT&&(this._firstPT=e._next),e._next&&this._linkCSSP(e._next,e._next._next,r._prev),this._classNamePT=null),e=this._firstPT;e;)e.plugin&&e.plugin!==i&&e.plugin._kill&&(e.plugin._kill(t),i=e.plugin),e=e._next;return n.prototype._kill.call(this,s)};var Jt=function(t,e,i){var r,s,n,a;if(t.slice)for(s=t.length;-1<--s;)Jt(t[s],e,i);else for(s=(r=t.childNodes).length;-1<--s;)a=(n=r[s]).type,n.style&&(e.push(y(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||Jt(n,e,i)};return W.cascadeTo=function(t,e,i){var r,s,n,a,o=B.to(t,e,i),l=[o],h=[],f=[],u=[],p=B._internals.reservedProps;for(t=o._targets||o.target,Jt(t,h,u),o.render(e,!0,!0),Jt(t,f),o.render(0,!0,!0),o._enabled(!0),r=u.length;-1<--r;)if((s=v(u[r],h[r],f[r])).firstMPT){for(n in s=s.difs,i)p[n]&&(s[n]=i[n]);for(n in a={},s)a[n]=h[r][n];l.push(B.fromTo(u[r],e,a,s))}return l},n.activate([W]),W},!0),_fwd_fwdScope.FWDFWD_fwdDefine("easing.Back",["easing.Ease"],function(m){function t(t,e){var i=f("easing."+t,function(){},!0),r=i.prototype=new m;return r.constructor=i,r.getRatio=e,i}function e(t,e,i,r,s){var n=f("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new r},!0);return u(n,t),n}function g(t,e,i){this.t=t,this.v=e,i&&(((this.next=i).prev=this).c=i.v-e,this.gap=i.t-t)}function i(t,e){var i=f("easing."+t,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=i.prototype=new m;return r.constructor=i,r.getRatio=e,r.config=function(t){return new i(t)},i}var r,s,n,a=_fwd_fwdScope.FWDGlobals||_fwd_fwdScope,o=a.com.fwd,l=2*Math.PI,h=Math.PI/2,f=o._class,u=m.register||function(){},p=e("Back",i("BackOut",function(t){return--t*t*((this._p1+1)*t+this._p1)+1}),i("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),i("BackInOut",function(t){return(t*=2)<1?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),_=f("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:1<t&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=!0===i},!0),c=_.prototype=new m;return c.constructor=_,c.getRatio=function(t){var e=t+(.5-t)*this._p;return t<this._p1?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},_.ease=new _(.7,.7),c.config=_.config=function(t,e,i){return new _(t,e,i)},(c=(r=f("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0)).prototype=new m).constructor=r,c.getRatio=function(t){return t<0?t=0:1<=t&&(t=.999999999),(this._p2*t>>0)*this._p1},c.config=r.config=function(t){return new r(t)},(c=(s=f("easing.RoughEase",function(t){for(var e,i,r,s,n,a,o=(t=t||{}).taper||"none",l=[],h=0,f=0|(t.points||20),u=f,p=!1!==t.randomize,_=!0===t.clamp,c=t.template instanceof m?t.template:null,d="number"==typeof t.strength?.4*t.strength:.4;-1<--u;)e=p?Math.random():1/f*u,i=c?c.getRatio(e):e,r="none"===o?d:"out"===o?(s=1-e)*s*d:"in"===o?e*e*d:e<.5?(s=2*e)*s*.5*d:(s=2*(1-e))*s*.5*d,p?i+=Math.random()*r-.5*r:u%2?i+=.5*r:i-=.5*r,_&&(1<i?i=1:i<0&&(i=0)),l[h++]={x:e,y:i};for(l.sort(function(t,e){return t.x-e.x}),a=new g(1,1,null),u=f;-1<--u;)n=l[u],a=new g(n.x,n.y,a);this._prev=new g(0,0,0!==a.t?a:a.next)},!0)).prototype=new m).constructor=s,c.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&t<=e.t;)e=e.prev;return(this._prev=e).v+(t-e.t)/e.gap*e.c},c.config=function(t){return new s(t)},s.ease=new s,e("Bounce",t("BounceOut",function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),t("BounceIn",function(t){return(t=1-t)<1/2.75?1-7.5625*t*t:t<2/2.75?1-(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),t("BounceInOut",function(t){var e=t<.5;return(t=e?1-2*t:2*t-1)<1/2.75?t*=7.5625*t:t=t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),e("Circ",t("CircOut",function(t){return Math.sqrt(1- --t*t)}),t("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),t("CircInOut",function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),e("Elastic",(n=function(t,e,i){var r=f("easing."+t,function(t,e){this._p1=1<=t?t:1,this._p2=(e||i)/(t<1?t:1),this._p3=this._p2/l*(Math.asin(1/this._p1)||0),this._p2=l/this._p2},!0),s=r.prototype=new m;return s.constructor=r,s.getRatio=e,s.config=function(t,e){return new r(t,e)},r})("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),n("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*--t)*Math.sin((t-this._p3)*this._p2))},.3),n("ElasticInOut",function(t){return(t*=2)<1?this._p1*Math.pow(2,10*--t)*Math.sin((t-this._p3)*this._p2)*-.5:this._p1*Math.pow(2,-10*--t)*Math.sin((t-this._p3)*this._p2)*.5+1},.45)),e("Expo",t("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),t("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),t("ExpoInOut",function(t){return(t*=2)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),e("Sine",t("SineOut",function(t){return Math.sin(t*h)}),t("SineIn",function(t){return 1-Math.cos(t*h)}),t("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),f("easing.EaseLookup",{find:function(t){return m.map[t]}},!0),u(a.SlowMo,"SlowMo","ease,"),u(s,"RoughEase","ease,"),u(r,"SteppedEase","ease,"),p},!0)}),_fwd_fwdScope.FWDFWD_fwdDefine&&_fwd_fwdScope._fwd_fwdQueue.pop()(),function(_,c){"use strict";var d={},m=_.FWDGlobals=_.FWDGlobals||_;if(!m.FWDTweenLite){var g,e,i,y=function(t){for(var e=t.split("."),i=m,r=0;r<e.length;r++)i[e[r]]=i=i[e[r]]||{};return i},u=y("com.fwd"),v=1e-10,l=function(t){for(var e=[],i=t.length,r=0;r!==i;e.push(t[r++]));return e},r=function(){},x=(e=Object.prototype.toString,i=e.call([]),function(t){return null!=t&&(t instanceof Array||"object"==typeof t&&!!t.push&&e.call(t)===i)}),w={},T=function(l,h,f,u){this.sc=w[l]?w[l].sc:[],(w[l]=this).gsClass=null,this.func=f;var p=[];this.check=function(t){for(var e,i,r,s,n,a=h.length,o=a;-1<--a;)(e=w[h[a]]||new T(h[a],[])).gsClass?(p[a]=e.gsClass,o--):t&&e.sc.push(this);if(0===o&&f){if(r=(i=("com.fwd."+l).split(".")).pop(),s=y(i.join("."))[r]=this.gsClass=f.apply(f,p),u)if(m[r]=d[r]=s,!(n="undefined"!=typeof fwd_module&&fwd_module.exports)&&"function"==typeof define&&define.amd)define((_.FWDAMDPath?_.FWDAMDPath+"/":"")+l.split(".").pop(),[],function(){return s});else if(n)if(l===c)for(a in fwd_module.exports=d[c]=s,d)s[a]=d[a];else d[c]&&(d[c][r]=s);for(a=0;a<this.sc.length;a++)this.sc[a].check()}},this.check(!0)},s=_.FWDFWD_fwdDefine=function(t,e,i,r){return new T(t,e,i,r)},p=u._class=function(t,e,i){return e=e||function(){},s(t,[],function(){return e},i),e};s.globals=m;var t,n=[0,0,1,1],b=p("easing.Ease",function(t,e,i,r){this._func=t,this._type=i||0,this._power=r||0,this._params=e?n.concat(e):n},!0),P=b.map={},a=b.register=function(t,e,i,r){for(var s,n,a,o,l=e.split(","),h=l.length,f=(i||"easeIn,easeOut,easeInOut").split(",");-1<--h;)for(n=l[h],s=r?p("easing."+n,null,!0):u.easing[n]||{},a=f.length;-1<--a;)o=f[a],P[n+"."+o]=P[o+n]=s[o]=t.getRatio?t:t[o]||new t};for((t=b.prototype)._calcEnd=!1,t.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,r=1===e?1-t:2===e?t:t<.5?2*t:2*(1-t);return 1===i?r*=r:2===i?r*=r*r:3===i?r*=r*r*r:4===i&&(r*=r*r*r*r),1===e?1-r:2===e?r:t<.5?r/2:1-r/2},h=(o=["Linear","Quad","Cubic","Quart","Quint,Strong"]).length;-1<--h;)t=o[h]+",Power"+h,a(new b(null,null,1,h),t,"easeOut",!0),a(new b(null,null,2,h),t,"easeIn"+(0===h?",easeNone":"")),a(new b(null,null,3,h),t,"easeInOut");P.linear=u.easing.Linear.easeIn,P.swing=u.easing.Quad.easeInOut;var O=p("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});(t=O.prototype).addEventListener=function(t,e,i,r,s){s=s||0;var n,a,o=this._listeners[t],l=0;for(this!==M||g||M.wake(),null==o&&(this._listeners[t]=o=[]),a=o.length;-1<--a;)(n=o[a]).c===e&&n.s===i?o.splice(a,1):0===l&&n.pr<s&&(l=a+1);o.splice(l,0,{c:e,s:i,up:r,pr:s})},t.removeEventListener=function(t,e){var i,r=this._listeners[t];if(r)for(i=r.length;-1<--i;)if(r[i].c===e)return void r.splice(i,1)},t.dispatchEvent=function(t){var e,i,r,s=this._listeners[t];if(s)for(1<(e=s.length)&&(s=s.slice(0)),i=this._eventTarget;-1<--e;)(r=s[e])&&(r.up?r.c.call(r.s||i,{type:t,target:i}):r.c.call(r.s||i))};for(var o,k=_.requestAnimationFrame,R=_.cancelAnimationFrame,S=Date.now||function(){return(new Date).getTime()},A=S(),h=(o=["ms","moz","webkit","o"]).length;-1<--h&&!k;)k=_[o[h]+"RequestAnimationFrame"],R=_[o[h]+"CancelAnimationFrame"]||_[o[h]+"CancelRequestAnimationFrame"];p("Ticker",function(t,e){var s,n,a,o,l,h=this,f=S(),i=!(!1===e||!k)&&"auto",u=500,p=33,_=function(t){var e,i,r=S()-A;u<r&&(f+=r-p),A+=r,h.time=(A-f)/1e3,e=h.time-l,(!s||0<e||!0===t)&&(h.frame++,l+=e+(o<=e?.004:o-e),i=!0),!0!==t&&(a=n(_)),i&&h.dispatchEvent("tick")};O.call(h),h.time=h.frame=0,h.tick=function(){_(!0)},h.lagSmoothing=function(t,e){u=t||1e10,p=Math.min(e,u,0)},h.sleep=function(){null!=a&&((i&&R?R:clearTimeout)(a),n=r,a=null,h===M&&(g=!1))},h.wake=function(t){null!==a?h.sleep():t?f+=-A+(A=S()):10<h.frame&&(A=S()-u+5),n=0===s?r:i&&k?k:function(t){return setTimeout(t,1e3*(l-h.time)+1|0)},h===M&&(g=!0),_(2)},h.fps=function(t){if(!arguments.length)return s;o=1/((s=t)||60),l=this.time+o,h.wake()},h.useRAF=function(t){if(!arguments.length)return i;h.sleep(),i=t,h.fps(s)},h.fps(t),setTimeout(function(){"auto"===i&&h.frame<5&&"hidden"!==document.visibilityState&&h.useRAF(!1)},1500)}),(t=u.Ticker.prototype=new u.events.EventDispatcher).constructor=u.Ticker;var f=p("core.FWDAnimation",function(t,e){var i;this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=!0===e.immediateRender,this.data=e.data,this._reversed=!0===e.reversed,$&&(g||M.wake(),(i=this.vars.useFrames?U:$).add(this,i._time),this.vars.paused&&this.paused(!0))}),M=f.ticker=new u.Ticker;(t=f.prototype)._dirty=t._gc=t._initted=t._paused=!1,t._totalTime=t._time=0,t._rawPrevTime=-1,t._next=t._last=t._onUpdate=t._timeline=t.timeline=null,t._paused=!1;var C=function(){g&&2e3<S()-A&&M.wake(),setTimeout(C,2e3)};C(),t.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},t.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},t.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},t.seek=function(t,e){return this.totalTime(Number(t),!1!==e)},t.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,!1!==e,!0)},t.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},t.render=function(t,e,i){},t.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,!this._gc&&this.timeline||this._enabled(!0),this},t.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&t<i+this.totalDuration()/this._timeScale},t._enabled=function(t,e){return g||M.wake(),this._gc=!t,this._active=this.isActive(),!0!==e&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},t._kill=function(t,e){return this._enabled(!1,!1)},t.kill=function(t,e){return this._kill(t,e),this},t._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},t._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();-1<--e;)"{self}"===t[e]&&(i[e]=this);return i},t._callback=function(t){var e=this.vars,i=e[t],r=e[t+"Params"],s=e[t+"Scope"]||e.callbackScope||this;switch(r?r.length:0){case 0:i.call(s);break;case 1:i.call(s,r[0]);break;case 2:i.call(s,r[0],r[1]);break;default:i.apply(s,r)}},t.eventCallback=function(t,e,i,r){if("on"===(t||"").substr(0,2)){var s=this.vars;if(1===arguments.length)return s[t];null==e?delete s[t]:(s[t]=e,s[t+"Params"]=x(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,s[t+"Scope"]=r),"onUpdate"===t&&(this._onUpdate=e)}return this},t.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},t.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&0<this._time&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},t.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},t.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},t.totalTime=function(t,e,i){if(g||M.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(t<0&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var r=this._totalDuration,s=this._timeline;if(r<t&&!i&&(t=r),this._startTime=(this._paused?this._pauseTime:s._time)-(this._reversed?r-t:t)/this._timeScale,s._dirty||this._uncache(!1),s._timeline)for(;s._timeline;)s._timeline._time!==(s._startTime+s._totalTime)/s._timeScale&&s.totalTime(s._totalTime,!0),s=s._timeline}this._gc&&this._enabled(!0,!1),this._totalTime===t&&0!==this._duration||(X.length&&G(),this.render(t,e,!1),X.length&&G())}return this},t.progress=t.totalProgress=function(t,e){var i=this.duration();return arguments.length?this.totalTime(i*t,e):i?this._time/i:this.ratio},t.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},t.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},t.timeScale=function(t){return arguments.length?(t=t||v,this._timeline&&this._timeline.smoothChildTiming&&(i=(e=this._pauseTime)||0===e?e:this._timeline.totalTime(),this._startTime=i-(i-this._startTime)*this._timeScale/t),this._timeScale=t,this._uncache(!1)):this._timeScale;var e,i},t.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},t.paused=function(t){if(!arguments.length)return this._paused;var e,i,r=this._timeline;return t!=this._paused&&r&&(g||t||M.wake(),i=(e=r.rawTime())-this._pauseTime,!t&&r.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!=i&&this._initted&&this.duration()&&(e=r.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,this.render(e,e===this._totalTime,!0))),this._gc&&!t&&this._enabled(!0,!1),this};var F=p("core.FWDSimpleTimeline",function(t){f.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});(t=F.prototype=new f).constructor=F,t.kill()._gc=!1,t._first=t._last=t._recent=null,t._sortChildren=!1,t.add=t.insert=function(t,e,i,r){var s,n;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),s=this._last,this._sortChildren)for(n=t._startTime;s&&s._startTime>n;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=s,this._recent=t,this._timeline&&this._uncache(!0),this},t._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},t.render=function(t,e,i){var r,s=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;s;)r=s._next,(s._active||t>=s._startTime&&!s._paused)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=r},t.rawTime=function(){return g||M.wake(),this._totalTime};var D=p("FWDTweenLite",function(t,e,i){if(f.call(this,e,i),this.render=D.prototype.render,null==t)throw"Cannot tween a null target.";this.target=t="string"==typeof t&&D.selector(t)||t;var r,s,n,a=t.jquery||t.length&&t!==_&&t[0]&&(t[0]===_||t[0].nodeType&&t[0].style&&!t.nodeType),o=this.vars.overwrite;if(this._overwrite=o=null==o?Z[D.defaultOverwrite]:"number"==typeof o?o>>0:Z[o],(a||t instanceof Array||t.push&&x(t))&&"number"!=typeof t[0])for(this._targets=n=l(t),this._propLookup=[],this._siblings=[],r=0;r<n.length;r++)(s=n[r])?"string"!=typeof s?s.length&&s!==_&&s[0]&&(s[0]===_||s[0].nodeType&&s[0].style&&!s.nodeType)?(n.splice(r--,1),this._targets=n=n.concat(l(s))):(this._siblings[r]=H(s,this,!1),1===o&&1<this._siblings[r].length&&J(s,this,null,1,this._siblings[r])):"string"==typeof(s=n[r--]=D.selector(s))&&n.splice(r+1,1):n.splice(r--,1);else this._propLookup={},this._siblings=H(t,this,!1),1===o&&1<this._siblings.length&&J(t,this,null,1,this._siblings);(this.vars.immediateRender||0===e&&0===this._delay&&!1!==this.vars.immediateRender)&&(this._time=-v,this.render(Math.min(0,-this._delay)))},!0),z=function(t){return t&&t.length&&t!==_&&t[0]&&(t[0]===_||t[0].nodeType&&t[0].style&&!t.nodeType)};(t=D.prototype=new f).constructor=D,t.kill()._gc=!1,t.ratio=0,t._firstPT=t._targets=t._overwrittenProps=t._startAt=null,t._notifyPluginsOfEnabled=t._lazy=!1,D.version="1.19.0",D.defaultEase=t._ease=new b(null,null,1,1),D.defaultOverwrite="auto",D.ticker=M,D.autoSleep=120,D.lagSmoothing=function(t,e){M.lagSmoothing(t,e)},D.selector=_.$||_.jQuery||function(t){var e=_.$||_.jQuery;return e?(D.selector=e)(t):"undefined"==typeof document?t:document.querySelectorAll?document.querySelectorAll(t):document.getElementById("#"===t.charAt(0)?t.substr(1):t)};var X=[],I={},N=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,Y=function(t){for(var e,i=this._firstPT;i;)e=i.blob?t?this.join(""):this.start:i.c*t+i.s,i.m?e=i.m(e,this._target||i.t):e<1e-6&&-1e-6<e&&(e=0),i.f?i.fp?i.t[i.p](i.fp,e):i.t[i.p](e):i.t[i.p]=e,i=i._next},E=function(t,e,i,r){var s,n,a,o,l,h,f,u=[t,e],p=0,_="",c=0;for(u.start=t,i&&(i(u),t=u[0],e=u[1]),u.length=0,s=t.match(N)||[],n=e.match(N)||[],r&&(r._next=null,r.blob=1,u._firstPT=u._applyPT=r),l=n.length,o=0;o<l;o++)f=n[o],_+=(h=e.substr(p,e.indexOf(f,p)-p))||!o?h:",",p+=h.length,c?c=(c+1)%5:"rgba("===h.substr(-5)&&(c=1),f===s[o]||s.length<=o?_+=f:(_&&(u.push(_),_=""),a=parseFloat(s[o]),u.push(a),u._firstPT={_next:u._firstPT,t:u,p:u.length-1,s:a,c:("="===f.charAt(1)?parseInt(f.charAt(0)+"1",10)*parseFloat(f.substr(2)):parseFloat(f)-a)||0,f:0,m:c&&c<4?Math.round:0}),p+=f.length;return(_+=e.substr(p))&&u.push(_),u.setRatio=Y,u},B=function(t,e,i,r,s,n,a,o,l){"function"==typeof r&&(r=r(l||0,t));var h,f="get"===i?t[e]:i,u=typeof t[e],p="string"==typeof r&&"="===r.charAt(1),_={t:t,p:e,s:f,f:"function"==u,pg:0,n:s||e,m:n?"function"==typeof n?n:Math.round:0,pr:0,c:p?parseInt(r.charAt(0)+"1",10)*parseFloat(r.substr(2)):parseFloat(r)-f||0};if("number"!=u&&("function"==u&&"get"===i&&(h=e.indexOf("set")||"function"!=typeof t["get"+e.substr(3)]?e:"get"+e.substr(3),_.s=f=a?t[h](a):t[h]()),"string"==typeof f&&(a||isNaN(f))?(_.fp=a,_={t:E(f,r,o||D.defaultStringFilter,_),p:"setRatio",s:0,c:1,f:2,pg:0,n:s||e,pr:0,m:0}):p||(_.s=parseFloat(f),_.c=parseFloat(r)-_.s||0)),_.c)return(_._next=this._firstPT)&&(_._next._prev=_),this._firstPT=_},W=D._internals={isArray:x,isSelector:z,lazyTweens:X,blobDif:E},L=D._plugins={},j=W.tweenLookup={},V=0,q=W.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1,id:1},Z={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,true:1,false:0},U=f._rootFramesTimeline=new F,$=f._rootTimeline=new F,Q=30,G=W.lazyRender=function(){var t,e=X.length;for(I={};-1<--e;)(t=X[e])&&!1!==t._lazy&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);X.length=0};$._startTime=M.time,U._startTime=M.frame,$._active=U._active=!0,setTimeout(G,1),f._updateRoot=D.render=function(){var t,e,i;if(X.length&&G(),$.render((M.time-$._startTime)*$._timeScale,!1,!1),U.render((M.frame-U._startTime)*U._timeScale,!1,!1),X.length&&G(),M.frame>=Q){for(i in Q=M.frame+(parseInt(D.autoSleep,10)||120),j){for(t=(e=j[i].tweens).length;-1<--t;)e[t]._gc&&e.splice(t,1);0===e.length&&delete j[i]}if((!(i=$._first)||i._paused)&&D.autoSleep&&!U._first&&1===M._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||M.sleep()}}},M.addEventListener("tick",f._updateRoot);var H=function(t,e,i){var r,s,n=t._fwdTweenID;if(j[n||(t._fwdTweenID=n="t"+V++)]||(j[n]={target:t,tweens:[]}),e&&((r=j[n].tweens)[s=r.length]=e,i))for(;-1<--s;)r[s]===e&&r.splice(s,1);return j[n].tweens},K=function(t,e,i,r){var s,n,a=t.vars.onOverwrite;return a&&(s=a(t,e,i,r)),(a=D.onOverwrite)&&(n=a(t,e,i,r)),!1!==s&&!1!==n},J=function(t,e,i,r,s){var n,a,o;if(1===r||4<=r){for(o=s.length,_=0;_<o;_++)if((a=s[_])!==e)a._gc||a._kill(null,t,e)&&(n=!0);else if(5===r)break;return n}for(var l,h=e._startTime+v,f=[],u=0,p=0===e._duration,_=s.length;-1<--_;)(a=s[_])===e||a._gc||a._paused||(a._timeline!==e._timeline?(l=l||tt(e,0,p),0===tt(a,l,p)&&(f[u++]=a)):a._startTime<=h&&a._startTime+a.totalDuration()/a._timeScale>h&&((p||!a._initted)&&h-a._startTime<=2e-10||(f[u++]=a)));for(_=u;-1<--_;)if(a=f[_],2===r&&a._kill(i,t,e)&&(n=!0),2!==r||!a._firstPT&&a._initted){if(2!==r&&!K(a,e))continue;a._enabled(!1,!1)&&(n=!0)}return n},tt=function(t,e,i){for(var r=t._timeline,s=r._timeScale,n=t._startTime;r._timeline;){if(n+=r._startTime,s*=r._timeScale,r._paused)return-100;r=r._timeline}return e<(n/=s)?n-e:i&&n===e||!t._initted&&n-e<2*v?v:(n+=t.totalDuration()/t._timeScale/s)>e+v?0:n-e-v};t._init=function(){var t,e,i,r,s,n,a=this.vars,o=this._overwrittenProps,l=this._duration,h=!!a.immediateRender,f=a.ease;if(a.startAt){for(r in this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),s={},a.startAt)s[r]=a.startAt[r];if(s.overwrite=!1,s.immediateRender=!0,s.lazy=h&&!1!==a.lazy,s.startAt=s.delay=null,this._startAt=D.to(this.target,0,s),h)if(0<this._time)this._startAt=null;else if(0!==l)return}else if(a.runBackwards&&0!==l)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{for(r in 0!==this._time&&(h=!1),i={},a)q[r]&&"autoCSS"!==r||(i[r]=a[r]);if(i.overwrite=0,i.data="isFromStart",i.lazy=h&&!1!==a.lazy,i.immediateRender=h,this._startAt=D.to(this.target,0,i),h){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=f=f?f instanceof b?f:"function"==typeof f?new b(f,a.easeParams):P[f]||D.defaultEase:D.defaultEase,a.easeParams instanceof Array&&f.config&&(this._ease=f.config.apply(f,a.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(n=this._targets.length,t=0;t<n;t++)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],o?o[t]:null,t)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,o,0);if(e&&D._onPluginEvent("_onInitAllProps",this),o&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),a.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=a.onUpdate,this._initted=!0},t._initProps=function(t,e,i,r,s){var n,a,o,l,h,f;if(null==t)return!1;for(n in I[t._fwdTweenID]&&G(),this.vars.css||t.style&&t!==_&&t.nodeType&&L.css&&!1!==this.vars.autoCSS&&function(t,e){var i,r={};for(i in t)q[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!L[i]||L[i]&&L[i]._autoCSS)||(r[i]=t[i],delete t[i]);t.css=r}(this.vars,t),this.vars)if(f=this.vars[n],q[n])f&&(f instanceof Array||f.push&&x(f))&&-1!==f.join("").indexOf("{self}")&&(this.vars[n]=f=this._swapSelfInParams(f,this));else if(L[n]&&(l=new L[n])._onInitTween(t,this.vars[n],this,s)){for(this._firstPT=h={_next:this._firstPT,t:l,p:"setRatio",s:0,c:1,f:1,n:n,pg:1,pr:l._priority,m:0},a=l._overwriteProps.length;-1<--a;)e[l._overwriteProps[a]]=this._firstPT;(l._priority||l._onInitAllProps)&&(o=!0),(l._onDisable||l._onEnable)&&(this._notifyPluginsOfEnabled=!0),h._next&&(h._next._prev=h)}else e[n]=B.call(this,t,n,"get",f,n,0,null,this.vars.stringFilter,s);return r&&this._kill(r,t)?this._initProps(t,e,i,r,s):1<this._overwrite&&this._firstPT&&1<i.length&&J(t,this,e,this._overwrite,i)?(this._kill(e,t),this._initProps(t,e,i,r,s)):(this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration)&&(I[t._fwdTweenID]=!0),o)},t.render=function(t,e,i){var r,s,n,a,o,l,h,f=this._time,u=this._duration,p=this._rawPrevTime;if(u-1e-7<=t?(this._totalTime=this._time=u,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(r=!0,s="onComplete",i=i||this._timeline.autoRemoveChildren),0===u&&(!this._initted&&this.vars.lazy&&!i||(this._startTime===this._timeline._duration&&(t=0),(p<0||t<=0&&-1e-7<=t||p===v&&"isPause"!==this.data)&&p!==t&&(i=!0,v<p&&(s="onReverseComplete")),this._rawPrevTime=a=!e||t||p===t?t:v))):t<1e-7?(this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==f||0===u&&0<p)&&(s="onReverseComplete",r=this._reversed),t<0&&(this._active=!1,0===u&&(!this._initted&&this.vars.lazy&&!i||(0<=p&&(p!==v||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=a=!e||t||p===t?t:v))),this._initted||(i=!0)):(this._totalTime=this._time=t,this._easeType?(o=t/u,(1===(l=this._easeType)||3===l&&.5<=o)&&(o=1-o),3===l&&(o*=2),1===(h=this._easePower)?o*=o:2===h?o*=o*o:3===h?o*=o*o*o:4===h&&(o*=o*o*o*o),this.ratio=1===l?1-o:2===l?o:t/u<.5?o/2:1-o/2):this.ratio=this._ease.getRatio(t/u)),this._time!==f||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=f,this._rawPrevTime=p,X.push(this),void(this._lazy=[t,e]);this._time&&!r?this.ratio=this._ease.getRatio(this._time/u):r&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(!1!==this._lazy&&(this._lazy=!1),this._active||!this._paused&&this._time!==f&&0<=t&&(this._active=!0),0===f&&(this._startAt&&(0<=t?this._startAt.render(t,e,i):s=s||"_dummyGS"),this.vars.onStart&&(0===this._time&&0!==u||e||this._callback("onStart"))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(t<0&&this._startAt&&-1e-4!==t&&this._startAt.render(t,e,i),e||(this._time!==f||r||i)&&this._callback("onUpdate")),s&&(this._gc&&!i||(t<0&&this._startAt&&!this._onUpdate&&-1e-4!==t&&this._startAt.render(t,e,i),r&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[s]&&this._callback(s),0===u&&this._rawPrevTime===v&&a!==v&&(this._rawPrevTime=0)))}},t._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:D.selector(e)||e;var r,s,n,a,o,l,h,f,u,p=i&&this._time&&i._startTime===this._startTime&&this._timeline===i._timeline;if((x(e)||z(e))&&"number"!=typeof e[0])for(r=e.length;-1<--r;)this._kill(t,e[r],i)&&(l=!0);else{if(this._targets){for(r=this._targets.length;-1<--r;)if(e===this._targets[r]){o=this._propLookup[r]||{},this._overwrittenProps=this._overwrittenProps||[],s=this._overwrittenProps[r]=t?this._overwrittenProps[r]||{}:"all";break}}else{if(e!==this.target)return!1;o=this._propLookup,s=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(o){if(h=t||o,f=t!==s&&"all"!==s&&t!==o&&("object"!=typeof t||!t._tempKill),i&&(D.onOverwrite||this.vars.onOverwrite)){for(n in h)o[n]&&(u=u||[]).push(n);if((u||!t)&&!K(this,i,e,u))return!1}for(n in h)(a=o[n])&&(p&&(a.f?a.t[a.p](a.s):a.t[a.p]=a.s,l=!0),a.pg&&a.t._kill(h)&&(l=!0),a.pg&&0!==a.t._overwriteProps.length||(a._prev?a._prev._next=a._next:a===this._firstPT&&(this._firstPT=a._next),a._next&&(a._next._prev=a._prev),a._next=a._prev=null),delete o[n]),f&&(s[n]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return l},t.invalidate=function(){return this._notifyPluginsOfEnabled&&D._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],f.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-v,this.render(Math.min(0,-this._delay))),this},t._enabled=function(t,e){if(g||M.wake(),t&&this._gc){var i,r=this._targets;if(r)for(i=r.length;-1<--i;)this._siblings[i]=H(r[i],this,!0);else this._siblings=H(this.target,this,!0)}return f.prototype._enabled.call(this,t,e),!(!this._notifyPluginsOfEnabled||!this._firstPT)&&D._onPluginEvent(t?"_onEnable":"_onDisable",this)},D.to=function(t,e,i){return new D(t,e,i)},D.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new D(t,e,i)},D.fromTo=function(t,e,i,r){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,new D(t,e,r)},D.delayedCall=function(t,e,i,r,s){return new D(e,0,{delay:t,onComplete:e,onCompleteParams:i,callbackScope:r,onReverseComplete:e,onReverseCompleteParams:i,immediateRender:!1,lazy:!1,useFrames:s,overwrite:0})},D.set=function(t,e){return new D(t,0,e)},D.getTweensOf=function(t,e){if(null==t)return[];var i,r,s,n;if(t="string"==typeof t&&D.selector(t)||t,(x(t)||z(t))&&"number"!=typeof t[0]){for(i=t.length,r=[];-1<--i;)r=r.concat(D.getTweensOf(t[i],e));for(i=r.length;-1<--i;)for(n=r[i],s=i;-1<--s;)n===r[s]&&r.splice(i,1)}else for(i=(r=H(t).concat()).length;-1<--i;)(r[i]._gc||e&&!r[i].isActive())&&r.splice(i,1);return r},D.killTweensOf=D.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var r=D.getTweensOf(t,e),s=r.length;-1<--s;)r[s]._kill(i,t)};var et=p("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=et.prototype},!0);if(t=et.prototype,et.version="1.19.0",et.API=2,t._firstPT=null,t._addTween=B,t.setRatio=Y,t._kill=function(t){var e,i=this._overwriteProps,r=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;-1<--e;)null!=t[i[e]]&&i.splice(e,1);for(;r;)null!=t[r.n]&&(r._next&&(r._next._prev=r._prev),r._prev?(r._prev._next=r._next,r._prev=null):this._firstPT===r&&(this._firstPT=r._next)),r=r._next;return!1},t._mod=t._roundProps=function(t){for(var e,i=this._firstPT;i;)(e=t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&"function"==typeof e&&(2===i.f?i.t._applyPT.m=e:i.m=e),i=i._next},D._onPluginEvent=function(t,e){var i,r,s,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,r=s;r&&r.pr>o.pr;)r=r._next;(o._prev=r?r._prev:n)?o._prev._next=o:s=o,(o._next=r)?r._prev=o:n=o,o=a}o=e._firstPT=s}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},et.activate=function(t){for(var e=t.length;-1<--e;)t[e].API===et.API&&(L[(new t[e])._propName]=t[e]);return!0},s.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,r=t.priority||0,s=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_mod",mod:"_mod",initAll:"_onInitAllProps"},a=p("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){et.call(this,i,r),this._overwriteProps=s||[]},!0===t.fwd_global),o=a.prototype=new et(i);for(e in(o.constructor=a).API=t.API,n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,et.activate([a]),a},o=_._fwd_fwdQueue){for(h=0;h<o.length;h++)o[h]();for(t in w)w[t].func||_.console.log("FWDAnimation encountered missing dependency: "+t)}g=!1}}("undefined"!=typeof fwd_module&&fwd_module.exports&&"undefined"!=typeof fwd_global?fwd_global:this||window,"FWDAnimation"));