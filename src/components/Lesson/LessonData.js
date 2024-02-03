import { cattleTraits, tulipTraits, appleTraits } from "./traitsData";

const lessonData = {
  visit_0: false,
  visit_1: false,
  visit_2: false,
  visit_3: false,
  visit_4: false,
  visit_5: false,
  visit_6: false,
  visit_7: false,
  visit_8: false,
  visit_9: false,
  visit_10: false,
  visit_11: false,
  visit_12: false,
  visit_13: false,

  canvasstr_1_1: "",
  canvasstr_1_1_ori: "",
  canvas_1_1_img_uploaded: false,

  canvasstr_2_1: "",
  canvasstr_2_1_ori: "",
  canvas_2_1_img_uploaded: false,

  canvasstr_3_1: "",
  canvasstr_3_1_ori: "",
  canvas_3_1_img_uploaded: false,

  canvasstr_4_1: "",
  canvasstr_4_1_ori: "",
  canvas_4_1_img_uploaded: false,

  nodeDetails: {
    nodes: [],
    edges: [],
  },
  cattleTraits: cattleTraits,
  tulipTraits: tulipTraits,
  appleTraits: appleTraits,

  graphAnnotation1: [],

  hlt_8_1: `<p>Let’s revisit what John Dalton and his colleagues were investigating in the 1800s. Last we read, they carried out two different types of investigations with water, both involving adding energy to it. When they boiled water, they argued that this did not produce a new substance. But when they added energy to water with a battery, they argued that this produced two new substances that weren’t there before.</p>`,

  hlt_8_2: `<p>They conducted flammability tests and also measured the density of these gases. The one that exploded had a density of 0.09 g/L. This was much less dense than other flammable gases, like marsh gas (methane). The one that caused a match to burn brighter also caused a glowing ember to burst into flame. It had a density of 1.430 g/L.</p>`,

  hlt_8_3: `<p class="ql-align-center">Pause here and take out your <em>Some Common Gases</em> and see if you can identify what these two gases are based on this property data.</p>`,

  hlt_8_4: `<p>Dalton developed a new idea to explain these results. He argued that water particles could be broken apart into the parts that make up each of the two gases. In his model, he assumed that each water particle was actually made of two smaller parts connected together. He called these smaller parts “atoms.” The model of a water particle he developed contained one hydrogen atom and one oxygen atom.</p>`,

  hlt_8_5: `<p>He developed a way of representing this idea in a diagram, which is represented to the right.</p>`,

  hlt_8_6: `<p class="ql-align-center">How does his model of a water particle compare to ones you developed and used in previous lessons?</p>`,
  hlt_15_1:
    "Think about people you have seen use headphones to listen to music on a phone or to complete an assignment on a computer in school. We have learned a lot about how speakers work.",
  hlt_15_2:
    "<strong>What do you think headphones have in common with the speakers you investigated in science class so far? </strong>",

  hlt_15_3: "If you dissect headphones, this is what you would see:",

  hlt_15_4:
    "You may have noticed in the photos above that headphones contain many of the same parts as a speaker (including a magnet and a coil of wire). Those parts are small compared to the parts of the speakers you made in class.",

  hlt_15_5:
    "We learned that attractive and repulsive forces between the magnet and the coil lead to vibrations in the speaker. These vibrations produce the sound we hear. The attractive and repulsive forces inside a speaker happen when an electric current flows through the coil. The current causes the coil to behave like a magnet. We call the magnetized coil an <i>electromagnet</i>. The permanent magnet in a speaker is usually fixed in place, but the electromagnet can move back and forth.",

  hlt_15_6:
    "Like all speakers, headphones must be connected to a source of electric current in order to work. Electric current flows through a speaker system following the path of a circuit. A <i>circuit</i> is an unbroken path for electric current to follow.",

  hlt_15_7:
    "<strong>What about wireless headphones? How do they work if they are not attached to a source of electric current?</strong>",
  hlt_15_8:
    "Wireless headphones allow you to walk away from your phone, computer, or music player, and still hear the sound. These headphones still work in the same way as the speaker. There is a tiny magnet inside, and a tiny electromagnet. But instead of a wire connected to a computer, there is a battery. Electronics inside the headphone change the current coming from the battery in order to change the forces in the electromagnet.",

  hlt_15_9:
    "Instead of sending the changing electric current directly down a wire to the speaker, the computer needs to send a message to the headphones, that tells the headphones how to change the current that is coming from the battery. The message that a computer sends to headphones that are plugged in is a continuous signal that will be directly translated to the speaker, and into sound. But in order to send signals through the air, we need to send the signal as a set of instructions, that the headphones can then use to put the signal back together. That set of instructions is in the form of pulses of radio waves known as Bluetooth.",
  hlt_7_1:
    "Light does a few different things when it shines on matter. When light shines on something, some of the light reflects off the particles. This is called reflection. When light reflects off a mirror, for example, we see an image reflected back at our eye. This only happens when light shines on a surface that is very smooth, like the surface of mirrors and glass. If the surface is bumpy, light still reflects off particles, but it scatters in all directions, and only some of that light reaches our eyes.",
  hlt_7_2:
    "Sometimes light moves right past the particles. This is called transmission. When light transmits through a transparent material, like a window, we can see everything on the other side. Sometimes light transmits through one transparent material, like a clear plastic cup, but cannot transmit as well through the drink inside, like coffee or tea.",
  hlt_7_3:
    "Sometimes light does not reflect off or transmit through a material. When this happens, the light transfers energy directly into a particle of matter. This is called absorption. For example, when light from the sun is absorbed by our skin, the energy from light is absorbed by our skin particles, and we start to feel warm. This means our skin particles are starting to move more and have more kinetic energy.",
  hlt_7_4:
    "What determines whether light is reflected, transmitted, or absorbed? It all depends on the kind of light, and how the particle moves before light shines on it.",
  hlt_7_5:
    "When light reaches a particle, if the kind of light matches the way the particle normally moves, the energy from the light transfers into the particle. The particle starts moving more. We call this movement kinetic energy. So, the energy from light is now the kinetic energy of the particle's movement.",
  hlt_7_6:
    "Over time, the particle will transfer that kinetic energy into the other particles around it, and the temperature of the matter will go up. Eventually, if the light is no longer shining on the matter, the kinetic energy of the particles will go back to normal.",
  /* hlt_7_7: "Questions to answer with your group:",
  hlt_7_8:
    "For each of the images below, use the conventions from the light unit to draw a diagram of the light when it shines on the wall of cups made from different materials.",
  hlt_7_9:
    "Based on the information presented in the reading, why do you think soda in an aluminum can will stay cooler for longer than soda in a clear plastic cup? To support your explanation, draw a model of light hitting the wall of an aluminum soda can at a particle scale, and a model of light hitting the wall of a clear plastic cup at a particle scale. Use the symbols from the key above.",
  hlt_7_10:
    "During the past 100 years, our drink containers have changed a lot. This began in the 1940s, 1950s, and 1960s when more Americans wanted disposable cups for their coffees and sodas. The first material used for disposable cups was paper. With paper cups, people did not like that their fingers burned when there was a hot drink inside. In the 1960s, a father and son from Michigan, both named William Dart, invented and sold the first styrene cups (most people call these “styrofoam” cups, but Styrofoam® is actually a different material used for different things). Styrene cups do a good job at keeping drinks cold and hot.",
 */
  selectedValues: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  lastvisited: 0,
  imageAlignedArray: [
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e",
  ],
  canvas_init: false,
};
export default lessonData;
