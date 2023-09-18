import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/review/recommendation');
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트 될 때 한 번만 요청을 실행하도록 합니다.

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* data를 렌더링하는 로직 */}
    </div>
  );
}

export default MyComponent;