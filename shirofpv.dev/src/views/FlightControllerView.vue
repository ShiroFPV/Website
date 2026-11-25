<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const REPO_URL = 'https://github.com/ShiroFPV/ShiroFPV_Flight_Controller_Collection'

const boards = [
  {
    id: 'v2',
    name: 'V2',
    size: '20.5 × 20.5 mm',
    mcu: 'AT32F435CGT7 (48-pin)',
    note: 'Digital HD only · 8 kHz ICM-42605',
    status: 'Released · New',
    isNew: true,
  },
  {
    id: 'v1',
    name: 'V1',
    size: '30.5 × 30.5 mm',
    mcu: 'AT32F435RGT7 (64-pin)',
    note: 'Analog + digital · 16 Mb Blackbox',
    status: 'Released',
    isNew: false,
  },
]

function normalizeBoard(q) {
  return q === 'v1' ? 'v1' : 'v2'
}

const board = ref(normalizeBoard(route.query.board))

watch(
  () => route.query.board,
  (q) => {
    board.value = normalizeBoard(q)
  },
)

function selectBoard(id) {
  board.value = id
  router.replace({ query: { ...route.query, board: id } })
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs', label: 'Specs' },
  { id: 'pinout', label: 'Pinout' },
  { id: 'setup', label: 'Setup' },
  { id: 'boot', label: 'Boot mode' },
  { id: 'trouble', label: 'Troubleshooting' },
]
const tab = ref('overview')

const highlights = [
  'Full KiCad schematics, PCB layout, and 3D models under CERN-OHL-S v2',
  'Dedicated Betaflight config.h target definitions & prebuilt .hex releases',
  'V1 (30.5 × 30.5 mm analog + digital) & V2 (20.5 × 20.5 mm digital HD)',
]

