/**
 * Initializing the global Saddid App variable
 *
 * @param {type} window
 * @returns {undefined}
 *
 * @author A Vijay <vijay.a@technoduce.com>
 */
(function (window) {
    var Core;
    if (window.Package) {
        Core = {};
    } else {
        window.Core = {};
    }
})(window);

Core = {
    prototype: {
        session: sessionStorage
    },

    /**
     * Google map API KEY
     */
    MAP_KEY: 'AIzaSyCDKBu1aPoiFQX0tCZUJJ2I8_JRW7f_vmU',

    /**
     * Default lat lon for map load
     */
    DEFAULT_MAP_LOCATION: {lat: 11.024999, lng: 76.903801},

    DEFAULT_MAP_ZOOM: 13,

    DECIMAL_PRECISION: 2,
    /**
     *
     * @param config
     */
    mapConfig: function (config) {
        return $.extend(
            config,
            {
                zoom: Core.DEFAULT_MAP_ZOOM,
                disableDefaultUI: true
            }
        );
    },
    /**
     * Dark / Light color pair
     * @link: https://material.io/guidelines/style/color.html#color-color-palette
     *
     * [ 400, 100 ]
     */
    colors: [
        ['#EF5350', '#FFCDD2'], // Red
        ['#EC407A', '#F8BBD0'], // Pink
        ['#AB47BC', '#E1BEE7'], // Purple

        ['#7E57C2', '#D1C4E9'], // Deep Purple
        ['#5C6BC0', '#C5CAE9'], // Indigo
        ['#42A5F5', '#BBDEFB'], // Blue

        ['#29B6F6', '#B3E5FC'], // Light Blue
        ['#26C6DA', '#B2EBF2'], // Cyan
        ['#26A69A', '#B2DFDB'], // Teal

        ['#66BB6A', '#C8E6C9'], // Green
        ['#9CCC65', '#DCEDC8'], // Light Green
        ['#D4E157', '#F0F4C3'], // Lime

        ['#FFEE58', '#FFF9C4'], // Yellow
        ['#FFCA28', '#FFECB3'], // Amber
        ['#FFA726', '#FFE0B2'], // Orange

        ['#FF7043', '#FFCCBC'], // Deep Orange
        ['#8D6E63', '#D7CCC8'], // Brown
        ['#BDBDBD', '#F5F5F5'], // Grey

        ['#78909C', '#CFD8DC']  // Blue Grey
    ],

    CURRENCY: 'KWD',
    AVAILABILITY_TIMER: 60 * 1000,
    /**
     *
     */
    IDLE_COUNT: 0,
    /**
     *
     */
    AVAILABILITY_URL: false,
    /**
     *
     *
     */
    init: function () {
        Core.initStateListener();
        Core.updateUserState();
    },
    updateUserState: function () {
        Core.ajax({
            url: Core.AVAILABILITY_URL,
            data: {count: Core.IDLE_COUNT},
            done: function () {
                setTimeout(Core.updateUserState, Core.AVAILABILITY_TIMER);
            }
        });
    },
    /**
     * @link: https://stackoverflow.com/questions/667555/detecting-idle-time-in-javascript-elegantly
     */
    initStateListener: function () {
        $(document).on('click mousemove scroll', function (e) {
            Core.IDLE_COUNT = 0;
        });

        setInterval(function () {
            Core.IDLE_COUNT++;
        }, 1000);
    },
    /**
     * This method is used to perform the jQuery ajax functionality
     *
     * @param options
     * @param overlay
     * @returns {*}
     */
    ajax: function (options, overlay) {
        if (overlay !== false) {
            Core.overlay();
        }
        $('.progress').addClass('show');

        if (options.processData === undefined) {
            options.processData = true;
        }
        if (options.contentType === undefined) {
            options.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        }

        var jqxhr;
        if (options.method !== undefined && options.method.toLowerCase() === 'get') {
            // jqxhr = $.get( options.url , options.data, options.contentType, options.processData, function() {});
            jqxhr = $.get.call(this, options);
        } else {
            // jqxhr = $.post( options.url , options.data, options.contentType, options.processData, function() {});
            jqxhr = $.post.call(this, options);
        }

        typeof options.done === "function" ? jqxhr.done(options.done) : null;
        typeof options.fail === "function" ? jqxhr.fail(function (data) {
            options.fail(data);
        }) : jqxhr.fail(Core.defaultFail);
        typeof options.always === "function" ? jqxhr.always(options.always) : null;

        jqxhr.always(function () {
            if (overlay !== false) {
                Core.overlay(false);
            }

            $('.progress').removeClass('show');
        });
        return jqxhr;
    },

    /**
     * This is an default ajax fail callback, when ever Core.ajax is used for asynchronous call
     * @param data
     */
    defaultFail: function (data) {
        if (data.status = 403) {
            data.statusText = data.responseText;
        }
        Core.error(data.statusText);
    },
    /**
     *
     * @param input
     * @returns {number}
     */
    checkboxBoolToInt: function (input) {
        return input === true ? 1 : 2;
    },
    /**
     *
     * @param input
     * @returns {number}
     */
    boolToInt: function (input) {
        return input === true ? 1 : 0;
    },

    /**
     *
     * @param input
     * @returns {boolean}
     */
    intToBool: function (input) {
        return parseInt(input) === 1;
    },

    /**
     * This method will check whether the given value is not undefined if so
     * returns the value else defaultValue
     * @param value
     * @param defaultValue
     * @returns {*}
     */
    isDef: function (value, defaultValue) {
        return value !== undefined ? value : defaultValue;
    },
    /**
     * @param object
     * @returns {number}
     */
    getObjectLength: function (object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    },
    /**
     * @link http://stackoverflow.com/a/3710226/5798881
     *
     * @param jsonStr
     * @returns {boolean}
     */
    isValidJsonStr: function (jsonStr) {
        if (typeof jsonStr !== 'string') {
            return false;
        }
        try {
            JSON.parse(jsonStr);
        } catch (e) {
            return false;
        }
        return true;
    },
    /**
     *
     * @param key
     * @returns {boolean}
     */
    isSession: function (key) {
        return this.prototype.session.getItem(key) !== null;
    },
    /***
     *
     * @param key
     * @param value
     */
    setSession: function (key, value) {
        return this.prototype.session.setItem(key, value);
    },
    /**
     *
     * @param key
     */
    session: function (key) {
        return this.prototype.session.getItem(key);
    },
    /**
     *
     * @param key
     */
    removeSession: function (key) {
        return this.prototype.session.removeItem(key);
    },
    /**
     *
     */
    clearSession: function () {
        return this.prototype.session.clear();
    },
    info: function (options) {

         if (typeof options === 'string') {
            options = {title: "Info",message:options};

        }
        
        iziToast.info({
                title: options.title,
                message: options.message,
            });

    },
    error: function (options) {
        if (typeof options === 'string') {
            if(options.trim() == ''){
                return false;
            }
            options = {message:options};

        }
        
        iziToast.error({
                //title: options.title,
                message: options.message,
            });
        
    },

     success: function (options) {
        if (typeof options === 'string') {
            options = {message:options};
        }
          iziToast.success({
                //title: options.title,
                message: options.message,
            });
    },
    confirm:function (message,successCallBack='',options = {}) {

        var variation = {
                          timeout: 20000,
                          close: false,
                          overlay: true,
                          toastOnce: true,
                          id: 'question',
                          zindex: 999,
                          title: '',
                          message: message,
                          position: 'center',
                          buttons: [
                              ['<button><b>OK</b></button>', function (instance, toast) {
                                if(successCallBack != '')
                                    window[successCallBack]();
                                  instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                       
                              }, true],
                              ['<button>Cancel</button>', function (instance, toast) {
                                  instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                       
                              }],
                          ]
                      };
        variation = Object.assign(variation, options);


        iziToast.question(variation);
    },
    /**
     * @link http://stackoverflow.com/a/1026087/5798881
     *
     * @param string
     * @returns {string}
     */
    ucFirst: function (string) {
        if (string === undefined) {
            return 'undefined';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    overlay: function (show) {
        if (show === undefined) {
            show = true;
        }
        var overlayEle = $('body .overlay');

        if (show) {
            overlayEle.addClass('show');
        } else {
            overlayEle.fadeOut(400, function () {
                $(this).removeClass('show');
            });
        }
    },

    initTimePicker: function () {
        // Timepicker
        $(".timepicker").timepicker({
            minuteStep: 1,
            maxHours: 24
        });
    },
    initTooltip: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    /**
     * @link: http://stackoverflow.com/a/25867340/5798881
     */
    log: function () {
        console.log.apply(console, Array.prototype.slice.call(arguments));
    },
    warn: function () {
        console.warn.apply(console, Array.prototype.slice.call(arguments));
    },
    /**
     * @param float
     * @returns {string}
     */
    toFixed: function (float) {
        return parseFloat(float).toFixed(this.DECIMAL_PRECISION);
    },
    /**
     *
     * @param json
     * @returns {boolean}
     */
    handleInvalidServerResponse: function (json) {
        if (typeof json === 'string') {
            Core.error('Invalid Response');
            return false;
        }

        if (json.error !== undefined && Core.getObjectLength(json.error) !== 0) {
            Core.log(json.error);
            for (var error in json.error) {
                Core.error(json.error[error][0]);
            }
            return false;
        }

        if (json.msg === undefined || json.msg.length === 0) {
            json.msg = Core.ERROR.DEFAULT_MSG;
        }
        Core.error(json.msg);
    },

    /**
     * @link: http://stackoverflow.com/a/3855394/5798881
     */
    queryString: {},
    queryStringRefresh: function () {
        var a = window.location.search.substr(1).split('&');
        if (a === "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length !== 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        Core.queryString = b;
        return this;
    },
    /**
     * @link https://gist.github.com/mathewbyrne/1280286
     * @param text
     */
    slugify: function (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    },
    ERROR: {
        DEFAULT_MSG: 'Unable perform the action'
    },
    isAjaxSuccess: function (json, param) {
        return parseInt(json.status) === 1;
    }
};


(function ($) {
    $(document).ready(function () {

        Core.queryStringRefresh();

        var $fieldGrp;
        $(document).on('click', '.password-field-group .pwd-viewer-toggle', function () {
            $this = $(this);
            $fieldGrp = $this.closest('.password-field-group');

            if ($fieldGrp.hasClass('pwd-visible')) {
                $fieldGrp.removeClass('pwd-visible');

                $fieldGrp.find('input').attr('type', 'password');
                $this.removeClass('mdi-eye-off').addClass('mdi-eye');
            } else {
                $fieldGrp.addClass('pwd-visible');

                $fieldGrp.find('input').attr('type', 'text');
                $this.removeClass('mdi-eye').addClass('mdi-eye-off');
            }

        });
    });

    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {

                var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback(new Blob([arr], {type: type || 'image/png'}));
            }
        });
    }

})(jQuery);


/**
 * 
 * @type jQuery
 * 
 * This code is written to switch between tabs during validation for multilanguage concept
 */
var tab;
$('form').each(function () {
    $(this).on('afterValidate', function (event, messages, errorAttributes) {
        if (errorAttributes != undefined && errorAttributes.length > 0 && errorAttributes[0].container != undefined) {
            $.each(errorAttributes, function( index, value ) {
                tab = $(value.container).parents('.tab-pane');
                if (tab[0] != undefined) {
                    closest = tab.parents('.ui-tabs');
                    tab = closest.find($(".nav-link[href='#" + tab.attr("id") + "']"));
                    tab.trigger("click"); // trigger click to show tab
                    return false;
                }
            });

            setTimeout(function () {
                $(errorAttributes[0].input).focus();
            }, 200);
        }
    });
});