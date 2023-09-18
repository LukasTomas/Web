function breadcrumpStyle( currentId ) {
    let beforeCurrent = true;
    $('.breadcrumb').children().each(function() {
        let link = $(this).children('a');
        let linkId = link.attr("id");
        if ( linkId == currentId ) {
            beforeCurrent = false;
            link.addClass("text-secondary");
        } else if ( beforeCurrent) 
            link.addClass("text-primary");
        else if ( !beforeCurrent )
            link.addClass("text-secondary disabled");
    });
}