const boardContent = {
  v2: {
    name: 'V2',
    subtitle: '20.5 × 20.5 mm · Digital HD',
    modelSrc: '/assets/fc-v2.glb?v=3',
    modelAlt: 'ShiroFPV V2 20×20 flight controller — interactive 3D model',
    modelDesc:
      '4-layer 20.5 × 20.5 mm layout in KiCad. Short, matched SPI1 traces keep the 8 kHz ICM-42605 gyro right next to the 48-pin AT32F435, paired with an LMR33630 5V buck and TPS2116 power mux.',
    kicadUrl: `${REPO_URL}/tree/main/V2_20x20_SFVPF435/Shematic`,
    releaseUrl: `${REPO_URL}/tree/main/V2_20x20_SFVPF435/Release`,
    configUrl: `${REPO_URL}/blob/main/V2_20x20_SFVPF435/Release/config.h`,
    firmwareFile: 'SFPVF435V2.hex',
    storyCards: [
      {
        p1: 'V2 shrinks the original 30.5 × 30.5 mm architecture down into a compact 4-layer 20.5 × 20.5 mm stack by removing the legacy AT7456 analog OSD chip — built strictly for digital FPV builds like DJI O3/O4, Walksnail, and HDZero.',
        p2: 'At the core is the 48-pin AT32F435CGT7 running up to 288 MHz with an 8 MHz ceramic resonator, paired with a native 8 kHz ICM-42605 gyro on SPI1 (dedicated PC15 interrupt) and an SPL07-003 I2C barometer.',
      },
      {
        p1: 'Power input supports 3S–6S LiPo through an inline fuse and P-MOSFET reverse-polarity protection into a 36V-rated LMR33630 5V buck converter, feeding an AP2112K 3.3V LDO for clean MCU and gyro rails.',
        p2: 'A TPS2116 priority power multiplexer switches seamlessly between the 5V buck and USB-C 5V without back-feeding, while 5 hardware UARTs, 4 bidirectional DShot outputs, I2C1 compass pads, LEDs, and a MOSFET beeper round out the board.',
      },
    ],
    notice: {
      title: 'Air Unit Voltage Notice (V2)',
      text: 'The Air Unit connector routes raw battery voltage (VBAT) directly from the pack. Connect DJI O4 Lite only on up to 3S LiPo (or power it via an external 5V/9V BEC). DJI O4 Pro, DJI O3, Walksnail HV, and other high-voltage digital VTX units support 4S–6S directly.',
    },
    specsDesc: 'Full hardware specifications for the V2 20 × 20 mm revision.',
    specs: [
      { label: 'Microcontroller', value: 'Artery AT32F435CGT7 (288 MHz, LQFP-48, 1 MB Flash)' },
      { label: 'Clock Source', value: '8 MHz ceramic resonator (CSTCE8M00G52 on PH0/PH1)' },
      { label: 'Gyroscope', value: 'ICM-42605 via SPI1 (8 kHz native, dedicated EXTI on PC15)' },
      { label: 'Barometer', value: 'SPL07-003 via I2C1 (address 0x76, Betaflight DPS310 driver)' },
      { label: 'Form Factor', value: '20.5 × 20.5 mm, 4-layer PCB, M3 / M2 grommet mount' },
      { label: 'Input Voltage', value: '3S–6S LiPo with inline fuse + P-MOSFET reverse-polarity protection' },
      { label: 'Power Stage', value: 'LMR33630 5V buck (up to 36V in), TPS2116 buck/USB mux, AP2112K 3.3V LDO' },
      { label: 'OSD', value: 'Digital MSP DisplayPort only (no analog AT7456 chip)' },
      { label: 'ESC Protocol', value: 'DShot 150 / 300 / 600 + Bidirectional DShot (RPM filtering)' },
      { label: 'Motor Outputs', value: '4× hardware timer outputs (TMR5_CH1/CH2, TMR3_CH3/CH4)' },
      { label: 'UART Ports', value: '5× hardware UARTs (UART5 default CRSF RX, UART4 digital VTX)' },
      { label: 'I2C Expansion', value: 'I2C1 pads (PB6 SCL / PB7 SDA) with pull-ups for external compass' },
      { label: 'ADC Sensing', value: 'VBAT (PA0, 10:1 divider scale 110) + Current (PA1, ADC1_DMA_OPT 4)' },
      { label: 'Blackbox', value: 'None on this revision (space reserved for 20 × 20 routing)' },
      { label: 'Status & Audio', value: 'Blue/Green active-high LEDs (PB14/PB15) + N-MOSFET buzzer (PC13)' },
      { label: 'USB', value: 'USB-C with 22 Ω series termination + BOOT0 DFU solder pads' },
    ],
    pinoutGroups: [
      {
        title: 'Motors & Timers',
        rows: [
          { name: 'Motor 1', pin: 'PB12', detail: 'TMR5_CH1 · DMA 0' },
          { name: 'Motor 2', pin: 'PB13', detail: 'TMR5_CH2 · DMA 1' },
          { name: 'Motor 3', pin: 'PB0', detail: 'TMR3_CH3 · DMA 2' },
          { name: 'Motor 4', pin: 'PB1', detail: 'TMR3_CH4 · DMA 3' },
        ],
      },
      {
        title: 'UARTs',
        rows: [
          { name: 'UART 1', pin: 'PA9 TX / PA10 RX', detail: 'General purpose · ROM DFU pin (avoid active RX at boot)' },
          { name: 'UART 2', pin: 'PA2 TX / PA3 RX', detail: 'General purpose · ROM DFU pin (avoid active RX at boot)' },
          { name: 'UART 3', pin: 'PB10 TX / PB11 RX', detail: 'General purpose · ROM DFU pin (avoid active RX at boot)' },
          { name: 'UART 4', pin: 'PH3 TX / PH2 RX', detail: 'Digital VTX (MSP DisplayPort)' },
          { name: 'UART 5', pin: 'PB9 TX / PB8 RX', detail: 'Default Serial RX (CRSF / ExpressLRS)' },
        ],
      },
      {
        title: 'Sensors & Buses',
        rows: [
          { name: 'SPI1 (Gyro)', pin: 'PA5 / PA6 / PA7', detail: 'ICM-42605 · CS PA4 · EXTI PC15 (verify align on bench)' },
          { name: 'I2C1 (Baro)', pin: 'PB6 SCL / PB7 SDA', detail: 'SPL07-003 (0x76) + external compass pads w/ pull-ups' },
        ],
      },
      {
        title: 'ADC, LEDs & IO',
        rows: [
          { name: 'VBAT ADC', pin: 'PA0', detail: '10k / 1k divider (scale 110)' },
          { name: 'Current ADC', pin: 'PA1', detail: 'ESC current sense · ADC1_DMA_OPT 4' },
          { name: 'LED 0 / 1', pin: 'PB14 / PB15', detail: 'Blue / Green status LEDs (active high)' },
          { name: 'Beeper', pin: 'PC13', detail: 'N-MOSFET gate (active high)' },
          { name: 'BOOT0', pin: 'BOOT0 Pads', detail: 'Solder bridge / short during USB plug-in for DFU' },
        ],
      },
    ],
    firmwareDesc:
      'V2 ships with a dedicated Betaflight config.h target. UART5 is pre-assigned to CRSF/ELRS Serial RX, UART4 is ready for digital MSP DisplayPort VTXs, and all four DShot channels support bidirectional RPM filtering.',
    setupSteps: [
      {
        num: '01',
        title: 'Open Betaflight Configurator',
        desc: 'Launch the latest Betaflight Configurator web app or desktop build.',
        link: { text: 'Open Configurator', url: 'https://app.betaflight.com/#' },
      },
      {
        num: '02',
        title: 'Flash SFPVF435V2.hex',
        desc: 'Enter DFU mode (bridging BOOT0 for first flash, or CLI "bl" afterward). In Firmware Flasher, click Load Firmware [Local], select SFPVF435V2.hex from Release/, check Full chip erase, and flash.',
        link: { text: 'Download V2 Release', url: `${REPO_URL}/tree/main/V2_20x20_SFVPF435/Release` },
      },
      {
        num: '03',
        title: 'Wire Receiver to UART5 & VTX to UART4',
        desc: 'UART1/2/3 share pins with the AT32 ROM bootloader — keep your CRSF/ELRS receiver on UART5 (preconfigured default) and wire your digital VTX to UART4 with VTX (MSP + DisplayPort) enabled in Ports.',
        link: null,
      },
      {
        num: '04',
        title: 'Verify Receiver & Channels',
        desc: 'Confirm CRSF is selected in the Receiver tab, check stick movement and channel order (AETR/TAER), and verify link telemetry.',
        link: null,
      },
      {
        num: '05',
        title: 'Check Gyro Alignment & Motors (Props Off)',
        desc: 'Tilt the board in the Setup tab to confirm 3D model orientation matches your mounting (adjust gyro alignment if rotated), then test motor order/direction on DShot300/600 with bidirectional DShot.',
        link: null,
      },
      {
        num: '06',
        title: 'Calibrate Accelerometer & Verify ADC',
        desc: 'Run accelerometer calibration, verify VBAT voltage against a multimeter (default scale 110), and save a diff all backup.',
        link: null,
      },
    ],
    dfuMethods: [
      {
        title: 'Betaflight CLI / Configurator',
        recommended: true,
        steps: [
          'Once Betaflight is already installed, plug in USB-C and connect.',
          'Open the CLI tab and run "bl" (or enable auto-DFU in Firmware Flasher).',
          'The AT32F435 reboots straight into its USB DFU bootloader.',
          'Load SFPVF435V2.hex locally, enable Full chip erase, and flash.',
        ],
      },
      {
        title: 'BOOT0 Solder Pads (First Flash / Recovery)',
        recommended: false,
        steps: [
          'Unplug USB-C and LiPo power completely.',
          'Bridge the BOOT0 pads on the V2 PCB (tweezers or temporary solder bridge).',
          'Plug in USB-C — the board enumerates immediately as an Artery DFU device.',
          'Remove the bridge/tweezers and flash SFPVF435V2.hex via Betaflight Configurator.',
        ],
      },
    ],
    extraTroubleshooting: [
      {
        q: 'Board won’t boot into Betaflight when a receiver or GPS is plugged into UART1, UART2, or UART3.',
        a: 'The AT32F435 ROM bootloader polls UART1 (PA9/PA10), UART2 (PA2/PA3), and UART3 (PB10/PB11) at power-up. If a peripheral transmits serial traffic during boot, it can hijack startup into serial bootloader mode. Keep your receiver on UART5 and VTX on UART4.',
      },
      {
        q: 'VBAT or Current reads 0 after compiling custom firmware.',
        a: 'Make sure #define ADC1_DMA_OPT 4 stays present in config.h when building Betaflight from source — without it, ADC1 DMA stays unmapped on AT32F435 and reads zero.',
      },
      {
        q: 'Digital goggles show video, but no Betaflight OSD appears.',
        a: 'Enable VTX (MSP + DisplayPort) on UART4 in the Ports tab, ensure TX/RX are crossed cleanly, and check Air Unit voltage limits (3S max on O4 Lite VBAT; 4S–6S OK on O4 Pro / O3 / Walksnail HV).',
      },
    ],
  },

  v1: {
    name: 'V1',
    subtitle: '30.5 × 30.5 mm · Analog + Digital',
    modelSrc: '/assets/fc-v1.glb?v=3',
    modelAlt: 'ShiroFPV V1 30.5×30.5 flight controller — interactive 3D model',
    modelDesc:
      'Designed in KiCad. Gyro is placed close to the MCU to keep trace lengths short, power planes are separated from signal layers, and there are decoupling caps on all the important rails.',
    kicadUrl: `${REPO_URL}/tree/main/V1_30x30_SFVPF435/Shematic`,
    releaseUrl: `${REPO_URL}/tree/main/V1_30x30_SFVPF435/Release`,
    configUrl: `${REPO_URL}/blob/main/V1_30x30_SFVPF435/Release/config.h`,
    firmwareFile: 'SFPVF435V1.hex',
    storyCards: [
      {
        p1: 'I wanted to build my own flight controller from scratch. Not use someone else’s design — actually design the PCB, pick the components, route the traces, and get it manufactured. So I did.',
        p2: 'It’s built around the AT32F435RGT7 (an STM32-compatible chip that runs at up to 288 MHz), uses an ICM-20602 gyro, has a BME280 barometer, AT7456 analog OSD, 16 Mb onboard blackbox flash, USB-C, and targets Betaflight on a standard 30.5 × 30.5 mm stack mount.',
      },
      {
        p1: 'The project started as a personal challenge and turned into something I actually want to fly. After months of PCB revisions in KiCad and a lot of debugging, the board is stable and released publicly.',
        p2: 'Everything — schematics, PCB layout, and firmware configuration — lives in the open-source collection repo. If you want to build, review, or fork it, you can.',
      },
    ],
    notice: null,
    specsDesc: 'Full hardware specifications for the V1 30.5 × 30.5 mm revision.',
    specs: [
      { label: 'Microcontroller', value: 'Artery AT32F435RGT7 (288 MHz, LQFP-64)' },
      { label: 'Gyroscope', value: 'ICM-20602 via SPI2 (CW180_DEG)' },
      { label: 'Barometer', value: 'BME280 via I2C1 (PB8 SCL / PB9 SDA)' },
      { label: 'OSD', value: 'AT7456 analog OSD via SPI3 + digital MSP DisplayPort' },
      { label: 'Blackbox', value: 'Onboard M25P16 flash (16 Mb via SPI1)' },
      { label: 'Form Factor', value: '30.5 × 30.5 mm, 4× M3 mounting' },
      { label: 'Input Voltage', value: '3S–6S LiPo (9.9V–25.2V)' },
      { label: 'BEC Output', value: '5V / 3.3V regulated' },
      { label: 'ESC Protocol', value: 'DShot 150 / 300 / 600 + Bidirectional DShot' },
      { label: 'Motor Outputs', value: '4× bidirectional (PB3, PB4, PB6, PB7)' },
      { label: 'UART Ports', value: '6× UART (UART1, UART2 RX, UART3, UART4, UART5, UART6)' },
      { label: 'USB', value: 'USB-C (MSC / VCP)' },
      { label: 'Revision', value: 'V1 (30.5 × 30.5 mm)' },
    ],
    pinoutGroups: [
      {
        title: 'Motors & Timers',
        rows: [
          { name: 'Motor 1', pin: 'PB3', detail: 'TMR2_CH2 · DMA 0' },
          { name: 'Motor 2', pin: 'PB4', detail: 'TMR3_CH1 · DMA 1' },
          { name: 'Motor 3', pin: 'PB6', detail: 'TMR4_CH1 · DMA 2' },
          { name: 'Motor 4', pin: 'PB7', detail: 'TMR4_CH2 · DMA 3' },
        ],
      },
      {
        title: 'UARTs',
        rows: [
          { name: 'UART 1', pin: 'PA9 TX / PA10 RX', detail: 'Full UART' },
          { name: 'UART 2', pin: 'PA3 RX', detail: 'RX only (ESC telemetry / SBUS)' },
          { name: 'UART 3', pin: 'PB10 TX / PB11 RX', detail: 'Full UART' },
          { name: 'UART 4', pin: 'PA0 TX / PA1 RX', detail: 'Full UART' },
          { name: 'UART 5', pin: 'PC12 TX / PD2 RX', detail: 'Full UART' },
          { name: 'UART 6', pin: 'PC6 TX / PC7 RX', detail: 'Full UART' },
        ],
      },
      {
        title: 'Sensors & SPI Buses',
        rows: [
          { name: 'SPI1 (Flash)', pin: 'PA5 / PA6 / PA7', detail: 'M25P16 16 Mb Blackbox · CS PA4' },
          { name: 'SPI2 (Gyro)', pin: 'PB13 / PB14 / PB15', detail: 'ICM-20602 · CS PB12 · EXTI PC9 · CW180_DEG' },
          { name: 'SPI3 (OSD)', pin: 'PC10 / PC11 / PB5', detail: 'AT7456 Analog OSD · CS PA15' },
          { name: 'I2C1 (Baro)', pin: 'PB8 SCL / PB9 SDA', detail: 'BME280 barometer' },
        ],
      },
      {
        title: 'ADC, LEDs & IO',
        rows: [
          { name: 'VBAT / CURR / RSSI', pin: 'PC2 / PC1 / PC0', detail: 'ADC1_DMA_OPT 4' },
          { name: 'PINIO 1', pin: 'PC8', detail: 'Box 40 · Config 129 (VTX pit switch)' },
          { name: 'LED 0 / 1', pin: 'PA14 / PA13', detail: 'Status LEDs' },
          { name: 'Beeper', pin: 'PC13', detail: 'Inverted buzzer output' },
        ],
      },
    ],
    firmwareDesc:
      'V1 runs Betaflight with full support for SBUS/CRSF/ELRS receivers, DShot 150/300/600 with bidirectional RPM telemetry, both analog AT7456 OSD and digital MSP DisplayPort, plus 16 Mb onboard Blackbox logging.',
    setupSteps: [
      {
        num: '01',
        title: 'Get Betaflight Configurator',
        desc: 'Grab the latest version from the web app.',
        link: { text: 'Open Configurator', url: 'https://app.betaflight.com/#' },
      },
      {
        num: '02',
        title: 'Flash SFPVF435V1.hex',
        desc: 'Connect via USB-C while holding the BOOT button (or use the DFU method). In Betaflight Configurator go to Firmware Flasher, load SFPVF435V1.hex locally from Release/, and flash.',
        link: { text: 'Download V1 Release', url: `${REPO_URL}/tree/main/V1_30x30_SFVPF435/Release` },
      },
      {
        num: '03',
        title: 'Configure Ports',
        desc: 'Enable Serial RX on the UART connected to your receiver and MSP DisplayPort or SmartAudio/Tramp on your VTX UART. Save and reboot.',
        link: null,
      },
      {
        num: '04',
        title: 'Set Up Your Receiver',
        desc: 'In the Receiver tab pick your RC protocol (CRSF, SBUS, etc.) and verify channels move cleanly.',
        link: null,
      },
      {
        num: '05',
        title: 'Motor Direction & Order',
        desc: 'With props off, test motor order and spin direction in the Motors tab. Configure DShot300/600 and bidirectional DShot.',
        link: null,
      },
      {
        num: '06',
        title: 'Calibrate & Tune PIDs',
        desc: 'Run accelerometer calibration in Setup, check Blackbox logging on the 16 Mb flash, and start from default PIDs.',
        link: null,
      },
    ],
    dfuMethods: [
      {
        title: 'Boot Button',
        recommended: true,
        steps: [
          'Unplug the FC from USB.',
          'Hold down the BOOT button.',
          'While holding BOOT, plug in the USB-C cable.',
          'Release the BOOT button after 2–3 seconds.',
          'FC is now in DFU mode — open Betaflight Configurator.',
        ],
      },
      {
        title: 'Boot Pads',
        recommended: false,
        steps: [
          'Find the BOOT and GND pads on the PCB.',
          'Short BOOT to GND with a jumper wire or tweezers.',
          'While shorted, plug in USB-C.',
          'Remove the short — you’re in DFU mode.',
          'Flash in Betaflight Configurator.',
        ],
      },
    ],
    extraTroubleshooting: [],
  },
}

