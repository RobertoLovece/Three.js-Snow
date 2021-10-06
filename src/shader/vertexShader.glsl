varying vec3 vUv;
uniform float u_time;
attribute float rands;

void main() {

    vec3 p = vec3(position.xyz);

    vec4 modelViewPosition = modelViewMatrix * vec4( p, 1.0 );

    gl_PointSize = rands;
    gl_Position = ( projectionMatrix * modelViewPosition );
}