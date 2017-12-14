import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as ol from 'openlayers';
declare let $
@Component({
  selector: 'app-earthquake',
  templateUrl: './earthquake.component.html',
  styleUrls: ['./earthquake.component.css']
})
export class EarthquakeComponent {

  constructor() { }

  ngAfterViewInit() {
    var styleCache = {};
    var styleFunction = function(feature) {
      // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
      // standards-violating <magnitude> tag in each Placemark.  We extract it from
      // the Placemark's name instead.
      var name = feature.get('name');
      var magnitude = parseFloat(name.substr(2));
      var radius = 5 + 20 * (magnitude - 5);
      var style = styleCache[radius];
      if (!style) {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: radius,
            fill: new ol.style.Fill({
              color: 'rgba(255, 153, 0, 0.4)'
            }),
            stroke: new ol.style.Stroke({
              color: 'rgba(255, 204, 0, 0.2)',
              width: 1
            })
          })
        });
        styleCache[radius] = style;
      }
      return style;
    };

    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: 'https://openlayers.org/en/v4.6.4/examples/data/kml/2012_Earthquakes_Mag5.kml',
        format: new ol.format.KML({
          extractStyles: false
        })
      }),
      style: styleFunction
    });

    var raster = new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'toner'
      })
    });

    var map = new ol.Map({
      layers: [raster, vector],
      target: 'map',
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });

    var info = $('#info');
    info.tooltip({
      animation: false,
      trigger: 'manual'
    });

    var displayFeatureInfo = function(pixel, evt?, coor?) {
      info.css({
        left: pixel[0] + 'px',
        top: (pixel[1] - 15) + 'px'
      });
      var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
       
        return feature;

      });
      if (feature) {
        info.tooltip('hide')
            .attr('data-original-title', evt ? feature.get('name') + ", "+ evt.coordinate : feature.get('name'))
            .tooltip('fixTitle')
            .tooltip('show');


        
          if(evt.type == "dblclick")
          {   
            info.tooltip('hide');
            $('.ui.modal')
            .modal('show');
            $('.custom.letters').text(coor)

          }
      } else {
        info.tooltip('hide');
      }
    };

    map.on('pointermove', function(evt) {
      if (evt.dragging) {
        info.tooltip('hide');
        return;
      }
      displayFeatureInfo(map.getEventPixel(evt.originalEvent));
    });

    map.on('click', function(evt) {
      displayFeatureInfo(evt.pixel, evt);
      console.log("click");
    
    });

    map.on('dblclick', function(evt) {
      var coor = evt.coordinate;
      displayFeatureInfo(evt.pixel, evt , coor);
  
    
    });




  }

}
