// "use client";

// import { SkeletonNote } from "@/components/Skeleton";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// interface Note {
//   id: number;
//   title: string;
//   content: string;
// }

// const API_URL = "/api/note";

// export default function DashboardPage() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [editingNote, setEditingNote] = useState<Note | null>(null);

//   // UI states
//   const [loading, setLoading] = useState<boolean>(true); // initial load
//   const [saving, setSaving] = useState<boolean>(false); // create/update
//   const [deletingId, setDeletingId] = useState<number | null>(null); // which note is being deleted

//   // Fetch notes (with simulated delay so skeleton is visible)
//   const fetchNotes = async () => {
//     setLoading(true);
//     try {
//       // simulate network latency (adjust as needed)
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         setNotes(data.data || []);
//       } else {
//         // if backend returns success:false
//         toast.error(data?.message || "Failed to load notes");
//       }
//     } catch (err: any) {
//       console.error("Fetch notes error:", err);
//       toast.error(err?.message || "Failed to fetch notes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   // Create new note
//   const handleCreate = async () => {
//     if (!title.trim() || !content.trim()) return;
//     setSaving(true);
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: title.trim(), content: content.trim() }),
//       });
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         // add new note to top
//         setNotes((prev) => [data.data, ...prev]);
//         setTitle("");
//         setContent("");
//         toast.success("Note created");
//       } else {
//         toast.error(data?.message || "Failed to create note");
//       }
//     } catch (err: any) {
//       console.error("Create note error:", err);
//       toast.error(err?.message || "Failed to create note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Update existing note
//   const handleUpdate = async () => {
//     if (!editingNote || !title.trim() || !content.trim()) return;
//     setSaving(true);
//     try {
//       const res = await fetch(`${API_URL}/${editingNote.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: title.trim(), content: content.trim() }),
//       });
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         setNotes((prev) =>
//           prev.map((n) => (n.id === editingNote.id ? data.data : n))
//         );
//         setEditingNote(null);
//         setTitle("");
//         setContent("");
//         toast.success("Note updated");
//       } else {
//         toast.error(data?.message || "Failed to update note");
//       }
//     } catch (err: any) {
//       console.error("Update note error:", err);
//       toast.error(err?.message || "Failed to update note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Delete a note
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this note?")) return;
//     setDeletingId(id);
//     try {
//       const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         setNotes((prev) => prev.filter((n) => n.id !== id));
//         toast.success("Note deleted");
//       } else {
//         toast.error(data?.message || "Failed to delete note");
//       }
//     } catch (err: any) {
//       console.error("Delete note error:", err);
//       toast.error(err?.message || "Failed to delete note");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const startEdit = (note: Note) => {
//     setEditingNote(note);
//     setTitle(note.title);
//     setContent(note.content);
//     // optional: scroll to form or focus input here
//   };

//   const isFormInvalid = !title.trim() || !content.trim();
//   const isActionDisabled = saving || loading;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-500">
//       <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
//         Notes Dashboard
//       </h1>

//       {/* Create/Edit Form */}
//       <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mb-8 transition-colors duration-500">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
//           {editingNote ? "Edit Note" : "Create Note"}
//         </h2>

//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         />

//         <textarea
//           placeholder="Content"
//           value={content}
//           rows={3}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
//         />

//         <div className="flex gap-2">
//           <button
//             onClick={editingNote ? handleUpdate : handleCreate}
//             disabled={isFormInvalid || isActionDisabled}
//             className={`px-6 py-2 rounded-lg shadow transition
//               ${
//                 isFormInvalid || isActionDisabled
//                   ? "bg-gray-400 cursor-not-allowed text-gray-100"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//           >
//             {saving
//               ? editingNote
//                 ? "Updating..."
//                 : "Saving..."
//               : editingNote
//               ? "Update Note"
//               : "Add Note"}
//           </button>

//           {editingNote && (
//             <button
//               onClick={() => {
//                 setEditingNote(null);
//                 setTitle("");
//                 setContent("");
//               }}
//               disabled={isActionDisabled}
//               className={`px-6 py-2 rounded-lg shadow transition
//                 ${
//                   isActionDisabled
//                     ? "bg-gray-400 cursor-not-allowed text-gray-100"
//                     : "bg-gray-400 hover:bg-gray-500 text-white"
//                 }`}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Notes List */}
//       <div className="max-w-xl mx-auto grid gap-4">
//         {loading ? (
//           Array.from({ length: 3 }).map((_, idx) => <SkeletonNote key={idx} />)
//         ) : notes.length === 0 ? (
//           <div className="text-center text-gray-600 dark:text-gray-300 py-14 bg-white dark:bg-gray-900 rounded-xl shadow">
//             No notes yet — create your first note.
//           </div>
//         ) : (
//           notes.map((note) => (
//             <div
//               key={note.id}
//               className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md flex justify-between items-center transition transform hover:scale-105 duration-300"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                   {note.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mt-1">
//                   {note.content}
//                 </p>
//               </div>

//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => startEdit(note)}
//                   disabled={saving || loading}
//                   className={`px-4 py-2 rounded-lg shadow transition
//                       ${
//                         saving || loading
//                           ? "bg-gray-400 cursor-not-allowed text-gray-100"
//                           : "bg-yellow-500 hover:bg-yellow-600 text-white"
//                       }`}
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(note.id)}
//                   disabled={deletingId === note.id}
//                   className={`px-4 py-2 rounded-lg shadow transition
//                       ${
//                         deletingId === note.id
//                           ? "bg-gray-400 cursor-not-allowed text-gray-100"
//                           : "bg-red-500 hover:bg-red-600 text-white"
//                       }`}
//                 >
//                   {deletingId === note.id ? "Deleting..." : "Delete"}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";

