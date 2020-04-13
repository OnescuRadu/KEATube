$(function() {
  $.get('videos?page=1', response => {
    response.response.map(video => {
      $('#video-gallery').append(`
              <div class='col-lg-3 col-md-4 col-6 mb-4 text-center'>
                <a href=/player/${video.fileName} class='d-block h-100 '>
                  <img
                    class='img-fluid '
                    src=${video.thumbnail}
                    alt='Video Image'
                  />
                  <h6 class='d-block video-thumbnail-title pt-2 pb-2'>${video.title}</h6>
                </a>
              </div>
              `);
    });
  });
});
