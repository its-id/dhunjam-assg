const CustomTooltip = ({ payload, label, active }: any) => {
  if (active) {
    return (
      <div className='w-fit p-2 backdrop-blur-xl bg-[#F0C3F1]/50 flex items-center justify-center rounded'>
        <p className='text-base text-white'>{`Category ${label.split('_')[1] - 5}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