// import { SkeletonNote } from "@/components/Skeleton";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { FiPlus, FiEdit, FiTrash2, FiX, FiSearch, FiMoon, FiSun } from "react-icons/fi";

// interface Note {
//   id: number;
//   title: string;
//   content: string;
//   createdAt?: string;
// }

// const API_URL = "/api/note";

// export default function DashboardPage() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [editingNote, setEditingNote] = useState<Note | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(false);

//   // UI states
//   const [loading, setLoading] = useState<boolean>(true);
//   const [saving, setSaving] = useState<boolean>(false);
//   const [deletingId, setDeletingId] = useState<number | null>(null);

//   // Toggle dark mode
//   useEffect(() => {
//     // Check system preference or saved preference
//     const isDark = localStorage.getItem("darkMode") === "true" || 
//                   (window.matchMedia("(prefers-color-scheme: dark)").matches && 
//                   localStorage.getItem("darkMode") !== "false");
//     setDarkMode(isDark);
//     document.documentElement.classList.toggle("dark", isDark);
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     document.documentElement.classList.toggle("dark", newDarkMode);
//     localStorage.setItem("darkMode", String(newDarkMode));
//   };

//   // Filter notes based on search query
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredNotes(notes);
//     } else {
//       const query = searchQuery.toLowerCase();
//       const filtered = notes.filter(
//         note =>
//           note.title.toLowerCase().includes(query) ||
//           note.content.toLowerCase().includes(query)
//       );
//       setFilteredNotes(filtered);
//     }
//   }, [searchQuery, notes]);

//   // Fetch notes
//   const fetchNotes = async () => {
//     setLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 800));
//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         setNotes(data.data || []);
//       } else {
//         toast.error(data?.message || "Failed to load notes");
//       }
//     } catch (err: any) {
//       console.error("Fetch notes error:", err);
//       toast.error(err?.message || "Failed to fetch notes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   // Create new note
//   const handleCreate = async () => {
//     if (!title.trim() || !content.trim()) {
//       toast.warning("Please add both title and content");
//       return;
//     }
    
