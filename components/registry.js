'use strict';
const copyProps = require('raptor-util/copyProps');
const SERVER_WIDGET_KEY = Symbol();
const ServerComponent = require('./ServerComponent');

function createServerComponentClass(renderingLogic) {
    var renderingLogicProps = typeof renderingLogic === 'function' ?
        renderingLogic.prototype :
        renderingLogic;


    copyProps(renderingLogicProps, ServerComponent.prototype);

    return ServerComponent;
}
function createComponent(renderingLogic, id, input, out, typeName, customEvents, scope) {
    var ServerComponent = renderingLogic[SERVER_WIDGET_KEY];
    if (!ServerComponent) {
        ServerComponent = renderingLogic[SERVER_WIDGET_KEY] = createServerComponentClass(renderingLogic);
    }

    var component = new ServerComponent(id, input, out, typeName, customEvents, scope);
    return component;
}

exports.$__isServer = true;
exports.$__createComponent = createComponent;
