var auto = false;

window.onload = function() {
    let video = document.getElementById('video');

    let ops = document.getElementsByClassName('ops');
    let eds = document.getElementsByClassName('eds');

    for (i = 0; i < ops.length; i++) {
        if (ops[i].childElementCount == 0) {
            ops[i].style.display = 'none';
        }
    }

    for (i = 0; i < eds.length; i++) {
        if (eds[i].childElementCount == 0) {
            eds[i].style.display = 'none';
        }
    }

    if (localStorage.getItem('volume') != null) {
        video.volume = localStorage.getItem('volume');
        console.log("loaded volume: " + localStorage.getItem('volume'));
    }

    play_random('all', false);

    video.addEventListener("volumechange", (event) => {
        save_volume();
    });

    video.addEventListener("ended", (event) => {
        if (auto) {
            play_random('all');
        }
    });

}

function save_volume() {
    let video = document.getElementById('video');
    console.log("volume: " + video.volume)
    localStorage.setItem('volume', video.volume);
}

function change_src(url, autoplay, file_name) {
    let video = document.getElementById('video');
    let now_playing = document.getElementById('now-playing');
    now_playing.innerHTML = "Now playing: " + file_name;
    document.title = file_name;
    video.src = url;
    video.load();
    if (autoplay || autoplay == null) { video.play() };
}

function show_details(id) {
    let details = document.getElementsByClassName('details');
    for (i = 0; i < details.length; i++) {
        details[i].style.display = 'none';
    }
    let selected = document.getElementById(id);
    selected.style.display = 'flex';
}

function show_op() {
    let op_container = document.getElementById('op');
    let ed_container = document.getElementById('ed');
    let op_button = document.getElementById('op-button');
    let ed_button = document.getElementById('ed-button');
    op_container.style.display = 'grid';
    ed_container.style.display = 'none';
    ed_button.style.backgroundColor = '#333333';
    op_button.style.backgroundColor = '#52a25f';
}

function show_ed() {
    let op_container = document.getElementById('op');
    let ed_container = document.getElementById('ed');
    let op_button = document.getElementById('op-button');
    let ed_button = document.getElementById('ed-button');
    op_container.style.display = 'none';
    ed_container.style.display = 'grid';
    op_button.style.backgroundColor = '#333333';
    ed_button.style.backgroundColor = '#52a25f';
}

function play_random(mode, autoplay) {
    let link;
    let links = document.getElementsByClassName('full-link');
    let links_op = document.getElementsByClassName('full-link-op');
    let links_ed = document.getElementsByClassName('full-link-ed');

    if (mode == 'all') {
        link = links[Math.floor(Math.random() * links.length)];    
    } else if (mode == 'op') {
        link = links_op[Math.floor(Math.random() * links_op.length)];    
    } else if (mode == 'ed') {
        link = links_ed[Math.floor(Math.random() * links_ed.length)];    
    }

    let parent = link.parentElement;
    let id = parent.firstChild.nodeValue.trim();

    console.log(link.getAttribute('file_name'));

    show_details(id);
    change_src(link.innerHTML, autoplay, link.getAttribute('file_name'));
}

function toggle_auto() {
    auto = !auto;
    let button = document.getElementById('auto');
    button.style.backgroundColor = auto ? '#52a25f' : '#a44444';
}

function search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("list")[0];
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }