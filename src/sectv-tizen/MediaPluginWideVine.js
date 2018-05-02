/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginWideVine () {
    MediaPlugin.apply(this, arguments);
    this.name = 'MediaPluginWideVine';
}

MediaPluginWideVine.prototype = new MediaPlugin();

function getOptionString(options) {
    var opts = [];
    for(var key in options) {
        opts.push(key + '=' + options[key]);
    }
    return opts.join('|');
}

MediaPluginWideVine.prototype.onAttachToMedia = function (media) {
    var me = this;
    media.registerHook('afteropen', function (media, args) {
        exec(null, null, 'toast.Media', 'setDrm', [
            'WIDEVINE_CDM',
            'Initialize',
        ]);
        exec(null, null, 'toast.Media', 'setDrm', [
            'WIDEVINE_CDM',
            'widevine_app_session',
            me.options.widevine_app_session
        ]);
        exec(null, null, 'toast.Media', 'setDrm', [
            'WIDEVINE_CDM',
            'widevine_data_type',
            me.options.widevine_data_type
        ]);
    });
};

module.exports = MediaPluginWideVine;
