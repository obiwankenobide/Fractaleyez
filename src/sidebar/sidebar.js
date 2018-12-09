import { accordion } from 'jquery-ui/ui/widgets/accordion';
import { slider } from 'jquery-ui/ui/widgets/slider';
import { checkboxradio } from 'jquery-ui/ui/widgets/checkboxradio';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';

import './sidebar.css';
import config from '../config/configuration';


/* The Sidebar component contains all options for the Visualization
 * Options are split into tabs for presets, user, audio, and visualization
 *
 */
export default class Sidebar {
  constructor() {
    this.$container = null;
    this.$sidebar = null;
    this.$tab= null;
    this.$config = null;
    this.hideTimer = null;
  }

  toggleSidebar = () => {
    if(this.$sidebar.hasClass('slide-in')) {
      this.$sidebar.removeClass('slide-in');
      this.$sidebar.addClass('slide-out');
    }
    else {
      this.$sidebar.addClass('slide-in');
      this.$sidebar.removeClass('slide-out');
    }
  }

  showTab = () => {
    if(this.hideTimer) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.$tab.removeClass('tab-fade-out');
    this.$tab.addClass('tab-fade-in');
  }

  //override event param with custom waitTime functionality
  hideTabDelayed = (waitTime) => {
    if(!this.hideTimer)
      this.hideTimer = window.setTimeout(() => {
        this.$tab.removeClass('tab-fade-in');
        this.$tab.addClass('tab-fade-out');
      }, Number.isInteger(waitTime) ? waitTime : 1000);
  }

  updateConfigCheckbox = (event) => {
    let $element = $( event.target );
    let category = $element.parent().parent().attr('id');
    let option = $element.attr('id');
    config[category][option].value = $element.is(':checked');
  }

  init() {
    //create and append sidebar elements then hide tab after 3 seconds
    this.$container = $(`<div class='sidebar-container'></div>`);
    this.$sidebar = $(`<div class='sidebar-content'></div>`);
    this.$tab = $(`<button class='tab tab-fade-in'>Menu</button>`);
    this.$config = $(`<div class='config'></div>`)
    $( document.body ).append(this.$container);
    this.$container.append(this.$sidebar);
    this.$sidebar.append(this.$tab);
    this.$sidebar.append($(`<h2 class='sidebar-title'>CONFIGURATION</h2>`));
    this.$sidebar.append(this.$config);
    this.hideTabDelayed(3000);

    //set up event listeners for animations
    this.$tab.click(this.toggleSidebar);
    this.$container.mouseenter(this.showTab);
    this.$container.mouseleave(this.hideTabDelayed);

    for (let category in config) {
      //console.log(`Category is: ${category}`);
      this.$config.append($(`<h3 class='category-title'>${category} config</h3>`)); //create category header
      let $category = $(`<div class='category-content' id=${category}></div>`);
      this.$config.append($category);
      for (let option in config[category]) {
        //console.log(config[category][option]);
        if(config[category][option].type == 'checkbox') {
          let $checkbox = $(`<input type='checkbox' name=${option} id=${option} checked=${config[category][option].value}>`);
          let $label = $(`<label for=${option}>${config[category][option].name}</label>`);
          $category.append($label);
          $label.append($checkbox);
          $checkbox.change(this.updateConfigCheckbox);
        }
        else {
          let optionObject = config[category][option];
          let $slider = $(`<div class='slider' ></div>`);
          let $sliderHandle = $(`<div class='ui-slider-handle' id=${option}'></div>`);

          $category.append($(`<p class='slider-label'>${optionObject.name}</h4>`));
          $category.append($slider);
          $slider.append($sliderHandle);
          $slider.slider({
            range: 'min',
            min: optionObject.min,
            max: optionObject.max,
            value: optionObject.value,
            step: optionObject.step,

            create: function() {
              $sliderHandle.text( $( this ).slider( 'value' ))
            },
            slide: function(event, ui) {
              $sliderHandle.text(ui.value);
              optionObject.value = ui.value;
            }
          });
        }
      }
    }


    //Now that dom is populated with config items, use JQuery UI to style elements
    this.$config.accordion({
      heightStyle: 'content'
    });
    $('input').checkboxradio({
      icon: false
    });
  }
}
