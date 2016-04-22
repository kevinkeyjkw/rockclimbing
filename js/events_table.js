function EventsTable(events, handler) {
    this.events = events;
    this.handler = handler;

// returns the html for a single event div element
// an event is an object with the following fields:
// 1. date (string for now)
// 2. location (string for now)
// 3. difficulty (number in range 0-15)
// 4. num (number) - number of participants 
// event_idx is an integer reference from the html object to the index of the event
// object list

this.render_event = function(event, event_idx) {
    //console.log("rendering event!");
    date_field = $("<td></td>")
        .addClass("classWithPad")
        .css("width", "150px")
        .append(event.date.toUTCString()); //TODO should span two lines
    //console.log(date_field);
    loc_field = $("<td></td>")
        .addClass("classWithPad")
        .css("width", "150px")
        .append(event.location + "<br>" + "40 Miles");
    //console.log(loc_field);
    diff_field = $("<td></td>")
        .addClass("classWithPad")
        .addClass("text-center")
        .css("width", "150px")
        .append("V" + event.difficulty);
    //console.log(diff_field);
    //num_field = $("<td></td>")
    //    .addClass("classWithPad")
    //    .css("width", "150px")
    //    .append(event.numParticipants + " Participants");
    //console.log(num_field);
    element = $('<a href="#"></a>').addClass("list-group-item").append(
        $('<table></table>').append(
            $('<tr></tr>')
                .append(date_field)
                .append(loc_field)
                .append(diff_field)
        //        .append(num_field)
        ))
        .attr("event_idx", event_idx);
    //console.log(element.html());
    return element;
};

// appends the event table, including header, to the parent element
this.append_event_table = function(parent, type) {
    var events = this.events[type];
    console.log('events', events);
    table = $("<div></div>")
    .append(
    $("<table></table>")
        .append(
            $("<tr></tr>").attr("id", "sort_by_buttons")
            .append($("<td></td>").attr("id", "sort_by_date").addClass("classWithPad").addClass("text-center").css("width", "150px").html("Date and Time"))
            .append($("<td></td>").attr("id", "sort_by_location").addClass("classWithPad").addClass("text-center").css("width", "150px").html("Location"))
            .append($("<td></td>").attr("id", "sort_by_difficulty").addClass("classWithPad").addClass("text-center").css("width", "150px").html("Difficulty"))
                //.append($("<td></td>").attr("id", "sort_by_num").addClass("classWithPad").addClass("text-center").css("width", "150px").html("Number of Participants"))
            ))
    .append(
        $("<div></div>").addClass("list-group").attr("id", "event_list"));

    $(parent).append(table);
    for (var i = 0; i < events.length; i++) {
        console.log('appending',events[i]);
        $("#event_list").append(this.render_event(events[i], i));
    }

    $("#event_list" ).on( "click", "a", function( event ) {
        $("#event_list a").removeClass("active");
        $(this).addClass("active");
        event.preventDefault();
    });

    $("#sort_by_buttons").on("click", "td",
        function(e) {
            //console.log("clicked on a sort by button");
            $("#sort_by_buttons td").css("font-weight", "");
            $(this).css('font-weight', 'bold');
        });
    
    // TODO click handlers for the sort button
    $("#sort_by_date").on("click", function(e) {
    });
    $("#sort_by_location").on("click", function(e) {
    });
    $("#sort_by_difficulty").on("click", function(e) {
    });
    $("#sort_by_num").on("click", function(e) {
    });
    
    $("#sort_by_buttons").on("mouseover", "td",
        function(e) {
            //console.log("mouseover a sort by button");
            $("#sort_by_buttons td").css("text-decoration", "");
            $(this).css('text-decoration', 'underline');
    });

    var that = this;
    $(parent).on("click", "a",
        function(e) {
            // find the reference to the event object
            event_idx = $(this).attr("event_idx");
            that.handler(that.events[type][event_idx], event_idx);
        }
    );

};

};