//     setSaving(true);
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: title.trim(), content: content.trim() }),
//       });
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         setNotes(prev => [data.data, ...prev]);
//         setTitle("");
//         setContent("");
//         toast.success("Note created successfully");
//       } else {
//         toast.error(data?.message || "Failed to create note");
//       }
//     } catch (err: any) {
//       console.error("Create note error:", err);
//       toast.error(err?.message || "Failed to create note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Update existing note
//   const handleUpdate = async () => {
//     if (!editingNote || !title.trim() || !content.trim()) return;
//     setSaving(true);
//     try {
//       const res = await fetch(`${API_URL}/${editingNote.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: title.trim(), content: content.trim() }),
//       });
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         setNotes(prev => prev.map(n => (n.id === editingNote.id ? data.data : n)));
//         cancelEdit();
//         toast.success("Note updated successfully");
//       } else {
//         toast.error(data?.message || "Failed to update note");
//       }
//     } catch (err: any) {
//       console.error("Update note error:", err);
//       toast.error(err?.message || "Failed to update note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Delete a note
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this note?")) return;
//     setDeletingId(id);
//     try {
//       const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error(`Network error: ${res.status}`);
//       const data = await res.json();
//       if (data?.success) {
//         setNotes(prev => prev.filter(n => n.id !== id));
//         toast.success("Note deleted successfully");
//       } else {
//         toast.error(data?.message || "Failed to delete note");
//       }
//     } catch (err: any) {
//       console.error("Delete note error:", err);
//       toast.error(err?.message || "Failed to delete note");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const startEdit = (note: Note) => {
//     setEditingNote(note);
//     setTitle(note.title);
//     setContent(note.content);
//   };

//   const cancelEdit = () => {
//     setEditingNote(null);
//     setTitle("");
//     setContent("");
//   };

//   const isFormInvalid = !title.trim() || !content.trim();
//   const isActionDisabled = saving || loading;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-colors duration-300">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//               Notes Dashboard
//             </span>
//           </h1>
          
//           <div className="flex items-center gap-3">
//             {/* Search Box */}
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search notes..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               />
//             </div>
            
//             {/* Dark Mode Toggle */}
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* Create/Edit Form */}
//         <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
//               {editingNote ? "Edit Note" : "Create New Note"}
//             </h2>
//             {editingNote && (
//               <button
//                 onClick={cancelEdit}
//                 className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full transition"
//                 aria-label="Cancel editing"
//               >
//                 <FiX size={20} />
//               </button>
//             )}
//           </div>

//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Note title"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />

//             <textarea
//               placeholder="Note content"
//               value={content}
//               rows={4}
//               onChange={e => setContent(e.target.value)}
//               className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
//             />

//             <div className="flex gap-2">
//               <button
//                 onClick={editingNote ? handleUpdate : handleCreate}
//                 disabled={isFormInvalid || isActionDisabled}
//                 className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg shadow transition-all
//                   ${
//                     isFormInvalid || isActionDisabled
//                       ? "bg-gray-400 cursor-not-allowed text-gray-100"
//                       : "bg-blue-600 hover:bg-blue-700 text-white"
//                   }`}
//               >
//                 {saving ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     {editingNote ? "Updating..." : "Saving..."}
//                   </>
//                 ) : (
//                   <>
//                     <FiPlus size={18} />
//                     {editingNote ? "Update Note" : "Add Note"}
//                   </>
//                 )}
//               </button>

//               {editingNote && (
//                 <button
//                   onClick={cancelEdit}
//                   disabled={isActionDisabled}
//                   className={`px-6 py-3 rounded-lg shadow transition
//                     ${
//                       isActionDisabled
//                         ? "bg-gray-400 cursor-not-allowed text-gray-100"
//                         : "bg-gray-500 hover:bg-gray-600 text-white"
//                     }`}
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Notes List Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
//             Your Notes {notes.length > 0 && `(${notes.length})`}
//           </h2>
//           {searchQuery && (
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Found {filteredNotes.length} results
//             </span>
//           )}
//         </div>

//         {/* Notes List */}
//         <div className="grid gap-4">
//           {loading ? (
//             Array.from({ length: 4 }).map((_, idx) => <SkeletonNote key={idx} />)
//           ) : filteredNotes.length === 0 ? (
//             <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow">
//               <div className="text-gray-400 dark:text-gray-500 mb-2">
//                 <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 {searchQuery ? "No notes found" : "No notes yet"}
//               </p>
//               <p className="text-gray-500 dark:text-gray-400 mt-1">
//                 {searchQuery ? "Try a different search term" : "Create your first note to get started"}
//               </p>
//             </div>
//           ) : (
//             filteredNotes.map(note => (
//               <div
//                 key={note.id}
//                 className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
//               >
//                 <div className="flex justify-between items-start gap-4">
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
//                       {note.title}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-line line-clamp-3">
//                       {note.content}
//                     </p>
//                     {note.createdAt && (
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
//                         Created: {new Date(note.createdAt).toLocaleDateString()}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <button
//                       onClick={() => startEdit(note)}
//                       disabled={saving || loading}
//                       className={`p-2 rounded-lg transition
//                           ${
//                             saving || loading
//                               ? "text-gray-400 cursor-not-allowed"
//                               : "text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30"
//                           }`}
//                       aria-label="Edit note"
//                     >
//                       <FiEdit size={18} />
//                     </button>