const current = computed(() => boardContent[board.value])

const comparisonRows = [
  { label: 'Mount Size', v1: '30.5 × 30.5 mm (M3)', v2: '20.5 × 20.5 mm (M3 / grommets)' },
  { label: 'MCU', v1: 'AT32F435RGT7 (64-pin)', v2: 'AT32F435CGT7 (48-pin)' },
  { label: 'Gyroscope', v1: 'ICM-20602 (SPI2)', v2: 'ICM-42605 (SPI1, 8 kHz)' },
  { label: 'Barometer', v1: 'BME280 (I2C1)', v2: 'SPL07-003 (I2C1)' },
  { label: 'Video / OSD', v1: 'AT7456 analog + digital MSP', v2: 'Digital HD only (MSP DisplayPort)' },
  { label: 'Blackbox', v1: '16 Mb SPI flash (M25P16)', v2: 'None' },
  { label: 'Power Stage', v1: '5V / 3.3V BEC', v2: 'LMR33630 5V buck + TPS2116 mux + P-MOSFET RPP' },
  { label: 'UARTs', v1: '6× UART (5 full + 1 RX)', v2: '5× full UART (UART5 default RX)' },
  { label: 'Motors', v1: '4× DShot (PB3/4/6/7)', v2: '4× DShot (PB12/13/0/1)' },
  { label: 'Firmware', v1: 'SFPVF435V1.hex', v2: 'SFPVF435V2.hex' },
]

