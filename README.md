## Instructions

Step 1:
Set up a CMS of your choice (but it should be a self hosted solution) on a webserver and register a user with the name "wild" and the password "weakpw". Add a content type, collection, feed, whatever it is called in the CMS of your choice and set up fields for a slider. Every slide should have an image and a caption. Set up an endpoint to serve the content as JSON or GraphQL, so it is consumable by a React component. The caption should be in the JSON response, but won't get used in the React component.

Step 2:
Create a React component for the slider, which should be animated like in the video. Please use GSAP Draggable for the slider. The slider should work on mobile with touch as well. The images should be fetched from the previous set up CMS. The slider should have the following maximum dimensions: 590px x 680px and should be centered on an empty page.

Step 3:
Send us a zip or a URL, where we can see the final result. Please send us the URL of the JSON or GraphQL endpoint you set up