//                     <button
//                       onClick={() => handleDelete(note.id)}
//                       disabled={deletingId === note.id}
//                       className={`p-2 rounded-lg transition
//                           ${
//                             deletingId === note.id
//                               ? "text-gray-400 cursor-not-allowed"
//                               : "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
//                           }`}
//                       aria-label="Delete note"
//                     >
//                       {deletingId === note.id ? (
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
//                       ) : (
//                         <FiTrash2 size={18} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { SkeletonNote } from "@/components/Skeleton";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
}

const API_URL = "/api/note";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // UI states
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();
      if (data?.success) {
        setNotes(data.data || []);
      } else {
        toast.error(data?.message || "Failed to load notes");
      }
    } catch (err: any) {
      console.error("Fetch notes error:", err);
      toast.error(err?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // Set initial dark mode
    document.documentElement.classList.add("dark");
  }, []);

  // Create new note
  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();
      if (data?.success) {
        setNotes((prev) => [data.data, ...prev]);
        setTitle("");
        setContent("");
        toast.success("Note created", { position: "top-right" });
      } else {
        toast.error(data?.message || "Failed to create note");
      }
    } catch (err: any) {
      console.error("Create note error:", err);
      toast.error(err?.message || "Failed to create note");
    } finally {
      setSaving(false);
    }
  };

  // Update existing note
  const handleUpdate = async () => {
    if (!editingNote || !title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/${editingNote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();
      if (data?.success) {
        setNotes((prev) =>
          prev.map((n) => (n.id === editingNote.id ? data.data : n))
        );
        setEditingNote(null);
        setTitle("");
        setContent("");
        toast.success("Note updated", { position: "top-right" });
      } else {
        toast.error(data?.message || "Failed to update note");
      }
    } catch (err: any) {
      console.error("Update note error:", err);
      toast.error(err?.message || "Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // Delete a note
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();
      if (data?.success) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        toast.success("Note deleted", { position: "top-right" });
      } else {
        toast.error(data?.message || "Failed to delete note");
      }
    } catch (err: any) {
      console.error("Delete note error:", err);
      toast.error(err?.message || "Failed to delete note");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const isFormInvalid = !title.trim() || !content.trim();
  const isActionDisabled = saving || loading;

  

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
            Notes Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Create/Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            {editingNote ? "Edit Note" : "Create a New Note"}
          </h2>

          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <textarea
            placeholder="Note Content"
            value={content}
            rows={4}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={editingNote ? handleUpdate : handleCreate}
              disabled={isFormInvalid || isActionDisabled}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                isFormInvalid || isActionDisabled
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {saving
                ? editingNote
                  ? "Updating..."
                  : "Saving..."
                : editingNote
                ? "Update Note"
                : "Add Note"}
            </motion.button>

            {editingNote && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingNote(null);
                  setTitle("");
                  setContent("");
                }}
                disabled={isActionDisabled}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  isActionDisabled
                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                    : "bg-gray-500 hover:bg-gray-600 text-white"
                }`}
              >
                Cancel
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Notes List */}
        <div className="grid gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonNote key={idx} />
            ))
          ) : notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-500 dark:text-gray-400 py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
            >
              No notes yet — create your first note above.
            </motion.div>
          ) : (
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex justify-between items-center hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {note.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {note.content}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startEdit(note)}
                      disabled={saving || loading}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        saving || loading
                          ? "bg-gray-400 cursor-not-allowed text-gray-200"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      Edit
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(note.id)}
                      disabled={deletingId === note.id}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        deletingId === note.id
                          ? "bg-gray-400 cursor-not-allowed text-gray-200"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      {deletingId === note.id ? "Deleting..." : "Delete"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}