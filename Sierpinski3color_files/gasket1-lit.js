/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Sýnir hvernig hægt er að breyta lit með uniform breytu
//
//    Hjálmtýr Hafsteinsson, ágúst 2023
/////////////////////////////////////////////////////////////////
var gl;
var points;

var NumPoints = 10000;
var colorLoc;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // And, add our initial point into our array of points
    
    
    // Compute new points
    // Each new point is located midway between
    // last point and a randomly chosen vertex

    var triangles = [];


    for (var k = 0; k < 100; k++) {
        var a = Math.random();
        var b = Math.random();

        var c = a + 0.1;
        var d = b;

        var e = a + 0.05;
        var f = b + 0.1;

        triangles.push(a, b, c, d, e, f)
    }

    var ver = new Float32Array([-0.5, -0.25, 0.5, 0.25, -0.5, 0.25,
        -0.5, -0.25, 0.5, -0.25, 0.5, 0.25]);
    console.log(ver);

    var vertices = new Float32Array(triangles);
    console.log(vertices)

    console.log(triangles)

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Find the location of the variable fColor in the shader program
    colorLoc = gl.getUniformLocation( program, "fColor" );
    
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

	// Setjum litinn sem rauðann og teiknum helming punktanna
    

    for (var j = 0; j < 300; j+=3) {
        gl.uniform4fv( colorLoc, vec4(Math.random(), Math.random(), Math.random(), 1.0) );
        gl.drawArrays( gl.TRIANGLES, j, 3);

    }

}
