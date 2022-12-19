'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags.list ';

// Titles 
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');

  /* [Done] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [Done] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /*[Done] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /*[Done] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /*[Done] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /*[Done] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){
  console.log('Link generated');

  /* [Done] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML='';

  /*[Done] for each article create HTML of the link */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles){
    
    const articleId = article.getAttribute('id'); /*[Done] get the article id */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /*[Done] find the title element and get the title from the title element */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /*[Done] create HTML of the link */
    console.log(linkHTML);
    
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

// Tags 
function generateTags(){

  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  
  /*[Done] find all articles and for every article*/
  const articles = document.querySelectorAll(optArticleSelector);

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

      if(allTags.indexOf(linkHTML) == -1){    /* [NEW] check if this link is NOT already in allTags */
        allTags.push(linkHTML);     /* [NEW] add generated code to allTags array */
      } 
      
    
      tagsWrapper.innerHTML = html; /*[Done] insert HTML of all the links into the tags wrapper */
    }

    const tagList = document.querySelector(optTagsListSelector);   /* [NEW] find list of tags in right column */
   
    tagList.innerHTML = allTags.join(' ');   /* [NEW] add html from allTags to tagList */
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

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles){

    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);  /*find author wrapper */
    authorsWrapper.innerHTML = '';

    let html = ''; /* make html variable with empty string */

    const articleAuthor = article.getAttribute('data-author'); /* get author from data-author attribute */

    const linkHTML = '<a href="#author-' + articleAuthor + '">' + 'by ' + articleAuthor + '</a>'; /* generate HTML of the link*/

    html = html + linkHTML + '  '; /* add generated code to html variable */

    authorsWrapper.innerHTML = html; /* insert HTML of all the links into the tags wrapper */
  
  }
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
  /*execute function "generateTitleLinks" with article selector as argument ??????????????????????  */
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