const baseTroubleshooting = [
  {
    q: 'FC not detected in DFU mode.',
    a: 'Check that you are using a USB-C data cable (not charge-only). On Windows, use ImpulseRC Driver-Fixer or Zadig (WinUSB) for Artery DFU mode.',
  },
  {
    q: 'Betaflight Configurator shows no ports.',
    a: 'Make sure the FC actually entered DFU or VCP mode. Restart Configurator after plugging in.',
  },
  {
    q: 'Flash fails partway through.',
    a: 'Try another USB port directly on the motherboard, enable Full chip erase, and verify you loaded the matching SFPVF435V1.hex or SFPVF435V2.hex file.',
  },
]

const activeTroubleshooting = computed(() => [
  ...current.value.extraTroubleshooting,
  ...baseTroubleshooting,
])

const firmwareLinks = computed(() => [
  { name: 'Betaflight Configurator', url: 'https://app.betaflight.com/#' },
  { name: `${current.value.name} Release (${current.value.firmwareFile})`, url: current.value.releaseUrl },
  { name: `${current.value.name} config.h`, url: current.value.configUrl },
])
</script>

<template>
  <div class="fc-page pg-pad">
    <div class="page-shell">

      <!-- ── hero ──────────────────────────────────── -->
      <header class="fc-hero">
        <div class="fc-meta">
          <span class="idx">04</span>
          <span class="rule fc-rule"></span>
          <span class="label">Open-source hardware · CERN-OHL-S v2 &amp; GPL-3.0</span>
        </div>

        <h1 class="display fc-title">
          ShiroFPV <span class="grad-text">Flight Controllers</span>
        </h1>

        <p class="fc-lead">
          Open-source AT32F435 flight controllers designed in KiCad and built for Betaflight —
          from the full-featured 30.5 × 30.5 mm V1 to the compact 20.5 × 20.5 mm digital-only V2.
        </p>

        <div class="fc-actions">
          <a
            :href="REPO_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            View collection on GitHub →
          </a>
          <a
            :href="current.releaseUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline"
          >
            Download {{ current.name }} firmware ({{ current.firmwareFile }}) →
          </a>
        </div>

        <ul class="fc-highlights">
          <li v-for="item in highlights" :key="item">
            <span class="dot" aria-hidden="true"></span>
            {{ item }}
          </li>
        </ul>
      </header>

      <!-- ── board picker ─────────────────────────── -->
      <div class="boards" role="group" aria-label="Select board revision">
        <button
          v-for="b in boards"
          :key="b.id"
          type="button"
          class="board"
          :class="{ on: board === b.id }"
          :aria-pressed="board === b.id"
          @click="selectBoard(b.id)"
        >
          <span class="board-top">
            <span class="board-name">{{ b.name }}</span>
            <span class="board-state" :class="{ new: b.isNew }">{{ b.status }}</span>
          </span>
          <span class="board-size">{{ b.size }}</span>
          <span class="board-meta">{{ b.mcu }} · {{ b.note }}</span>
        </button>
      </div>

      <!-- ── section tabs ─────────────────────────── -->
      <nav class="tabs" role="tablist" aria-label="Board sections">
        <button
          v-for="t in tabs"
          :key="t.id"
          type="button"
          role="tab"
          class="tab"
          :class="{ on: tab === t.id }"
          :aria-selected="tab === t.id"
          @click="tab = t.id"
        >
          {{ t.label }}
        </button>
      </nav>

      <!-- ── tab panels ───────────────────────────── -->
      <div class="panel-wrap" role="tabpanel">

        <!-- OVERVIEW -->
        <section v-show="tab === 'overview'" class="space-y-12">
          <div>
            <h2 class="display fc-h2 flex items-center gap-3">
              <span class="sec-n">01</span>
              {{ current.name }} — {{ current.subtitle }}
            </h2>
            <p class="text-gray-400 text-sm mb-6">
              Architecture, sensor selection, and design priorities.
            </p>

            <div class="grid md:grid-cols-2 gap-6">
              <div v-for="(card, idx) in current.storyCards" :key="idx" class="glass-card rounded-[4px] p-6">
                <p class="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">{{ card.p1 }}</p>
                <p class="text-gray-300 leading-relaxed text-sm sm:text-base">{{ card.p2 }}</p>
              </div>
            </div>

            <div v-if="current.notice" class="notice-card mt-6">
              <div class="notice-tag">Hardware Note</div>
              <div>
                <h3 class="notice-title">{{ current.notice.title }}</h3>
                <p class="notice-text">{{ current.notice.text }}</p>
              </div>
            </div>
          </div>

          <!-- 3D Model -->
          <div class="glass-card rounded-[4px] p-6">
            <div class="flex items-center justify-between gap-3 mb-4">
              <div class="flex items-center gap-3">
                <span class="sec-n">02</span>
                <h3 class="font-bold text-white">Interactive 3D Model ({{ current.name }})</h3>
              </div>
              <span class="text-xs text-gray-500 hidden sm:inline">drag to rotate · scroll to zoom</span>
            </div>

            <model-viewer
              :key="current.modelSrc"
              :src="current.modelSrc"
              :alt="current.modelAlt"
              camera-controls
              :auto-rotate="tab === 'overview' || undefined"
              auto-rotate-delay="1500"
              rotation-per-second="14deg"
              shadow-intensity="0.45"
              exposure="1.1"
              environment-image="neutral"
              camera-orbit="35deg 70deg 110%"
              ar
              ar-modes="webxr scene-viewer quick-look"
              loading="lazy"
              reveal="auto"
              class="w-full rounded-[3px]"
              style="min-height: 360px; background: linear-gradient(135deg, rgba(233, 233, 235, 0.08), rgba(233, 233, 235, 0.02)); border: 1px solid var(--border-subtle); --poster-color: transparent; touch-action: pan-y;"
            >
              <button
                slot="ar-button"
                class="absolute bottom-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-white"
                style="background: rgba(233, 233, 235, 0.12); color: var(--accent-light); border: 1px solid rgba(233, 233, 235, 0.18);"
              >
                View in AR
              </button>
              <div slot="poster" class="w-full h-full flex items-center justify-center">
                <p class="text-gray-500 text-sm">Loading {{ current.name }} 3D model…</p>
              </div>
            </model-viewer>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
              <p class="text-gray-400 text-sm leading-relaxed">{{ current.modelDesc }}</p>
              <a
                :href="current.kicadUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-white flex-shrink-0"
                style="color: var(--accent-light);"
              >
                KiCad files →
              </a>
            </div>
          </div>

          <!-- V1 vs V2 comparison -->
          <div>
            <h2 class="display fc-h2 flex items-center gap-3">
              <span class="sec-n">03</span>
              V1 vs V2 Comparison
            </h2>
            <p class="text-gray-400 text-sm mb-5">Quick side-by-side breakdown to pick the right revision for your frame.</p>

            <div class="glass-card rounded-[4px] overflow-x-auto">
              <table class="cmp-table">
                <thead>
                  <tr>
                    <th>Spec</th>
                    <th :class="{ activeCol: board === 'v2' }">V2 (20 × 20)</th>
                    <th :class="{ activeCol: board === 'v1' }">V1 (30.5 × 30.5)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in comparisonRows" :key="row.label">
                    <td class="cmp-k">{{ row.label }}</td>
                    <td :class="{ activeCell: board === 'v2' }">{{ row.v2 }}</td>
                    <td :class="{ activeCell: board === 'v1' }">{{ row.v1 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- SPECS -->
        <section v-show="tab === 'specs'">
          <h2 class="display fc-h2 flex items-center gap-3">
            <span class="sec-n">04</span>
            {{ current.name }} Hardware Specs
          </h2>
          <p class="text-gray-400 text-sm mb-6">{{ current.specsDesc }}</p>

          <div class="glass-card rounded-[4px] overflow-hidden">
            <dl class="divide-y" style="border-color: var(--border-subtle);">
              <div
                v-for="spec in current.specs"
                :key="spec.label"
                class="flex flex-col sm:flex-row items-start sm:items-center px-5 py-3.5 gap-1.5 sm:gap-4"
              >
                <dt class="spec-k w-full sm:w-52 flex-shrink-0">{{ spec.label }}</dt>
                <dd class="text-xs sm:text-sm text-gray-300">{{ spec.value }}</dd>
              </div>
            </dl>
          </div>
        </section>

        <!-- PINOUT -->
        <section v-show="tab === 'pinout'" class="space-y-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 class="display fc-h2 flex items-center gap-3">
                <span class="sec-n">05</span>
                {{ current.name }} Pinout &amp; Buses
              </h2>
              <p class="text-gray-400 text-sm">
                Exact pin mappings defined in <code class="mono-inline">Release/config.h</code>.
              </p>
            </div>
            <a
              :href="current.configUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-outline text-xs self-start"
            >
              Inspect {{ current.name }} config.h →
            </a>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="group in current.pinoutGroups" :key="group.title" class="glass-card rounded-[4px] overflow-hidden">
              <div class="pin-head">{{ group.title }}</div>
              <div class="divide-y" style="border-color: var(--border-subtle);">
                <div v-for="row in group.rows" :key="row.name" class="pin-row">
                  <div class="pin-top">
                    <span class="pin-name">{{ row.name }}</span>
                    <code class="pin-code">{{ row.pin }}</code>
                  </div>
                  <p class="pin-detail">{{ row.detail }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SETUP -->
        <section v-show="tab === 'setup'" class="space-y-12">
          <div>
            <h2 class="display fc-h2 flex items-center gap-3">
              <span class="sec-n">06</span>
              Firmware &amp; Software ({{ current.name }})
            </h2>
            <p class="text-gray-400 text-sm mb-6">Betaflight configuration and prebuilt release files.</p>

            <div class="glass-card rounded-[4px] p-6 mb-6">
              <h3 class="text-xl font-bold text-white mb-2">Betaflight Target</h3>
              <p class="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                {{ current.firmwareDesc }}
              </p>
              <a
                href="https://betaflight.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:text-white"
                style="color: var(--accent);"
              >
                betaflight.com →
              </a>
            </div>

            <div class="grid sm:grid-cols-3 gap-4">
              <a
                v-for="link in firmwareLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-3 p-4 rounded-[4px] transition-all duration-200 hover:text-white"
                style="background: var(--bg-elevated); border: 1px solid var(--border-subtle); color: var(--accent-light);"
              >
                <span class="font-medium text-sm">{{ link.name }}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div>
            <h3 class="display fc-h2 flex items-center gap-3">
              <span class="sec-n">07</span>
              Setup Guide ({{ current.name }})
            </h3>
            <p class="text-gray-400 text-sm mb-6">Step by step from bare board to first hover.</p>

            <div class="grid lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2 space-y-4">
                <div
                  v-for="step in current.setupSteps"
                  :key="step.num"
                  class="glass-card rounded-[4px] p-5 flex gap-4"
                >
                  <div class="step-num">{{ step.num }}</div>
                  <div>
                    <h4 class="text-base font-bold text-white mb-1.5">{{ step.title }}</h4>
                    <p class="text-gray-400 text-sm leading-relaxed">{{ step.desc }}</p>
                    <a
                      v-if="step.link"
                      :href="step.link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 mt-3 text-sm font-semibold transition-colors duration-200 hover:text-white"
                      style="color: var(--accent);"
                    >
                      {{ step.link.text }} →
                    </a>
                  </div>
                </div>
              </div>

              <div class="glass-card rounded-[4px] p-6 h-fit">
                <h4 class="text-base font-bold text-white mb-4">Bench Checklist</h4>
                <ul class="space-y-3">
                  <li class="tip-li">
                    <span class="tip-n">1</span>
                    <span>Remove propellers before connecting USB or spinning motors in Betaflight.</span>
                  </li>
                  <li class="tip-li">
                    <span class="tip-n">2</span>
                    <span>Use DShot300 or DShot600 and verify 0% error rate with bidirectional DShot enabled.</span>
                  </li>
                  <li class="tip-li" v-if="board === 'v2'">
                    <span class="tip-n">3</span>
                    <span>Check Air Unit VBAT limit: 3S max for O4 Lite (or use a BEC), 4S–6S OK for O4 Pro / O3 / Walksnail HV.</span>
                  </li>
                  <li class="tip-li" v-else>
                    <span class="tip-n">3</span>
                    <span>Enable bidirectional DShot for RPM filtering — it helps noticeably with propwash.</span>
                  </li>
                  <li class="tip-li">
                    <span class="tip-n">4</span>
                    <span>Save a <code class="mono-inline">diff all</code> backup after tuning and verify <code class="mono-inline">timer show</code> on custom builds.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- BOOT MODE -->
        <section v-show="tab === 'boot'">
          <h2 class="display fc-h2 flex items-center gap-3">
            <span class="sec-n">08</span>
            DFU Boot Mode ({{ current.name }})
          </h2>
          <p class="text-gray-400 text-sm mb-6">
            DFU (Device Firmware Update) is built into the AT32F435 ROM bootloader for initial flashing and recovery.
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="method in current.dfuMethods"
              :key="method.title"
              class="glass-card rounded-[4px] p-6 relative overflow-hidden"
            >
              <div v-if="method.recommended" class="absolute top-4 right-4">
                <span class="rec-pill">Recommended</span>
              </div>
              <h3 class="text-base font-bold text-white mb-4 pr-24">{{ method.title }}</h3>
              <ol class="space-y-2.5">
                <li
                  v-for="(step, i) in method.steps"
                  :key="i"
                  class="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed"
                >
                  <span class="tip-n mt-0.5">{{ i + 1 }}</span>
                  <span>{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <!-- TROUBLESHOOTING -->
        <section v-show="tab === 'trouble'">
          <h2 class="display fc-h2 flex items-center gap-3">
            <span class="sec-n">09</span>
            Troubleshooting ({{ current.name }})
          </h2>
          <p class="text-gray-400 text-sm mb-6">Common bring-up, DFU, and configuration fixes.</p>

          <div class="space-y-3">
            <div
              v-for="item in activeTroubleshooting"
              :key="item.q"
              class="glass-card rounded-[4px] p-5"
            >
              <h3 class="font-semibold text-white mb-1.5 text-sm">{{ item.q }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- ── footer CTA ──────────────────────────── -->
      <section class="glass-card rounded-[4px] p-6 sm:p-8 text-center mt-14">
        <h2 class="text-xl sm:text-2xl font-bold text-white mb-2">
          Want to dig into the design?
        </h2>
        <p class="text-gray-400 mb-6 text-sm">
          Schematics, PCB layouts, custom symbols, and Betaflight targets for V1 and V2 are all on GitHub.
        </p>
        <a
          :href="REPO_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary text-sm inline-flex"
        >
          Open GitHub Collection →
        </a>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* ── hero ── */
.fc-hero { margin-bottom: clamp(28px, 4vw, 44px); }
.fc-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.fc-rule { flex: 0 0 44px; }
.fc-title { font-size: clamp(2rem, 5vw, 3.4rem); color: var(--text-primary); margin-bottom: 16px; }
.fc-lead {
  max-width: 62ch;
  color: var(--text-secondary);
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
  line-height: 1.65;
  margin-bottom: 24px;
}
.fc-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 22px; }
.fc-highlights { display: grid; gap: 8px; font-size: 0.88rem; color: var(--text-secondary); }
.fc-highlights li { display: flex; align-items: center; gap: 10px; }
.fc-highlights .dot { width: 4px; height: 4px; border-radius: 999px; background: var(--text-muted); flex-shrink: 0; }

/* ── board picker ── */
.boards {
  display: grid; gap: 12px; grid-template-columns: 1fr;
  margin-bottom: 28px;
}
@media (min-width: 640px) { .boards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

.board {
  display: flex; flex-direction: column; gap: 6px;
  text-align: left; padding: 16px 18px;
  border: 1px solid var(--border-subtle); border-radius: 4px;
  background: linear-gradient(168deg, var(--surface), var(--bg-elevated));
  transition: border-color 0.22s ease, transform 0.22s ease, background 0.22s ease;
}
.board:hover { border-color: var(--border-strong); transform: translateY(-1px); }
.board.on { border-color: var(--border-hot); background: linear-gradient(168deg, var(--surface-hover), var(--bg-elevated)); }

.board-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.board-name {
  font-family: var(--font-display); font-weight: 800; letter-spacing: -0.03em;
  font-size: 1.35rem; color: var(--text-primary); line-height: 1;
}
.board-state {
  font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.12em;
  text-transform: uppercase; white-space: nowrap;
  color: var(--text-secondary); border: 1px solid var(--border-strong);
  border-radius: 2px; padding: 3px 7px;
}
.board-state.new {
  color: var(--text-primary);
  border-color: var(--border-hot);
  background: var(--hi-soft);
}
.board-size { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-primary); }
.board-meta { font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.03em; color: var(--text-muted); }

/* ── tabs ── */
.tabs {
  display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: clamp(26px, 3.5vw, 40px);
}
.tabs::-webkit-scrollbar { display: none; }

.tab {
  position: relative; white-space: nowrap;
  padding: 11px 14px;
  font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.09em;
  text-transform: uppercase; color: var(--text-muted);
  transition: color 0.2s ease, background 0.2s ease;
}
.tab:hover { color: var(--text-primary); background: rgba(255, 255, 255, 0.03); }
.tab.on { color: var(--text-primary); }
.tab.on::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background: var(--text-primary);
}

.panel-wrap { min-height: 320px; }

/* ── shared cards & tables ── */
.sec-n {
  font-family: var(--font-mono); font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.1em; color: var(--text-primary);
  border: 1px solid var(--border-strong); border-radius: 2px;
  padding: 4px 6px; line-height: 1;
}
.fc-h2 { font-size: clamp(1.35rem, 2.6vw, 1.9rem); color: var(--text-primary); margin-bottom: 8px; }

.notice-card {
  display: flex; flex-direction: column; gap: 10px;
  padding: 18px 20px; border-radius: 4px;
  background: var(--surface);
  border: 1px solid var(--border-hot);
}
@media (min-width: 640px) {
  .notice-card { flex-direction: row; align-items: flex-start; gap: 18px; }
}
.notice-tag {
  font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em;
  text-transform: uppercase; white-space: nowrap;
  color: var(--text-primary); border: 1px solid var(--border-strong);
  padding: 4px 8px; border-radius: 2px; align-self: flex-start;
}
.notice-title { font-size: 0.96rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.notice-text { font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); }

.cmp-table { width: 100%; border-collapse: collapse; font-size: 0.86rem; text-align: left; }
.cmp-table th {
  font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-muted);
  padding: 14px 18px; border-bottom: 1px solid var(--border-subtle);
}
.cmp-table th.activeCol { color: var(--text-primary); }
.cmp-table td {
  padding: 12px 18px; border-bottom: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}
.cmp-table tr:last-child td { border-bottom: 0; }
.cmp-table .cmp-k {
  font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--text-muted); white-space: nowrap;
}
.cmp-table td.activeCell { color: var(--text-primary); }

.spec-k {
  font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--text-primary);
}

