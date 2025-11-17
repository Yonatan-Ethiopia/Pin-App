let isDetail = false;
let justOpened = true;

let lastScrollTop = 0;
const header = document.querySelector("header");

let currentPage = 1;
let loading = false;
let isLoading=false;
let isInitial=true;

document.addEventListener("DOMContentLoaded", () => {
  const feed = document.getElementById("feed");
})

document.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    
    header.classList.add("hide");
  } else {
   
    header.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
const menuBtn = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
async function loadInitialPosts(){
	try{
		 const res = await fetch(`/api/get/Images?page=${currentPage}`)
		 const data = await res.json()
		 renderRealPosts(data)
		 console.log(data)
	}catch(err){
		console.log("Error while loading initial posts", err);
	}
}
document.getElementById("sidebarClose").addEventListener("click", () => {
    sidebar.classList.remove("active");
    menuBtn.textContent = "☰";
    document.getElementById("feed").classList.remove("blurred");
    document.getElementById("main").style.overflow = "auto";
    console.log("Overflow:auto")
    isDetail = false;
});

menuBtn.addEventListener("click", () => {
    isDetail = true;
    console.log(isDetail)
    document.getElementById("feed").classList.add("blurred");
    const main = document.getElementById("main");
    main.style.overflow = "hidden"
    console.log("Overflow hidden")
    sidebar.classList.toggle("active");
    menuBtn.textContent = sidebar.classList.contains("active") ? "✖": "☰";
});

document.addEventListener("click", (e) => {
	if( isDetail ){
	    isAnyWhere = true;
}

    if (
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sidebar.classList.remove("active");
        menuBtn.textContent = "☰";
        document.getElementById("feed").classList.remove("blurred");
        document.getElementById("main").style.overflow = "auto";
        console.log("Overflow:auto")
        isDetail = false;
    }
    if( isDetail && !justOpened && e.target.id === "det"){
		 console.log("Close")
         const closeB = document.getElementById("closeB")
         const svg = closeB.querySelector("svg");
        const full_Card = document.getElementById("fullCard");
        const upperPart = document.getElementById("upperPart")
        const det = document.getElementById("det")
        svg.classList.remove("clicked");
        void svg.offsetWidth; 
        svg.classList.add("clicked");
        if (full_Card) {
             full_Card.classList.add("out");

             setTimeout(() => {
                 document.getElementById("det").remove();
                 document.getElementById("feed").classList.remove("blurred");
                 document.getElementById("main").style.overflow = "auto"; 
            }, 200); //
            isDetail = false;
        }
        if (upperPart) {
             upperPart.classList.add("out");
             isDetail = false;
        }
        justOpened=true;
    }
});




function closeDetail() {
	justOpened=true;
    console.log("Close")
    const closeB = document.getElementById("closeB")
    const svg = closeB.querySelector("svg");
    const full_Card = document.getElementById("fullCard");
    const upperPart = document.getElementById("upperPart")
    const det = document.getElementById("det")
    svg.classList.remove("clicked");
    void svg.offsetWidth;
    svg.classList.add("clicked");
    if (full_Card) {
        full_Card.classList.add("out");

        setTimeout(() => {
            document.getElementById("det").remove(); 
            document.getElementById("feed").classList.remove("blurred");
            document.getElementById("main").style.overflow = "auto"; 
        }, 200); //
        isDetail = false;
    }
    if (upperPart) {
        upperPart.classList.add("out"); 
        isDetail = false;
    }
}
function detail(post) {
    isDetail = true;
    setTimeout(()=> justOpened=false,100)
    const sent = "5"
    console.log(post)
    const main = document.getElementById("main")
    main.style.overflow = "hidden"
    document.getElementById("feed").classList.add("blurred");
    const det = document.createElement("div");
    det.className = "det";
    det.id = "det"
    const full_Card = document.createElement("div");
    full_Card.className = "full_Card"
    full_Card.id = "fullCard"
    const img_Part = document.createElement("div");
    img_Part.className = "img_Part"
    const img = document.createElement("img");
    img.src = post.image;
    console.log("specific img src", img.src)
    console.log("Specific img link: ", post.image)
    const upper_Part = document.createElement("div");
    upper_Part.className = "upperPart"
    upper_Part.id = "upperPart"
    const closeB = document.createElement("button");
    closeB.className = "closeB"
    closeB.id = "closeB"
    closeB.innerHTML = `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M6 18L18 6" stroke="white" stroke-width="3"
    stroke-linecap="round"/>
    </svg>`;
    closeB.onclick = ()=> {
        closeDetail()
    }
    const closeImg = document.createElement("img")
    closeImg.src = "src/close.png"
    closeImg.alt = "close";
    upper_Part.appendChild(closeB);
    const footer_Part = document.createElement("div");
    footer_Part.className = "footer_P"
    const footer_Buttons = document.createElement("div");
    footer_Buttons.className = "footer_B"
    const footer_Text = document.createElement("div");
    footer_Text.className = "footer_T"
    const img_path = post.image;
    const sender = document.createElement("div");
    sender.className = "sender";
    sender.textContent = post.senderName;
    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = post.caption;
    img_Part.appendChild(img);
    det.appendChild(upper_Part)
    full_Card.appendChild(img);
    footer_Text.appendChild(sender);
    footer_Text.appendChild(caption);
    footer_Part.appendChild(footer_Text);
    full_Card.appendChild(footer_Part);
    det.appendChild(full_Card);
    main.appendChild(det);
}
const feed = document.getElementById("feed");
async function getPath(id){
	
	const imgPath = await fetch(`/api/get/Image/${id}`);
	console.log("file link: ",imgPath)
	return imgPath 
}
const loader = document.getElementById("dot-loader");
async function renderRealPosts(data) {
    const promises = [];
    const feed = document.getElementById("feed");
    const loader = document.getElementById("dot-loader");
    console.log("func called");
    if(isInitial){
		feed.style.display="none"
	}
    for (const post of data) {
        const card = document.createElement("div");
        card.className = "card";

        const cont = document.createElement("div");
        cont.className = "cont";
        const img = document.createElement("img");
        const sender = document.createElement("div");
        sender.className = "sender";
        sender.textContent = post.senderName;
        sender.style.display = "none";
        img.src = `/api/get/Images/${post.img}`;
        console.log(img.src)
        img.loading = "lazy";
		
        promises.push(new Promise((resolve) => {
            img.onload = () => {
                console.log("Image loaded: ", img.src);
				console.log("cons")
               
                sender.style.display = "block";
                resolve();
            };
            img.onerror = () => {
                card.remove(); 
                resolve(); 
            };
        }));

        
        cont.appendChild(img);
        cont.appendChild(sender);
        card.appendChild(cont);
        feed.appendChild(card);
		console.log("appended: ", feed)
        card.addEventListener("click", () => {
            const oPost = {
                image: img.src,
                senderName: post.senderName,
                caption: post.caption
            };
            if (!isDetail) detail(oPost);
        });
    }

    
    await Promise.all(promises);

   
    imagesLoaded(feed, () => {
		
		feed.style.display="block"
		isInitial=false;
		loader.style.display = "none"
        console.log("images loaded");
        new Masonry(feed, {
            itemSelector: '.card',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            gutter: 10
        });
    });
}
async function loadNextPage() {
  if (isLoading) return;
  isLoading = true;
  loader.classList.remove("hidden");

  const res = await fetch(`/api/get/Images?page=${currentPage}`);
  const photos = await res.json();
   console.log("clled render")
  renderRealPosts(photos);
  loader.classList.add("hidden");

  isLoading = false;
  currentPage++;
}
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
  ) {
	console.log("scrolled")
    loadNextPage();
  }
});

async function getImageURL(fileId) {
    const res = await fetch(`/api/get/Images/${fileId}`);
    const data = await res.json();
    return data.file; 
}




loadInitialPosts()


