/**
 * UI 框架
 */
class UI {

    _layer;

    /**
     * 初始化 UI
     * @returns 返回一个 Promise 对象
     */
    static Init() {
        const promise = new Promise((resolve, reject) => {
            layui.use(['dropdown', 'layer', 'form'], () => {
                this._layer = layer
                UI.AttachEventHandlerToUI();
                UI.RenderList('.map-selector', [
                    { 'title': '地图1', 'id': '1514920297309614082' },
                    { 'title': '地图2', 'id': '1514920319845728258' }
                ]);
                UI.RenderList('.mode-selector', [
                    { 'title': '跟随视角', id: 1 },
                    { 'title': '室内常显', id: 2 },
                    { 'title': '仅室外', id: 4 },
                ]);
                UI.RenderList('.tileLayer-selector', [
                    { 'title': '矢量瓦片', 'id': 'tilelayer' },
                    { 'title': '卫星影像', 'id': 'tilelayerAMAP' },
                    { 'title': '显示/隐藏', 'id': 'show' },
                    { 'title': '删除', 'id': 'removeTileLayer' },
                ]);
                UI.RenderList('.theme-selector', [
                    { 'title': '主题1', 'id': '1581910231660457986' },
                    { 'title': '主题2', 'id': '1581910482018246658' }
                ]);
                UI.RenderList('.tile3d-selector', [
                    { 'title': '添加', 'id': 'add' },
                    { 'title': '删除', 'id': 'remove' },
                    { 'title': '显示', 'id': 'show' },
                    { 'title': '隐藏', 'id': 'hide' }
                ]);
                UI.RenderList('.cluster-selector', [
                    { 'title': '默认样式', 'id': 'default' },
                    { 'title': '自定义样式', 'id': 'custom' }
                ]);
                //UI.DisableRightClickEvent();
                resolve();
            });
        });

        /* https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver DOM 节点变化监听*/
        let callback = function FengMapDOMChangeHandler(mutationsList, observer) {
            if (mutationsList[0].target.id == "") {
                UI.AttachEventHandlerToDomMarker()
            }
        }
        const observer = new MutationObserver(callback);
        /* 当节点发生变化时，动态绑定事件 */
        observer.observe(document.getElementById('fengmap'), { childList: true, subtree: true });

        return promise;
    }

    static DisableRightClickEvent() {
        $('#aim-box').click(() => { return false });
        $('#aim-box').contextmenu(() => { return false });
    }

    static AttachEventHandlerToUI() {
        var btnAction = {
            "SetOverviewMode": (obj, val) => {
                SetOverviewMode(val);
            },
        }

        $('div.overview-mode-selector .layui-btn').on('click', function () {
            var othis = $(this), method = othis.data('method'), val = othis.data('value');
            btnAction[method] ? btnAction[method].call(this, othis, val) : '';
            $('.overview-mode-selector').children().removeClass('fm-layui-btn-active');
            othis.addClass('fm-layui-btn-active');
        });
    }

    /**
     * 向动态创建的 DOM 元素绑定事件
     */
    static AttachEventHandlerToDomMarker() {
        var btnAction = {
            "SetStart": () => {
                $('#start_pos').val(_MapMarker.x + ',' + _MapMarker.y);
                _StartMarker == null ? _StartMarker = AddImageMarker({ x: _MapMarker.x, y: _MapMarker.y, buildingID: _MapMarker.buildingID }) : MoveImageMarker(_StartMarker, { x: _MapMarker.x, y: _MapMarker.y, buildingID: _MapMarker.buildingID });
                _Navigator.setStartPoint(_StartMarker, true);
                RemoveMarker(_MapMarker);
                if (_StartMarker && _DestMarker) {
                    Route();
                }
            },
            "SetDest": () => {
                $('#dest_pos').val(_MapMarker.x + ',' + _MapMarker.y);
                _DestMarker == null ? _DestMarker = AddImageMarker({ x: _MapMarker.x, y: _MapMarker.y, buildingID: _MapMarker.buildingID }) : MoveImageMarker(_DestMarker, { x: _MapMarker.x, y: _MapMarker.y, buildingID: _MapMarker.buildingID });
                _Navigator.setDestPoint(_DestMarker, true);
                RemoveMarker(_MapMarker);
                if (_StartMarker && _DestMarker) {
                    Route();
                }
            },
        }

        $('button.layui-btn').on('click', function () {
            var othis = $(this), method = othis.data('method');
            btnAction[method] ? btnAction[method].call(this, othis) : '';
        });
    }

    /**
     * 动态渲染下拉框，并绑定事件
     * @param {*} elem 目标下拉框对象
     * @param {*} data 绑定的数据
     */
    static RenderList(elem, data) {
        let dropdown = layui.dropdown;
        dropdown.render({
            elem: elem,
            data: data,
            click: function (obj) {
                switch (elem) {
                    case '.theme-selector':
                        InitAnotherTheme(obj.id);
                        break;
                    case '.map-selector':
                        InitAnotherMap(obj.id);
                        break;
                    case '.mode-selector':
                        SetOverviewMode(obj.id);
                        break;
                    case '.tileLayer-selector':
                        UI.SetTileLayerSelector(obj.id);
                        break;
                    case '.tile3d-selector':
                        Tile3dHandleClick(obj);
                        break;
                    case '.cluster-selector':
                        MarkerClusterHandleClick(obj);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    static SetTileLayerSelector(type) {
        if (type === 'tilelayer') {
            // 矢量瓦片
            SetTileLayerMode(type)
        } else if (type === 'tilelayerAMAP') {
            // 卫星影像
            SetTileLayerMode(type)
        } else if (type === 'show') {
            // 显示/隐藏
            toggleTileLayerVisibility()
        } else if (type === 'removeTileLayer') {
            // 删除
            removeTileLayer()
        }
    }

    /**
     * 启动 Loading
     */
    static Loading() {
        layer.msg('加载中', {
            icon: 16
            , shade: 0.8
            , time: false
        });
    }

    /**
     * 关闭 Loading
     */
    static Completed() {
        this._layer.closeAll();
    }

    /* 一个弹框 */
    static Toast(msg) {
        layer.alert(msg);
    }

    static RenderInfo(msg) {
        $('.info-body').text(msg)
    }
}
