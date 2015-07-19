var Lock = function () {

    return {
        //main function to initiate the module
        init: function () {

             $.backstretch([
		        "content/Metronic/assets/admin/pages/media/bg/1.jpg",
    		    "content/Metronic/assets/admin/pages/media/bg/2.jpg",
    		    "content/Metronic/assets/admin/pages/media/bg/3.jpg",
    		    "content/Metronic/assets/admin/pages/media/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		      });
        }

    };

}();