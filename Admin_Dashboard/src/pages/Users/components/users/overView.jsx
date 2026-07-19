
const OverView = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Total users</h3>
        <p className="mt-4 text-4xl font-semibold text-slate-900">-</p>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Verified accounts</h3>
        <p className="mt-4 text-4xl font-semibold text-slate-900">-</p>
      </div>
    </section>
  );
};

export default OverView;