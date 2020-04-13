let url = window.location.href;
let videoId = url.split('/').pop();
$(function() {
  $.get(`/videos/${videoId}`)
    .then(response => {
      $('#video-title').text(response.response.title);
      $('#video-description').text(response.response.description);
      $('#video-upload-date').text(
        new Date(response.response.uploadDate).toLocaleString()
      );
      const player = `<video controls width="500px" height="auto" id="video-player">
                    <source src="/${videoId}" />
                    Your browser does not support the video tag.
                </video>`;

      $('#player-wrapper').append(player);
    })
    .catch(error => {
      $('#video-title').text('Video not found.');
    });
});
