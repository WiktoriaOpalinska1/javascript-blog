'use strict';

/* Mam pytanie -  nie mam pomysłu, gdzie może być błąd w klikaniu na autorów po prawej. 
Klikanie na autorów w tytule działa jak powinno, a w chmurze już pojawia się błąd mimo, że atrybut href jest taki sam. 
W którym  miejscu szukać błędu?*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags.list ',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

// Titles 
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');
 
  const activeLinks = document.querySelectorAll('.titles a.active');    /* [Done] remove class 'active' from all article links  */

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  //console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');   /* [Done] add class 'active' to the clicked link */
  
  const activeArticles = document.querySelectorAll('.posts article.active');    /*[Done] remove class 'active' from all articles */
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
  const articleSelector = clickedElement.getAttribute('href');    /*[Done] get 'href' attribute from the clicked link */
  //console.log(articleSelector);

  const targetArticle = document.querySelector(articleSelector);     /*[Done] find the correct article using the selector (value of 'href' attribute) */
  //console.log(targetArticle);

  targetArticle.classList.add('active');    /*[Done] add class 'active' to the correct article */
}

function generateTitleLinks(customSelector = ''){
  console.log('Link generated');

 
  const titleList = document.querySelector(optTitleListSelector);     /* [Done] remove contents of titleList */
  
  titleList.innerHTML='';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);    /*[Done] for each article create HTML of the link */

  let html = '';

  for (let article of articles){
    
    const articleId = article.getAttribute('id'); /*[Done] get the article id */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /*[Done] find the title element and get the title from the title element */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /*[Done] create HTML of the link */
    //console.log(linkHTML);
    
    html = html + linkHTML; /*[Done] insert link into titleList */
    //console.log(html)
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// Parameters and Classes of tags 
function calculateTagsParams(tags){

  const params = { max: 0, min: 9999};

  for (let tag in tags){
    if (params.max < tags[tag]){
      params.max = tags[tag];
    } 
    if (params.min > tags[tag]){
      params.min = tags[tag];
    }
  }

  return params;
}

function calcualteTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix  + classNumber;

}

// Tags 
function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  
  const articles = document.querySelectorAll(optArticleSelector);   /*[Done] find all articles and for every article*/

  for (let article of articles){

    const tagsWrapper = article.querySelector(optArticleTagsSelector);  /*[Done] find tags wrapper */
    tagsWrapper.innerHTML = '';

    let html = ''; /*[Done] make html variable with empty string */
    
    const articleTags = article.getAttribute('data-tags');  /*[Done] get tags from data-tags attribute */
    
    const articleTagsArray = articleTags.split(' ');  /* split tags into array */

    /*[Done] for each tag generate HTML of the link*/
    for (let tag of articleTagsArray){

      const linkHTML = '<li><a href="#tag-'+ tag +'"><span>' + tag + '</span></a></li>';
      //console.log(linkHTML);
      
      html = html + linkHTML + '  '; /*[Done] add generated code to html variable */

      if(!allTags.hasOwnProperty(tag)){    /* [NEW] check if this link is NOT already in allTags */
        allTags[tag] = 1;     /* [NEW] add generated code to allTags  object */
      } else {
        allTags[tag]++;
      } 

      tagsWrapper.innerHTML = html; /*[Done] insert HTML of all the links into the tags wrapper */
    }

    const tagList = document.querySelector(optTagsListSelector);   /* [NEW] find list of tags in right column */

    /* [NEW] calcualte parameters of tags */
    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams: ', tagsParams);
   
    let allTagsHTML = ''; /* [NEW] create variable for all links HTML code */
    
    /* [NEW] A loop: for each tag in all Tags 
    [NEW] generate code of a link and add it to allTagsHTML*/
    for (let tag in allTags){
      allTagsHTML += '<a href="#tag-' + tag + '"><li class="' +  calcualteTagClass(allTags[tag], tagsParams) + '">' + tag + '(' + allTags[tag] + ') ' + '</li></a>';
    }

    tagList.innerHTML = allTagsHTML;   /* [NEW] add html from allTagsHTML to tagList */
    //console.log(allTags);
  }
}

generateTags();

function tagClickHandler(event){

  /*[Done] prevent default action for this event 
  and make new constant named "clickedElement" and give it the value of "this" */
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href'); /*[Done] new constant "href" and with the attribute "href" of the clicked element */

  const tag =  href.replace('#tag-', ''); /*[Done] new constant "tag" with extracted tag from the "href" constant */

  /*[Done] find all tag links with class active and for each active tag link remove class active*/
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags){
    activeTag.classList.remove('active'); 
  } 

  /*[Done] find all tag links with "href" attribute equal to the "href" constant 
  and  for each found tag link add class active*/
  const equalHrefs = document.querySelectorAll('a[href="' + href + '"]');

  for (let equalHref of equalHrefs){
    equalHref.classList.add('active'); 
  }  

  /*[Done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags 
  and for each link add tagClickHandler as event listener for that link */
  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');

  for (let tagsLink of tagsLinks){
    tagsLink.addEventListener('click', tagClickHandler);
  } 
}

addClickListenersToTags();

// Authors
function generateAuthors(){

  let allAuthors = {};    /* [NEW] create a new variable with an empty object */

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles){

    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);  /*find author wrapper */
    authorsWrapper.innerHTML = '';

    let html = ''; /* make html variable with empty string */

    const articleAuthor = article.getAttribute('data-author'); /* get author from data-author attribute */

    const linkHTML = '<a href="#author-' + articleAuthor + '">' + 'by ' + articleAuthor + '</a>'; /* generate HTML of the link*/

    html = html + linkHTML + '  '; /* add generated code to html variable */

    /* [NEW] check if this author is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add author to allAuthors object*/
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    
    authorsWrapper.innerHTML = html; /* insert HTML of all the links into the tags wrapper */
  }

  const authorList = document.querySelector(optAuthorsListSelector);
  //authorList.innerHTML = allAuthors.join(' ');

  /* [NEW] calcualte parameters of tags */
  const authorParams = calculateTagsParams(allAuthors);

  let allAuthorsHTML = '';

  /* [NEW] A loop: for each author in allAuthors 
    [NEW] generate code of a link and add it to allAuthorsHTML*/
  for (let author in allAuthors){
    allAuthorsHTML += '<a href="#author-' + author + '"><li class="' +  calcualteTagClass(allAuthors[author], authorParams) + '">' + author + '(' + allAuthors[author] + ') ' + '</li></a>';
  }

  authorList.innerHTML = allAuthorsHTML;
}


generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event 
  and make new constant named "clickedElement" and give it the value of "this" */
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href'); /*new constant "href" and with the attribute "href" of the clicked element */

  const author =  href.replace('#author-', ''); /* new constant "tag" with extracted tag from the "href" constant */

  /*find all authors links with class active and for each active tag link remove class active*/
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active'); 
  } 

  /*find all tag links with "href" attribute equal to the "href" constant 
  and  for each found tag link add class active*/
  const sameAuthors = document.querySelectorAll('a[href="' + href + '"]');

  for (let sameAuthor of sameAuthors){
    sameAuthor.classList.add('active'); 
  }  

  /*execute function "generateTitleLinks" with article selector as argument  */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
  /* find all links to authors 
  and for each link add authorClickHandler as event listener for that link */
  const authorsLinks = document.querySelectorAll('.post-author a');

  for (let authorLink of authorsLinks){
    authorLink.addEventListener('click', authorClickHandler);
  } 
}

addClickListenersToAuthors();