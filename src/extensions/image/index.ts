import Image from '@tiptap/extension-image'
import { type CommandProps, VueNodeViewRenderer } from '@tiptap/vue-3'

import NodeView from './node-view.vue'
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    setImage: {
      setImage: (options: any, replace?: any) => ReturnType
    }
  }
}
export default Image.extend({
  atom: true,
  addAttributes() {
    return {
      vnode: {
        default: true,
      },
      type: {
        default: 'image',
      },
      name: {
        default: null,
      },
      size: {
        default: null,
      },
      file: {
        default: null,
      },
      id: {
        default: null,
      },
      src: {
        default: null,
      },
      content: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: 200,
      },
      left: {
        default: 0,
      },
      top: {
        default: 0,
      },
      angle: {
        default: null,
      },
      draggable: {
        default: false,
      },
      rotatable: {
        default: false,
      },
      equalProportion: {
        default: true,
      },
      flipX: {
        default: false,
      },
      flipY: {
        default: false,
      },
      uploaded: {
        default: false,
      },
      error: {
        default: false,
      },
      previewType: {
        default: 'image',
      },
      // 新增属性，标记图片是否已经加载过
      loaded: {
        default: false,
      },
    }
  },
  parseHTML() {
    return [{ tag: 'img' }]
  },
  addNodeView() {
    return VueNodeViewRenderer(NodeView)
  },
  addCommands() {
    return {
      setImage:
        (
          options: { src: string; alt?: string; title?: string; id?: string },
          replace?: boolean,
        ) =>
        ({ commands, editor }: CommandProps) => {
          if (replace) {
            return commands.insertContent({
              type: this.name,
              attrs: {
                ...options, // 初始化时标记为未加载
                loaded: false,
              },
            })
          }
          return commands.insertContentAt(editor.state.selection.anchor, {
            type: this.name,
            attrs: {
              ...options, // 初始化时标记为未加载
              loaded: false,
            },
          })
        },
    }
  },
})