.pin-head {
  font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-primary);
  padding: 14px 18px; border-bottom: 1px solid var(--border-subtle);
  background: var(--surface);
}
.pin-row { padding: 12px 18px; }
.pin-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 3px; }
.pin-name { font-size: 0.88rem; font-weight: 500; color: var(--text-primary); }
.pin-code {
  font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-primary);
  background: var(--hi-soft); border: 1px solid var(--border-subtle);
  padding: 2px 7px; border-radius: 2px;
}
.pin-detail { font-size: 0.8rem; color: var(--text-muted); }

.mono-inline {
  font-family: var(--font-mono); font-size: 0.82em;
  color: var(--text-primary); background: var(--hi-soft);
  padding: 1px 5px; border-radius: 2px;
  white-space: nowrap;
}

.step-num {
  width: 42px; height: 42px; border-radius: 3px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.82rem; font-weight: 600;
  background: var(--hi-soft); border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

.tip-li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.87rem; color: var(--text-secondary); line-height: 1.55; }
.tip-n {
  width: 18px; height: 18px; border-radius: 999px; flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700;
  background: var(--hi-soft); border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

.rec-pill {
  font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 4px 8px; border-radius: 2px;
  background: var(--hi-soft); border: 1px solid var(--border-strong);
  color: var(--text-primary);
}
</style>
