import React from 'react'
import { motion } from 'framer-motion'
import '../styles/components/noticecard.scss' // normal SCSS import
import { Calendar } from 'lucide-react'

const Noticecard = ({ noticedata }) => {
  return (
    <div className="notice-grid grid gap-4  grid-cols-1">
      {noticedata.map((notice) => (
        <motion.div
          key={notice.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: notice.id * 0.10 }}
          className="notice-card p-5 rounded-sm shadow-lg border-1 bg-white "
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold ">{notice.title}</h2>
            <span className="category-badge text-xs font-medium px-2 py-1 rounded">
              {notice.audience}
            </span>
          </div>
          <p className="text-sm mb-2">{notice.message}</p>
          <div className="text-xs flex  date mb-2 gap-2"><Calendar  size={15}/> {new Date(notice.createdAt).toLocaleString()} </div>
          {notice.attachment && (
            <motion.a whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 , ease: "easeInOut" }}
              href={notice.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm"
            > 
              Download Attachment
            </motion.a>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default Noticecard
