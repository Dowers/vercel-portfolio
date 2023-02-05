varying vec3 vNormal;
varying vec3 vColour;

void main() {   
    // float test = dot(vNormal, vec3(0.0, -1.0, 0.0));

    // float temp = vPerlinStrength + 0.5;
    // temp *= 1.0;

    gl_FragColor = vec4(vColour, 1.0);
    }