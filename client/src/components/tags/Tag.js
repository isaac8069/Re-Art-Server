import React, { useEffect, useState } from 'react';
import apiUrl from '../../config/apiConfig';
import './Tag.css';

const Tag = (props) => {
  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState({});
  const [animate, setAnimate] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    fetch(`${apiUrl}/tags`)
      .then((res) => res.json())
      .then((foundTags) => {
        setTags(foundTags.tags);

        const initialChecked = {};
        foundTags.tags.forEach((tag) => {
          initialChecked[tag._id] = false;
        });
        setCheckedTags(initialChecked);

        setTimeout(() => setLoaded(true), 100);
      })
      .catch((err) => console.log(err));
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setCheckedTags((prev) => ({ ...prev, [name]: checked }));
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  const postTags = (e) => {
    e.preventDefault();
    const selectedTags = Object.keys(checkedTags).filter(
      (tagId) => checkedTags[tagId]
    );
    const preJSONBody = { tags: selectedTags };

    fetch(`${apiUrl}/tags`, {
      method: 'POST',
      body: JSON.stringify(preJSONBody),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((postedTags) => {
        console.log('Posted Tags:', postedTags);
        if (props.refreshTags) props.refreshTags();
      })
      .catch((err) => console.log(err));
  };

  const selectedCount = Object.values(checkedTags).filter(Boolean).length;

  return (
    <div className="tag-container">
      <h1>Tags</h1>
      <div
        className={`selected-badge ${
          selectedCount > 0 ? 'active' : ''
        } ${animate ? 'pulse' : ''}`}
      >
        {selectedCount} tag(s) selected
      </div>

      <form onSubmit={postTags}>
        {tags.map((tag) => (
          <div key={tag._id} className={`tag-item ${loaded ? 'fade-in' : ''}`}>
            <label>
              <input
                type="checkbox"
                name={tag._id}
                checked={checkedTags[tag._id] || false}
                onChange={handleCheck}
              />
              {tag.name}
            </label>
          </div>
        ))}
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Tag;
