uniform vec3 uColour;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main()
{
    vec4 textureColour = texture2D(uTexture, vUv);
    textureColour.rgb *= vElevation + 0.5;
    gl_FragColor = textureColour;
}