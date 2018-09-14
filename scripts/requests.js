$(document).ready(function(){
    requestToons();
    var request;
    $(".GuildData").click(function(event){

        var _guild = requestSelectedGuild();
        var _newGuild = $(this).attr("value");

        if(typeof(_guild) != "undefined" && _guild.localeCompare(_newGuild) == 0) return;

        $("#banner .selected").removeClass("selected");
        $(this).addClass("selected");

        $(".playerData").hide();
        $("." + _newGuild ).show();

        var $team = $("#teamBuilder").children();

        //requestJSON("guildData.php", { character: false, guild: requestSelectedGuild()}, updateFilteredPlayers, false);
        
        $team.each(function(){
            var _item = $(this);
            requestGuildToons(_item)
            //BuildGuildTeams(_item);
        });

        sortGuildTeams();
  
    });

    $("#chimaera").click();
});
function requestSelectedGuild(){
    return $("#banner .selected").attr("value");
}
function requestGuildToons($toon){
    requestJSON("guildData.php", { character: $toon.attr("value"), guild: requestSelectedGuild()}, guildBuildMemberTeams, $toon);
}

function requestJSON(url, data, callback, passThroughData){
    var request;

    if (request) {
        request.abort();
    }

    request = $.ajax({
        url: url,
        contentType: "application/json",
        data: data,
        datatype: "JSON"
    });

    request.done(function (response, textStatus, jqXHR){
        callback(JSON.parse(response), passThroughData);
        //callback(response, passThroughData);
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
        console.error(
            "The following error occurred: " + textStatus, errorThrown
        );

        $("#output").html("Error Getting Data");
    });
}

function requestToons(){
   var request;

    //$("#getAPIJSON").click(function(event){
        //$("#output").html("Made It");

        if (request) {
            request.abort();
        }

        request = $.ajax({
            url: "scripts/toons.json",
            contentType: "application/json",
            datatype: "JSON"
        });

        request.done(function (response, textStatus, jqXHR){
            //console.log(response);
            //BuildAllMembers();

            //BuildToonGUI(JSON.parse(response));
            BuildToonGUI(response);
            //$("#output").html(response);
            //$(".clipBoard").show(true);
        });

        request.fail(function (jqXHR, textStatus, errorThrown){
            console.error(
                "The following error occurred: " + textStatus, errorThrown
            );

            $("#output").html("Error Getting Data");
        });

        request.always(function () {
        });

}