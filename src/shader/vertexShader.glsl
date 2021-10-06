varying vec3 vUv;
uniform float u_time;

void main() {

    vec3 p = vec3(position.xyz);

    vec4 modelViewPosition = modelViewMatrix * vec4( p, 1.0 );

    gl_PointSize = 2.;
    gl_Position = ( projectionMatrix * modelViewPosition );
}