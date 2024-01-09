import { useEffect, useRef, useState } from "react"
import { getChannelShorts } from "./api/youtube"
import _ from "lodash"

import styles from "./App.module.css"
import "./App.css"
import { Button, Space, Typography } from "antd"
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons"

const { Text } = Typography
const DEFAULT_TOP = 5

function App() {
  const [count, setCount] = useState(0)
  const [shortList, setShortList] = useState<string[]>([])
  const [mute, setMute] = useState<0 | 1>(1)
  const refTimer = useRef<NodeJS.Timeout>()

  function hanedleScroll() {
    if (refTimer) {
      clearTimeout(refTimer.current)
    }

    refTimer.current = setTimeout(() => {
      if (window.scrollY <= 0) {
        setCount((count) => (count - 1 > 0 ? count - 1 : 0))
        window.scrollTo({ top: DEFAULT_TOP })
      }
      if (window.scrollY - DEFAULT_TOP >= 10) {
        setCount((count) => count + 1)
        window.scrollTo({ top: DEFAULT_TOP })
      }
    }, 1000)
  }

  async function fetch() {
    const {
      data: { data },
    } = await getChannelShorts()

    setShortList(data.map(({ id }) => id))
  }

  useEffect(() => {
    fetch()
    window.scrollTo({ top: DEFAULT_TOP })
    addEventListener("scroll", hanedleScroll)
  }, [])

  return (
    <div className={styles.content}>
      <div className="card">
        <iframe
          width="320"
          height="560"
          src={`https://www.youtube.com/embed/${shortList[count]}?autoplay=1&mute=${mute}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className={styles.actions}>
        <Space direction="vertical">
          <Button
            type="default"
            shape="circle"
            icon={<LikeOutlined />}
            size="large"
          />
          <Text className={styles.actionText}>1233</Text>
        </Space>
        <Button
          type="default"
          shape="circle"
          icon={<DislikeOutlined />}
          size="large"
        />
        <Text className={styles.actionText}>不喜歡</Text>
        <Button
          type="default"
          shape="circle"
          icon={<CommentOutlined />}
          size="large"
        />
        <Text className={styles.actionText}>15</Text>
        <Button
          type="default"
          shape="circle"
          icon={<ShareAltOutlined />}
          size="large"
        />
        <Text className={styles.actionText}>分享</Text>
        <Button
          type="default"
          shape="circle"
          icon={<EllipsisOutlined />}
          size="large"
        />
      </div>
    </div>
  )
}

export default App
