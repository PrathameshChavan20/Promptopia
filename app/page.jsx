import Feed from '@/components/Feed'
function Home() {
  return (
    <div>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & Share 
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center ml-3">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="desc text-center">
          Promptopia is open source AI-Prompting tool for the modern world to
          discover,create and share prompts.
        </p>
        <Feed/>
      </section>
    </div>
  );
}

export default Home;
