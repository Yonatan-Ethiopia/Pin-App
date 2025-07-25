let isDetail = false;
let justOpened = true;
const data = [{
    image: "src/img1.jpg",
    sender: "josh"
},
    {
        image: "src/img2.jpg",
        sender: "lolly"
    },
    {
        image: "src/img3.jpg",
        sender: "bob"
    },
    {
        image: "src/img4.jpg",
        sender: "belly"
    },
    {
        image: "src/img5.jpg",
        sender: "cushy"
    },
    {
        image: "src/img6.jpg",
        sender: "flower"
    },
    {
        image: "src/img7.jpg",
        sender: "ace"
    },
    {
        image: "src/img8.jpg",
        sender: "log"
    },
    {
        image: "src/img9.jpg",
        sender: "crown"
    },
    {
        image: "src/img10.jpg",
        sender: "tooth"
    },
    {
        image: "src/img11.jpg",
        sender: "flower"
    },
    {
        image: "src/img12.jpg",
        sender: "log"
    },
    {
        image: "src/img13.jpg",
        sender: "tooth"
    },
    {
        image: "src/img14.jpg",
        sender: "crop",
        caption: ""
    },
    {
        image: "src/img15.jpg",
        sender: "flare"
    },
    {
        image: "src/img16.jpg",
        sender: "blake",
        caption: ""
    },
    {
        image: "src/img17.jpg",
        sender: "tooth",
        caption: ""
    },
    {
        image: "src/img18.jpg",
        sender: "okay",
        caption: ""
    },
    {
        image: "src/img19.jpg",
        sender: "tooth",
        caption: ""
    },
    {
        image: "src/img20.jpg",
        sender: "tooth",
        caption: ""
    },
    {
        image: "src/img21.jpg",
        sender: "tooth",
        caption: ""
    },
    {
        image: "src/img22.jpg",
        sender: "tooth",
        caption: ""
    },
    {
        image: "src/img23.jpg",
        sender: "tooth",
        caption: ""
    },
    {
        image: "src/img24.jpg",
        sender: "tooth",
        caption: ""
    },
    {
        image: "src/img25.jpg",
        sender: "tooth",
        caption: "lol"
    },
]
console.log(data.length);
loadContent()

let lastScrollTop = 0;
const header = document.querySelector("header");

document.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.classList.add("hide");
  } else {
    // Scrolling up
    header.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
const menuBtn = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

document.getElementById("sidebarClose").addEventListener("click", () => {
    sidebar.classList.remove("active");
    menuBtn.textContent = "☰";
    document.getElementById("feed").classList.remove("blurred");
    document.getElementById("main").style.overflow = "auto";
    console.log("Overflow:auto")
    isDetail = false;
});

// Toggle sidebar
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

// Close sidebar when clicking outside
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
        svg.classList.remove("clicked"); // reset
        void svg.offsetWidth; // trigger reflow
        svg.classList.add("clicked");
        if (full_Card) {
             full_Card.classList.add("out"); // add exit animation

             setTimeout(() => {
                 document.getElementById("det").remove(); // remove after animation finishes
                 document.getElementById("feed").classList.remove("blurred");
                 document.getElementById("main").style.overflow = "auto"; // restore scroll
            }, 200); //
            isDetail = false;
        }
        if (upperPart) {
             upperPart.classList.add("out"); // add exit animation

        /*setTimeout(() => {
            document.getElementById("det").remove(); // remove after animation finishes
            document.getElementById("feed").classList.remove("blurred");
            document.getElementById("main").style.overflow = "auto"; // restore scroll
        }, 200); *///
             isDetail = false;
        }
        justOpened=true;
    }
});


function showSkeletons(count = 6) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const card = document.createElement("div");
        card.className = "card";

        const cont = document.createElement("div");
        cont.className = "cont"; // same as real layout

        const skeletonImg = document.createElement("div");
        skeletonImg.className = "skeleton skeleton-img";

        const skeletonText1 = document.createElement("div");
        skeletonText1.className = "skeleton skeleton-text";
        skeletonText1.style.width = "60%";

        const skeletonText2 = document.createElement("div");
        skeletonText2.className = "skeleton skeleton-text";
        skeletonText2.style.width = "80%";

        cont.appendChild(skeletonImg);
        cont.appendChild(skeletonText1);
        cont.appendChild(skeletonText2);
        card.appendChild(cont);
        feed.appendChild(card);
    }
}
function isEven(number) {
    return number % 2 === 0;
}
function loadContent() {
    showSkeletons(); // show placeholders first

    // simulate fetch delay (e.g. 1 second)
    setTimeout(() => {
        renderRealPosts(data); // after "loading", show actual posts
    }, 1000);
}
function closeDetail() {
	justOpened=true;
    console.log("Close")
    const closeB = document.getElementById("closeB")
    const svg = closeB.querySelector("svg");
    const full_Card = document.getElementById("fullCard");
    const upperPart = document.getElementById("upperPart")
    const det = document.getElementById("det")
    svg.classList.remove("clicked"); // reset
    void svg.offsetWidth; // trigger reflow
    svg.classList.add("clicked");
    if (full_Card) {
        full_Card.classList.add("out"); // add exit animation

        setTimeout(() => {
            document.getElementById("det").remove(); // remove after animation finishes
            document.getElementById("feed").classList.remove("blurred");
            document.getElementById("main").style.overflow = "auto"; // restore scroll
        }, 200); //
        isDetail = false;
    }
    if (upperPart) {
        upperPart.classList.add("out"); // add exit animation

        /*setTimeout(() => {
            document.getElementById("det").remove(); // remove after animation finishes
            document.getElementById("feed").classList.remove("blurred");
            document.getElementById("main").style.overflow = "auto"; // restore scroll
        }, 200); *///
        isDetail = false;
    }
}
function detail(post) {
    isDetail = true;
    setTimeout(()=> justOpened=false,100)
    const sent = "5"
    console.log(post)
    // apply blur
    // To remove it:
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
    /*closeB.appendChild(closeImg);*/
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
    sender.textContent = post.sender;
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
function renderRealPosts(data) {
    feed.innerHTML = "";
    data.forEach((post, index) => {

        //const feed = document.getElementById("feed");

        const card = document.createElement("div");
        card.className = "card"
        const imgPath = post.image;
        const senderName = post.sender;
        const caption = post.caption;
        card.addEventListener("click", ()=> {
            const oPost = {
                image: imgPath, sender: senderName, caption: caption
            }
            if (!isDetail) {
                console.log(isDetail)
                detail(oPost);
            }
        });

        const img = document.createElement("img")
        img.src = post.image;
        const sender = document.createElement("div");
        const cont = document.createElement("div");
        cont.className = "cont"
        sender.className = "sender";
        sender.textContent = post.sender;
        cont.appendChild(img);
        cont.appendChild(sender);
        card.appendChild(cont);
        setTimeout(() => {
            feed.appendChild(card); // after "loading", show actual posts
        },
            100);;

    });
}
/*
for( i=0, i<data.length, i++){
    const card = document.getElementById("card")
    const card2 = document.getElementById("card2")
    const img = document.createElement("img")
    img.src = post.image;
    const sender = document.createElement("div");
    sender.className = "sender";
    sender.textContent = post.sender;
    if( true ){
        card.appendChild(img);
        card.appendChild(sender);
        feed.appendChild(card);
    }else{
        card2.appendChild(img);
        card2.appendChild(sender);
        feed.appendChild(card);
    }
}*/
