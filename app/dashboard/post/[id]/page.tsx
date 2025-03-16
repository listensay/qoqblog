'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@mantine/tiptap/styles.css'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import EditorImage from '@tiptap/extension-image' // 新增导入 Image 扩展
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { RichTextEditor } from '@mantine/tiptap'
import {
  Button,
  Group,
  Textarea,
  TextInput,
  Text,
  Tabs,
  LoadingOverlay
} from '@mantine/core'
import { hasLength, useForm } from '@mantine/form'
import myRequest from '~/utils/myRequest'
import {
  fetchGetPost,
  fetchInsertPost,
  fetchUpdatePost
} from '~/services/posts'
import { notifications } from '@mantine/notifications'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import BlogItem from '~/components/BlogItem'
import Image from 'next/image'

const CustomImage = EditorImage.extend({
  parseHTML() {
    return [
      {
        tag: 'img[src^="data:image"]'
      },
      {
        tag: 'img[src]'
      }
    ]
  }
})

const Page = memo(({ params }: any) => {
  const router = useRouter()
  const { id } = React.use(params) as any

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      description: ''
    },
    validate: {
      title: hasLength({ min: 3 }, '文章标题太短了'),
      description: hasLength({ min: 3 }, '文章描述太短了')
    }
  })

  const [content, setContent] = useState('')
  const [cover, setCover] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const openRef = useRef<() => void>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 初始化编辑器，并加入 Image 扩展
  const editor = useEditor({
    content: '',
    extensions: [StarterKit, Underline, Highlight, CustomImage],
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    immediatelyRender: false
  })

  // 加载文章内容
  useEffect(() => {
    const fetchPost = async () => {
      if (id > 0) {
        try {
          const res = await fetchGetPost(id)
          const { data } = res as any
          setContent(data.post.content)
          setCover(data.post.cover)
          form.setValues({
            title: data.post.title,
            description: data.post.description
          })
          if (editor) {
            editor.commands.setContent(data.post.content)
          }
        } catch (error) {
          console.error('Failed to fetch post:', error)
        }
      }
    }

    fetchPost()
  }, [id, editor])

  // 提交表单
  const submit = async (values: typeof form.values) => {
    try {
      if (id > 0) {
        await fetchUpdatePost({
          id,
          title: values.title,
          description: values.description,
          content: content,
          categoryId: 1,
          cover
        })
        notifications.show({
          title: 'Post updated',
          message: 'Post has been updated successfully',
          color: 'green',
          autoClose: 3000
        })
        router.push('/dashboard/post')
      } else {
        await fetchInsertPost({
          title: values.title,
          description: values.description,
          content: content,
          categoryId: 1,
          cover
        })
        notifications.show({
          title: 'Post created',
          message: 'Post has been created successfully',
          color: 'green',
          autoClose: 3000
        })
        router.push('/dashboard/post')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 生成摘要
  const generateSummary = () => {
    setLoading(true)
    const clearContent = content.replace(/<[^>]+>/g, '')
    try {
      myRequest
        .get('/v1/ai', {
          content: clearContent,
          title
        })
        .then(res => {
          const description = JSON.parse(`"${res.data.message}"`)
          form.setValues({
            description
          })
          setLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // 处理图片上传
  const dropHandle = async (files: File[]) => {
    const images = await Promise.all(
      files.map(
        file =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = error => reject(error)
            reader.readAsDataURL(file)
          })
      )
    )

    console.log(images.length)
    setCover(images[0])
  }

  // 封面渲染
  const coverRander = () => {
    if (cover) {
      return (
        <div>
          <div onClick={() => openRef.current?.()}>
            <Image
              src={cover}
              width={300}
              height={300}
              alt="Cover"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </div>
        </div>
      )
    }

    // 上传封面
    return (
      <Dropzone
        openRef={openRef}
        onDrop={files => dropHandle(files)}
        onReject={() =>
          notifications.show({
            message: '请检查文件大小',
            title: '文件上传失败'
          })
        }
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={52}
              color="var(--mantine-color-blue-6)"
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              size={52}
              color="var(--mantine-color-dimmed)"
              stroke={1.5}
            />
          </Dropzone.Idle>
          <div>
            <Text size="xl" inline>
              请选择一张图片作为文章封面上传
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              文件大小不超过5MB
            </Text>
          </div>
        </Group>
      </Dropzone>
    )
  }

  // 新增：处理图片上传，并将图片以 base64 格式插入到编辑器中
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editor) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        editor.chain().focus().setImage({ src: base64 }).run()
      }
      reader.onerror = error => {
        console.error('图片读取错误：', error)
      }
      reader.readAsDataURL(file)
    }
  }

  // 当点击"插入图片"按钮时，触发隐藏的 input
  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <Tabs defaultValue="cover">
        <Tabs.List>
          <Tabs.Tab value="cover">上传封面</Tabs.Tab>
          <Tabs.Tab value="post">封面效果展示</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cover">
          <div className="py-4">{coverRander()}</div>
        </Tabs.Panel>

        <Tabs.Panel value="post">
          <div className="py-4">
            <BlogItem title={title} color="bg-pink-300" cover={cover} />
          </div>
        </Tabs.Panel>
      </Tabs>

      <form onSubmit={form.onSubmit(values => submit(values))}>
        <TextInput
          withAsterisk
          label="标题"
          placeholder="请输入文章标题"
          {...form.getInputProps('title')}
          className="mb-4"
          onChange={event => {
            setTitle(event.target.value)
            form.setValues({ title: event.target.value })
          }}
        />

        {/* 新增工具栏按钮：插入图片 */}
        <RichTextEditor editor={editor} variant="subtle" className="mb-4">
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
              <Button variant="outline" size="xs" onClick={triggerImageUpload}>
                插入图片
              </Button>
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content />
        </RichTextEditor>

        {/* 隐藏的文件上传 input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />

        <div className="flex items-center mb-4">
          <Button className="mr-2" onClick={() => generateSummary()}>
            AI 生成摘要
          </Button>
        </div>

        <Textarea
          label="描述"
          placeholder="描述"
          disabled={loading}
          withAsterisk
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">{id > 0 ? '保存' : '新增'}</Button>
        </Group>
      </form>
    </div>
  )
})

Page.displayName = 'AuthPostEditor'

export default Page
