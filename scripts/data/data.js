const projectData = [
  {
    title: "Video Game Clip Sharer",
    icon: "/assets/images/projects/geenetclips.png",
    summary:
      "This website allows users to upload and interact with video game clips.",
    description1:
      "Originally, this website was built with Node.js, Express.js, and PostgreSQL. It was hosted on an AWS EC2 Linux instance. Reaching the limits of the AWS Free Tier, I needed new solution. Our family has a Siteground membership, so I was able to host my website there! However, this meant I needed to rewrite the server code into PHP and switch from from PostgreSQL to MySQL.<br><br> Information about the users, videos, comments, and likes are stored in the database. When a user is deleted, all their likes and videos are also deleted. The PHP server uses a custom Database class to send a query, and embeds the returned information onto the page. <br><br>The videos are stored using an AWS S3 Bucket. The website retrieves a CloudFront URL from the database and embeds the video onto the page. The maximum video size is 100MB, to keep them at around 30 seconds each. This uses a custom Storage class.",
    gif1: "/assets/gifs/clipsharer-demo.gif",
    description2: "",
    gif2: "",
    link: "https://geenetclips.com/",
  },
  {
    title: "Pathfinding Visualizer",
    icon: "/assets/images/projects/pathfinder.png",
    summary:
      "This website uses various pathfinding algorithms to find the shortest path between two points on a grid.",
    description1:
      "When the website is loaded, a grid is generated using a 2D array. Each square in the grid contains a JavaScript object. These objects have attributes such as “square.distance”, “square.isStart”, etc. These attributes are used by algorithms to scan the grid. <br><br>In the Dijkstra’s Algorithm example shown here, all the squares are given a distance of “Infinity,” except for the start, which is set to 0. The array is sorted by these distances. Next, the squares above, below, to the left, and to the right of the start are checked. The weight of this neighbor square is added to its distance of the current square. The current square is then set as “isVisited”. If not a wall or the final node, the neighbor squares are then checked as well. Once the final node is reached, all visited nodes are returned. The fastest path can be tracked backward to the start by using the final square's “previous-node” attribute.",
    gif1: "/assets/gifs/pathfinder.gif",
    description2:
      "There is also a maze generation button that can be used to create unique pathing options. <br><br>The maze is generated with a Depth-first recursion algorithm. First, every square is filled with a wall. Then, a random start point is found. This point is marked as visited. Then, one of the neighbor squares are picked at random, and the wall is erased. If all the neighbors have been visited, then the function backtracks. It continues to check for unvisited squares until every square has been visited. The path is then returned and animated.",
    gif2: "/assets/gifs/maze.gif",
    link: "https://atpugh20.github.io/pathfinding-visualizer/",
  },
  {
    title: "Ocarina Simulator",
    icon: "/assets/images/projects/ocarina.png",
    summary:
      "This website simulates the ocarina from “The Legend of Zelda: Ocarina of Time.”",
    description1:
      'The two game modes currently available are freestyle and the scrub Simon game. <br><br>Freestyle allows the user to play whatever notes they desire, to a maximum of 8 notes. They can also play certain songs that will change the background image. For those who have played "Ocarina of Time", these are the warp songs. <br><br>The scrub simon game starts with a sequence of 3 notes that the user must memorize and play. After the user correctly plays the sequence, the game adds another note, to a maximum of 8 notes. To properly program the sequence, an async function declaration and a Promise object were needed.',
    gif1: "/assets/gifs/ocarina.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/geenet-games/public/ocarina_game.html",
  },
  {
    title: "Lucy's Website",
    icon: "/assets/images/projects/lucy_website.png",
    redirect: true,
    link: "https://luciennefranco.com/",
  },
  {
    title: "Yahtzee",
    icon: "/assets/images/projects/yahtzee.png",
    summary:
      'This website allows the user to play the dice game known as "Yahtzee."',
    description1:
      "The project uses JavaScript to add functionality to various HTML elements. These elements include dice, tables, and buttons. <br><br>The script performs different calculations depending on what cell you are trying to fill in the score table. For example, the large straight calculation checks to see if the roll has both five unique numbers and if these five unique numbers are sequential.",
    gif1: "/assets/gifs/yahtzee.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/geenet-games/public/yahtzee",
  },
  {
    title: "Pokédex",
    icon: "/assets/images/projects/pokedex.png",
    summary: "This website lists and describes all known Pokémon.",
    description1:
      "The Pokédex uses a fetch request to pull data from PokéAPI. The data is then saved to local storage as an array of objects to speed up future loading times. <br><br>I chose to continue using the API on the initial load instead of the already gathered data. This is so that when there are more Pokémon inevitably added to the API, the program will be able to update itself, rather than me having to go in and update the array every time that a new Pokémon game comes out. <br><br>The Pokédex uses React’s useState function and a custom sortData function to dynamically update which cards are displayed on the screen. <br><br>The biggest issue facing this project is the extensive initial loading time, especially on mobile devices. My current ideas for fixing this issue are as follows: Hard coding the fetched data and checking for additional Pokémon with an API call. Having an initial API call that fetches the metadata, then making additional calls when the data is needed. Checking the API documentation to see if it is possible to combine API calls that are related by the Pokémon itself.",
    gif1: "/assets/gifs/pokedex.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/pokedex/",
  },
  {
    title: "ButterCup Go! Player",
    summary: 'This program automates a web-browser game called "ButterCup GO!"',
    icon: "/assets/images/projects/buttercup.png",
    description1: `Every part of the game is an HTML element, so we can target all the text, buttons, obstacles, and characters in the game. <br><br>The bot tracks the height of the incoming obstacle and moves the character up or down to get through it. Once that obstacle reaches an x position of 600px, it switches its focus to the second obstacle and adjusts the character's height accordingly. <br><br>When the bot loses, it submits the score and replays the game. Performance generally differs depending on which web browser is used by the code. I currently have Firefox as the default browser.`,
    gif1: "/assets/gifs/buttercupgobot.gif",
    description2: "",
    gif2: "",
    link: "https://github.com/atpugh20/buttercupgo-player/blob/main/main.py",
  },
  {
    title: "Space Canvas",
    icon: "/assets/images/challenges/space.png",
    summary:
      "This project serves as the background for this website, and uses a parallax effect to draw space with depth.",
    description1:
      "There are five different classes used. These are Star, Ship, Boost, Asteroid, and OtherShip. Ship and Boost are singular instances that affect each other. Star, Asteroid, and OtherShip all have multiple instances that are established at the beginning of the program. <br><br>Star, Asteroid, and OtherShip each have a distance property. This distance is a random number between 1 and 10. If the object is closer (1) then it is larger and faster. If the object is further (10) then it is smaller and slower. This creates a parallax effect. <br><br>Each asteroid is a circle-like shape. Each has a set number of vertices. The vertex’s position is calculated by taking the asteroids radius and adding a number between -radius / 4 and radius / 4. It does this for each vertex’s direction, which is calculated with 360 / vertexNum.",
    gif1: "/assets/gifs/stars.gif",
    description2:
      "Both the ship and the boost move in a wave-like motion. The ships Y coordinate is calculated using the sine of an X value that increases every frame. The ship moves up and down consistently with this. The boost is drawn behind the ship as a series of small circles that are connected. <br><br>To get the ship to rotate accurately with the boost wave, the canvas of the ship needed to be rotated. The angle of rotation is calculated by getting the cosine of the same X value, dividing it by Pi, and multiplying it by -1.",
    gif2: "/assets/gifs/ship.gif",
    link: "",
  },
  {
    title: "2-D Raycaster",
    icon: "/assets/images/challenges/raycaster2d.png",
    summary:
      "This project uses an HTML canvas to show how light interacts with boundaries in a 2D setting.",
    description1:
      "I used three classes: Boundary, Ray, and Particle. A boundary is simply a wall that can stop a ray from extending further. A ray is a line that extends out in a certain direction (vector). A particle is an origin point for multiple rays. <br><br>The particle can be moved around the canvas with the user’s mouse. The rays shine out from this particle in every direction and extend out until they reach a boundary. <br><br>Sliders have been provided that adjust certain parts of the ray caster. Ray Color changes the color gradient of the ray to include the color selected. Ray Count changes the number of rays that are cast from the particle. Ray Length changes the maximum distance that a ray can shine before ending. Ray Strength changes the point of the ray that the color gradient begins to change.",
    gif1: "/assets/gifs/2draycast.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/raycaster.html",
  },
  {
    title: "Rendering the Raycaster",
    icon: "/assets/images/challenges/raycast-render.png",
    summary:
      "This project builds on the 2-D Raycaster by rendering a scene from a select field of view.",
    description1:
      "Instead of casting rays in every direction, shown rays are limited to a certain field of view. This field of view is used to build a “scene.” This scene is an array of information that is gathered from each ray. If there is a wall, the scene will have that information. <br><br>Once the scene is gathered, the canvas is split into equal parts along the x-axis, one for each ray. For each ray, if a wall is detected, then it will draw a rectangle. The height of this rectangle is calculated based on the distance from it to the particle. <br><br> The particle can be moved and turned by the user using the W, A, S, and D keys. Just like with the original ray caster, if the page is refreshed, a new set of boundaries are generated, allowing the particle to move about a different area.",
    gif1: "/assets/gifs/render.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/render-raycaster.html",
  },
  {
    title: "Rendering the Raycaster 2",
    icon: "/assets/images/challenges/render-objects.png",
    summary:
      "This project builds on “Rendering the Raycaster” by introducing new elements and improving the code.",
    description1:
      "The previous project had a lot of jerky movement that seemed inconsistent. The particle movement function was improved to make this movement a lot smoother. <br><br>Multiple new classes are introduced. The Wall class improves boundary creation by adding a second dimension. The walls appear to be rectangular rather than just single lines. The color is now decided by this wall class rather than the ray, making it to where each wall can have its own color. <br><br>The Item class draws an image of an item to the screen that appears as though it is being held by the player. The two items currently available are a sword and a stick. An Enemy class is also programmed but is not used currently. <br><br>The Objects class serves as a data structure for any element that could be rendered on the main canvas. Methods that are specific for this rendering are also declared in this class.",
    gif1: "/assets/gifs/renderObjects.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/render-objects/render-objects.html",
  },
  {
    title: "Sand Simulation",
    icon: "/assets/images/challenges/sand.png",
    summary:
      "This project simulates falling sand and how it interacts with other particles.",
    description1:
      "A simple crosshair replaces the user’s cursor when the mouse is on the canvas. This crosshair is the same color as the selected sand color. This color is slightly randomized to create a grainy effect. <br><br>When the user clicks, sand is created at that location, and starts to drop to the bottom of the screen. If it reaches the bottom of the screen, it stops moving.  <br><br>If it reaches another sand particle that is stopped, then it checks below-left and below-right for other sand particles. If there is one on one of the sides but not the other, then the current particle moves diagonally to the side without sand. If there is sand on both sides, then the particle stops. If there is no sand on either side, then a random direction is selected.",
    gif1: "/assets/gifs/sand.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/sand.html",
  },
  {
    title: "Textures - Perlin Noise",
    icon: "/assets/images/challenges/texture.png",
    summary: 'This project uses "noise" to generate a random texture.',
    description1:
      "Using “Perlin Noise”, a number between 0-100 is generated for each square of the canvas. This number is used as the saturation of the square. The same generic color is used for each, but the change in saturation gives each square a different level of darkness or lightness. <br><br>The noise makes it to where each square’s saturation is slightly affected by the ones around it. This is what makes the randomization seem orderly. <br><br>For the noise algorithm, I use a library created by Joe Iddon. Their algorithm generates a number between -1 and 1, but I restructured it in my code to produce a number between 0 and 1. <br><br>The library can be found at: https://github.com/joeiddon/perlin",
    gif1: "/assets/gifs/texture.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/perlin-texture.html",
  },
  {
    title: "2-D Terrain - Perlin Noise",
    icon: "/assets/images/challenges/2d-terrain.png",
    summary:
      "This project uses “noise” to randomly generate two-dimensional terrain.",
    description1:
      "Using “Perlin Noise”, a wavy line is drawn across the canvas. The color of the line is altered depending on its y-coordinate. So, a point of the line that is higher will be brighter than a point of the line that is lower. This creates the depth visualization of the terrain. <br><br>Each frame, the wavy line changes on the y-axis slightly using noise. Also with every frame, a screenshot of the canvas is taken, and is placed below the wavy line. This creates terrain. The terrain translates across the screen vertically until it disappears at the bottom of the canvas. To prevent a visual bug, the canvas above the wavy line is filled in black. This is for when the wavy line drops below the terrain already drawn to the screen. <br><br>For the noise algorithm, I use a library created by Joe Iddon. Their algorithm generates a number between -1 and 1, but I restructured it in my code to produce a number between 0 and 1. <br><br>The library can be found at: https://github.com/joeiddon/perlin.",
    gif1: "/assets/gifs/terrain.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/2d-perlin-terrain.html",
  },
  {
    title: "Flow Field - Perlin Noise",
    icon: "/assets/images/challenges/flow.png",
    summary:
      "This project uses “noise” to move many particles across a canvas into a flow.",
    description1:
      "First, random vectors are created in a grid. The direction of these vectors is decided by “Perlin Noise.”  This ensures that the direction from vector to vector does not change drastically. These vectors have x and y coordinates that represent positions on the canvas. <br><br>Then, many particles are randomly generated on the canvas. Each particle finds the vector that is closest to it and begins moving in that direction. The particles trace a line behind them to show the path that they took. Over time, the particles end up all on the same line that flows across the canvas. <br><br>The user can change many aspects of the flow field, such as the number of particles and the scale of the vectors themselves. <br><br>For the noise algorithm, I use a library created by Joe Iddon. Their algorithm generates a number between -1 and 1. <br><br>The library can be found at: https://github.com/joeiddon/perlin.",
    gif1: "/assets/gifs/flow.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/flow-field.html",
  },
  {
    title: "Flow Field 2 - Perlin Noise",
    icon: "/assets/images/challenges/flow2.png",
    summary:
      "This project moves the particles differently than the original flow field.",
    description1:
      "Instead of using vectors to determine the direction the particles move in, this project applies the noise to the particles directly. The noise method takes in the particle’s scaled x and y coordinates as parameters. This makes particles that are close together move similarly.  The returned noise is the angle that the particle will move at. I then took the sine and cosine of this angle to give the particle velocity. By itself, the angle creates chaotic movement in some areas of the canvas. I was able to eliminate this problem by dividing the velocity by 0.2. <br><br>Like before, the user can change many aspects of the flow field, such as the number of particles and the scale of the field. <br><br>For the noise algorithm, I use a library created by Joe Iddon. Their algorithm generates a number between -1 and 1. <br><br>The library can be found at: https://github.com/joeiddon/perlin.",
    gif1: "/assets/gifs/flow2.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/flow-field-2.html",
  },
  {
    title: "2-D Ball Simulation",
    icon: "/assets/images/challenges/ball.png",
    summary:
      "This project simulates how certain balls move and bounce with gravity.",
    description1:
      "The Ball class is used to create each ball. The constructor takes parameters that are attributes of the specific ball. These attributes are stored in JavaScript objects. The parameters are the radius, color, and stopping ratio. <br><br>Each Ball object has a position, velocity, and acceleration. The acceleration is gravity, which I represent with the formula: 9.8 * Scale / FPS. This scales gravity to the size of the canvas and the value of the FPS. The acceleration is applied to the velocity, which is then applied to the ball’s position. <br><br>The stopping ratio represents the bounciness of the ball. When the ball eventually hits the edge of the canvas, it bounces in the opposite direction. The stopping ratio is multiplied by this new velocity, creating the new reduced velocity. Then gravity affects the ball as well. There is also a friction value that is applied universally when moving horizontally across the edge. <br><br>The user can change the direction of gravity. This is done with the arrow buttons around the canvas. The movement is consistent across all directions. The user can also launch the ball, using the changeable velocity X and Y values in the tab below the canvas.",
    gif1: "/assets/gifs/ball.gif",
    description2: "",
    gif2: "",
    link: "https://atpugh20.github.io/coding-challenges/views/ball-bounce/ball-bounce.html",
  },
];
