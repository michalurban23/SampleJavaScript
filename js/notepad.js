function getIndexOfLastNote() {
    var lastIndex = localStorage.getItem("index");
    if (lastIndex == null) {
        return 0
    } else {
        return parseInt(lastIndex);
    }
}

function addRemoveEvent() {
    $(".remove_button").click(function() {
        $(this).parent().parent().hide();
        localStorage.removeItem($(this).parent().parent().attr("id"));
    });
}

function saveNote(note) {
    localStorage.setItem(note.index,JSON.stringify(note));
}

function getNoteByElement(elem) {
    var id;
    if ($(elem).attr("class") == "title") {
        id = $(elem).parent().parent().parent().attr("id");
        console.log("title " + id);
    } else {
        id = $(elem).parent().parent().attr("id");
        console.log("message " + id);
    }
    return JSON.parse(localStorage.getItem(id))
}

function addUpdateEvent() {
    $("textarea.title").change(function () {
        note = getNoteByElement(this);
        note.title = this.value;
        saveNote(note);
    });
    $("textarea.message").change(function () {
        note = getNoteByElement(this);
        note.message = this.value;
        saveNote(note);
    })
}

function saveToLocalStorage(note) {
    localStorage.setItem("index", note.index)
    saveNote(note);
}

function addDiv(index) {
    return "<div class=\"note\" id=\"" + index + "\">" +
              "<div class=\"title\">" +
                "<div><textarea class=\"title\" name=\"title\" rows=\"1\" cols=\"15\"></textarea></div>" +
                "</div>" +
                "<div><button class=\"remove_button\" type=\"button\" name=\"remove_button\">X</button></div>" +
              "<div class=\"message\">Note: <textarea class=\"message\" name=\"message\" rows=\"12\" cols=\"20\"></textarea></div>" +
           "</div>";
}

function loadNotesFromStorage() {
    for (i=1; i <= getIndexOfLastNote() ; i++) {
        var noteData = JSON.parse(localStorage.getItem(i));
        if (noteData != null) {
            $(".notes").append(addDiv(note));
            var note = $(".note").filter(":last");
            note.attr("id", noteData.index);
            note.find("textarea.title").text(noteData.title);
            note.find("textarea.message").text(noteData.message);
        }
    }
}

function getNewNote() {
    var note = {
        "index": 1 + getIndexOfLastNote(),
        "title": "",
        "message": ""
    }
    return note;
}

function addEvents() {
    addRemoveEvent();
    addUpdateEvent();
}

$(document).ready(function() {
    loadNotesFromStorage();
    addEvents();
});

$(document).ready(function () {
    $("#add_button").click(function() {
        var newNote = getNewNote();
        var newDiv = addDiv(newNote.index);
        $(".notes").append(newDiv);
        addEvents();
        saveToLocalStorage(newNote);
    });
});
