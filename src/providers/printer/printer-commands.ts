export const commands = {
  LF: [0x0a],
  ESC: [0x1b],
  FS: [0x1c],
  GS: [0x1d],
  US: [0x1f],
  FF: [0x0c],
  DLE: [0x10],
  DC1: [0x11],
  DC4: [0x14],
  EOT: [0x04],
  NUL: [0x00],
  HORIZONTAL_LINE: {
    HR1_58MM: '________________________________',
    HR2_58MM: '--------------------------------',
    HR3_58MM: '================================',
    HR4_58MM: '********************************'
  },
  FEED_CONTROL_SEQUENCES: {
    CTL_LF: [0x0a],
    CTL_FF: [0x0c],
    CTL_CR: [0x0d],
    CTL_HT: [0x09],
    CTL_VT: [0x0b],
  },
  LINE_SPACING: {
    LS_DEFAULT: [0x1b,0x32],
    LS_SET: [0x1b,0x33]
  },
  HARDWARE: {
    HW_INIT: [0x1b,0x40],
    HW_SELECT: [0x1b,0x3d,0x01],
    HW_RESET: [0x1b,0x3f,0x0a,0x00],
  },
  CASH_DRAWER: {
    CD_KICK_2: [0x1b,0x70,0x00],
    CD_KICK_5: [0x1b,0x70,0x01],
  },
  MARGINS: {
    BOTTOM: [0x1b,0x4f],
    LEFT: [0x1b,0x6c],
    RIGHT: [0x1b,0x51],
  },
  PAPER: {
    PAPER_FULL_CUT: [0x1d,0x56,0x00],
    PAPER_PART_CUT: [0x1d,0x56,0x01],
    PAPER_CUT_A: [0x1d,0x56,0x41],
    PAPER_CUT_B: [0x1d,0x56,0x42],
  },
  TEXT_FORMAT: {
    TXT_NORMAL: [0x1b,0x21,0x00],
    TXT_2HEIGHT: [0x1b,0x21,0x10],
    TXT_2WIDTH: [0x1b,0x21,0x20],
    TXT_4SQUARE: [0x1b,0x21,0x30],
    TXT_CUSTOM_SIZE: function (width, height) {
      var widthDec = (width - 1) * 16;
      var heightDec = height - 1;
      var sizeDec = widthDec + heightDec;
      return [0x1d,0x21,String.fromCharCode(sizeDec)]
    },

    TXT_HEIGHT: {
      1: [0x00],
      2: [0x01],
      3: [0x02],
      4: [0x03],
      5: [0x04],
      6: [0x05],
      7: [0x06],
      8: [0x07]
    },
    TXT_WIDTH: {
      1: [0x00],
      2: [0x10],
      3: [0x20],
      4: [0x30],
      5: [0x40],
      6: [0x50],
      7: [0x60],
      8: [0x70]
    },

    TXT_UNDERL_OFF: [0x1b,0x2d,0x00],
    TXT_UNDERL_ON: [0x1b,0x2d,0x01],
    TXT_UNDERL2_ON: [0x1b,0x2d,0x02],
    TXT_BOLD_OFF: [0x1b,0x45,0x00],
    TXT_BOLD_ON: [0x1b,0x45,0x01],
    TXT_ITALIC_OFF: [0x1b,0x35],
    TXT_ITALIC_ON: [0x1b,0x34],
    TXT_FONT_A: [0x1b,0x4d,0x00],
    TXT_FONT_B: [0x1b,0x4d,0x01],
    TXT_FONT_C: [0x1b,0x4d,0x02],
    TXT_ALIGN_LT: [0x1b,0x61,0x00],
    TXT_ALIGN_CT: [0x1b,0x61,0x01],
    TXT_ALIGN_RT: [0x1b,0x61,0x02],
  }
}
