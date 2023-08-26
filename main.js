import './style.scss'

const grid = document.querySelector('.js-grid-time-tracking')
// modification for netlify 
var   data_json=[
  {
    "title": "Work",
    "timeframes": {
      "daily": {
        "current": 5,
        "previous": 7
      },
      "weekly": {
        "current": 32,
        "previous": 36
      },
      "monthly": {
        "current": 103,
        "previous": 128
      }
    }
  },
  {
    "title": "Play",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 2
      },
      "weekly": {
        "current": 10,
        "previous": 8
      },
      "monthly": {
        "current": 23,
        "previous": 29
      }
    }
  },
  {
    "title": "Study",
    "timeframes": {
      "daily": {
        "current": 0,
        "previous": 1
      },
      "weekly": {
        "current": 4,
        "previous": 7
      },
      "monthly": {
        "current": 13,
        "previous": 19
      }
    }
  },
  {
    "title": "Exercise",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 1
      },
      "weekly": {
        "current": 4,
        "previous": 5
      },
      "monthly": {
        "current": 11,
        "previous": 18
      }
    }
  },
  {
    "title": "Social",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 3
      },
      "weekly": {
        "current": 5,
        "previous": 10
      },
      "monthly": {
        "current": 21,
        "previous": 23
      }
    }
  },
  {
    "title": "Self Care",
    "timeframes": {
      "daily": {
        "current": 0,
        "previous": 1
      },
      "weekly": {
        "current": 2,
        "previous": 2
      },
      "monthly": {
        "current": 7,
        "previous": 11
      }
    }
  }
]

fetch('./assets/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de chargement du fichier JSON');
    }
    return response.json();
  })
  .then(data => {
    createElementHtml(data_json)
   // data_json = data;
  })
  .catch(error => {
    console.error('Une erreur s\'est produite:', error);
  });



  function createElementHtml(data,data_value){
    data.forEach(item => {
      const div_element = document.createElement('div');
      const classItemTitle =(`item-${item.title}`).toLowerCase().replace(/\s+/g, '-')
      const title = (`${item.title}`).toLowerCase().replace(/\s+/g, '-')
      div_element.classList.add(classItemTitle, 'grid-item')
 
     const div_item_img = document.createElement('div');
     div_item_img.classList.add(`${classItemTitle}-img`,'item-img')
     div_item_img.style.backgroundImage = `url(assets/images/icon-${title.toLowerCase()}.svg)`;
     div_element.append(div_item_img); 
     
     
     const div_item_informations= document.createElement('div')
     div_item_informations.classList.add(`${classItemTitle}-info`,'item-info')
     div_element.append(div_item_informations)
 
     const div_item_informations_name= document.createElement('div')
     div_item_informations_name.classList.add('item-info-header', `${classItemTitle}-info-header`)
     const title_div_item_informations = document.createElement('h2')
     title_div_item_informations.innerHTML= item.title;
     const dot_div_item_informations = document.createElement('span')
     div_item_informations_name.append(title_div_item_informations)
     div_item_informations_name.append(dot_div_item_informations)
     div_item_informations.append(div_item_informations_name)
 
     const div_item_informations_time = document.createElement('div')
     div_item_informations_time.classList.add(`item-info-time`, `item-info-${classItemTitle}-time`)
     const div_item_informations_current_time = document.createElement('p')
     const div_item_informations_previous_time = document.createElement('p')
     
     if(data_value === "monthly"){
      div_item_informations_current_time.innerHTML=`${item.timeframes.monthly.current}hrs`
      div_item_informations_previous_time.innerHTML=`Last Month - ${item.timeframes.monthly.previous}hrs`
     }else if(data_value === "weekly"){
      div_item_informations_current_time.innerHTML=`${item.timeframes.weekly.current}hrs`
      div_item_informations_previous_time.innerHTML=`Last Week - ${item.timeframes.daily.previous}hrs`
     } else {
      div_item_informations_current_time.innerHTML=`${item.timeframes.daily.current}hrs`
      div_item_informations_previous_time.innerHTML=`Last Day - ${item.timeframes.daily.previous}hrs`
     }  
   
     
     div_item_informations_previous_time.classList.add("item-info-previous-time", `${classItemTitle}-info-previous-time`)
     div_item_informations_current_time.classList.add("item-info-current-time", `${classItemTitle}-info-current-time`)
     
     div_item_informations_time.append(div_item_informations_current_time)
   div_item_informations_time.append(div_item_informations_previous_time)
   div_item_informations.append(div_item_informations_time)
 
     grid.append(div_element)
     });
  }


  const timer_selector = document.querySelectorAll('.timer-select');

  timer_selector.forEach(button => {
    button.addEventListener('click', (e) => {
      grid.innerHTML=""
      // Retirer la classe active de tous les boutons
      timer_selector.forEach(btn => btn.classList.remove('active'));
      
      // Ajouter la classe active uniquement au bouton cliqué
      button.classList.add('active');
      
      const data_value = button.getAttribute('data-value');
      createElementHtml(data_json, data_value);    
    });
  });
  