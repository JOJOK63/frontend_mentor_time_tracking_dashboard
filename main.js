import './style.scss'

const grid = document.querySelector('.js-grid-time-tracking')
fetch('./assets/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de chargement du fichier JSON');
    }
    return response.json();
  })
  .then(data => {
    createElementHtml(data)
  })
  .catch(error => {
    console.error('Une erreur s\'est produite:', error);
  });


  function createElementHtml(data){
    data.forEach(item => {
      const div_element = document.createElement('div');
      const classItemTitle =(`item-${item.title}`).toLowerCase().replace(/\s+/g, '-')
      div_element.classList.add(classItemTitle, 'grid-item')
 
     const div_item_img = document.createElement('div');
     div_item_img.classList.add(`${classItemTitle}-img`,'item-img')
     div_element.append(div_item_img); 
     
     const div_item_informations= document.createElement('div')
     div_item_img.classList.add(`${classItemTitle}-info`,'item-info')
     div_element.append(div_item_informations)
 
     const div_item_informations_name= document.createElement('div')
     div_item_informations_name.classList.add('item-info-header', `${classItemTitle}-info-header`)
     const title_div_item_informations = document.createElement('h2')
     title_div_item_informations.innerHTML= item.title;
     const dot_div_item_informations = document.createElement('span')
     div_item_informations_name.append(title_div_item_informations)
     div_item_informations_name.append(dot_div_item_informations)
     div_element.append(div_item_informations_name)
 
   const div_item_informations_current_time = document.createElement('div')
   div_item_informations_current_time.innerHTML=`${item.timeframes.daily.current}hrs`
   div_item_informations_current_time.classList.add("item-info-current-time", `${classItemTitle}-info-current-time`)
   div_item_informations.append(div_item_informations_current_time)
 
   const div_item_informations_previous_time = document.createElement('div')
   div_item_informations_previous_time.innerHTML=`Last Day${item.timeframes.daily.previous}`
   div_item_informations_previous_time.classList.add("item-info-previous-time", `${classItemTitle}-info-previous-time`)
   div_item_informations.append(div_item_informations_previous_time)
 
     grid.append(div_element)
     });
  }